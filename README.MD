

# Journal App

A Next.js application for creating and joining journals with unique codes. This app ensures secure user authentication and smooth navigation between journal rooms.

---

## Features

- **User Authentication**: Secure login and profile fetching with token-based authentication.
- **Create Journal**: Generate unique journal codes to start a new session.
- **Join Journal**: Join an existing journal using a valid code.
- **Error Handling**: Displays user-friendly error messages for failed actions.
- **Responsive UI**: Fully responsive design powered by Tailwind CSS.

---

## Technologies Used

- **Frontend**: Next.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **State Management**: React Hooks

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/journal-app.git
   cd journal-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```env
     MONGO_URI=<your-mongodb-connection-string>
     JWT_SECRET=<your-jwt-secret>
     ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Access the app at `http://localhost:3000`.

---

## API Endpoints

### User Routes

- **GET /api/user/profile**
  - Retrieves user profile information based on the token.

### Journal Routes

- **POST /api/journal/create-code**
  - Creates a new journal code.

- **POST /api/journal/join-code**
  - Joins an existing journal using a code.

---

## Folder Structure

```plaintext


---

## Future Enhancements

- Add user roles and permissions.
- Implement email notifications for journal updates.
- Add real-time collaboration using WebSockets.
- Introduce analytics to track journal activity.

---

## Contributing

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Make your changes and commit:
   ```bash
   git commit -m "Add feature-name"
   ```
4. Push your branch and create a pull request:
   ```bash
   git push origin feature-name
   ```

---

## License

This project is licensed under the [MIT License](LICENSE).

---

Let me know if you'd like any changes or more details added! 🚀