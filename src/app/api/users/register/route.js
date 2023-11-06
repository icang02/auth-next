import User from "@/models/userModel";
import bcrypt from "bcrypt";

export async function POST(request, response) {
  try {
    const reqBody = await request.json();
    const { name, email, address, password } = reqBody;

    // check if user exists
    const user = await User.findOne({ where: { email: email } });
    if (user) {
      return Response.json({ message: 'User already exists with an email.' }, { status: 400 });
    }

    // generate hashpassword
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)
    // create new user
    User.create({
      name: name,
      email: email,
      address: address,
      password: hashPassword
    })

    return Response.json({
      message:  "Register successfully",
      success: true,
    }, { status: 200 })
  } catch (error) {
    return Response.json({ error: error.message });
  }
}
