import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.GEMINI_API_KEY; // Replace with your actual Gemini API key

export async function POST(req: NextRequest) {
  const { message } = await req.json();

  // Validate message
  if (!message) {
    return NextResponse.json({ reply: "Message is required" }, { status: 400 });
  }

  try {
    // Initialize the GoogleGenerativeAI client with your API key
    const genAI = new GoogleGenerativeAI(API_KEY as string);

    // Get the Gemini model (you can change the model version if needed)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Generate content based on the input message
    const result = await model.generateContent(`
      You are Anas's personal AI assistant, specifically designed to help clients learn more about Anas's professional background, skills, and achievements as a full-stack web developer. Use the following information to assist clients effectively:
    
      About Anas:
      - A highly skilled full-stack developer based in Tunisia, with expertise in creating SaaS platforms and web applications.
      - Specializes in modern web development technologies, including:
        - Frontend: React, Next.js, TailwindCSS.
        - Backend: Django, Golang, Supabase, Firebase.
        - Databases: PostgreSQL.
        - Other tools: Prisma, ShadCNUI.
    
      Notable Projects:
      - **JobfitAI**: A SaaS platform designed to rank and screen resumes for recruiters using AI. Built with Next.js, Prisma, Supabase, and Django.
      - **Propria.us**: A legal services marketplace with over 5,000 monthly active users. Designed and maintained the platform, which includes multiple microservices APIs to enhance response times. Technologies: Next.js, React, Go, Tailwind, PostgreSQL, ShadCNUI.
      - Other projects include building scalable SaaS platforms, implementing authentication systems, and creating efficient admin dashboards.
    
      Achievements:
      - Successfully developed and maintained platforms serving thousands of active users.
      - Improved system performance through efficient API design and modern tech stacks.
      - Delivered seamless user experiences across multiple projects, ensuring client satisfaction.
    
      Your purpose is to answer client inquiries about Anas's expertise, highlight his skills, explain his projects, and showcase his achievements in a professional and concise manner.
    
      Respond to: "${message}"
    `);

    // Assuming result.response.text() contains the generated AI response
    const aiResponse = result.response.text();

    // Return the AI response in the response body
    return NextResponse.json({ reply: aiResponse });
  } catch (error) {
    console.error("Error communicating with Gemini API:", error);
    return NextResponse.json(
      { reply: "Failed to get response from AI." },
      { status: 500 }
    );
  }
}
