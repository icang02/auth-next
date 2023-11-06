import { cookies } from 'next/headers'

export async function GET(request, response) {
  try {
    cookies().set('token', '', {
      httpOnly: true,
      expires: new Date(0)
    })

    return Response.json({ message: "Logout successfully.."}, { status: 200 })
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
