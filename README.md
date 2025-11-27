# Bitrix24 Companies Viewer

This project is a full‑stack application built with **Node.js** (backend) and **Vue.js** (frontend).
It connects to **Bitrix24 REST API** via a webhook, retrieves up to **10,000 companies**, and displays the list in a convenient table with pagination.

## Tech Stack
- **Backend:** Node.js, Express
- **Frontend:** Vue 3, Vite, Vuetify
- **API:** Bitrix24 REST API via webhook


## How to run locally

### Environment Setup

1. Create a `.env` file in the root directory by copying `.env.example`:
   ```
   cp .env.example .env
   ```

2. Adjust the values in `.env` as needed for your local environment.

   ```
   git clone https://github.com/mikitaaB/bitrix-companies.git
   cd bitrix24-companies
   ```

### Server setup
1. Install server dependencies:
   ```
   cd server
   npm install
   ```

2. Start the server in development mode:
   ```
   npm run dev
   ```
   or run in production mode:
   ```
   npm run start
   ```
By default the backend server runs on **http://localhost:3000**

### Client setup
1. Install client dependencies:
   ```
   cd client
   npm install
   ```

2. Start the client in development mode:
   ```
   npm run dev
   ```
By default the frontend client runs on **http://localhost:5173**


The backend exposes a single REST endpoint:
```
GET /api/companies?page={page}&perPage={perPage}
```
Parameters: <br>
page – current page number (default: 1)
perPage – number of companies per page (default: 50)
