
# NEWTRAL_ASSIGNMENT








## Run Locally

Clone the project

```bash
  git clone https://github.com/mansoor4/newtral_assignment.git --branch master
```

Go to Directory
```bash
  cd  newtral_assignment/
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
