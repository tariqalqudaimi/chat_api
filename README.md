# Chat App

A Node.js chat application using Express, Socket.io, and Knex.

## Project Structure

- `/src/config` - Database and Passport configurations
- `/src/controllers` - Request and response logic
- `/src/database` - Migrations and seeds
- `/src/middlewares` - Authentication and validation
- `/src/models` - (Optional) Models or use Repository Pattern
- `/src/repositories` - Direct database interaction
- `/src/routes` - API routes
- `/src/services` - WebSocket logic
- `app.js` - Express app setup
- `server.js` - Server entry point with Socket.io
- `.env` - Environment variables
- `knexfile.js` - Knex configuration

## Installation

1. Install dependencies: `npm install`
2. Set up your database in `knexfile.js` and `.env`
3. Run migrations: `npx knex migrate:latest`
4. Start the server: `npm start` or `npm run dev` for development

## Usage

Start the server and connect via Socket.io for chat functionality.