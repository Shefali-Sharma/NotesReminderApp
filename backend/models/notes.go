package models

import "time"

// Note Schema
type Note struct {
	ID          uint      `json:"id"`
	Email       string    `json:"email"`
	Subject     string    `json:"subject"`
	Content     string    `json:"content"`
	LastUpdated time.Time `json:"lastupdated"`
}

// NoteBook Schema consists a list of Notes
type NoteBook struct {
	ID          uint      `json:"id"`
	Email       string    `json:"email"`
	Name        string    `json:"name"`
	Notes       []string  `json:"notes"`
	LastUpdated time.Time `json:"lastupdated"`
}
