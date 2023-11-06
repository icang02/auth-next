import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";

export async function GET(request) {
  try {
    const userId = await getDataFromToken(request)
    const user = await User.findByPk(userId)

    return Response.json({
      message: "User found",
      data: user
    })
  } catch (error) {
    return Response.json({ error: error.message }, { status: 400 })
  }
}