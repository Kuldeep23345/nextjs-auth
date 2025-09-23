import { connectDB } from "@/db/db";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = request.json();
    const { username, email, password }: any = reqBody;
    console.log(reqBody);

    const existedUser = await User.findOne({ email });
    if (existedUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    await sendEmail({ email, emailType: "VERIFY", userId: newUser._id });

    return NextResponse.json(
      { message: "User registerd successfully", success: true, newUser },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
