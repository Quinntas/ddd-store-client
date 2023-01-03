# RESTFUL API WITH EXPRESS AND PRISMA

This is a bare-bones example of a express application providing a REST
API to a prisma model.

The entire application is contained within the `src` folder.

`config.ts` is a minimal Rack configuration.

`tests.ts` runs a simplistic test and generates the API.

## Install

    npm install

## Run the app locally

    npm run dev

## Run the tests

    npm run tests

# REST API

The REST API to the example app is described below.

## Test the application

### Request

`GET /`

    curl -i -H 'Accept: application/json' http://localhost:PORT/api/v1/login

### Response

    Response will be a detailed description for the application login system
