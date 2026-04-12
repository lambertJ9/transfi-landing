import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { first_name, last_name, email, role, country } = body;

    if (!first_name || !last_name || !email || !role || !country) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    // -------------------------------------------------------
    // Option A: Store in a Google Sheet via Apps Script
    // Replace YOUR_APPS_SCRIPT_URL with your deployed script URL
    // -------------------------------------------------------
    // const scriptUrl = "https://script.google.com/macros/s/YOUR_APPS_SCRIPT_URL/exec";
    // await fetch(scriptUrl, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ first_name, last_name, email, role, country }),
    // });

    // -------------------------------------------------------
    // Option B: Send via Resend email service
    // Replace RESEND_API_KEY in your Vercel env vars
    // -------------------------------------------------------
    // const resendRes = await fetch("https://api.resend.com/emails", {
    //   method: "POST",
    //   headers: {
    //     "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     from: "waitlist@transfi.app",
    //     to: "hello@transfi.app",
    //     subject: `New waitlist signup: ${first_name} ${last_name}`,
    //     text: `Name: ${first_name} ${last_name}\nEmail: ${email}\nRole: ${role}\nCountry: ${country}`,
    //   }),
    // });

    // -------------------------------------------------------
    // Default: Just log and return success
    // (works immediately, replace with Option A or B above)
    // -------------------------------------------------------
    console.log("New waitlist signup:", { first_name, last_name, email, role, country });

    return NextResponse.json({ message: "Success" }, { status: 200 });

  } catch (err) {
    console.error("Waitlist API error:", err);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}

