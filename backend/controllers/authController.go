package controllers

import (
	"notes-reminder-app/models"

	"github.com/gofiber/fiber/v2"
)

// Register allows users to create an account
func Register(c *fiber.Ctx) error {
	var user models.User

	user.FirstName = "Shef"
	user.LastName = "Shar"
	user.Email = "foo@foo.com"
	user.Password = "pass"

	return c.JSON(user)
}
