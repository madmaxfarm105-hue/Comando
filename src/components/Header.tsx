import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b-2 border-primary">
      <div className="max-w-[120rem] mx-auto px-8 md:px-16 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="font-heading text-2xl md:text-3xl text-primary uppercase tracking-tight">
            Domínio do Comando
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link 
              to="/" 
              className={`font-paragraph text-sm uppercase tracking-wider transition-colors ${
                isActive('/') ? 'text-primary' : 'text-foreground hover:text-primary'
              }`}
            >
              Início
            </Link>
            <Link 
              to="/niveis" 
              className={`font-paragraph text-sm uppercase tracking-wider transition-colors ${
                isActive('/niveis') ? 'text-primary' : 'text-foreground hover:text-primary'
              }`}
            >
              Níveis
            </Link>
            <Link 
              to="/regras" 
              className={`font-paragraph text-sm uppercase tracking-wider transition-colors ${
                isActive('/regras') ? 'text-primary' : 'text-foreground hover:text-primary'
              }`}
            >
              Regras
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-primary"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-6 pb-4 flex flex-col gap-4">
            <Link 
              to="/" 
              onClick={() => setMobileMenuOpen(false)}
              className={`font-paragraph text-sm uppercase tracking-wider transition-colors ${
                isActive('/') ? 'text-primary' : 'text-foreground hover:text-primary'
              }`}
            >
              Início
            </Link>
            <Link 
              to="/niveis" 
              onClick={() => setMobileMenuOpen(false)}
              className={`font-paragraph text-sm uppercase tracking-wider transition-colors ${
                isActive('/niveis') ? 'text-primary' : 'text-foreground hover:text-primary'
              }`}
            >
              Níveis
            </Link>
            <Link 
              to="/regras" 
              onClick={() => setMobileMenuOpen(false)}
              className={`font-paragraph text-sm uppercase tracking-wider transition-colors ${
                isActive('/regras') ? 'text-primary' : 'text-foreground hover:text-primary'
              }`}
            >
              Regras
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
