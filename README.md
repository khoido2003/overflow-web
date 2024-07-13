# Code Overflow

<div align="center">
  <img src="https://code-overflow-vn.vercel.app/assets/logo.svg" alt="Code Overflow Icon" width="100">
</div>

<div align="center">
  <img src="https://img.shields.io/badge/Code-Node.js-informational?style=flat&color=informational&logo=node.js">
  <img src="https://img.shields.io/badge/Code-Next.js-informational?style=flat&color=informational&logo=next.js">
  <img src="https://img.shields.io/badge/Code-React-informational?style=flat&color=informational&logo=react">
  <img src="https://img.shields.io/badge/Style-Tailwind%20CSS-informational?style=flat&color=informational&logo=tailwind-css">
  <img src="https://img.shields.io/badge/ORM-Prisma-informational?style=flat&color=success&logo=prisma">
  <img src="https://img.shields.io/badge/Database-PostgreSQL-informational?style=flat&color=success&logo=postgresql">
  <img src="https://img.shields.io/badge/Authentication-Auth.js-informational?style=flat&color=success&logo=auth0">
  <img src="https://img.shields.io/badge/Language-TypeScript-informational?style=flat&color=blue&logo=typescript">
</div>

Welcome to Code Overflow, a modern platform inspired by Stack Overflow, designed to help developers ask and answer coding questions efficiently. This project leverages cutting-edge web technologies to deliver a seamless, user-friendly experience.

## Table of Contents

- Project Overview
- Features
- Tech Stack
  - Frontend
  - Backend
- Installation
  - Prerequisites
  - Frontend Setup
  - Backend Setup
- Usage
- Contributing
- License

## Project Overview

Code Overflow aims to be a comprehensive Q&A platform for developers. Users can post questions, provide answers, engage in discussions, and vote on the best solutions. Our platform is built to encourage user engagement and foster a collaborative environment among developers.

## Features

- **User Authentication and Authorization:** Secure login and registration.
- **Question and Answer Management:** Post, edit, and delete questions and answers.
- **Voting and Commenting:** Upvote and downvote answers, and add comments.
- **Tagging System:** Categorize questions with relevant tags.
- **User Profiles:** Track user activities and contributions.
- **Responsive Design:** Optimized for both mobile and desktop views.
- **Image Uploading:** Easily upload and manage images.

## Tech Stack

### Frontend

- **Next.js:** A React framework for server-side rendering and static site generation.
- **React:** A JavaScript library for building user interfaces.
- **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
- **Auth.js:** A library for secure authentication.
- **TypeScript:** A typed superset of JavaScript for better code quality and maintainability.
- **TanStack Query:** A powerful data fetching and state management library.

### Backend

- **Express.js:** A web application framework for Node.js.
- **Node.js:** A JavaScript runtime for server-side development.
- **Prisma:** An ORM for interacting with PostgreSQL.
- **PostgreSQL:** A relational database management system.
- **TypeScript:** A typed superset of JavaScript for better code quality and maintainability.
- **Uploadthing:** A service for handling image uploads and storage.

## Installation

### Prerequisites

Ensure you have the following installed on your system:

- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL

### Frontend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/khoido2003/overflow-web.git
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root of the frontend directory and add the necessary environment variables:

   ```env
   AUTH_SECRET=
   JWT_EXPIRES_IN=
   JWT_SECRET=
   GOOGLE_CLIENT_ID=
   GOOGLE_CLIENT_SECRET=
   GITHUB_CLIENT_ID=
   GITHUB_CLIENT_SECRET=
   TINY_EDITOR_KEY=
   NEXT_PUBLIC_API_REQUEST_PREFIX=
   DATABASE_URL=
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

### Backend Setup

The backend setup instructions can be found in the [backend repository](https://github.com/khoido2003/overflow-api).

## Usage

Once both the frontend and backend servers are running, you can access the application at [http://localhost:3000](http://localhost:3000).

<!-- ![Screenshot of Code Overflow](path/to/screenshot.png) -->

## Screenshots

<a href="https://ibb.co/Lndfq5R"><img src="https://i.ibb.co/zGVwLJx/1.png" alt="1" border="0"></a>
<a href="https://ibb.co/41QLyrz"><img src="https://i.ibb.co/qJZ8GQK/2.png" alt="2" border="0"></a>
<a href="https://ibb.co/Ny3HtsW"><img src="https://i.ibb.co/5R9fG6s/3.png" alt="3" border="0"></a>
<a href="https://ibb.co/LYYSLqR"><img src="https://i.ibb.co/Kbb6MQh/4.png" alt="4" border="0"></a>

## Contributing

We welcome contributions to Code Overflow! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a Pull Request.

Please ensure your code adheres to our coding standards and includes relevant tests.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
