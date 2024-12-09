# nest_battery_tests
A nest repository focused on tests(unit,integration,end-to-end...)
| Stack       | Link                                                                                                                                            |
|-------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| Nest.js     | <a href="https://nestjs.com/" target="_blank" rel="noreferrer"> <img src="https://nestjs.com/img/logo-small.svg" alt="Nest.js" width="40" height="40"/> </a> |
| Jest  | <a href="https://jestjs.io" target="_blank" rel="noreferrer"> <img src="https://jestjs.io/img/jest.png" alt="Jest" width="40" height="40"/> </a> |
| Docker      | <a href="https://www.docker.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original-wordmark.svg" alt="Docker" width="40" height="40"/> </a> |
| PostgreSQL  | <a href="https://www.postgresql.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original-wordmark.svg" alt="PostgreSQL" width="40" height="40"/> </a> |


## Features 
- Simple REST API with one endpoint `/todos`
- Unit tests with
- Integrations tests
- End to end tests with docker-compose



## Installation
1. Clone the repository: `git clone  https://github.com/bambadiagne/nest_battery_tests.git`

2. Create .env file based on .env.sample contents and change the values see above example:
```env
NODE_ENV=development
PORT=3000
DB_HOST=db
DB_PORT=5432
DB_NAME=demo-db
DB_USERNAME=postgres
DB_PASSWORD=@Example1234!
```

3. You can use the docker-compose file it's so simple but you need that Docker installed in your device

```bash
    docker-compose --env-file .env up -d
```
4. Runs unit and integration tests
```
    npm run test
```
5. Run End to End tests
```
  npm run test:e2e:docker:local
```

## Contributing
Pull requests are welcome.Just fork and create PR!
