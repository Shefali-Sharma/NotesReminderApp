package controllers

import (
	"notes-reminder-app/database"
	"strconv"
	"time"

	"notes-reminder-app/models"

	"github.com/dgrijalva/jwt-go"
	"github.com/gofiber/fiber/v2"

	"golang.org/x/crypto/bcrypt"
)

// Register allows users to create an account
func Register(c *fiber.Ctx) error {
	var data map[string]string

	err := c.BodyParser(&data)

	if err != nil {
		return err
	}

	if data["password"] != data["password_confirm"] {
		c.Status(400)
		return c.JSON(fiber.Map{
			"messgae": "Passwords do not match",
		})
	}

	password, _ := bcrypt.GenerateFromPassword([]byte(data["password"]), 12)

	user := models.User{
		FirstName: data["first_name"],
		LastName:  data["last_name"],
		Email:     data["email"],
		Password:  password,
	}

	database.DB.Create(&user)

	return c.JSON(user)
}

// Login allows users to access their account
func Login(c *fiber.Ctx) error {
	var data map[string]string

	err := c.BodyParser(&data)

	if err != nil {
		return err
	}

	var user models.User

	database.DB.Where("email = ?", data["email"]).First(&user)

	if user.ID == 0 {
		c.Status(404)
		return c.JSON(fiber.Map{
			"messgae": "User not found.",
		})
	}

	err = bcrypt.CompareHashAndPassword(user.Password, []byte(data["password"]))

	if err != nil {
		c.Status(400)
		return c.JSON(fiber.Map{
			"messgae": "Incorrect password",
		})
	}

	claims := jwt.StandardClaims{
		Id:        strconv.Itoa(int(user.ID)),
		ExpiresAt: time.Now().Add(time.Hour * 24).Unix(),
	}

	signed := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	token, err := signed.SignedString([]byte("mysecretkey"))

	if err != nil {
		return c.JSON(fiber.Map{
			"message": "Internal Server Error",
		})
	}

	cookie := fiber.Cookie{
		Name:     "token",
		Value:    token,
		Expires:  time.Now().Add(time.Hour * 24),
		HTTPOnly: true,
	}

	c.Cookie(&cookie)

	// return c.JSON(user)
	return c.JSON(fiber.Map{
		"token": token,
	})
}
