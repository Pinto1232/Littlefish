# Littlefish E-commerce Platform

Littlefish is a full-stack e-commerce platform where users can browse and purchase various products. This README provides detailed instructions on setting up and running the application, including necessary API keys and configuration details.

## Table of Contents

- [Overview](#overview)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Running the Application](#running-the-application)
- [Configuration Details](#configuration-details)
- [Architectural Choices](#architectural-choices)
- [Core Requirements](#core-requirements)
- [Challenges Faced](#challenges-faced)

## Overview

Littlefish is designed to provide a seamless shopping experience for users. The backend handles user authentication, product management, and category filtering, while the frontend offers a user-friendly interface for browsing products, filtering by categories, and making purchases.

## Technologies Used

### Backend

- **Language**: JavaScript/TypeScript
- **Framework**: Node.js with Express.js
- **Database**: MongoDB

### Frontend

- **Language**: TypeScript
- **Framework**: React.js
- **Build Tool**: Vite.js

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Git

### Clone the Repository

### Install Dependencies

#### Backend

bash cd packages/backend yarn add

#### Frontend

bash cd packages/frontend yarn add

## Running the Application

### Backend

1. Start MongoDB server.
2. Create a `.env` file in the `packages/backend` directory with the following content:

env MONGO_URI=mongodb://localhost:27017/littlefish JWT_SECRET=your_jwt_secret
### url: http://localhost:27017/'mongodb+srv://pintomanuel:ORuhfFxC7EzA2qYL@LittleFishStoreDB.iqcsto9.mongodb.net/LittleFishStoreDB?retryWrites=true&w=majority

3. Start the backend server:

bash cd packages/backend yarn dev

### Frontend

1. Start the frontend development server:

bash cd packages/frontend dev run dev

## Configuration Details

- **MongoDB URI**: Set in the `.env` file as `MONGO_URI`.
- **JWT Secret**: Set in the `.env` file as `JWT_SECRET`.
### JWT_SECRET='7250tMOsVrTyZS251L9LH9mwZ72jCDxtsaOS1xM3G3M=',

## Architectural Choices

- **Separation of Concerns**: The project is divided into backend and frontend directories to maintain a clear separation of concerns.
- **Scalability**: The use of Node.js and MongoDB ensures that the application can handle a large number of concurrent users and data.
- **Type Safety**: TypeScript is used on both the frontend and backend to catch errors early and improve code quality.

## Core Requirements

- **User Authentication**: Implemented using JWT for secure authentication.
- **Product Management**: CRUD operations for products are handled by the backend.
- **Category Filtering**: Users can filter products by categories on the frontend.

## Challenges Faced

- **State Management**: Managing state across different components in the frontend was challenging. This was addressed by using React's Context API.
- **Database Schema Design**: Designing a flexible and efficient schema for products and categories required careful planning.
- **Performance Optimization**: Ensuring fast load times and smooth interactions on the frontend required optimization techniques like code splitting and lazy loading.

## Conclusion

Littlefish aims to provide a robust and user-friendly e-commerce platform. By following the setup instructions and understanding the architectural choices, you can easily get the application up and running. If you encounter any issues, feel free to open an issue on the GitHub repository.
