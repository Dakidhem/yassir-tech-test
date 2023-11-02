# Biometric Time Clock

A Node.js-based Biometric Time Clock RESTful API to manage employee check-ins, check-outs, and employee data for ABC School.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Documentation](#documentation)
  - [Creating a New Employee](#creating-a-new-employee)
  - [Getting a List of Employees](#getting-a-list-of-all-employees)
  - [Filter by date](#filter-by-date)
  - [Employee Check-In](#employee-check-in)
  - [Employee Check-Out](#employee-check-out)
- [Testing](#testing)

## Introduction

ABC School's Biometric Time Clock is a web-based API designed to manage employee check-ins, check-outs, and employee data. This project provides a RESTful API for creating and managing employee records, recording check-ins and check-outs, and calculating the time duration between them.

## Features

- Create a new employee.
- Get a list of all employees.
- Get a list of employees by the date of creation.
- Record employee check-ins and check-outs with comments.
- Calculate the time duration between check-in and check-out in hours.

## Prerequisites

Before getting started, make sure you have the following installed on your system:

- Node.js
- npm
- Docker/docker-compose

## Installation

1. Clone this repository to your local machine:

   ```

   git clone https://github.com/Dakidhem/yassir-tech-test.git

   ```

2. Build and up the docker-compose file

   ```

   docker-compose -f docker-compose.yml build
   docker-compose -f docker-compose.yml up

   ```

## Documentation

### Creating a New Employee

To create a new employee, send a POST request to `localhost:3001/api/employees` with the following JSON payload:

```json
{
  "id": "kadirimehdi18",
  "lastName": "Kadiri",
  "firstName": "Mehdi",
  "department": "IT"
}
```

### Getting a List of all Employees

To get a list of employees, send a GET request to `localhost:3001/api/employees`. You can add an optional query parameter to filter employees by the date of creation:

```http
GET localhost:3001/api/employees
```

### Filter by date

To get a list of employees by a date, send a GET request to `localhost:3001/api/employees/:date`:

```http
GET localhost:3001/api/employees/2023-11-02
```

### Employee Check-In

To record an employee's check-in, send a POST request to `localhost:3001/api/times/check-in` with the following JSON payload:

```json
{
  "employeeId": "<Employee_ID>",
  "comment": "Check in"
}
```

Replace `<Employee_ID>` with the employee's ID.

### Employee Check-Out

To record an employee's check-out, send a POST request to `localhost:3001/api/times/check-out` with the following JSON payload:

```json
{
  "employeeId": "<Employee_ID>",
  "comment": "Check out"
}
```

Replace `<Employee_ID>` with the employee's ID.

## Testing

To run tests, you have to change the CMD in the docker file from "CMD ["node", "app.js" ]" to "CMD ["npx", "mocha", "test.js" ]" and rebuild.
