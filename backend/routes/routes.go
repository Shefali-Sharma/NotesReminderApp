package routes

import (
	"notes-reminder-app/controllers"

	"github.com/gofiber/fiber/v2"
)

// Setup function to start User registration
func Setup(app *fiber.App) {
	app.Post("/api/register", controllers.Register)
	app.Post("/api/login", controllers.Login)
}
