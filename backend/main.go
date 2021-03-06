package main

import (
	"notes-reminder-app/database"
	"notes-reminder-app/routes"

	"github.com/gofiber/fiber/v2"
)

func main() {

	database.AuthConnect()

	app := fiber.New()

	routes.Setup(app)

	app.Listen(":8000")
}
