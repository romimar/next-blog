'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import classNames from 'classnames';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaBlog } from "react-icons/fa6";

const NavBar = () => {
    const currentPath = usePathname();

    const links = [
        { label: 'Home', href: '/' },
        { label: 'Blogs', href: '/blogs' },
    ];

    return (
        <nav className='border-b mb-12'>
            <div className='grid grid-cols-6 gap-4'>
                <div className='col-start-2 col-span-4'>
                    <div className='flex space-x-6 px-5 h-14 items-center'>
                        <div className='flex-none w-14'>
                            <Link href="/"><FaBlog /></Link>
                        </div>
                        <div className='flex-1 w-64'>
                            <ul className='flex space-x-6'>
                                {links.map(link => (
                                    <li key={link.href}>
                                        <Link
                                            className={classNames({
                                                'text-zinc-900': link.href === currentPath,
                                                'text-zinc-500': link.href !== currentPath,
                                                'hover:text-zinc-800 transition-colors': true,
                                            })}
                                            href={link.href}>
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <UserSession />
                    </div>
                </div>
            </div>
        </nav>
    )
};

const UserSession = () => {
    const { status, data: session } = useSession();
    if (status === 'loading') return <Skeleton className="h-12 w-12 rounded-full" />;
    if (status === 'unauthenticated')
        return <Link href={"/api/auth/signin"}>Login</Link>;

    return (
        <div className='justify-self-end'>
            {status === 'authenticated' && (
                <DropdownMenu>
                    <DropdownMenuTrigger className='flex'>
                        <Avatar>
                            <AvatarImage
                                src={session.user!.image!}
                                referrerPolicy='no-referrer'
                            />
                            <AvatarFallback>?</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>
                            Hi {session.user!.name!}!
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            {session.user!.email!}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href={"/api/auth/signout"}>Logout</Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
        </div>
    )
}

export default NavBar;