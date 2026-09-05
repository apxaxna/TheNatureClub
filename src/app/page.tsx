export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/95 dark:bg-zinc-950/95 backdrop-blur-sm border-b border-zinc-200 dark:border-zinc-800 z-50">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
            The Nature Club
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium">
            <a href="#tours" className="text-zinc-700 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Tours</a>
            <a href="#destinations" className="text-zinc-700 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Destinations</a>
            <a href="#about" className="text-zinc-700 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">About</a>
            <a href="#contact" className="text-zinc-700 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Contact</a>
          </div>
          <button className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-sm font-medium transition-colors">
            Book Now
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-zinc-900 dark:text-zinc-50 mb-6 leading-tight">
              Discover Your Next
              <span className="text-emerald-600 dark:text-emerald-400"> Adventure</span>
            </h1>
            <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-10 leading-relaxed">
              From mountain peaks to pristine beaches, explore breathtaking destinations with expertly curated tours. Let nature be your guide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-lg font-medium transition-colors">
                Explore Tours
              </button>
              <button className="px-8 py-4 bg-white dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-700 hover:border-emerald-600 dark:hover:border-emerald-400 text-zinc-900 dark:text-zinc-50 rounded-full text-lg font-medium transition-colors">
                View Destinations
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tours */}
      <section id="tours" className="py-20 px-6 bg-zinc-50 dark:bg-zinc-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-4 text-center">Featured Tours</h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-center mb-12">Handpicked adventures for every traveler</p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Himalayan Trek", duration: "7 Days", price: "$1,299", desc: "Conquer mountain peaks and witness stunning sunrise views" },
              { title: "Coastal Paradise", duration: "5 Days", price: "$899", desc: "Pristine beaches, crystal waters, and island hopping" },
              { title: "Rainforest Expedition", duration: "10 Days", price: "$1,599", desc: "Explore dense jungles and encounter exotic wildlife" }
            ].map((tour, i) => (
              <div key={i} className="bg-white dark:bg-zinc-800 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-48 bg-gradient-to-br from-emerald-400 to-emerald-600"></div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">{tour.title}</h3>
                  <div className="flex justify-between items-center mb-4 text-sm">
                    <span className="text-zinc-600 dark:text-zinc-400">{tour.duration}</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold text-lg">{tour.price}</span>
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400 mb-4">{tour.desc}</p>
                  <button className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-4 text-center">Why Choose The Nature Club</h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-center mb-12">Your adventure, our expertise</p>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { title: "Expert Guides", desc: "Experienced professionals with deep local knowledge" },
              { title: "Small Groups", desc: "Intimate experiences with limited group sizes" },
              { title: "Eco-Friendly", desc: "Sustainable tourism that respects nature" },
              { title: "24/7 Support", desc: "Round-the-clock assistance during your journey" }
            ].map((feature, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <div className="w-8 h-8 bg-emerald-600 dark:bg-emerald-400 rounded-full"></div>
                </div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">{feature.title}</h3>
                <p className="text-zinc-600 dark:text-zinc-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-emerald-600 dark:bg-emerald-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Start Your Adventure?</h2>
          <p className="text-emerald-100 text-lg mb-8">Join thousands of travelers who have discovered the world with us</p>
          <button className="px-10 py-4 bg-white text-emerald-600 hover:bg-zinc-100 rounded-full text-lg font-bold transition-colors">
            Get Started Today
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-zinc-900 dark:bg-black">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-2xl font-bold text-emerald-400 mb-4">The Nature Club</div>
          <p className="text-zinc-400 mb-6">Discover the world, one adventure at a time</p>
          <div className="flex gap-6 justify-center text-sm text-zinc-500">
            <a href="#" className="hover:text-emerald-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-emerald-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-emerald-400 transition-colors">Contact</a>
          </div>
          <p className="text-zinc-600 text-sm mt-8">© 2026 The Nature Club. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
