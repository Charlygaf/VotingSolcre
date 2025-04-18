import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    
  const token = request.cookies.get('admin-token')?.value;
  const { pathname } = request.nextUrl;

  const isAdminRoute = pathname.startsWith('/admin');
  const isLoginPage = pathname === '/admin/login';

  // Si es ruta protegida y no es el login, y no hay token → redirigir
  if (isAdminRoute && !isLoginPage && !token) {
    console.log('No hay token, redirigiendo a /admin/login');
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }
    // Si hay token y la ruta es el login, redirigir a /admin/panel
    if (isLoginPage && token) {
        console.log('Hay token, redirigiendo a /admin/panel');
        return NextResponse.redirect(new URL('/admin/panel', request.url));
    }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
