import React from 'react'
import ThemeButton from './ThemeButton'
import { Button } from '@/components/ui/button';
import { GithubIcon } from 'lucide-react';
import Link from 'next/link';

function NavBar() {
  return (
    <div className='w-screen flex gap-2 items-center justify-between pt-4 px-10'>
        <div className='text-full font-bold font-sans'>Llama</div>
        <div className='flex gap-2'>
        <div>
        <ThemeButton />
        </div>
        <Link href={"https://github.com/KenanGain"} target="_blank" rel="noopener noreferrer">
        <Button className='border p-2 rounded-sm '><GithubIcon className='h-[1.2rem] w-[1.2rem]'/></Button>
        </Link>
        </div>
    </div>
  )
}

export default NavBar;