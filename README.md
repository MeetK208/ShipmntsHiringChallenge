# ShipmntsHiringChallenge

I have created Backend In that I have two main 1 api/v1/book that has functionalities

1. Upload Excel Sheet: localhost:8080/api/v1/books/upload
2. View Excel Data : localhost:8080/api/v1/books/getall/
3. Reject Data (In-case we don't want to store) : localhost:8080/api/v1/companies/reject/1724364246868
   Here I have used Seesion data to store when user is upload file and then when it will reject it will delete from session
4. Accept Data (To Store Data in mongoDB): localhost:8080/api/v1/books/confirm/1724428499449
   Once We know that data is okay from sessionID I get that data from sessionID and then storing data in Db for That First I am storing Author data then i am storing Book data for mapping of AuthorId to Book schema so we get to know that this book is written by this user.

upload Excel Sheet: localhost:8080/api/v1/books/upload

# Backend API for Book and Author Management

## Overview

This backend API provides functionalities for managing book and author data through Excel file uploads. It supports operations to upload data, view data, reject or confirm data, and store it in a MongoDB database.

## API Endpoints

### 1. Upload Excel Sheet

**Endpoint:** `POST /api/v1/books/upload`

**Description:** Upload an Excel sheet containing book and author information. The file will be parsed, and data will be stored temporarily for review.

**Request:**

- **File:** Excel file with columns: `Book Name`, `ISBN Code`, `Author Name`, `Author Email`, `Date of Birth`

**Response:**

- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "message": "File uploaded and data parsed successfully",
    "sessionId": "<unique_session_id>",
    "parsedData": [...]
  }
  ```

### 2. View Excel Data

**Endpoint:** `POST localhost:8080/api/v1/books/getall/

**Description:** To View my excel data whether it's Good or not

**Request:**

- **File:** Excel file with columns: `Book Name`, `ISBN Code`, `Author Name`, `Author Email`, `Date of Birth`

**Response:**

- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "message": "Excel Data",
    "sessionId": "<unique_session_id>",
    "parsedData": [...]
  }
  ```

## Overview

This API provides endpoints for rejecting or confirming book and author data that has been temporarily stored in the session after an Excel file upload.

## Endpoints

### 3. Reject Data

**Endpoint:** `DELETE /api/v1/companies/reject/{sessionID}`  
**Description:** Removes data associated with the specified session ID from the session. This action discards data that should not be stored.

**Path Parameter:**

- `sessionID` (string): The ID of the session from which data should be rejected.

**Example Request:**

```bash
curl -X DELETE http://localhost:8080/api/v1/companies/reject/1724364246868
```

# Accept Data Endpoint Documentation

## Overview

The "Accept Data" endpoint is used to confirm and store book and author data that has been temporarily stored in the session after an Excel file upload. This endpoint processes the data, stores it in MongoDB, and establishes the relationship between authors and books.

## Endpoint

### Accept Data

**Endpoint:** `POST /api/v1/books/confirm/{sessionID}`  
**Description:** Confirms and stores the data associated with the specified session ID in MongoDB. The process involves validating the data, storing author details, and linking them to book records.

**Path Parameter:**

- `sessionID` (string): The ID of the session containing the data to be confirmed and stored.

**Example Request:**

```bash
curl -X POST http://localhost:8080/api/v1/books/confirm/1724428499449
```
