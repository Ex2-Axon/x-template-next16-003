import PristineProperties from "./components/PristineProperties";
import CookieBanner from "./components/CookieBanner";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content */}
      <div className="flex-1">
        <PristineProperties />
      </div>

      {/* Footer */}
      <Footer />
      
      {/* Cookie Banner */}
      <CookieBanner />
    </div>
  );
}
