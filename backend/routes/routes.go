package routes

import (
	"notes-reminder-app/controllers"

	"github.com/gofiber/fiber/v2"
)

// Setup starts the helloWorld function
func Setup(app *fiber.App) {
	app.Get("/", controllers.HelloWorld)
}
