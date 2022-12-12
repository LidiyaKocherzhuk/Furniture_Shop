## Start work with the app

At first we create `.env` file, example:

```js
    PORT = 3200

    DATABASE_NAME = project

    //To create your AWS S3 bucket and add your data below!
    S3_NAME = example:"furniture-shop"
    S3_REGION = example:"eu-west-1"
    S3_ACCESS_KEY = example:`JSLID5885HD5D`
    S3_SECRET_KEY = example:`ccfeZo/NjMfNJmBCzp60tFkwtyRglLqmT06u3Cmd`

    ACCESS_TOKEN_KEY = accessMyTokenKey
    ACCESS_REFRESH_KEY = refreshMyTokenKey
    SUPER_USER = lidiyaonufreyiv31@gmail.com
    FRONTEND_URL = http://localhost:3000

    //Allow access for less secure applications
    //To create app password in your google account for permission to receive emails from this application
    NO_REPLY_EMAIL = your google email example:`lidiyaonufreyiv31@gmail.com`
    NO_REPLY_PASSWORD = your app password example:`dktgurhsfkfsi`

```
How do you can create the app password? You can go to [a link](https://www.google.com/settings/security/lesssecureapps);

And we create `.env.bd` file, example:

```js
    MYSQL_DATABASE=finalproject
    MYSQL_USER=`your user name`
    MYSQL_PASSWORD=`your password`
    MYSQL_ROOT_PASSWORD=`your password`
```

--------
After that we go to backend directory
### `cd backend`

In the project directory, you can run:

And install npm dependencies.
### `npm install`

Next in MySQL Schemas we create new database, run the script - `create database project;`
Also we create `ormconfig.json` file and add to this data below!
After that we add our personal  `username` and `password` to access the MySQL database!

```js
//ormconfig.json
{
  "type": "mysql",
  "host": "db",
  "port": 3307,
  "username": "*****",
  "password": "*****",
  "database": "project",
  "synchronize": false,
  "logging": false,
  "entities": [
    "**/entity/**/*.ts"
  ],
  "migrations": [
    "src/migration/**/*.ts"
  ],
  "subscribers": [
  ],
  "cli": {
    "migrationsDir": "src/migration"
  }
}

After that we run the script.
It will create our tables;
### `npm run migration:run`

-------
Also we go to client side
### `cd client`

In the project directory, you can run:

### `npm run build`
For building our client part to general part

### or `npm run build-dev`
For watching to changes and automatically rebuild the part

-------
After that all we started our project.

At first we run:
### `docker-compose build`

And next:
### `docker-compose up`
