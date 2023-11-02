# Biometric Time Clock

A Node.js-based Biometric Time Clock RESTful API to manage employee check-ins, check-outs, and employee data for ABC School.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
  - [Creating a New Employee](#creating-a-new-employee)
  - [Getting a List of Employees](#getting-a-list-of-employees)
  - [Employee Check-In](#employee-check-in)
  - [Employee Check-Out](#employee-check-out)
- [Documentation](#documentation)
- [Testing](#testing)
- [Docker Support](#docker-support)
- [Contributing](#contributing)
- [License](#license)

## Introduction

ABC School's Biometric Time Clock is a web-based API designed to manage employee check-ins, check-outs, and employee data. This project provides a RESTful API for creating and managing employee records, recording check-ins and check-outs, and calculating the time duration between them.

## Features

- Create a new employee.
- Get a list of all employees with optional filtering by the date of creation.
- Get a list of employees by the date of creation.
- Record employee check-ins and check-outs with comments.
- Calculate the time duration between check-in and check-out in hours.
- Secure employee data using a database.

## Prerequisites

Before getting started, make sure you have the following installed on your system:

- Node.js
- npm
- Docker/docker-compose

## Installation

1. Clone this repository to your local machine:

   ```

   git clone git@github.com:mer1Knn/biometric-time-clock.git

   ```

2. Install project dependencies:

   ```

   npm install

   ```

3. Set up your database and configure the connection (see [Configuration](#configuration)).
4. Start the application:

   ```

   npm start

   ```

## Configuration

You need to configure the database connection. Create a `.env` file in the project's root directory and add the following:

```env
MONGODB_URI=<Your_MongoDB_URI>
```

Replace `<Your_MongoDB_URI>` with the connection URI for your MongoDB database.

## Usage

### Creating a New Employee

To create a new employee, send a POST request to `/employees` with the following JSON payload:

```json
{
  "lastName": "Kanoune",
  "firstName": "Merouane",
  "dateCreated": "2023-10-29T20:34:08.465+00:00",
  "department": "Tech"
}
```

### Getting a List of Employees

To get a list of employees, send a GET request to `/employees`. You can add an optional query parameter to filter employees by the date of creation:

```http
GET /employees?dateCreated=2022-01-05
```

### Employee Check-In

To record an employee's check-in, send a POST request to `/check-in` with the following JSON payload:

```json
{
  "employeeId": "<Employee_ID>",
  "comment": "Arrived at work"
}
```

Replace `<Employee_ID>` with the employee's ID.

### Employee Check-Out

To record an employee's check-out, send a POST request to `/check-out` with the following JSON payload:

```json
{
  "employeeId": "<Employee_ID>",
  "comment": "End of workday"
}
```

Replace `<Employee_ID>` with the employee's ID.

## Testing

To run tests, you have to change the CMD in the docker file from "CMD ["node", "app.js" ]" to "CMD ["npx", "mocha", "test.js" ]" and rebuild.
