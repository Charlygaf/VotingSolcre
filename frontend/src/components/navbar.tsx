'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { UserCircle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);


//check if url is /admin/panel
const isAdminPanel = pathname === '/admin/panel';

  // Detectar si existe la cookie desde el cliente
  useEffect(() => {
if(isAdminPanel)setIsLoggedIn(true);
else{
    setIsLoggedIn(false);
}
  }, [isAdminPanel]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const handleLogin = () => {
    router.push('/admin/login');
  };

  return (
    <nav className="w-full border-b px-6 py-4 flex justify-between items-center shadow-sm bg-white">
      <h1 className="text-xl font-bold">Sistema de Votación</h1>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <UserCircle className="h-6 w-6" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => router.push('/')}>
                Votar
            </DropdownMenuItem>
          {isLoggedIn ? (
            <DropdownMenuItem onClick={handleLogout}>Cerrar sesión</DropdownMenuItem>
          ) : (
            <DropdownMenuItem onClick={handleLogin}>Iniciar sesión</DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
}
