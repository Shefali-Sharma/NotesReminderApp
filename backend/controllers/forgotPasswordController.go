package controllers

import (
	"math/rand"
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
