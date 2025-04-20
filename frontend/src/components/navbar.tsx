'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {  MailCheck, UserRound } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Separator } from "@/components/ui/separator"
import Link from 'next/link';


export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);



const isAdminPanel = pathname === '/admin/panel';

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
      <Link  href={"/"}>      <h1 className="text-4xl font-extrabold flex items-center">
    <MailCheck strokeWidth={2} height={35} width={40}/>SV</h1>

      </Link>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div  className='rounded-full flex  aspect-square p-2 group outline-2 outline-black hover:bg-black' >
            <UserRound strokeWidth={2} className="flex m-0 h-5 w-5 group-hover:text-white " />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => router.push('/')}>
                Votar
            </DropdownMenuItem>
            <Separator />

          {isLoggedIn ? (
            <DropdownMenuItem onClick={handleLogout}>Cerrar sesión</DropdownMenuItem>
          ) : (
            <DropdownMenuItem onClick={handleLogin}>Acceso Admin</DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
}
