package controllers

import (
	"notes-reminder-app/database"
	"notes-reminder-app/models"

	"github.com/dgrijalva/jwt-go"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/mongo"
)

// GetCurrentUser returns value of current user or error if the user is not logged in
func GetCurrentUser(c *fiber.Ctx) (models.User, error) {
	var user models.User

	cookie := c.Cookies("token")

	// Cookie should have the claims attached to it
	token, err := jwt.ParseWithClaims(cookie, &Claims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte("mysecretkey"), nil
	})

	if err != nil || !token.Valid {
		c.Status(400)
		return user, c.JSON(fiber.Map{
			"message": "Unauthenticated user",
		})
	}

	claims := token.Claims.(*Claims)

	// Issuer which was used as userID during Login is used to now fetch data back from DB
	database.DB.Where("id = ?", claims.Issuer).First(&user)

	return user, nil
}

// getMongoDbCollection returns mongoDB collection for the Database notesDB
func getMongoDbCollection(DBName string, CollectionName string) (*mongo.Collection, error) {

	collection := database.MongoDB.Database(DBName).Collection(CollectionName)

	return collection, nil
}
