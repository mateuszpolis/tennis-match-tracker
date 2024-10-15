# Tennis Match Tracker

This application helps you track tennis matches. This guide will show you how to set up and run the application using Docker.

## Prerequisites

- Docker installed on your machine. You can download it from [here](https://www.docker.com/products/docker-desktop).

## Getting Started

1. **Clone the repository:**

```sh
git clone https://github.com/mateuszpolis/tennis-match-tracker.git
cd tennis-match-tracker
```

2. **Environment variables:**

Copy the `.env.dist` file to `.env`:

```sh
cp .env.dist .env
```

Update the `.env` according to your needs. (The default values will work for the development environment.)

3. **Start the application:**

```sh
docker-compose up
```

4. **Access the application:**

Open your browser and go to [http://localhost:3000](http://localhost:3000).

5. **Bakcend API:**

The frontend application relies on the backend API. The API and the guide is available at [API](https://github.com/mateuszpolis/tennis-match-tracker-API.git)
