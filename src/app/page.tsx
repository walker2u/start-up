import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Footer } from "./components/Footer";

export default function LandingPage() {
  return (
    <div className="relative bg-gray-900 min-h-screen flex items-center justify-center text-white overflow-hidden">
      {/* Optional: Add a subtle background pattern or effect */}
      <div className="absolute inset-0 bg-grid-gray-700/20 [mask-image:linear-gradient(to_bottom,white_0,transparent_100%)]"></div>

      <Header />
      <main className="relative z-10 p-4">
        <Hero />
      </main>
      <Footer />
    </div>
  );
}
