# SIMPLE CHAT: REACT + REDUX + EXPRESS + SEQUELIZE + MYSQL + antd

## Чат с клиентской и серверной стороной

- клиентская сторона переписана на REACT+REDUX+antd с предыдущих ДЗ;
  - в этот раз используется виртуальный скролл для отрисовки сообщений;
- серверная часть использует EXPRESS для обработки HTTP-запросов;
- сообщения хранятся в БД MYSQL, которая взаимодействует с сервером через ORM SEQUELIZE.

## NOTES

env.sh file example

```bash
export MYSQL_HOST=some-mysql-host
export MYSQL_USER=my_user_name
export MYSQL_PASSWORD=secretP@SSword
export MYSQL_DATABASE=my_awesome_db
```

## RUN (DEBUG)

`source env.sh && npm start`
