# Backend

Backend application for Drivelink.
Create a .mysql.env in the root directory

# For development

### To start the application with docker

```sh
cd Backend/
docker-compose up

```

To run the migration

```sh
docker-compose exec app /bin/sh

yarn run up

    or
npm run up

```

### Installing packages for development

```sh
docker-compose exec app /bin/sh

yarn add <package_name>
    or
npm install <package_name>
```

### To create the database on the db

```sh
docker-compose exec db /bin/sh
```

```sh
nodemon server.js
```
