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

// CreateNoteBook allows users to create a NoteBook
func CreateNoteBook(c *fiber.Ctx) error {
	user, err := GetCurrentUser(c)

	if err != nil {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Unauthenticated user",
		})
	}

	collection, err := getMongoDbCollection("notesDB", "notebooks")
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

	notes := strings.Split(data["notes"], ",")

	notebook := models.NoteBook{
		Email:       user.Email,
		Name:        data["name"],
		Notes:       notes,
		LastUpdated: time.Now(),
	}

	json.Unmarshal([]byte(c.Body()), &notebook)

	res, err := collection.InsertOne(context.Background(), notebook)
	if err != nil {
		c.Status(500)
		return c.JSON(fiber.Map{
			"message": "Unable to create notebook",
		})
	}

	response, _ := json.Marshal(res)

	return c.Send(response)
}

// EditNoteBook allows adding or deleting notes from a notebook
func EditNoteBook(c *fiber.Ctx) error {
	user, err := GetCurrentUser(c)

	if err != nil {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Unauthenticated user",
		})
	}

	collection, err := getMongoDbCollection("notesDB", "notebooks")

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

	notes := strings.Split(data["notes"], ",")

	notebook := models.NoteBook{
		Email:       user.Email,
		Name:        data["name"],
		Notes:       notes,
		LastUpdated: time.Now(),
	}

	json.Unmarshal([]byte(c.Body()), &notebook)

	filter := bson.M{"name": data["name"], "email": user.Email}

	update := bson.M{
		"$set": notebook,
	}

	res, err := collection.UpdateOne(context.Background(), filter, update)

	if err != nil {
		c.Status(500)
		return c.JSON(fiber.Map{
			"message": "Unable to update notebook",
		})
	}

	response, _ := json.Marshal(res)

	return c.Send(response)
}

// DeleteNoteBook allows a user to remove a notebook
func DeleteNoteBook(c *fiber.Ctx) error {
	user, err := GetCurrentUser(c)

	if err != nil {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Unauthenticated user",
		})
	}

	collection, err := getMongoDbCollection("notesDB", "notebooks")

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

	filter := bson.M{"name": data["name"], "email": user.Email}

	res, err := collection.DeleteOne(context.Background(), filter)

	if err != nil {
		c.Status(500)
		return c.JSON(fiber.Map{
			"message": "Unable to find notebook",
		})
	}

	response, _ := json.Marshal(res)

	return c.Send(response)
}

// GetNoteBook fetches a notebook
func GetNoteBook(c *fiber.Ctx) error {
	user, err := GetCurrentUser(c)

	if err != nil {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Unauthenticated user",
		})
	}

	collection, err := getMongoDbCollection("notesDB", "notebooks")

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

	filter = bson.M{"name": data["name"], "email": user.Email}

	var results []bson.M
	cur, err := collection.Find(context.Background(), filter)
	defer cur.Close(context.Background())

	if err != nil {
		c.Status(500)
		return c.JSON(fiber.Map{
			"message": "Unable to find notebook",
		})
	}

	cur.All(context.Background(), &results)

	if results == nil {
		c.SendStatus(404)
		return c.JSON(fiber.Map{
			"message": "Unable to find notebook",
		})
	}

	response, _ := json.Marshal(results)

	return c.Send(response)
}

// GetNoteBookAll fetches all notebooks for a user
func GetNoteBookAll(c *fiber.Ctx) error {
	user, err := GetCurrentUser(c)

	if err != nil {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Unauthenticated user",
		})
	}

	collection, err := getMongoDbCollection("notesDB", "notebooks")

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
			"message": "Unable to find notebooks",
		})
	}

	cur.All(context.Background(), &results)

	if results == nil {
		c.SendStatus(404)
		return c.JSON(fiber.Map{
			"message": "Unable to find notebooks",
		})
	}

	response, _ := json.Marshal(results)

	return c.Send(response)
}

// var results []primitive.M
// 	for cur.Next(context.Background()) {
// 		var result bson.M
// 		e := cur.Decode(&result)
// 		if e != nil {
// 			c.SendStatus(400)
// 			return c.JSON(fiber.Map{
// 				"message": "Unable to get notebooks",
// 			})
// 		}
// 		delete(result ,"_id")
// 		// fmt.Println("cur..>", cur, "result", reflect.TypeOf(result), reflect.TypeOf(result["_id"]))
// 		results = append(results, result)

// 	}
