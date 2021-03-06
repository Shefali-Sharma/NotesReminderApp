package controllers

import (
	"math/rand"
	"net/smtp"
	"notes-reminder-app/credentials"
	"notes-reminder-app/database"
	"notes-reminder-app/models"

	"github.com/gofiber/fiber/v2"
	"golang.org/x/crypto/bcrypt"
)

// Forgot updates the password_resets table
func Forgot(c *fiber.Ctx) error {
	var data map[string]string

	err := c.BodyParser(&data)

	if err != nil {
		return err
	}

	token := RunesRandString(12)

	passwordReset := models.PasswordReset{
		Email: data["email"],
		Token: token,
	}

	database.DB.Create(&passwordReset)

	var creds credentials.AuthCreds
	creds.GetCreds()

	from := creds.Email
	password := creds.Password

	to := []string{
		data["email"],
	}

	url := string("http://localhost:3000/reset/" + token)

	message := `Subject: Password Reset for Notes App!

				Click on the link below to reset the password: 
				<a href="` + url + `"></a>
				`

	smtpServer := models.SMTPServer{
		Host: "smtp.gmail.com",
		Port: "587",
	}

	auth := smtp.PlainAuth("", from, password, smtpServer.Host)

	err = smtp.SendMail(smtpServer.AddressUpdate(), auth, from, to, []byte(message))

	if err != nil {
		return c.JSON(fiber.Map{
			"message": "Unable to reset password.",
		})
	}

	return c.JSON(fiber.Map{
		"message": "An email has been sent for resetting the password. \n Please check your spam folder if you do not see the email in your inbox!",
	})
}

// Reset is used for resetting password for user
func Reset(c *fiber.Ctx) error {
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

	var passwordReset = models.PasswordReset{}

	if err := database.DB.Where("token = ?", data["token"]).Last(&passwordReset); err.Error != nil {
		c.Status(400)
		return c.JSON(fiber.Map{
			"messgae": "Invalid Token!",
		})
	}

	password, _ := bcrypt.GenerateFromPassword([]byte(data["password"]), 14)

	database.DB.Model(&models.User{}).Where("email = ?", passwordReset.Email).Update("password", password)

	return c.JSON(fiber.Map{
		"message": "Password reset successful",
	})

}

// RunesRandString generate random runes characters of length n
func RunesRandString(n int) string {
	// Slice with all the characters from a-z and A-Z. Rune is a int32 used for representing character constant
	var letterRunes = []rune("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")

	b := make([]rune, n)
	for i := range b {
		b[i] = letterRunes[rand.Intn(len(letterRunes))]
	}

	return string(b)
}
