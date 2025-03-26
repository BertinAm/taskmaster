import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const logo = searchParams.get('logo');

  // Return a simple response for now
  return NextResponse.json({ message: `Logo ${logo} requested` });
} 