# Short URL API

Short URL API is a simple web application that allows users to shorten long URLs and generate corresponding QR codes. It provides an interface for users to input a long URL, which then generates a unique short URL along with a QR code for easy sharing.

## Production Demo
Check out [the production demo of the Short URL API here](https://url-shortener-dgw5.onrender.com/)

## Features

- Shorten long URLs to generate a unique short URL.
- Generate QR codes for shortened URLs.
- View a list of shortened URLs along with their corresponding long URLs and QR codes.
- Persist shortened URL data using browser cookies.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- Shortid
- QRCode
- EJS (Embedded JavaScript)

## Installation

### Prerequisites
- Node.js installed on your machine
- MongoDB installed and running locally or a remote MongoDB URI

### Steps

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Create a .env file in the root directory of the project.
   - Define the following environment variables in the .env file:
   ```bash
   MONGODB_URI=your-mongodb-uri
   ```
4. Start the server:
   ```bash
   npm start
   ```
   - Access the application at http://localhost:3500 in your web browser.

## Usage
- Enter a long (Full) URL into the input field on the homepage.
- Click the "Shorten URL" button to generate a short URL and QR code.
- The shortened URL and QR code will be displayed below the input field.
   
