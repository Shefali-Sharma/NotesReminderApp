package routes

import (
	"notes-reminder-app/controllers"

	"github.com/gofiber/fiber/v2"
)

// Setup function to initialize routes for different operations
func Setup(app *fiber.App) {
	app.Post("/api/register", controllers.Register)
	app.Post("/api/login", controllers.Login)
	app.Get("/api/user", controllers.User)
	app.Post("/api/logout", controllers.Logout)
	app.Post("/api/forgot", controllers.Forgot)
}
