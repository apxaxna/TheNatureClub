"use client";
import { useState } from "react";
import { ListIcon } from "@phosphor-icons/react";
import Image from "next/image";
import { Button } from "./ui/button";
import { SidebarMenu } from "./sidebar-menu";

export const Navbar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <>
            <nav className="absolute -top-12 sm:-top-12 md:-top-12 left-0 z-20 w-full px-4 sm:px-8 my-4 ">
                <div className="relative mx-auto my-12 flex max-w-full items-center justify-between">
                    <div className="flex items-center gap-3 sm:gap-8 text-white">
                        <button
                            type="button"
                            onClick={() => setIsSidebarOpen(true)}
                            aria-label="Open navigation menu"
                            className="flex cursor-pointer items-center justify-center rounded-md p-1 transition-all duration-150 hover:opacity-80 active:scale-95"
                        >
                            <ListIcon className="size-7 sm:size-8" />
                        </button>
                        <a href="#" className="hidden md:block font-semibold">DESTINATIONS</a>
                        <a href="#" className="hidden md:block font-semibold">BLOGS</a>
                    </div>

                    <Image
                        src={"/images/logo.png"}
                        alt="logo"
                        width={150}
                        height={150}
                        className="cursor-pointer ml-2 sm:ml-4 mr-auto md:m-0 md:absolute md:left-1/2 md:-translate-x-1/2 w-20 h-20 sm:w-24 sm:h-24 md:w-36 md:h-36 object-contain transition-all duration-300"
                    />

                    <Button className="cursor-pointer px-4 py-2 text-xs sm:px-5 sm:py-2.5 sm:text-sm md:p-6 md:text-base font-medium rounded-full bg-[#1A1111] hover:bg-[#695050]">
                        Book a trip
                    </Button>
                </div>
            </nav>

            <SidebarMenu
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />
        </>
    );
};