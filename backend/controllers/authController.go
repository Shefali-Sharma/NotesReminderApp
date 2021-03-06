package controllers

import "github.com/gofiber/fiber/v2"

// HelloWorld func for testing
func HelloWorld(c *fiber.Ctx) error {
	return c.SendString("Hello, World !")
}
