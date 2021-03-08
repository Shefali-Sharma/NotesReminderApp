package database

import (
	"notes-reminder-app/models"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

// DB is connection with PostgresSQL which stores User authentication information
var DB *gorm.DB

// AuthConnect is used for establishing connection with Auth Database
func AuthConnect() {
	dsn := "host=awsdatabaseinstance.cnakzmbnm6pj.us-east-1.rds.amazonaws.com user=postgres password=root1234 dbname=awsdatabase port=5432 sslmode=disable"
	connection, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		panic("Could not connect to authDatabase")
	}

	DB = connection

	connection.AutoMigrate(&models.User{}, &models.PasswordReset{})

}
