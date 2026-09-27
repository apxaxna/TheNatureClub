"use client"
import { Navbar } from "@/components/navbar";
import Image from "next/image";

const page = () => {
  return (
    <main className="min-h-svh w-full">
      {/* hero */}
      <section className="relative min-h-svh w-full">
        <Image
          src={"/images/hero.jpg"}
          alt="hero-page"
          fill
          className="object-cover object-center"
        />
      </section>
      {/*Navbar*/}
      <Navbar />


    </main>
  );
};

export default page;