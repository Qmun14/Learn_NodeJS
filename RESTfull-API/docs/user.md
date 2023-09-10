# User API Spec

## Register User API

Endpoint : POST /api/v1/users

Request Body :

```json
{
  "username": "qmunlabs",
  "password": "rahasia",
  "name": "qmun14 labs"
}
```

Response Body Success :

```json
{
  "data": {
    "username": "qmunlabs",
    "name": "qmun14 labs"
  }
}
```

Response Body Error :

```json
{
  "errors": "Username already registered"
}
```

## Login User API

Endpoint : POST /api/v1/users/login

Request Body :

```json
{
  "username": "qmunlabs",
  "password": "rahasia"
}
```

Response Body Success :

```json
{
  "data": {
    "token": "unique-token"
  }
}
```

Response Body Error :

```json
{
  "errors": "Username or password wrong"
}
```

## Update User API

Endpoint : PATCH /api/v1/users/current

Headers :

- Authorization : token

Request Body :

```json
{
  "name": "qmunlabs Lagi", // optional
  "password": "new password" // optional
}
```

Response Body Success :

```json
{
  "data": {
    "username": "qmunlabs",
    "name": "qmunlabs Lagi"
  }
}
```

Response Body Error :

```json
{
  "errors": "Name length max 100"
}
```

## Get User API

Endpoint : GET /api/v1/users/current

Headers :

- Authorization : token

Response Body Success:

```json
{
  "data": {
    "username": "qmunlabs",
    "name": "qmun14 labs"
  }
}
```

Response Body Error :

```json
{
  "errors": "Unauthorized"
}
```

## Logout User API

Endpoint : DELETE /api/v1/users/logout

Headers :

- Authorization : token

Response Body Success :

```json
{
  "data": "OK"
}
```

Response Body Error :

```json
{
  "errors": "Unauthorized"
}
```
