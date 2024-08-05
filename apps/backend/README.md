## Deployment

### Build Image

```sh
docker build -t your_image_name -f apps/backend/Dockerfile .
```

### Run container

- port: 8080
- command

```sh
docker run --env-file .env -p 8080:8080 your_image_name
```
