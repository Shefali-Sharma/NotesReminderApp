package controllers

import (
	"context"
	"encoding/json"
	"notes-reminder-app/models"
	"strings"
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

	subject := c.Params("subject")

	if strings.Contains(subject, "%20") {
		splitArr := strings.Split(subject, "%20")
		others := ""

		for _, sarr := range splitArr {
			if others == "" {
				others = sarr
			} else {
				others = others + " " + sarr
			}

		}
		subject = others
	}

	filter := bson.M{"subject": subject, "email": user.Email}

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

	subject := c.Params("subject")

	if strings.Contains(subject, "%20") {
		splitArr := strings.Split(subject, "%20")
		others := ""

		for _, sarr := range splitArr {
			if others == "" {
				others = sarr
			} else {
				others = others + " " + sarr
			}

		}
		subject = others
	}

	filter = bson.M{"subject": subject, "email": user.Email}

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

// GetNoteFilter returns only the notes asked for
func GetNoteFilter(c *fiber.Ctx) error {
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

	notes := strings.Split(c.Params("notes"), "-")
	updatedNotes := make([]string, len(notes))

	for _, singleNote := range notes {
		subject := singleNote

		if strings.Contains(subject, "%20") {
			splitArr := strings.Split(subject, "%20")
			var others string

			for _, sarr := range splitArr {
				if others == "" {
					others = sarr
				} else {
					others = others + " " + sarr
				}

			}

			updatedNotes = append(updatedNotes, others)

		}

	}

	var filter bson.M = bson.M{}

	filter = bson.M{"subject": bson.M{"$in": updatedNotes}, "email": user.Email}

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
