import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border/50 bg-background">
    <div className="container mx-auto px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <h3 className="font-display text-2xl font-semibold tracking-widest text-gold uppercase mb-4">Sanark</h3>
          <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-xs">
            Decodificación Estructural de Vida. Revelamos la estructura desde la que operas para que diseñes la que te corresponde.
          </p>
        </div>
        <div>
          <h4 className="font-body text-xs tracking-widest uppercase text-muted-foreground mb-5">Navegación</h4>
          <div className="flex flex-col gap-3">
            <Link to="/" className="font-body text-sm text-foreground/70 hover:text-gold transition-colors">Inicio</Link>
            <Link to="/lectura-estructural" className="font-body text-sm text-foreground/70 hover:text-gold transition-colors">Lectura Estructural</Link>
            <Link to="/proceso-sanark" className="font-body text-sm text-foreground/70 hover:text-gold transition-colors">Proceso Sanark</Link>
          </div>
        </div>
        <div>
          <h4 className="font-body text-xs tracking-widest uppercase text-muted-foreground mb-5">Contacto</h4>
          <p className="font-body text-sm text-foreground/70 leading-relaxed">
            info@sanark.com
          </p>
        </div>
      </div>
      <div className="mt-16 pt-8 border-t border-border/30 text-center">
        <p className="font-body text-xs text-muted-foreground tracking-wider">
          © {new Date().getFullYear()} Sanark. Todos los derechos reservados.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
