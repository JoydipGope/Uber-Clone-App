# Users/Register Endpoint Documentation

## Endpoint
`POST /register`

## Description
This endpoint is used to register a new user in the system. It accepts user details, validates the input, and creates a new user record in the database. Upon successful registration, it returns a JSON Web Token (JWT) and the user details.

## Request Body
The request body should be a JSON object with the following structure:

```json
{
  "fullname": {
    "firstname": "string (min: 3 characters, required)",
    "lastname": "string (min: 3 characters, optional)"
  },
  "email": "string (valid email format, required)",
  "password": "string (min: 6 characters, required)"
}
```

### Validation Rules
- `fullname.firstname`: Must be at least 3 characters long and is required.
- `fullname.lastname`: Must be at least 3 characters long and is optional.
- `email`: Must be a valid email address and is required.
- `password`: Must be at least 6 characters long and is required.

## Response
### Success Response
**Status Code:** `201 Created`

**Body:**
```json
{
  "token": "string (JWT token)",
  "user": {
    "_id": "string",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string"
  }
}
```

### Error Responses
**Status Code:** `400 Bad Request`

**Body:**
```json
{
  "errors": [
    {
      "msg": "string (error message)",
      "param": "string (field name)",
      "location": "string (body)"
    }
  ]
}
```

## Example Request
```bash
curl -X POST \
  http://localhost:PORT/register \
  -H 'Content-Type: application/json' \
  -d '{
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "password123"
  }'
```

# Users/Login Endpoint Documentation

## Endpoint
`POST /login`

## Description
This endpoint is used to authenticate a user. It accepts the user's email and password, validates the input, and returns a JSON Web Token (JWT) upon successful authentication.

## Request Body
The request body should be a JSON object with the following structure:

```json
{
  "email": "string (valid email format, required)",
  "password": "string (min: 6 characters, required)"
}
```

### Validation Rules
- `email`: Must be a valid email address and is required.
- `password`: Must be at least 6 characters long and is required.

## Response
### Success Response
**Status Code:** `200 OK`

**Body:**
```json
{
  "token": "string (JWT token)",
  "user": {
    "_id": "string",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string"
  }
}
```

### Error Responses
**Status Code:** `400 Bad Request`

**Body:**
```json
{
  "errors": [
    {
      "msg": "string (error message)",
      "param": "string (field name)",
      "location": "string (body)"
    }
  ]
}
```

**Status Code:** `401 Unauthorized`

**Body:**
```json
{
  "message": "Invalid email or password"
}
```

## Example Request
```bash
curl -X POST \
  http://localhost:PORT/login \
  -H 'Content-Type: application/json' \
  -d '{
    "email": "john.doe@example.com",
    "password": "password123"
  }'
```

# Users/Profile Endpoint Documentation

## Endpoint
`GET /profile`

## Description
This endpoint retrieves the profile information of the authenticated user.

## Headers
- `Authorization`: Bearer token (required)

## Response
### Success Response
**Status Code:** `200 OK`

**Body:**
```json
{
  "_id": "string",
  "fullname": {
    "firstname": "string",
    "lastname": "string"
  },
  "email": "string"
}
```

### Error Responses
**Status Code:** `401 Unauthorized`

**Body:**
```json
{
  "message": "Authentication required"
}
```

---

# Users/Logout Endpoint Documentation

## Endpoint
`GET /logout`

## Description
This endpoint logs out the authenticated user by invalidating their session.

## Headers
- `Authorization`: Bearer token (required)

## Response
### Success Response
**Status Code:** `200 OK`

**Body:**
```json
{
  "message": "Successfully logged out"
}
```

### Error Responses
**Status Code:** `401 Unauthorized`

**Body:**
```json
{
  "message": "Authentication required"
}
```

# Captain/Register Endpoint Documentation

## Endpoint
`POST /captain/register`

## Description
This endpoint is used to register a new captain in the system. It accepts captain details, validates the input, and creates a new captain record in the database.

## Request Body

```json
{
  "fullname": {
    "firstname": "string", // required, min: 3 characters
    "lastname": "string" // optional
  },
  "email": "string", // required, valid email format
  "password": "string", // required, min: 6 characters
  "vehicle": {
    "color": "string", // required, min: 3 characters
    "plate": "string", // required, min: 3 characters
    "capacity": "integer", // required, positive integer
    "vehicleType": "string" // required, min: 3 characters
  }
}
```

## Response
### Success Response
**Status Code:** `201 Created`

**Body:**
```json
{
  "_id": "string", // unique identifier for the captain
  "fullname": {
    "firstname": "string", // captain's first name
    "lastname": "string" // captain's last name
  },
  "email": "string", // captain's email
  "vehicle": {
    "color": "string", // vehicle color
    "plate": "string", // vehicle plate number
    "capacity": "integer", // vehicle capacity
    "vehicleType": "string" // type of vehicle
  }
}
```

### Error Responses
**Status Code:** `400 Bad Request`

**Body:**
```json
{
  "errors": [
    {
      "msg": "string", // error message
      "param": "string", // field name
      "location": "string" // location of the error (e.g., body)
    }
  ]
}
```

## Example Request

```bash

curl -X POST \
  http://localhost:PORT/captain/register \
  -H 'Content-Type: application/json' \
  -d '{
    "fullname": {
      "firstname": "Jane",
      "lastname": "Doe"
    },
    "email": "jane.doe@example.com",
    "password": "securepassword",
    "vehicle": {
      "color": "Red",
      "plate": "XYZ123",
      "capacity": 4,
      "vehicleType": "Sedan"
    }
  }'
```

### Endpoint
`GET /rides/get-fare`

### Description
This endpoint calculates the fare for a ride based on the pickup and destination locations.

### Query Parameters
- `pickup` (string, required): The pickup location. Must be at least 3 characters long.
- `destination` (string, required): The destination location. Must be at least 3 characters long.

### Headers
- `Authorization` (string, required): Bearer token for user authentication.

### Response
#### Success Response
**Status Code:** `200 OK`

**Body:**
```json
{
  "cng": "number (fare for CNG vehicle)",
  "car": "number (fare for car)",
  "motorcycle": "number (fare for motorcycle)"
}
```

#### Error Responses
**Status Code:** `400 Bad Request`

**Body:**
```json
{
  "errors": [
    {
      "msg": "string (error message)",
      "param": "string (field name)",
      "location": "string (query)"
    }
  ]
}
```

**Status Code:** `401 Unauthorized`

**Body:**
```json
{
  "message": "Unauthorized"
}
```

### Example Request
```bash
curl -X GET \
  http://localhost:PORT/rides/get-fare \
  -H 'Authorization: Bearer <your_token>' \
  -G \
  --data-urlencode "pickup=Jamuna Future Park" \
  --data-urlencode "destination=Gulshan 1"
``````
