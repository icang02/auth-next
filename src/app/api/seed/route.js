require('@/seeders/userSeeder')

export async function GET() {
  return Response.json({ message: 'Seeding data..' });
}
