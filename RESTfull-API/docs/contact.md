# Contact API Spec

## Create Contact API

Endpoint : POST /api/v1/contacts

Headers :
- Authorization : token

Request Body :

```json
{
  "first_name" : "Mamun",
  "last_name" : "Ramdhan",
  "email" : "mamun@qmun14labs.com",
  "phone" : "123-456-789"
}
```

Response Body Succes :

```json
{
  "data" : {
    "id" : 1,
    "first_name" : "Mamun",
    "last_name" : "Ramdhan",
    "email" : "mamun@qmun14labs.com",
    "phone" : "123-456-789"
  }
}
```

Response Body Error :

```json
{
  "errors" : "Email is not valid format"
}
```

## Update Contact API

Endpoint : PUT /api/v1/contacts/:id

Headers :
- Authorization : token

Request Body :

```json
{
  "first_name" : "Mamun",
  "last_name" : "Ramdhan",
  "email" : "mamun@qmun14labs.com",
  "phone" : "321-456-789"
}
```

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "first_name" : "Mamun",
    "last_name" : "Ramdhan",
    "email" : "mamun@qmun14labs.com",
    "phone" : "321-456-789"
  }
}
```

Response Body Error :

```json
{
  "errors" : "Email is not valid format"
}
```

## Get Contact API

Endpoint : GET /api/v1/contacts/:id

Headers :
- Authorization : token

Response Body Success :

```json
{
  "data" : {
    "id": 1,
    "first_name" : "Mamun",
    "last_name" : "Ramdhan",
    "email" : "mamun@qmun14labs.com",
    "phone" : "321-456-789"
  }
}
```

Response Body Error :

```json
{
  "errors" : "Contact is not found"
}
```

## Search Contact API

Endpoint : GET /api/v1/contacts

Headers :
- Authorization : token

Query params:
- name : Search by first_name, using like, optional
- email : Search by email using like, optional
- phone : Search by phone using like, optional
- page : number of page, default 1
- size : size per page, default 10

Response Body Success :

```json
{
  "data" : [
    {
      "id": 1,
      "first_name" : "Mamun",
      "last_name" : "Ramdhan",
      "email" : "mamun@qmun14labs.com",
      "phone" : "321-456-789"
    },
    {
      "id": 2,
      "first_name" : "Mamun2",
      "last_name" : "Ramdhan",
      "email" : "mamun@qmun14labs.com",
      "phone" : "890-456-789"
    }
  ],
  "paging": {
    "page" : 1,
    "total_page" : 3,
    "total_item" : 30
  }
}
```

Response Body Error :

## Remove Contact API

Endpoint : DELETE /api/v1/contacts/:id

Headers :
- Authorization : token

Response Body Success :

```json
{
  "data" : "OK"
}
```

Response Body Error :

```json
{
  "errors" : "Contact is not found"
}
```
