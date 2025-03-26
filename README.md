# E-Commerce Website

## Project Overview
This is a fully functional e-commerce web application built using modern web technologies. The project includes user authentication, product management, shopping cart functionality, and order processing.

## Technologies Used
- **Frontend:** HTML, CSS, JavaScript, Bootstrap, EJS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** Passport.js

## Features
- User authentication (login, register, logout)
- Product listing and details page
- Shopping cart functionality
- Checkout process
- Admin panel for managing users, products and orders
- Responsive design

## Installation

### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

### Steps to Run the Project
1. Clone the repository:
   ```bash
   git clone https://github.com/faridramyy/e-commerce.git
   ```
2. Navigate to the project directory:
   ```bash
   cd e-commerce
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up environment variables:
   Create a `.env` file in the root directory and add the necessary environment variables:
   ```env
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   SESSION_SECRET=your_secret_key
   ```
5. Start your MongoDB server or use MongoDB Compass

6. Run the application:
   ```bash
   npm start
   ```
7. Open your browser and visit:
   ```
   http://localhost:3000
   ```

## Folder Structure
```
/ecommerce-project
│── /public         # Static files (CSS, JS, Images)
│── /views          # EJS templates
│── /routes         # Express routes
│── /models         # Database models (MongoDB)
│── /controllers    # Business logic
│── index.js        # Main server file
│── package.json    # Project dependencies
│── .env            # Environment variables
```

## Contributing
If you would like to contribute, please fork the repository and submit a pull request.

## License
This project is licensed under the MIT License.

## Contact
For any inquiries, feel free to reach out:
- Email: faridramy2003@gmail.com
- LinkedIn: [Farid Francis](https://www.linkedin.com/in/farid-francis-a78a201a1/)

