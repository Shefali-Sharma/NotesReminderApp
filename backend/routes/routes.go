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
	app.Post("/api/reset", controllers.Reset)

	app.Post("/api/note", controllers.CreateNote)
	app.Put("/api/note", controllers.EditNote)
	app.Delete("/api/note/:subject", controllers.DeleteNote)
	app.Get("/api/note/:subject", controllers.GetNote)
	app.Get("/api/noteall", controllers.GetNoteAll)
	app.Get("/api/notefilter/:notes", controllers.GetNoteFilter)

	app.Post("/api/notebook", controllers.CreateNoteBook)
	app.Put("/api/notebook", controllers.EditNoteBook)
	app.Delete("/api/notebook", controllers.DeleteNoteBook)
	app.Get("/api/notebook", controllers.GetNoteBook)
	app.Get("/api/notebookall", controllers.GetNoteBookAll)

}
