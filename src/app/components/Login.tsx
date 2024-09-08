import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import React from 'react';
import { Menu } from 'lucide-react';
import AvatarComponent from './Avatar';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

const Login = () => {
    const { data: session } = useSession();
    console.log("Session++++++++", session);
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className='flex p-2 border-solid border-[1px] rounded-full items-center gap-2 hover:shadow-xl'>
                    <Menu />
                    {
                        session && session.user ? (
                            <Image src={session.user.image} alt='login-user-image' width={32} height={32}></Image>
                        ) : <AvatarComponent />
                    }
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {
                    session ? (
                        <DropdownMenuItem onClick={() => signOut({
                            callbackUrl: 'http://localhost:3000'
                        })}>Sign out</DropdownMenuItem>
                    ) : (
                        <DropdownMenuItem onClick={() => signIn('google', {
                            callbackUrl: 'http://localhost:3000'
                        })}>Login</DropdownMenuItem>
                    )
                }
                <DropdownMenuItem>Sign up</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Airbnb your home</DropdownMenuItem>
                <DropdownMenuItem>Help Center</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default Login