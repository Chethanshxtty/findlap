import type { AIResponse } from './types';
import { generateMockLaptops } from './mockData';

const geminiSchema = {
  type: "OBJECT",
  properties: {
    summary: { type: "STRING" },
    totalFound: { type: "INTEGER" },
    bestPick: {
      type: "OBJECT",
      properties: {
        name: { type: "STRING" },
        brand: { type: "STRING" },
        price: { type: "STRING" },
        specs: {
          type: "OBJECT",
          properties: {
            Processor: { type: "STRING" },
            RAM: { type: "STRING" },
            Storage: { type: "STRING" },
            Display: { type: "STRING" },
            GPU: { type: "STRING" }
          },
          required: ["Processor", "RAM", "Storage", "Display", "GPU"]
        },
        whyBest: { type: "STRING" },
        imageQuery: { type: "STRING" },
        imageUrl: { type: "STRING" },
        stores: {
          type: "ARRAY",
          items: {
            type: "OBJECT",
            properties: {
              name: { type: "STRING" },
              price: { type: "STRING" },
              url: { type: "STRING" }
            },
            required: ["name", "price", "url"]
          }
        }
      },
      required: ["name", "brand", "price", "specs", "whyBest", "imageQuery", "imageUrl", "stores"]
    },
    laptops: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: {
          rank: { type: "INTEGER" },
          name: { type: "STRING" },
          brand: { type: "STRING" },
          price: { type: "STRING" },
          useTags: {
            type: "ARRAY",
            items: { type: "STRING", enum: ["coding", "gaming", "editing"] }
          },
          specs: {
            type: "OBJECT",
            properties: {
              Processor: { type: "STRING" },
              RAM: { type: "STRING" },
              Storage: { type: "STRING" },
              Display: { type: "STRING" },
              GPU: { type: "STRING" }
            },
            required: ["Processor", "RAM", "Storage", "Display", "GPU"]
          },
          imageQuery: { type: "STRING" },
          imageUrl: { type: "STRING" },
          stores: {
            type: "ARRAY",
            items: {
              type: "OBJECT",
              properties: {
                name: { type: "STRING" },
                price: { type: "STRING" },
                url: { type: "STRING" }
              },
              required: ["name", "price", "url"]
            }
          }
        },
        required: ["rank", "name", "brand", "price", "useTags", "specs", "imageQuery", "imageUrl", "stores"]
      }
    }
  },
  required: ["summary", "totalFound", "bestPick", "laptops"]
};

