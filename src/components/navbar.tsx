"use client";
import { ListIcon } from "@phosphor-icons/react";
import Image from "next/image";

export const Navbar = () => {
    return (
        <nav className="absolute top-0 left-0 z-20 w-full px-8 -my-12">
            <div className="mx-auto flex max-w-full items-center justify-between">
                <div className="flex items-center gap-8 text-white">
                    <ListIcon size={32} className="cursor-pointer" />
                    <a href="#" className="font-semibold">DESTINATIONS</a>
                    <a href="#" className="font-semibold">BLOGS</a>


                </div>

                <Image 
                    src={"/images/logo.png"} 
                    alt="logo" 
                    width={150} 
                    height={150} 
                    className="cursor-pointer" 
                />

                <button className="rounded-full bg-white px-6 py-3 text-black hover:bg-slate-200 transition-all cursor-pointer">
                    Book a Trip
                </button>
            </div>
        </nav>
    );
};