require("dotenv").config();

const { z } = require("zod");
const axios = require("axios");

const ProductSchema = z.object({
  product_name: z.string(),
  quantity: z.number(),
  rate_per_item: z.number(),
  tax_rate: z.string(),
  total_amount: z.number(),
});

const CustomerSchema = z.object({
  name: z.string(),
  company_name: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
});

const InvoiceSchema = z.object({
  invoice_number: z.string(),
  date: z.string(),
  customer_name: z.string(),
  total_amount: z.number(),
  amount_pending: z.number(),
  created_by: z.string(),
});

// Full schema
const FullSchema = z.object({
  products: z.array(ProductSchema),
  customers: z.array(CustomerSchema),
  invoices: z.array(InvoiceSchema),
});

// URL with the Gemini API key
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GOOGLE_GEMINI_API_KEY}`;

// Function to structure the extracted data
const structureExtractedData = (results) => {
  const body = {
    contents: [
      {
        parts: [
          {
            // text: `Given the extracted invoice data and the following Zod schema, output the data in the structured format:

            // Zod schema:
            // - products: array of product objects
            // - customers: array of customer objects
            // - invoices: array of invoice objects

            // Extracted Data: ${JSON.stringify(results)}

            // The structured output should look like this JSON:
            // {
            //   "products": [
            //     {
            //       "product_name": "Sandeep Ranga",
            //       "quantity": 1,
            //       "rate_per_item": 153600,
            //       "tax_rate": "0%",
            //       "total_amount": 153600
            //     }
            //   ],
            //   "customers": [
            //     {
            //       "name": "Sandeep Ranga",
            //       "company_name": "N/A",
            //       "phone": "N/A",
            //       "email": "N/A"
            //     }
            //   ],
            //   "invoices": [
            //     {
            //       "invoice_number": "INV-TEST-456",
            //       "date": "12 Nov 2024",
            //       "customer_name": "Sandeep Ranga",
            //       "total_amount": 153600,
            //       "amount_pending": 153600,
            //       "created_by": "Vamsi Fin"
            //     }
            //   ]
            // }`,
            text: "What is Earth?",
          },
        ],
      },
    ],
  };

  axios
    .post(url, body, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      // Ensure response.data is already an object
      const result = response.data;

      console.log(result);

      // Validate the result using Zod schema
      // try {
      //   const parsedResult = FullSchema.parse(result);
      //   console.log("PARSED RESULT", parsedResult);
      // } catch (error) {
      //   console.error("Validation failed:", error.errors);
      // }
    })
    .catch((error) => {
      console.error("Error making API call:", error);
    });
};

module.exports = structureExtractedData;
