// import { createGoogleGenerativeAI } from "@ai-sdk/google";
const { createGoogleGenerativeAI } = require("@ai-sdk/google");
const { createOpenAI } = require("@ai-sdk/openai");
const { generateText, generateObject } = require("ai");
const { z } = require("zod");
require("dotenv").config();
const google = createGoogleGenerativeAI({
  // custom settings
  apiKey: "AIzaSyBEn46_XcEcQu4LaCwIQhAYBY8M__P8aa8",
});

const openai = createOpenAI({
  // custom settings, e.g.
  apiKey: process.env.OPENAI_API_KEY,
  compatibility: "strict", // strict mode, enable when using the OpenAI API
});

const fetchData = async () => {
  try {
    const { text } = await generateText({
      model: google("gemini-1.5-pro-latest"),
      prompt: "Write a vegetarian lasagna recipe for 4 people.",
    });

    console.log(text);
  } catch (error) {
    console.error(error);
  }
};

const ProductSchema = z.object({
  productName: z
    .string()
    .describe(
      "The name of the product being purchased (e.g., 'Laptop', 'Table', 'Chair')."
    ),
  quantity: z
    .number()
    .describe(
      "The quantity of the product being purchased, e.g., '2' for two units of the product."
    ),
  unitPrice: z
    .number()
    .describe(
      "The price per unit of the product, represented in the respective currency."
    ),
  tax: z
    .string()
    .describe(
      "The tax rate applied to the product, generally in percentage (e.g., '15%')."
    ),
  priceWithTax: z
    .number()
    .describe(
      "The total price of the product including tax, calculated as quantity * unitPrice * (1 + tax)."
    ),
  discount: z
    .string()
    .optional()
    .describe(
      "The discount applied to the product, generally in percentage (e.g., '10%')."
    ),
});

const CustomerSchema = z.object({
  customerName: z
    .string()
    .describe(
      "The full name of the customer (e.g., 'John Doe', 'Acme Corporation')."
    ),
  totalPurchaseAmount: z
    .number()
    .describe(
      "The total amount spent by the customer across all invoices (e.g., '5000.00')."
    ),
  customerPhone: z
    .string()
    .optional()
    .describe("The phone number of the customer (e.g., '123-456-7890')."),
  customerEmail: z
    .string()
    .optional()
    .describe(
      "The email address of the customer (e.g., 'customer@example.com')."
    ),
});

const invoiceProducts = z.object({
  productName: z.string().describe("The name of the product being purchased."),
});
const InvoiceSchema = z.object({
  serialNumber: z
    .number()
    .describe("A unique identifier for the invoice (e.g., 'INV12345')."),
  products: z
    .array(invoiceProducts)
    .describe("All the products in the invoice"),
  date: z
    .string()
    .describe(
      "The date when the invoice was created, typically in 'YYYY-MM-DD' format (e.g., '2024-11-01')."
    ),
  customerName: z
    .string()
    .describe(
      "The name of the customer associated with the invoice (e.g., 'John Doe')."
    ),
  totalAmount: z
    .number()
    .describe(
      "The total amount of the invoice, which includes all products and taxes (e.g., '1500.00')."
    ),
  qty: z
    .number()
    .describe(
      "The total quantity of the product purchased in the invoice (e.g., '5')."
    ),
  tax: z
    .string()
    .describe(
      "The tax rate applied to the product, generally in percentage (e.g., '15%')."
    ),
});

const FullSchema = z.object({
  products: z
    .array(ProductSchema)
    .describe(
      "An array of products included in the invoice, where each product follows the ProductSchema."
    ),
  customers: z
    .array(CustomerSchema)
    .describe("An array of customer information following the CustomerSchema."),
  invoices: z
    .array(InvoiceSchema)
    .describe(
      "An array of invoices, where each invoice follows the InvoiceSchema."
    ),
  error: z.string().optional().describe("Error message if no valid data found"),
});

const generateJSON = async (data) => {
  try {
    console.log(data);
    const res = await generateObject({
      model: openai("gpt-4o", {
        structuredOutputs: false,
      }),
      schemaName: "InvoiceSchema",
      schemaDescription: "Schema for parsing invoice data",
      schema: FullSchema,
      prompt: `
            You are a highly intelligent AI designed to process data and provide structured outputs. Your task is to process extracted raw data from various file types (Excel, PDF, image) and convert it into structured JSON. Use the given schemas for validation and error handling.
            \n\n
            Objective:
            Extract and organize data into three sections:
            invoices
            products
            customers
            Ensure the data adheres strictly to the provided schemas, handling missing data and inconsistencies gracefully.
            \n\n
            Input Details:
            Raw data extracted from files (Excel, PDFs, and images).
            Each file may contain partial or inconsistent information.
            If the data does not seem like an invoice, product or customer data then return an error message.
            \n\n\n
            Task Instructions:
            \n\n
            Schema Validation:
            Ensure all data fits into the respective Zod schemas: ProductSchema, CustomerSchema, and InvoiceSchema.
            Validate the data for completeness and type correctness.
            If a required field is missing, indicate it clearly  (e.g., If productName is missing in the ProductSchema then value of productName field will be "N/A").
            \n\n
            Error Handling:
            If unsupported file formats or invalid data are detected, return an error object with a descriptive message.
            Highlight missing or inconsistent fields and recommend corrections when possible.
            Ensure numeric fields like qty, unitPrice, and totalAmount are properly calculated when missing.
            \n\n
            Output Format:
            Organize the final output into three arrays: products, customers, and invoices, ensuring each entry complies with the respective schema.
            Return an empty array if no valid data is found for a category.
            If we donot have any products, invoices or customers then return an error object as "No valid data found".
            \n\n
            Enhancements:
            Automatically calculate derived fields (e.g., totalAmount = qty * unitPrice + tax, when possible).
            Normalize tax rates to percentages for consistency (e.g., 5% or 0.05 → 0.05).
            \n\n\n
            Raw Data: ${JSON.stringify(data)}
            \n\n\n
            `,
    });

    const response = JSON.parse(JSON.stringify(res.object, null, 2));
    console.log(res);
    return response;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { fetchData, generateJSON };
