import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    return NextResponse.json({ text });
  } catch (error) {
    console.error('Error fetching data from Gemini AI:', error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

