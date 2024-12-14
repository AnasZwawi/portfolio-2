import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = process.env.GEMINI_API_KEY; // Replace with your actual Gemini API key

export async function POST(req: NextRequest) {
  const { message } = await req.json();

  // Validate message
  if (!message) {
    return NextResponse.json({ reply: 'Message is required' }, { status: 400 });
  }

  try {
    // Initialize the GoogleGenerativeAI client with your API key
    const genAI = new GoogleGenerativeAI(API_KEY as string);
    
    // Get the Gemini model (you can change the model version if needed)
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Generate content based on the input message
    const result = await model.generateContent(`
      You are Anas's personal assistant. Here is some information about Anas:
      - Full-stack developer specializing in React, Next.js, Django, and more.
      - Based in Tunisia with expertise in building SaaS platforms.
      Respond to: "${message}"
    `);

    // Assuming result.response.text() contains the generated AI response
    const aiResponse = result.response.text();

    // Return the AI response in the response body
    return NextResponse.json({ reply: aiResponse });
  } catch (error) {
    console.error('Error communicating with Gemini API:', error);
    return NextResponse.json({ reply: 'Failed to get response from AI.' }, { status: 500 });
  }
}