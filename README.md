# SIMPLE CHAT: REACT + REDUX + EXPRESS + SEQUELIZE + MYSQL + antd

## Чат с клиентской и серверной стороной

- клиентская сторона переписана на REACT+REDUX+antd с предыдущих ДЗ;
  - в этот раз используется виртуальный скролл для отрисовки сообщений;
- серверная часть использует EXPRESS для обработки HTTP-запросов;
- сообщения хранятся в БД MYSQL, которая взаимодействует с сервером через ORM SEQUELIZE.

## NOTES

env.sh file example

```bash
export PORT=3001
export MODE=DEVELOPMENT # PRODUCTION
export MYSQL_HOST=some-mysql-host
export MYSQL_USER=my_user_name
export MYSQL_PASSWORD=secretP@SSword
export MYSQL_DATABASE=my_awesome_db
```

## DEPLOY

**Important notes**

- After uploading application from heroku cli using git it will try to run "heroku-postbuild" script
to build react application.
- Heroku runs `npm start` script to start NodeJS application;

Prepare package.json scripts for production;

```json
{
  "client-install": "cd client && npm install",
  "install-all": "npm install && npm run client-install",
  "start": "node server/index.js",
  "dev": "concurrently \"npm run server\" \"npm run client\" ",
  "server": "nodemon server/index.js",
  "client": "npm start --prefix client",
  "build-client" : "npm run build --prefix client",
  "heroku-postbuild": "npm run client-install &&  npm run build-client"
}
```

```bash
# clone repository
git clone git@github.com:AlexGitH/chat-node-mysql-example1.git .
# create heroku app
heroku create --region eu
# create remote git branch for new heroku app named "cryptic-thicket-71158"
heroku git:remote -a cryptic-thicket-71158
# INCORRECT: only branch name "master" or "main" can be built after commit
git push heroku deploy # < not works: replace to master or main
# create new branch main
git checkout -b main
# push main branch to heroku
git push heroku main
# in case of errors it is useful to read application logs 
heroku logs -a cryptic-thicket-71158
heroku logs --tail -a cryptic-thicket-71158
# when build is succeeded you can open your app with
heroku open -a cryptic-thicket-71158
# or open provided url in the browser
```

## RUN

### DEVELOPMENT MODE

```bash
source env.sh && npm run dev
```

### PRODUCTION MODE

in production mode express takes static files from `client/build/index.html`

```bash
npm start
```
