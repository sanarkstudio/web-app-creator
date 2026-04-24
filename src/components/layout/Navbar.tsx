import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import sanarkLogo from "@/assets/sanark-logo.png";
import { trackCtaClick } from "@/lib/analytics";

const navLinks = [
  { to: "/", label: "Inicio" },
  { to: "/lectura-estructural", label: "Lectura Estructural" },
  { to: "/proceso-sanark", label: "Proceso Sanark" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/70 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between h-20 px-6">
        <Link to="/" className="flex items-center gap-3">
          <img src={sanarkLogo} alt="Sanark" className="h-10 w-auto brightness-100 sepia saturate-[3] hue-rotate-[10deg] transition-all duration-500 hover:brightness-125 hover:drop-shadow-[0_0_12px_hsl(38_50%_48%/0.5)]" style={{ filter: 'brightness(0.85) sepia(1) saturate(2.5) hue-rotate(10deg)' }} onMouseEnter={e => e.currentTarget.style.filter = 'brightness(1.2) sepia(1) saturate(2.5) hue-rotate(10deg) drop-shadow(0 0 12px hsl(38 50% 48% / 0.5))'} onMouseLeave={e => e.currentTarget.style.filter = 'brightness(0.85) sepia(1) saturate(2.5) hue-rotate(10deg)'} />
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`font-body text-sm tracking-wider uppercase transition-colors duration-300 ${
                location.pathname === link.to
                  ? "text-gold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/lectura-estructural"
            onClick={() => trackCtaClick("Reservar", "navbar_desktop")}
            className="font-body text-sm tracking-wider uppercase px-6 py-2.5 border border-gold/40 text-gold hover:bg-gold hover:text-background transition-all duration-300"
          >
            Reservar
          </Link>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-foreground">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-xl"
          >
            <div className="flex flex-col px-6 py-6 gap-5">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={`font-body text-sm tracking-wider uppercase ${
                    location.pathname === link.to ? "text-gold" : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/lectura-estructural"
                onClick={() => {
                  trackCtaClick("Reservar", "navbar_mobile");
                  setOpen(false);
                }}
                className="font-body text-sm tracking-wider uppercase px-6 py-2.5 border border-gold/40 text-gold text-center hover:bg-gold hover:text-background transition-all duration-300"
              >
                Reservar
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
