import User from "@/models/userModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { cookies } from 'next/headers'

export async function POST(request, response) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    // check if user exists
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      return Response.json({ message: 'User does not exists.' }, { status: 400 });
    }

    // check if password is correct
    const validPassword = await bcrypt.compare(password, user.password)

    if (!validPassword) {
      return Response.json({ message: 'Invalid password.' }, { status: 400 })
    }

    // create token data
    const tokenData = {
      id: user.id
    }

    // create token
    const token = await jwt.sign(tokenData, process.env.SECRET_TOKEN, {
      expiresIn: "1d" 
    })

    // set cookies token
    cookies().set({
      name: 'token',
      value: token,
      httpOnly: true,
    })

    return Response.json({
      message:  "Login successfully",
      success: true,
    }, { status: 200 })
  } catch (error) {
    return Response.json({ error: error.message });
  }
}
