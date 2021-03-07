package models

// PasswordReset helps user reset password
type PasswordReset struct {
	ID    uint
	Email string `json:"email"`
	Token string `json:"token"`
}

// SMTPServer used for sending emails for password reset
type SMTPServer struct {
	Host string
	Port string
}

// AddressUpdate concatenates host with port
func (s *SMTPServer) AddressUpdate() string {
	return s.Host + ":" + s.Port
}
