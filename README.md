# Campus Connect Backend API

Welcome to the Campus Connect Backend API repository. For detailed installation instructions, please refer to the Installation Guide.

## Overview

This repository contains the backend API for the Campus Connect project. The API is built using Node.js and Express, and it connects to a MongoDB database. It also utilizes Socket.IO for real-time communication and other technologies to enhance functionality.

## Technologies Used

- **Node.js**: JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express**: Fast, unopinionated, minimalist web framework for Node.js.
- **MongoDB**: NoSQL database for storing application data.
- **JWT (JSON Web Tokens)**: For secure authentication.
- **dotenv**: Loads environment variables from a `.env` file into `process.env`.
- **cloudinary**: Cloud-based image and video management service.
- **cors**: Middleware to enable Cross-Origin Resource Sharing.
- **multer**: Middleware for handling `multipart/form-data`, used for file uploads.


# Installation Guide

## Prerequisites

Before you begin, ensure you have met the following requirements:
- You have installed Node.js (version 14 or higher).
- You have a Git client installed.
- You have a code editor like Visual Studio Code.

## Installation

To install the project, follow these steps:

1. **Fork the repository**:
    - Go to the repository on GitHub.
    - Click the "Fork" button at the top right of the page.

2. **Clone your forked repository**:
    ```bash
    git clone https://github.com/your-username/your-forked-repository.git
    ```

3. **Navigate to the project directory**:
    ```bash
    cd your-forked-repository
    ```

4. **Install dependencies**:
    ```bash
    npm install
    ```

5. **Create a `.env` file**:
    - Copy the `.env.sample` file to `.env`:
      ```bash
      cp .env.sample .env
      ```
    - Open the `.env` file and replace the placeholder values with your actual URI and keys.
    - Example:
    ```plaintext
    PORT=3000
    MONGODB_URI=mongodb://localhost:27017/campus-connect
    NODE_ENV=development
    CORS_ORIGIN=http://localhost:3000
    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
    ```

6. **Set up Cloudinary**:
    - Follow the [Cloudinary Node.js SDK Quick Start Guide](https://cloudinary.com/documentation/node_quickstart) to set up and configure Cloudinary.

7. **Set up MongoDB Atlas**:
    - Follow the [MongoDB Atlas Getting Started Guide](https://www.mongodb.com/docs/atlas/getting-started/) to create a cluster, configure network access, and connect to your database.
8. **Change the database name in `constants.js`**:
    - Open the `constants.js` file in your code editor.
    - Locate the line that defines the database name:
      ```javascript
      export const DB_NAME = "campus-connect";
      ```
    - Change `"campus-connect"` to your desired database name:
      ```javascript
      export const DB_NAME = "your-database-name";
      ```


## Usage

To run the project, follow these steps:

1. **Start the development server**:
    ```bash
    npm run dev
    ```

2. Open your browser and navigate to `http://localhost:8000` if you haven't setup the PORT on .env or change the 8000 with your PORT.


## API Endpoints

For detailed information on the API endpoints, please refer to the [Postman Documentation](https://documenter.getpostman.com/view/29626575/2sA3s9BnVx)

