
# REUNION_ASSIGNMENT

## Problem Statement

- Build APIs for a social media platform in either NodeJS or Python
- The API should support features like getting a user profile, follow a user, upload a post, delete a post, like a post, unlike a liked post, and comment on a post
- Design the database schema and implement in PostgreSQL or MongoDB







## Run Locally

Clone the project

```bash
  git clone https://github.com/mansoor4/reunion_assignment.git --branch master
```

Go to Directory
```bash
  cd  reunion_assignment/
```

Start the server

```bash
  sudo docker-compose up --build
```
```It will run the container and first run test cases if test cases passed than it start the server  otherwise it will not start the server```

Server Local
```bash
  http://localhost:8000
```

Local Server Health check
```bash
  http://localhost:8000/health
```

Server Production
```bash
  https://reuinion-server.onrender.com
```

Production Server Health check
```bash
  https://reuinion-server.onrender.com/health
```

Stop the server

```bash
  sudo docker-compose down -v
```


## Running Tests

First,Install all dependencies

```bash
  npm install
```
To run tests, run the following command

```bash
  npm run test
```
