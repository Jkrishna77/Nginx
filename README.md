# Nginx Load Balancing Demo with Node.js and Docker

## About Nginx
[Nginx](https://www.nginx.com/) is a high-performance web server and reverse proxy server. It can serve static content, forward requests to backend applications, and distribute traffic among multiple servers (load balancing).

## Project Overview
This project demonstrates **load balancing with Nginx** using multiple Node.js application instances in Docker. Each instance serves the same webpage, and Nginx distributes incoming requests among them in a round-robin manner. The webpage also displays which instance served the request, so you can **see load balancing in action**.

---

## Project Structure
```
docker-compose.yaml
Dockerfile
index.html
package.json
server.js
images/
  nginx.png
nginx/
  nginx.conf
```

---

## How to Run the Project

### 1. Run Node.js app locally
1. Make sure Node.js is installed.  
2. Install dependencies:  
   ```bash
   npm install
   ```
3. Start the app:
   ```bash
   npm start
   ```
4. Open your browser: `http://localhost:3000` → you will see the webpage served by a single Node.js instance.

---

### 2. Run Node.js app in Docker container

1. Build Docker image:
   ```bash
   docker build -t myapp:v1 .
   ```
2. Run container:
   ```bash
   docker run -d -p 3000:3000 myapp:v1
   ```
3. Open your browser: `http://localhost:3000` → same webpage served from inside Docker.

---

### 3. Run multiple instances with Docker Compose

1. Bring down any running containers:
   ```bash
   docker-compose down
   ```
2. Start multiple Node.js app containers:
   ```bash
   docker-compose up --build
   ```
3. Access each instance individually (optional):
   * `http://localhost:3001` → Instance 1
   * `http://localhost:3002` → Instance 2
   * `http://localhost:3003` → Instance 3

---

### 4. Add Nginx for load balancing

1. Nginx container will distribute requests among the three Node.js instances.
2. Start everything with Docker Compose (includes Nginx):
   ```bash
   docker-compose up --build
   ```
3. Open browser: `http://localhost` → webpage shows **which instance served the request**.
   * Refresh to see Nginx round-robin in action.

---

## Notes

* The project uses **HTTP only** for simplicity. No SSL is needed for this demo.
* The webpage clearly displays **instance name and container ID**, so it’s easy to see load balancing working.
* All configuration is self-contained in Docker, so you **don’t need to install Nginx locally**.
* Nginx uses **HTTP/1.1 keep-alive** by default, so browsers may reuse connections and hit the same instance multiple times. Wait a few seconds between refreshes to see round-robin
