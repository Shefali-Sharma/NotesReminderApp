package controllers

import (
	"math/rand"
	"net/smtp"
	"notes-reminder-app/credentials"
	"notes-reminder-app/database"
	"notes-reminder-app/models"

	"github.com/gofiber/fiber/v2"
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

	url := "http://localhost:3000/reset/" + token

	message := "Click <a href=\"" + url + "\"> here </a> to reset your password! >"

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
		"message": "Password reset successfully",
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
