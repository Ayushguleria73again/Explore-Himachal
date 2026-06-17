import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import crypto from "crypto";

// Ensure local cache directory exists in the workspace
const CACHE_DIR = path.join(process.cwd(), ".cache", "audio");
if (!fs.existsSync(CACHE_DIR)) {
  fs.mkdirSync(CACHE_DIR, { recursive: true });
}

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    const apiKey = process.env.ELEVENLABS_API_KEY;
    const voiceId = process.env.ELEVENLABS_VOICE_ID || "sY2peC9GbHX8NCy5enOe"; // Prem (warm Indian male voice)

    if (!apiKey) {
      // Gracefully tell frontend to use browser speech synthesis fallback
      return NextResponse.json({ fallback: true, reason: "ELEVENLABS_API_KEY is not configured in .env.local" });
    }

    if (!text || text.trim() === "") {
      return NextResponse.json({ error: "Text prompt is empty" }, { status: 400 });
    }

    // Generate hash based on text and voiceId to identify cached files
    const hash = crypto.createHash("md5").update(text + "_" + voiceId).digest("hex");
    const cachePath = path.join(CACHE_DIR, `${hash}.mp3`);

    // Check if the audio file is already cached on disk
    if (fs.existsSync(cachePath)) {
      const audioBuffer = new Uint8Array(fs.readFileSync(cachePath));
      return new Response(audioBuffer, {
        headers: {
          "Content-Type": "audio/mpeg",
          "Content-Length": audioBuffer.byteLength.toString(),
          "X-Cache": "HIT"
        }
      });
    }

    // Call ElevenLabs Text-To-Speech API using the low-latency eleven_flash_v1_5 model
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "xi-api-key": apiKey,
          accept: "audio/mpeg"
        },
        body: JSON.stringify({
          text: text,
          model_id: "eleven_flash_v2_5", // Low-latency multilingual model optimized for speed
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.8
          }
        })
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.warn("ElevenLabs TTS Error response:", errorText);
      return NextResponse.json({ fallback: true, reason: "ElevenLabs API error" });
    }

    const audioBuffer = await response.arrayBuffer();

    // Cache the synthesized speech file locally
    fs.writeFileSync(cachePath, Buffer.from(audioBuffer));

    return new Response(audioBuffer, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Length": audioBuffer.byteLength.toString(),
        "X-Cache": "MISS"
      }
    });
  } catch (error) {
    console.error("Speech API Error:", error);
    return NextResponse.json({ fallback: true, reason: "Server internal catch error" });
  }
}
