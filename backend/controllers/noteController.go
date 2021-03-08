package controllers

import (
	"context"
	"encoding/json"
	"notes-reminder-app/models"
	"time"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
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

	collection, err := getMongoDbCollection("notesDB", "notes")
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
		Subject:     data["subject"],
		Content:     data["content"],
		Email:       user.Email,
		LastUpdated: time.Now(),
	}

	json.Unmarshal([]byte(c.Body()), &note)

	res, err := collection.InsertOne(context.Background(), note)
	if err != nil {
		c.Status(500)
		return c.JSON(fiber.Map{
			"message": "Unable to create note",
		})
	}

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

	collection, err := getMongoDbCollection("notesDB", "notes")

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
		Subject:     data["subject"],
		Content:     data["content"],
		Email:       user.Email,
		LastUpdated: time.Now(),
	}

	json.Unmarshal([]byte(c.Body()), &note)

	filter := bson.M{"subject": data["subject"], "email": user.Email}

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

// DeleteNote allows user to remove a note
func DeleteNote(c *fiber.Ctx) error {
	user, err := GetCurrentUser(c)

	if err != nil {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Unauthenticated user",
		})
	}

	collection, err := getMongoDbCollection("notesDB", "notes")

	if err != nil {
		c.Status(500)
		return c.JSON(fiber.Map{
			"message": "Unable to connect to NotesDB",
		})
	}

	filter := bson.M{"subject": c.Params("subject"), "email": user.Email}

	res, err := collection.DeleteOne(context.Background(), filter)

	if err != nil {
		c.Status(500)
		return c.JSON(fiber.Map{
			"message": "Unable to find note",
		})
	}

	response, _ := json.Marshal(res)

	return c.Send(response)
}

// GetNote fetches note that user is searching
func GetNote(c *fiber.Ctx) error {
	user, err := GetCurrentUser(c)

	if err != nil {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Unauthenticated user",
		})
	}

	collection, err := getMongoDbCollection("notesDB", "notes")

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

	filter = bson.M{"subject": data["subject"], "email": user.Email}

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

// GetNoteAll fetches all notes for a user
func GetNoteAll(c *fiber.Ctx) error {
	user, err := GetCurrentUser(c)

	if err != nil {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Unauthenticated user",
		})
	}

	collection, err := getMongoDbCollection("notesDB", "notes")

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

	filter = bson.M{"email": user.Email}

	queryOptions := options.FindOptions{}
	queryOptions.SetSort(bson.M{"lastupdated": -1})

	var results []bson.M
	cur, err := collection.Find(context.Background(), filter, &queryOptions)

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
