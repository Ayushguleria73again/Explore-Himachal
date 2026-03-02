import { GoogleGenerativeAI } from "@google/generative-ai";
import { districtsData } from "@/lib/data/districts";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");

export async function POST(req: Request) {
    try {
        const { duration, vibe } = await req.json();

        if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
            return NextResponse.json({ error: "Gemini API Key is missing. Please add it to your .env.local file." }, { status: 400 });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `
      You are an expert travel guide for Himachal Pradesh, India.
      Create a detailed ${duration}-day travel itinerary for a visitor looking for a "${vibe}" vibe.
      
      Available districts and their top spots:
      ${districtsData.map(d => `${d.name}: ${d.topSpots.map(s => s.name).join(", ")}`).join("\n")}

      Return ONLY a JSON array of objects with the following structure:
      [
        {
          "day": number,
          "district": "string (one of the available districts)",
          "location": "string (specific spot name)",
          "activity": "string (short description of what to do)"
        }
      ]

      Rules:
      1. Stay within the available districts.
      2. Ensure travel between districts is logical for the given duration.
      3. The activities should reflect the "${vibe}" vibe (Adventure, Peace, or Culture).
      4. Return ONLY the raw JSON array. No markdown, no intro, no outro.
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Clean potential markdown from response
        const cleanJson = text.replace(/```json|```/g, "").trim();
        const itinerary = JSON.parse(cleanJson);

        return NextResponse.json(itinerary);
    } catch (error) {
        console.error("Gemini API Error:", error);
        return NextResponse.json({ error: "Failed to generate itinerary with AI." }, { status: 500 });
    }
}
