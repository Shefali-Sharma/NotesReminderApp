package controllers

import (
	"context"
	"encoding/json"
	"fmt"
	"notes-reminder-app/database"
	"notes-reminder-app/models"

	"github.com/dgrijalva/jwt-go"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

// CreateNote allows users to create a Note
func CreateNote(c *fiber.Ctx) error {
	user, err := GetCurrentUser(c)

	if err != nil {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Unauthenticated user",
		})
	}

	collection, err := getMongoDbCollection("notes")
	if err != nil {
		c.Status(500)
		return c.JSON(fiber.Map{
			"message": "Unable to connect to NotesDB",
		})
	}

	var data map[string]string

	err = c.BodyParser(&data)

	if err != nil {
		return err
	}

	note := models.Note{
		Subject: data["subject"],
		Content: data["content"],
		Email:   user.Email,
	}

	json.Unmarshal([]byte(c.Body()), &note)

	res, err := collection.InsertOne(context.Background(), note)
	if err != nil {
		c.Status(500)
		return c.JSON(fiber.Map{
			"message": "Unable to create note",
		})
	}

	fmt.Println(res)

	response, _ := json.Marshal(res)

	return c.Send(response)
}

// EditNote allows updating content of a given note
func EditNote(c *fiber.Ctx) error {
	user, err := GetCurrentUser(c)

	if err != nil {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Unauthenticated user",
		})
	}

	collection, err := getMongoDbCollection("notes")

	if err != nil {
		c.Status(500)
		return c.JSON(fiber.Map{
			"message": "Unable to connect to NotesDB",
		})
	}

	var data map[string]string

	err = c.BodyParser(&data)

	if err != nil {
		return err
	}

	note := models.Note{
		Subject: data["subject"],
		Content: data["content"],
		Email:   user.Email,
	}

	json.Unmarshal([]byte(c.Body()), &note)

	filter := bson.M{"subject": data["subject"]}

	update := bson.M{
		"$set": note,
	}

	res, err := collection.UpdateOne(context.Background(), filter, update)

	if err != nil {
		c.Status(500)
		return c.JSON(fiber.Map{
			"message": "Unable to update note",
		})
	}

	response, _ := json.Marshal(res)

	return c.Send(response)
}

func DeleteNote(c *fiber.Ctx) error {
	user, err := GetCurrentUser(c)

	if err != nil {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Unauthenticated user",
		})
	}

	return c.JSON(user)
}

// GetNote fetches note that user is searching
func GetNote(c *fiber.Ctx) error {
	_, err := GetCurrentUser(c)

	if err != nil {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Unauthenticated user",
		})
	}

	collection, err := getMongoDbCollection("notes")

	if err != nil {
		c.Status(500)
		return c.JSON(fiber.Map{
			"message": "Unable to connect to NotesDB",
		})
	}

	var filter bson.M = bson.M{}

	var data map[string]string

	err = c.BodyParser(&data)

	if err != nil {
		return err
	}

	filter = bson.M{"subject": data["subject"]}

	var results []bson.M
	cur, err := collection.Find(context.Background(), filter)
	defer cur.Close(context.Background())

	if err != nil {
		c.Status(500)
		return c.JSON(fiber.Map{
			"message": "Unable to find note",
		})
	}

	cur.All(context.Background(), &results)

	if results == nil {
		c.SendStatus(404)
		return c.JSON(fiber.Map{
			"message": "Unable to find note",
		})
	}

	response, _ := json.Marshal(results)

	return c.Send(response)
}

func GetNoteAll(c *fiber.Ctx) error {
	user, err := GetCurrentUser(c)

	if err != nil {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Unauthenticated user",
		})
	}

	return c.JSON(user)
}

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

func getMongoDbCollection(CollectionName string) (*mongo.Collection, error) {

	collection := database.MongoDB.Database("notesDB").Collection(CollectionName)

	return collection, nil
}