export async function fetchLaptopsFromAI(
  budget: number,
  useCases: string[],
  apiKey: string
): Promise<AIResponse> {
  // If no API key is specified, fallback to Mock Mode automatically
  if (!apiKey) {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return generateMockLaptops(budget, useCases);
  }

  // Detect Gemini API key format (starts with "AQ." or "AIzaSy")
  const isGeminiKey = apiKey.startsWith('AQ.') || apiKey.startsWith('AIzaSy');

  if (isGeminiKey) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${apiKey}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Find 5 Indian market laptops within a budget of ₹${budget} for the following use cases: ${useCases.join(', ')}. Return a structured response matching the requested schema. Make sure you fetch or construct a real, valid product image URL for the "imageUrl" field of each laptop from Amazon (m.media-amazon.com) or Flipkart (rukminim2.flixcart.com).`
            }]
          }],
          generationConfig: {
            responseMimeType: "application/json",
            responseSchema: geminiSchema
          }
        })
      });

      if (!response.ok) {
        const errBody = await response.text();
        throw new Error(`Gemini API Error (${response.status}): ${errBody || response.statusText}`);
      }

      const responseData = await response.json();
      const text = responseData.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) {
        throw new Error('Empty response content received from Gemini API.');
      }

      const parsed: AIResponse = JSON.parse(text.trim());
      return parsed;
    } catch (err: any) {
      console.error('Gemini fallback API fetch failed:', err);
      throw err;
    }
  }

  // Anthropic Claude execution block
  const prompt = `You are a laptop matchmaking AI assistant specializing in the Indian PC market.
Your task is to recommend 5 laptops currently available in the Indian market that strictly match the user's budget and target use cases.

User budget: ₹${budget}
Selected Use Cases: ${useCases.join(', ')}

You must return a raw JSON object matching the requested schema. Do not output any markdown formatting, no code blocks (e.g. no \`\`\`json), no backticks, no comments, and no extra text. Just raw, parseable JSON.

JSON structure:
{
  "summary": "string summarizing the market findings and rationale",
  "totalFound": 24,
  "bestPick": {
    "name": "Full name of the absolute best pick laptop",
    "brand": "Brand name (e.g. HP, Asus, Dell, Lenovo, Apple)",
    "price": "Market price formatted with ₹ prefix (e.g. ₹64,990)",
    "specs": {
      "Processor": "CPU description (e.g. Intel Core i5-12500H)",
      "RAM": "RAM description (e.g. 16GB DDR4 RAM)",
      "Storage": "Storage details (e.g. 512GB M.2 NVMe SSD)",
      "Display": "Display specs (e.g. 15.6\\\" FHD 144Hz IPS)",
      "GPU": "GPU details (e.g. NVIDIA GeForce RTX 3050)"
    },
    "whyBest": "A short 1-2 sentence explanation why this is the perfect machine for the selected use cases at this budget",
    "imageQuery": "A short 3-word string for image search (e.g. 'HP Victus laptop')",
    "imageUrl": "A real, valid product image URL from Amazon (m.media-amazon.com) or Flipkart (rukminim2.flixcart.com) for this laptop model",
    "stores": [
      {
        "name": "Store name (e.g. Amazon, Flipkart, Croma)",
        "price": "Formatted price at this store (e.g. ₹64,990)",
        "url": "Search or store URL for this laptop"
      }
    ]
  },
  "laptops": [
    {
      "rank": 1,
      "name": "Full name of the laptop (including brand prefix)",
      "brand": "Brand name",
      "price": "Market price formatted with ₹ prefix",
      "useTags": ["coding", "gaming"], // array of values from: ["coding", "gaming", "editing"]
      "specs": {
        "Processor": "CPU description",
        "RAM": "RAM description",
        "Storage": "Storage details",
        "Display": "Display specs",
        "GPU": "GPU details"
      },
      "imageQuery": "A short 3-word string for image search (e.g. 'Asus TUF laptop')",
      "imageUrl": "A real, valid product image URL from Amazon (m.media-amazon.com) or Flipkart (rukminim2.flixcart.com) for this laptop model",
      "stores": [
        {
          "name": "Store name",
          "price": "Formatted price",
          "url": "Store URL"
        }
      ]
    }
    // Repeat for ranks 2, 3, 4, 5
  ]
}

Please ensure that:
1. Every laptop is within the specified budget constraint of ₹${budget}.
2. Laptops are actual models available in the Indian market.
3. Every store URL is a realistic retail search URL.
4. Capitalized Specs properties are strictly adhered to.
5. Every "imageUrl" field contains a real, valid product image URL from Amazon (m.media-amazon.com) or Flipkart (rukminim2.flixcart.com) matching the recommended laptop model.`;

  const apiPaths = ['/api/anthropic/v1/messages', 'https://api.anthropic.com/v1/messages'];
  let lastError: any = null;

  for (const path of apiPaths) {
    try {
      const response = await fetch(path, {
        method: 'POST',
        headers: {
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 1000,
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ]
        })
      });

      if (!response.ok) {
        const errBody = await response.text();
        throw new Error(`Anthropic API Error (${response.status}): ${errBody || response.statusText}`);
      }

      const data = await response.json();
      const text = data.content?.[0]?.text;
      if (!text) {
        throw new Error('Empty response received from Anthropic API.');
      }

      let cleanedJson = text.trim();
      if (cleanedJson.includes('```')) {
        cleanedJson = cleanedJson.replace(/```json|```/g, '').trim();
      }

      const parsed: AIResponse = JSON.parse(cleanedJson);

      if (!parsed.summary || !parsed.bestPick || !Array.isArray(parsed.laptops)) {
        throw new Error('Response is missing required JSON properties (summary, bestPick, or laptops).');
      }

      return parsed;
    } catch (err: any) {
      console.warn(`Fetch failed on endpoint path ${path}:`, err);
      lastError = err;
      if (path === apiPaths[0]) {
        continue;
      }
    }
  }

  throw lastError || new Error('Failed to communicate with Anthropic API.');
}
