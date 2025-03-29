# JourneyStay

JourneyStay is a web-based platform for travelers to find and book accommodations. The application allows users to browse listings,view maps, and interact with a user-friendly interface.

## 🌟 Features
- 🏠 **Accommodation Listings** – Browse and view available stays.
- 🔐 **User Authentication** – Secure login and signup system.
- 💬 **Flash Messages** – Instant notifications for actions.
- 🔄 **Session Management** – Secure session storage using MongoDB.

## 🛠️ Tech Stack
- **Frontend:** HTML, CSS, EJS, JavaScript
- **Backend:** Node.js, Express.js, MongoDB, Passport.js
- **Authentication:** Passport.js with Local Strategy
- **Session Storage:** connect-mongo

## 📂 Project Structure
```
JourneyStay/
│── models/                # Mongoose models
│── public/                # Static files (CSS, JS, Images)
│── routes/                # Express routes
│── views/                 # EJS templates
│── utils/                 # Utility functions
│── .env                   # Environment variables (not included in repo)
│── app.js                 # Main application file
│── package.json           # Dependencies and scripts
```

## 🚀 Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/JourneyStay.git
   cd JourneyStay
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**
   Create a `.env` file in the root directory and add the following:
   ```env
   PORT=10000
   ATLAS_DB_URL=mongodb+srv://your-mongo-url
   SESSION_SECRET=your-secret-key
   NODE_ENV=development
   ```

4. **Run the Application**
   ```bash
   npm start
   ```
   The app will be live at: [http://localhost:10000](http://localhost:10000)

## 🔧 Usage
- Register/Login to create listing of your property.
- View others properties.

## 📜 Routes
| Method | Route                | Description |
|--------|----------------------|-------------|
| GET    | `/`                  | Home Page |
| GET    | `/listings`          | View Listings |
| GET    | `/listings/:id`      | View Listing Details |
| POST   | `/listings`          | Create New Listing |
| GET    | `/my-bookings`       | View User Bookings |
| GET    | `/profile`           | View User Profile |
| GET    | `/settings`          | User Settings |

## 🐞 Error Handling
- Uses a global error handler to catch and display errors properly.
- Flash messages provide user-friendly notifications.

## 🛡️ Security Considerations
- Sessions stored securely with MongoDB.
- Passwords hashed using Passport.js.
- Prevents unauthorized access to protected routes.

## 🤝 Contributing
Contributions are welcome! If you’d like to improve this project:
1. Fork the repository.
2. Create a new branch (`feature/your-feature`).
3. Commit your changes.
4. Push to your fork.
5. Create a Pull Request.

## 📄 License
This project is licensed under the MIT License.

---
🚀 **JourneyStay – Making travel stays easier and better!**
