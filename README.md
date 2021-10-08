#How to start

- Put frontend build into `/devops/nginx/build` (`index.html` need to exist in `build/` root)
- Put `.env` file into `/devops/`:
```
DEBUG=True
START_SCHEDULER=True
POSTGRES_HOST=database
POSTGRES_PORT=5432
POSTGRES_DB=hack
POSTGRES_USER=hack
POSTGRES_PASSWORD=hack
```
- Put new static (if needed) into `/devops/static`
- Run `docker-compose up --build`
