export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Navigation Bar */}
      <nav className="border-2 border-black p-4">
        <div className="grid grid-cols-3 items-center">
          {/* Left Menu - Extreme Left */}
          <div className="flex gap-8 border border-black p-3 justify-self-start">
            <span className="border border-black px-4 py-2">Discover</span>
            <span className="border border-black px-4 py-2">Blogs</span>
            <span className="border border-black px-4 py-2">Destination</span>
          </div>

          {/* Center Logo - Exactly Centered */}
          <div className="border-2 border-black px-12 py-8 justify-self-center">
            <span>LOGO</span>
          </div>

          {/* Right Button - Extreme Right */}
          <div className="border-2 border-black px-6 py-3 justify-self-end">
            <span>Book Now</span>
          </div>
        </div>
      </nav>

      {/* Hero Section - Full Width Image Placeholder */}
      <section className="border-2 border-black h-[600px] flex items-center justify-center">
        <span className="text-2xl">HERO IMAGE</span>
      </section>
    </div>
  );
}
