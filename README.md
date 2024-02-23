# PanPal

PanPal is a mobile application built with React Native to offer a wide range of cooking recipes.

## Features

- **Home Page:** The main landing page features a search bar and ingredient-based recipe suggestions across different categories.
- **Favorites Page:** Allows users to keep track of their favorite recipes for easy access.
- **Categories Page:** Displays all available recipe categories, letting users filter recipes based on their preferences.
- **Search Page:** Provides a search functionality to find recipes by name.
- **Recipe Page:** Detailed view of each recipe, including image, name, nutrients, preparation & cooking times, ratings, difficulty, serves, description, ingredients, and the cooking process.
- **Info Page:** Contains information about the developer and the app.

![](preview/preview.gif)

## Getting Started

### Prerequisites

- Node.js
- npm or Yarn
- React Native environment setup (refer to the official React Native documentation for guidance)
- MongoDB database setup

### Installation

1. Clone this repository.
    ```sh
    git clone https://github.com/yourusername/PanPal.git
    ```
2. Navigate to the project directory and install dependencies.
    ```sh
    cd PanPal
    npm install
    ```
3. Start the React Native development server.
    ```sh
    npx expo start
    ```
4. Scan the QR code to run the app on Expo Go or run it on your browser by click W button.

### Backend Setup

The backend for this app is built with Node.js and Express.js, with recipes stored in a MongoDB database.

Backend Repository: [PanPal Backend](https://github.com/MohamadHajjRabee/PanPal-backend)

### Testing the App

To test the app, you can download the pre-built APK from the link below or build it yourself using EAS.

- [Download APK](https://expo.dev/artifacts/eas/sepaK43fbWXtohfwXXexvU.apk)

## Acknowledgments

- Recipes and images sourced from a dataset available on [Kaggle](https://www.kaggle.com/datasets/crispen5gar/recipes3k), originally collected from BBC Good Food.
- React Native and Expo to build the app.
- Node.js and Express.js for the backend development.
- MongoDB and Mongoose for database management.
