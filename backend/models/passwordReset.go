package models

// PasswordReset helps user reset password
type PasswordReset struct {
	ID    uint
	Email string
	Token string
}
