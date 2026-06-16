import { Link } from "react-router-dom";
import sanarkLogo from "@/assets/sanark-logo.png";

const Footer = () => (
  <footer className="border-t border-border/50 bg-background">
    <div className="container mx-auto px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <span
            aria-label="Sanark"
            className="block h-12 w-40 mb-4 transition-all duration-500 hover:drop-shadow-[0_0_12px_hsl(38_50%_48%/0.55)]"
            style={{
              WebkitMaskImage: `url(${sanarkLogo})`,
              maskImage: `url(${sanarkLogo})`,
              WebkitMaskRepeat: 'no-repeat',
              maskRepeat: 'no-repeat',
              WebkitMaskPosition: 'left center',
              maskPosition: 'left center',
              WebkitMaskSize: 'contain',
              maskSize: 'contain',
              backgroundColor: 'hsl(38 50% 48%)',
            }}
          />
          <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-xs">
            Decodificación Estructural de Vida. Revelo la estructura desde la que operas para que diseñes la que deseas.
          </p>
        </div>
        <div>
          <h4 className="font-body text-xs tracking-widest uppercase text-muted-foreground mb-5">Navegación</h4>
          <div className="flex flex-col gap-3">
            <Link to="/" className="font-body text-sm text-foreground/85 hover:text-gold transition-colors">Inicio</Link>
            <Link to="/lectura-estructural" className="font-body text-sm text-foreground/85 hover:text-gold transition-colors">Lectura Estructural</Link>
            <Link to="/proceso-sanark" className="font-body text-sm text-foreground/85 hover:text-gold transition-colors">Proceso Sanark</Link>
          </div>
        </div>
        <div>
          <h4 className="font-body text-xs tracking-widest uppercase text-muted-foreground mb-5">Contacto</h4>
          <p className="font-body text-sm text-foreground/85 leading-relaxed mb-6">
            info@sanark.com
          </p>
          <h4 className="font-body text-xs tracking-widest uppercase text-muted-foreground mb-4">Legal</h4>
          <div className="flex flex-col gap-2">
            <Link to="/politica-privacidad" className="font-body text-xs text-foreground/90 hover:text-gold transition-colors">Política de Privacidad</Link>
            <Link to="/aviso-legal" className="font-body text-xs text-foreground/90 hover:text-gold transition-colors">Aviso Legal</Link>
          </div>
        </div>
      </div>
      <div className="mt-16 pt-8 border-t border-border/30 text-center">
        <p className="font-body text-xs text-muted-foreground tracking-wider">
          © {new Date().getFullYear()} Sanark · Juan Carlos Sánchez Velázquez. Todos los derechos reservados.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
