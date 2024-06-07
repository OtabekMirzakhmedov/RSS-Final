# Project Name

eCommerce Application Online-Shop

## Description

The application is powered by CommerceTools 🌐, a leading provider of commerce solutions for B2C and B2B enterprises.
In our SPA application users can browse through products (furniture items), view detailed descriptions, add their favorite items to the basket, and proceed to checkout. It includes features such as user registration and login, product search, product categorization, and sorting.

### Key pages in the application include:

Login and Registration pages
Main page
Catalog Product page
Detailed Product page
User Profile page
Basket page
About Us page

## Technology stack

This application is developed using:
React framework
Vite bundler
Typescript
Vitest for testing application functionality
Prettier and Eslint for linting
Husky
SCSS
Material ui

## Prerequisites

Use Node.js 20.x or higher and package manager npm.

## Installation

Step-by-step installation instructions to set up the project locally:

1. Clone the repository to your local machine:
   git clone https://github.com/OtabekMirzakhmedov/RSS-Final.git

2. Go to the branch "develop":

   git checkout develop

3. Install the project dependencies using your preferred package manager:

- Using npm:
  npm install

**Note!** The project runs on the version Node.js 20.11.1.

4. Run the project locally:

- Using npm:
  npm run dev

## Project Structure

The project's directory structure is organized in the following way:

- **src/**: This folder contains the source code for the project.

  - **components/**: Stores all reusable React components.
  - **pages/**: Houses the main application pages and associated components.
  - **utils/**: Contains utility functions, helpers, and constants used across the application.
  - **styles/**: Holds global style files, SCSS or styled components, and theme-related configurations.
  - **api/**: Contains API-related configurations, service wrappers, and constants for making network requests.
  - **features/**: Organizes application features into separate sub-folders (e.g., authentication, user profile).

- **public/**: Contains the public assets, such as favicon, images, and other static files served by the application.

- **tests/**: Stores test files and configurations for unit tests, integration tests, and end-to-end tests.

- **.github/**: Houses any GitHub-specific templates, workflows, and configurations for GitHub Actions.

- **dist/**: The build output from Vite when the project is compiled and bundled for production deployment.

## Scripts

#### `npm run dev`

Description: Run the project using the development server.

#### `npm run build`

Description: Build the project for production transpiling TypeScript code and generating a production-ready build of the application in a single command.

#### `npm run lint`

Description: Run ESLint to check for code quality and formatting issues.

#### `npm run lint:fix`

Description: Run ESLint on the entire project directory and its subdirectories, targeting files with .ts and .tsx extensions and attempt to automatically fix any fixable issues found in the code.

#### `npm run format`

Description: Use Prettier to apply the necessary formatting changes directly to the files, modifying them in place.

#### `npm run ci:format`

Description: Use Prettier to check the formatting of all TypeScript and TypeScript JSX files within the src directory without actually modifying them. It enables the verification of code formatting before code gets merged, built, or deployed.

#### `npm run preview`

Description: Launch a development server to serve the Vite project and allows developers to preview the application in a local web browser.
**Note** You need to use `npm run build` before this script. Preview will always preview the latest build, and will not update automatically when code changes.

#### `npm run test`

Description: Execute the "vitest" tool for running tests in the project.

#### `npm run prepare`

Description: Initialize the "husky" package, configuring and setting up Git hooks according to the project's defined configuration, ensuring that the defined hooks are in place and ready to be used during development.
