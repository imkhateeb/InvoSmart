# File Processing API

This project is a file processing API built with Node.js and Express.js. It allows users to upload files (PDFs, images, or Excel files), processes them using various utilities, and returns structured JSON data containing details like invoices, products, and customer information. The application integrates AI-based data validation and structuring using OpenAI's GPT and Google's Gemini APIs.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
  - [GET /](#get-)
  - [POST /process](#post-process)
- [File Processing Details](#file-processing-details)
  - [processPdf.js](#processpdfjs)
  - [processImage.js](#processimagejs)
  - [processExcel.js](#processexceljs)
  - [structureExtractedData.js](#structureextracteddatjs)
- [Schema Descriptions](#schema-descriptions)
  - [Product Schema](#product-schema)
  - [Customer Schema](#customer-schema)
  - [Invoice Schema](#invoice-schema)
  - [Full Schema](#full-schema)
- [Error Handling](#error-handling)
- [How It Works](#how-it-works)
- [Running the Project](#running-the-project)
- [Dependencies](#dependencies)

---

## Features

1. **File Uploads**: Accepts multiple file formats (PDF, images, Excel).
2. **File Processing**:
   - Extracts text and data from files.
   - Validates and structures data using AI APIs.
3. **Structured Output**: Returns organized JSON containing products, customers, and invoices.
4. **Error Handling**: Provides detailed error responses for invalid or unsupported files.

---

## Tech Stack

- **Backend**: Node.js, Express.js
- **AI Integrations**:
  - OpenAI's GPT
  - Vercel AI SDK
- **File Processing**:
  - Tesseract.js (for OCR on images)
  - pdf-parse (for PDFs)
  - xlsx (for Excel files)
- **Validation**: Zod (schema-based validation)

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo.git
   cd your-repo
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

---

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```plaintext
OPENAI_API_KEY=your_openai_api_key
GOOGLE_GEMINI_API_KEY=your_google_gemini_api_key
```

---

## API Endpoints

### GET /

**Description**: Health check for the server.

**Response**:

```json
{
  "success": true,
  "msg": "Server running",
  "data": null,
  "error": null
}
```

---

### POST /process

**Description**: Uploads and processes files.

**Request**:
- **Headers**: `Content-Type: multipart/form-data`
- **Body**: File uploads via `multipart/form-data`.

**Response**:
- **Success (200)**:
  ```json
  {
    "success": true,
    "msg": "Files processed successfully",
    "data": { /* Structured JSON */ },
    "error": null
  }
  ```

- **Error (400/500)**:
  ```json
  {
    "success": false,
    "msg": "Error message",
    "data": null,
    "error": "Error details"
  }
  ```

---

## File Processing Details

### `processPdf.js`

- Reads a PDF file.
- Extracts text using `pdf-parse`.
- Processes text using Google Gemini API.

---

### `processImage.js`

- Performs OCR on images using `tesseract.js`.
- Extracts text for further processing.

---

### `processExcel.js`

- Reads Excel files using `xlsx`.
- Converts sheet data to JSON.

---

### `structureExtractedData.js`

- Uses OpenAI GPT-4 to:
  - Validate and structure extracted data.
  - Adheres to Zod schemas.
- Ensures missing fields are filled with default values.

---

## Schema Descriptions

### Product Schema

```json
{
  "productId": "Unique identifier for the product",
  "productName": "Name of the product",
  "quantity": "Number of units purchased",
  "unitPrice": "Price per unit",
  "totalPrice": "Total price before tax/discount",
  "tax": "Tax applied",
  "priceAfterTax": "Price after tax",
  "discount": "Optional discount applied",
  "priceAfterDiscount": "Final price after discount"
}
```

---

### Customer Schema

```json
{
  "customerId": "Unique identifier for the customer",
  "customerName": "Full name of the customer",
  "totalPurchaseAmount": "Total amount spent",
  "customerPhone": "Optional phone number",
  "customerEmail": "Optional email",
  "customerAddress": "Optional address"
}
```

---

### Invoice Schema

```json
{
  "invoiceNumber": "Unique identifier for the invoice",
  "products": "List of products",
  "date": "Invoice creation date",
  "customer": "Customer details",
  "amountBeforeTax": "Total before tax",
  "qty": "Total quantity",
  "tax": "Tax rate",
  "amountAfterTax": "Total after tax"
}
```

---

### Full Schema

Combines Product, Customer, and Invoice schemas:

```json
{
  "products": "Array of ProductSchema",
  "customers": "Array of CustomerSchema",
  "invoices": "Array of InvoiceSchema",
  "error": "Optional error message"
}
```

---

## Error Handling

1. **File Format Errors**:
   - Unsupported file formats return a `400 Bad Request` response.
2. **Processing Errors**:
   - Internal issues return a `500 Internal Server Error` response.

---

## How It Works

1. **File Upload**:
   - Files are uploaded using `multer` and saved to a temporary directory.
2. **File Identification**:
   - The extension is checked to determine the file type (PDF, image, Excel).
3. **File Processing**:
   - Appropriate utility functions process the files.
   - Extracted data is validated and structured.
4. **Response**:
   - Returns structured JSON or appropriate error messages.

---

## Running the Project

1. Start the server:
   ```bash
   npm run dev
   ```

2. Test endpoints using a tool like Postman or cURL.

---

## Dependencies

### Runtime Dependencies

- `express`: Web framework.
- `multer`: File upload handling.
- `dotenv`: Environment variable management.
- `pdf-parse`: PDF text extraction.
- `tesseract.js`: OCR for image processing.
- `xlsx`: Excel file processing.
- `zod`: Schema validation.
- `@ai-sdk/openai` & `@ai-sdk/google`: AI integrations.

### Development Dependencies

- `nodemon`: Automatic server restarts during development.

---

## Contributing

Feel free to submit issues or pull requests for improvements. Make sure to follow coding standards and include tests for new features.
