
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();

  // Lógica de autenticación (validar contra tu backend)
  const res = await fetch('http://localhost:4000/auth/login', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  });

  if (!res.ok) {
    return NextResponse.json({ error: 'Credenciales inválidas' }, { status: 401 });
  }

  const data = await res.json();

  // Setear cookie httpOnly
  const response = NextResponse.json({ success: true });
  response.cookies.set('admin-token', data.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24, // 1 día
  });

  return response;
}
