import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");

export async function POST(req: Request) {
    try {
        const { messages, newPrompt } = await req.json();

        if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
            return NextResponse.json(
                { error: "Gemini API Key is missing. Please add it to your .env.local file." },
                { status: 400 }
            );
        }

        // Initialize Gemini model with specific system instructions setting the Mela Ram persona
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
            systemInstruction: 
                "You are 'Mela Ram', a warm, friendly, and deeply knowledgeable local travel assistant for Himachal Pradesh, India. " +
                "Your purpose is to help travelers discover the beauty, culture, routes, weather, foods (like Dham, Siddu, Sepu Badi), and history of the 12 districts. " +
                "Provide concise, engaging, and structured responses. Suggest sustainable travel practices. Speak with local warmth and pride. " +
                "If asked about things outside of Himachal Pradesh or travel in general, politely redirect the conversation back to the magic of the Himalayas."
        });

        // Convert frontend messages into Gemini-compatible chat history format
        const rawHistory = (messages || []).map((m: any) => ({
            role: m.role === "user" ? "user" : "model",
            parts: [{ text: m.content }]
        }));

        // Gemini chat history must start with a 'user' message.
        // We find the first user message and slice the history array from that point.
        const firstUserIndex = rawHistory.findIndex((m: any) => m.role === "user");
        const history = firstUserIndex !== -1 ? rawHistory.slice(firstUserIndex) : [];

        // Start a multi-turn chat session with history
        const chat = model.startChat({
            history: history
        });

        // Send the new prompt and fetch the response
        const result = await chat.sendMessage(newPrompt);
        const response = await result.response;
        const replyText = response.text();

        return NextResponse.json({ reply: replyText });
    } catch (error) {
        console.error("Gemini Chat API Error:", error);
        return NextResponse.json(
            { error: "Failed to connect to the Himalayan guide. Please try again later." },
            { status: 500 }
        );
    }
}
