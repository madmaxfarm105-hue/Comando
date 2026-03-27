import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full bg-primary py-16">
      <div className="max-w-[100rem] mx-auto px-8 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="font-heading text-3xl text-primary-foreground uppercase mb-4">
              Domínio do Comando
            </h3>
            <p className="font-paragraph text-sm text-primary-foreground">
              Conquiste 100 níveis de maestria através de tarefas, missões e batalhas estratégicas.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-heading text-xl text-primary-foreground uppercase mb-4">
              Navegação
            </h4>
            <nav className="flex flex-col gap-3">
              <Link 
                to="/" 
                className="font-paragraph text-sm text-primary-foreground hover:text-background transition-colors"
              >
                Início
              </Link>
              <Link 
                to="/niveis" 
                className="font-paragraph text-sm text-primary-foreground hover:text-background transition-colors"
              >
                Níveis
              </Link>
              <Link 
                to="/regras" 
                className="font-paragraph text-sm text-primary-foreground hover:text-background transition-colors"
              >
                Regras
              </Link>
            </nav>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-heading text-xl text-primary-foreground uppercase mb-4">
              Informações
            </h4>
            <div className="space-y-3">
              <p className="font-paragraph text-sm text-primary-foreground">
                Níveis: 1 - 100
              </p>
              <p className="font-paragraph text-sm text-primary-foreground">
                Tipo: Jogo de Progressão
              </p>
              <p className="font-paragraph text-sm text-primary-foreground">
                Desafios: Tarefas, Missões, Batalhas
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-paragraph text-xs text-primary-foreground">
              © 2026 Domínio do Comando. Todos os direitos reservados.
            </p>
            <p className="font-paragraph text-xs text-primary-foreground">
              Desenvolvido com dedicação e estratégia
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
