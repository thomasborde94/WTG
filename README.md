# What's the Game? (WTG)

This project is a web application that helps users discover and track video games they might enjoy. It allows users to browse games, filter them by platform or genre, and like their favorites. The application has both a frontend and a backend component.

## Features

- **Game Browsing**: Browse a vast collection of video games with filtering options, and get the link to the available stores.
- **User Accounts**: Users can create accounts, log in, and manage their liked games.
- **Platform and Genre Filters**: Filter games by platform or genre, or view all games.
- **Like Games**: Users can like games, which are saved to their profiles.

## Technologies

- **Frontend**: React with TypeScript, Chakra UI
- **Backend**: Node.js, Express, PostgreSQL
- **State Management**: React Context API for managing user authentication and liked games

## Installation

### Prerequisites

- Node.js (v14+)
- PostgreSQL (v12+)

### Clone the Repository

```bash
git clone https://github.com/thomasborde94/WTG.git
```

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure the `.env` file with your database credentials.

4. Go back to root and start the server:

   ```bash
   nodemon server
   ```

### Frontend Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

## Usage

Once both the frontend and backend servers are running, open your browser and navigate to the url provided by the front server to access the application.

## Contact

For any inquiries, please contact me at [thomas.borde944@gmail.com](mailto:your-email@example.com).

---
