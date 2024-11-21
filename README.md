# Detailed documentation for `converting data into structured JSON`

This documentation provides an in-depth overview of the `generateStructuredJSON` module, which validates and converts raw invoice-related data into a structured JSON format using predefined schemas.

---
[Client Documentation](https://github.com/imkhateeb/InvoSmart/blob/master/client/README.md)
[Server Documentation](https://github.com/imkhateeb/InvoSmart/blob/master/server/README.md)

---

## **Table of Contents**
1. [Introduction](#introduction)
2. [Dependencies](#dependencies)
3. [Environment Variables](#environment-variables)
4. [Schemas](#schemas)
    - [ProductSchema](#productschema)
    - [CustomerSchema](#customerschema)
    - [InvoiceSchema](#invoiceschema)
    - [FullSchema](#fullschema)
5. [Function: generateStructuredJSON](#function-generatestructuredjson)
6. [How to Use](#how-to-use)
7. [Error Handling](#error-handling)
8. [Sample Input and Output](#sample-input-and-output)

---

## **Introduction**

`generateStructuredJSON` is a utility function designed to process raw invoice data into a well-structured JSON format using **Zod** schemas for validation. It ensures missing or inconsistent fields are handled gracefully by filling defaults and reporting errors where applicable.

---

## **Dependencies**

- **Node.js Modules**:
  - `@ai-sdk/openai`: Used to interact with OpenAI for structured data generation.
  - `ai`: Provides AI capabilities for object generation.
  - `zod`: Schema validation library.
  - `dotenv`: Manages environment variables.

Install the dependencies:

```bash
npm install @ai-sdk/openai ai zod dotenv
```

---

## **Environment Variables**

The following environment variable must be configured:

- `OPENAI_API_KEY`: Your OpenAI API key. Ensure it is set in a `.env` file in the project root.

Example `.env` file:

```plaintext
OPENAI_API_KEY=your-api-key-here
```

---

## **Schemas**

### **1. ProductSchema**
Defines the structure of a product in an invoice.

| Field           | Type     | Description                                                                                   |
|------------------|----------|-----------------------------------------------------------------------------------------------|
| `productId`      | `string` | A unique identifier for the product.                                                         |
| `productName`    | `string` | The name of the product (e.g., "Laptop").                                                    |
| `quantity`       | `number` | Quantity purchased (defaults to 1 if missing).                                               |
| `unitPrice`      | `number` | Price per unit (defaults to "actual price" if missing).                                       |
| `totalPrice`     | `number` | Total price without applying tax or discount.                                                |
| `tax`            | `string` | Tax applied (e.g., "15%"). Defaults to "0%" if missing.                                      |
| `priceAfterTax`  | `number` | Price after applying tax.                                                                    |
| `discount`       | `string` | Optional discount applied (e.g., "10%"). Defaults to "0%" if missing.                        |
| `priceAfterDiscount` | `number` | Optional final price after applying discount. Defaults to `priceAfterTax` if not provided. |

---

### **2. CustomerSchema**
Defines the structure of customer details.

| Field               | Type     | Description                                                                                   |
|----------------------|----------|-----------------------------------------------------------------------------------------------|
| `customerId`         | `string` | A unique identifier for the customer.                                                        |
| `customerName`       | `string` | Full name of the customer (defaults to "N/A" if missing).                                    |
| `totalPurchaseAmount`| `number` | Total amount spent by the customer (defaults to 0 if missing).                               |
| `customerPhone`      | `string` | Optional phone number (defaults to "N/A" if missing).                                        |
| `customerEmail`      | `string` | Optional email address (defaults to "N/A" if missing).                                       |
| `customerAddress`    | `string` | Optional address (defaults to "N/A" if missing).                                             |

---

### **3. InvoiceSchema**
Defines the structure of an invoice.

| Field             | Type          | Description                                                                          |
|--------------------|---------------|--------------------------------------------------------------------------------------|
| `invoiceNumber`    | `string`      | Unique identifier for the invoice.                                                  |
| `products`         | `array`       | Array of `ProductSchema` objects.                                                   |
| `date`             | `string`      | Invoice creation date in `YYYY-MM-DD` format.                                       |
| `customer`         | `CustomerSchema` | Customer details.                                                                |
| `amountBeforeTax`  | `number`      | Total amount before applying tax.                                                   |
| `qty`              | `number`      | Total quantity of products purchased.                                               |
| `tax`              | `string`      | Tax rate applied (e.g., "15%").                                                     |
| `amountAfterTax`   | `number`      | Total amount after applying tax.                                                    |

---

### **4. FullSchema**
The `FullSchema` combines all schemas to validate the entire structured JSON.

| Field      | Type                | Description                                             |
|------------|---------------------|---------------------------------------------------------|
| `products` | `array`             | List of all products, validated against `ProductSchema`.|
| `customers`| `array`             | List of all customers, validated against `CustomerSchema`.|
| `invoices` | `array`             | List of all invoices, validated against `InvoiceSchema`.|
| `error`    | `string` (optional) | Error message if data validation fails.                 |

---

## **Function: `generateStructuredJSON`**

### **Parameters**
- `data`: Raw data to be processed.

### **Returns**
- A structured JSON object conforming to `FullSchema`.

### **Steps**
1. **Log Input Data**: Logs raw data for debugging.
2. **Process Data**: Uses the `ai` package to interact with OpenAI, validating and generating structured JSON based on schemas.
3. **Handle Errors**: Gracefully handles errors and provides descriptive error messages.

---

## **How to Use**

1. Import and configure the function:

```javascript
const generateStructuredJSON = require("./path-to-your-file");

// Example raw data
const rawData = {
  // Raw data to be processed
};

generateStructuredJSON(rawData).then((result) => {
  console.log("Structured JSON:", result);
});
```

2. Ensure your environment is properly configured with the required API key.

---

## **Error Handling**

- If the data validation fails, the function will return an error message in the following format:

```json
{
  "error": "Unable to process data. Check logs for details."
}
```

---

## **Sample Input and Output**

### **Sample Input**
```json
{
  "products": [
    {
      "productId": "123ABC",
      "productName": "Laptop",
      "quantity": 2,
      "unitPrice": 50000,
      "totalPrice": 100000,
      "tax": "18%",
      "priceAfterTax": 118000
    }
  ],
  "customers": [
    {
      "customerId": "CUST001",
      "customerName": "John Doe",
      "totalPurchaseAmount": 118000
    }
  ],
  "invoices": [
    {
      "invoiceNumber": "INV001",
      "products": [
        {
          "productId": "123ABC",
          "productName": "Laptop",
          "quantity": 2,
          "unitPrice": 50000,
          "totalPrice": 100000,
          "tax": "18%",
          "priceAfterTax": 118000
        }
      ],
      "date": "2024-11-20",
      "customer": {
        "customerId": "CUST001",
        "customerName": "John Doe",
        "totalPurchaseAmount": 118000
      },
      "amountBeforeTax": 100000,
      "qty": 2,
      "tax": "18%",
      "amountAfterTax": 118000
    }
  ]
}
```

### **Sample Output**
```json
{
  "products": [...],
  "customers": [...],
  "invoices": [...],
  "error": null
}
```
