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

// Claims struct for passing for parsing
type Claims struct {
	jwt.StandardClaims
}

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

	// We use userID as the issuer
	claims := jwt.StandardClaims{
		Issuer:    strconv.Itoa(int(user.ID)),
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

// User returns back authenticated user back
func User(c *fiber.Ctx) error {
	cookie := c.Cookies("token")

	// Cookie should have the claims attached to it
	token, err := jwt.ParseWithClaims(cookie, &Claims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte("mysecretkey"), nil
	})

	if err != nil || !token.Valid {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Unauthenticated user",
		})
	}

	claims := token.Claims.(*Claims)

	var user models.User

	// Issuer which was used as userID during Login is used to now fetch data back from DB
	database.DB.Where("id = ?", claims.Issuer).First(&user)

	return c.JSON(user)
}
