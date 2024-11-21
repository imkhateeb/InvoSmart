const { createOpenAI } = require("@ai-sdk/openai");
const { generateObject } = require("ai");
const { z } = require("zod");
require("dotenv").config();

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  compatibility: "strict",
});

// Shared constants for descriptions
const sharedDescriptions = {
  uniqueId: (entity) =>
    `A unique identifier for the ${entity}. Generate a 8 characted uniqueId by yourself.`,
  optionalFallback: (field, fallback) =>
    `If not present, it should default to '${fallback}'.`,
};

// Product Schema
const ProductSchema = z.object({
  productId: z.string().describe(sharedDescriptions.uniqueId("product")),
  productName: z.string().describe("The name of the product (e.g., 'Laptop')."),
  quantity: z
    .number()
    .describe(
      `The quantity purchased. ${sharedDescriptions.optionalFallback(
        "quantity",
        1
      )}`
    ),
  unitPrice: z
    .number()
    .describe(
      `The price per unit. ${sharedDescriptions.optionalFallback(
        "unitPrice",
        "actual price"
      )}`
    ),
  totalPrice: z
    .number()
    .describe("The total price without applying tax or discount."),
  tax: z
    .string()
    .describe(
      `Tax applied (e.g., '15%'). ${sharedDescriptions.optionalFallback(
        "tax",
        "0%"
      )}`
    ),
  priceAfterTax: z.number().describe("Price after applying tax."),
  discount: z
    .string()
    .optional()
    .describe(
      `Discount applied (e.g., '10%' or fixed amount). ${sharedDescriptions.optionalFallback(
        "discount",
        "0%"
      )}`
    ),
  priceAfterDiscount: z
    .number()
    .optional()
    .describe(
      `Price after tax and discount. Defaults to priceAfterTax if discount is absent.`
    ),
});

// Customer Schema
const CustomerSchema = z.object({
  customerId: z.string().describe(sharedDescriptions.uniqueId("customer")),
  customerName: z
    .string()
    .describe(
      `The full name of the customer. ${sharedDescriptions.optionalFallback(
        "customerName",
        "N/A"
      )}`
    ),
  totalPurchaseAmount: z
    .number()
    .describe(
      `The total amount spent. ${sharedDescriptions.optionalFallback(
        "totalPurchaseAmount",
        0
      )}`
    ),
  customerPhone: z
    .string()
    .optional()
    .describe(
      `The phone number. ${sharedDescriptions.optionalFallback(
        "customerPhone",
        "N/A"
      )}`
    ),
  customerEmail: z
    .string()
    .optional()
    .describe(
      `The email address. ${sharedDescriptions.optionalFallback(
        "customerEmail",
        "N/A"
      )}`
    ),
  customerAddress: z
    .string()
    .optional()
    .describe(
      `The address. ${sharedDescriptions.optionalFallback(
        "customerAddress",
        "N/A"
      )}`
    ),
});

// Invoice Schema
const InvoiceSchema = z.object({
  invoiceNumber: z.string().describe("Unique identifier for the invoice."),
  products: z.array(ProductSchema).describe("List of products in the invoice."),
  date: z.string().describe("Invoice creation date (YYYY-MM-DD)."),
  customer: CustomerSchema.describe("Customer information."),
  amountBeforeTax: z
    .number()
    .describe("Total amount of the invoice without tax."),
  qty: z.number().describe("Total quantity of products purchased."),
  tax: z.string().describe("Tax rate applied (e.g., '15%')."),
  amountAfterTax: z.number().describe("Total amount after applying tax."),
});

// Full Schema
const FullSchema = z.object({
  products: z.array(ProductSchema).describe("List of all products."),
  customers: z.array(CustomerSchema).describe("List of all customers."),
  invoices: z.array(InvoiceSchema).describe("List of all invoices."),
  error: z
    .string()
    .optional()
    .describe("Error message if no valid data found."),
});

// Function to generate structured JSON
const generateStructuredJSON = async (data) => {
  try {
    console.log("[INFO] Raw Data Received:", JSON.stringify(data, null, 2));

    const res = await generateObject({
      model: openai("gpt-4o", { structuredOutputs: false }),
      schemaName: "FullSchema",
      schemaDescription: "Comprehensive schema for parsing invoice data",
      schema: FullSchema,
      prompt: `
        You are an AI designed to process and validate raw data extracted from various files. 
        Convert the input data into structured JSON using the provided schemas.

        Input Details:
        - Raw data may contain missing or inconsistent fields.
        - Handle errors gracefully and fill missing values with defaults as described.

        Validation:
        - Ensure data adheres to ProductSchema, CustomerSchema, and InvoiceSchema.
        - Highlight invalid data clearly.

        Output:
        - Organize output into arrays: products, customers, invoices.
        - Return an error message if no valid data is found.

        Input Raw Data: ${JSON.stringify(data)}
      `,
    });

    console.log("[INFO] Response Received:", JSON.stringify(res, null, 2));
    return JSON.parse(JSON.stringify(res.object, null, 2));
  } catch (error) {
    console.error("[ERROR] Failed to generate structured JSON:", error.message);
    return { error: "Unable to process data. Check logs for details." };
  }
};

module.exports = generateStructuredJSON;
