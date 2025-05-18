## Getting Started

Follow these steps to get the project up and running on your local machine.

### Installation & Setup

1.  **Clone the Repository**:

    ```bash
    git clone https://github.com/yourusername/url-shortener.git
    cd url-shortener
    ```

2.  **Backend Setup**:

    - Navigate to the `backend` directory:
      ```bash
      cd backend
      ```
    - Install the necessary Node.js packages:
      ```bash
      npm install
      ```
    - **Configure Environment Variables**:
      Create a file named `.env` in the `backend` directory. Copy the example below and fill in your MySQL database details and preferred port:
      ```env
      DB_HOST=localhost
      DB_USER=your_mysql_user
      DB_PASSWORD=your_mysql_password
      DB_NAME=url_shortener
      PORT=3000
      NODE_ENV=development
      CORS_ORIGIN=http://localhost:5173
      ```

3.  **Frontend Setup**:
    - Navigate to the `frontend` directory:
      ```bash
      cd ../frontend
      ```
    - Install the necessary Node.js packages:
      ```bash
      npm install
      ```
    - **Configure Environment Variables**:
      Create a file named `.env` in the `frontend` directory. This file tells the frontend where the backend API is running.
      ```env
      VITE_API_URL=http://localhost:3000/api/v1
      ```

### Running the Application

1.  **Start the Backend Server**:

        - Open a terminal, navigate to the `backend` directory:
          ```bash
          cd backend
          ```
        - Run the server:
          `bash

    node server.js
    `

2.  **Start the Frontend Development Server**:

        - Open another terminal, navigate to the `frontend` directory:
          ```bash
          cd frontend
          ```
        - Run the development server:
          `bash

    npm run dev
    `      The frontend development server will start (typically on`http://localhost:5173`).

3.  **Access the Application**:
    Open your web browser and go to `http://localhost:5173`.
