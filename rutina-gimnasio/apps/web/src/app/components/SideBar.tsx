'use client';

import Link from "next/link";


export default function SideBar(){
    return(
        <aside className="bg-gray-800 text-white w-64 min-h-screen p-4">
            <ul className="space-y-4">
                <li>
                    <Link href="/dashboard" className="hover:underline">My Routines</Link>
                </li>
            
            </ul>
        </aside>
    );
}