package main

import (
	"notes-reminder-app/database"
	"notes-reminder-app/routes"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {

	database.AuthConnect()

	app := fiber.New()

	// To allow different ports of frontend and backend - brower will block that.
	// In order to prevent the blocking, we enable CORS (Cross Origin Resource Sharing)
	// We set AllowCredentials to true, so that the frontend will be able to access the cookies that we pass from backend
	app.Use(cors.New(cors.Config{
		AllowCredentials: true,
	}))

	routes.Setup(app)

	app.Listen(":8000")
}
