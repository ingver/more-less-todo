# More Less Todo

TODO list Web App

You can try it [here](https://more-less-todo.herokuapp.com/)

---

![TODO](/todo.png)

---

## Features
- Local TODO list (persists in localStorage)
- Registration and user's own TODO list
- User sessions
- Fits mobile devices (thnx Boostrap)

---

## Local installation

### Requirements

- Node.js >= v6.0.0
- PostgreSQL ~v9.5 (users and lists)
- Redis ~v3.2.5 (sessions)

### Installation
- Clone repo:
  ```
    git clone https://github.com/ingver/more-less-todo.git && cd more-less-todo
  ```
- Install dependencies:
  ```
  npm install
  ```

- Make sure that Postgres and Redis are up.

- Init Postgres tables (default DB name is `todo`; you can change it in `app/config.js`):
  ```
  node app/initdb.js
  ```
  You need to do that just once.

- Start an application:
  ```
  npm start
  ```

### Environment variables used
- `REDIS_URL` for Redis connection
- `DATABASE_URL` for Postgres connection
- `SESSION_SECRET` for session encryption
