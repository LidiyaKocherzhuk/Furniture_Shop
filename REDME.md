## Start work with the app

At first, at the root of our project, we must create some files:

`.env` file, example:

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

And last one add the file [wait.for.it.sh](https://github.com/LidiyaKocherzhuk/wait.for.it.sh);

--------
After that we go to backend directory
### `cd backend`

In the project directory, you must:

Install npm dependencies.
### `npm install`

Also create `ormconfig.json` file and add to this data below!
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
```

-------
After we go to client side
### `cd client`

And install npm dependencies.
### `npm install`

Also we run the command:

### `npm run build`
For building our client part to general part

### or `npm run build-dev`
For watching to changes and automatically rebuild the part

-------
After that all, we started our project.

At first we run:
### `docker-compose build`

And next:
### `docker-compose up`

After that we need to connect to our database. So we open environment for working with MySQL,
I work with MySQL Workbench, and create new connection where:

`username` === your `MYSQL_USER` from .env.db file         <br/>
`password` === your `MYSQL_PASSWORD` from .env.db file     <br/>
`Path` === it is port from docker-compose.yml file `3307`

