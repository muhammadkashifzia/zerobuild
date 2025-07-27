import { NextResponse } from "next/server";
import { createClient } from "next-sanity";
import clientConfig from "@/sanity/config/client-config"; // config object
import { ContactSubmission } from "@/types/ContactSubmission";

const client = createClient(clientConfig); // ✅ actual client instance

export async function POST(req: Request) {
  try {
    const data: ContactSubmission = await req.json();

    // 🛡️ Anti-spam
    if (data.honeypot && data.honeypot.trim() !== "") {
      return NextResponse.json({ success: true }); // silently drop spam
    }

    // Save to Sanity
    await client.create({
      _type: "contactSubmission",
      name: data.name,
      email: data.email,
      company: data.company,
      message: data.message,
      purpose: data.purpose,
      role: data.role || "",
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact submission failed:", err);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
