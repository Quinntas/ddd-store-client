# RESTFUL API WITH EXPRESS AND PRISMA

Official Documentation

## What is after instalation ?

## # Folder Structure

Here's a brief look at the folder structure

```
project
│   README.md
│   tsconfig.json 
└───src
    └───api
        └───v1
        │   └───client
        │   │   └───config
        │   │           client.data.ts
        │   │           client.validation.ts
        │   │       client.router.ts
        │   │       client.service.ts
        │   └───login
        │   │       login.router.ts
        │   │       login.service.ts
        │   └───register
        │   │       register.router.ts
        │   └───shared
        │   │   └───config
        │   │   │       schema.validation.ts
        │   │   │       shared.data.ts
        │   │   └───user
        │   │   │       user.service.ts
        │   │   └───wallet
        │   │           waller.service.ts
        │   │       types.ts
        │   └───shopkeeper
        │   │   └───config
        │   │           shopkeeper.data.ts
        │   │           shopkeeper.validation.ts
        │   │       shopkeeper.router.ts
        │   │       shopkeeper.service.ts
        │   └───transaction
        │       └───config
        │               transaction.data.ts
        │               transaction.validation.ts
        │           transaction.router.ts
        │           transaction.service.ts
        │       
        └───exception
        │       http.exception.ts
        │       prisma.exception.ts
        └───middleware
        │       authenticateJWT.middleware.ts
        │       error.middleware.ts
        └───utils
                db.server.ts
                encryption.ts
        index.ts
```

``
This project resembles somewhat of DDD (Doamin Driven Design) by utilizing the domain as the primary folder, and the subsequent files represents the various functionalities.
``

## .router

``
Serving as the folder's main file, the .router file contain the RESTful routes for the domain
``

## .service

``
Serving as the folder's sub-main file, the .service file contains the various functionalities of that specific domain. For exemple, in the folder 'client' the service file serves as the main source of communication between the database and the route in that domain.
``

## .exception

``
Are simply error handlers
``

## .middleware

``
As the name sugests, .middleware's contains middleware for the application
``

## .server

``
Used for some kind of connection, primarily for the prisma database connection
``

## .data

``
Usage for .data is for data formatting and data manipulation
``

## .validation

``
Inside this kind of file there is the express-validator configuration for body validation
``