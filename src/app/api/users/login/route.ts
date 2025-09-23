import { connectDB } from "@/db/db";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";


connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log(reqBody);

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "user doesn't exists" },
        { status: 400 }
      );
    }

    console.log("user exits");

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json(
        { error: "check your credentials" },
        { status: 400 }
      );
    }

    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    const token  = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message:"Logged In Success",
      success:true
    })

    response.cookies.set('token',token,{
      httpOnly:true
    })
    return response

    console.log(token);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
