
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary/20">
      <Header />
      
      <main className="flex-grow flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-4">404</h1>
          <p className="text-xl text-muted-foreground mb-6">Oops! Page not found</p>
          <a href="/" className="text-primary hover:underline">
            Return to Home
          </a>
        </div>
      </main>
      
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default NotFound;