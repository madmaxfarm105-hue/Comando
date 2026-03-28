import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Clock } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { RegrasdoJogo } from '@/entities';

export default function RegrasPage() {
  const [rules, setRules] = useState<RegrasdoJogo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    loadRules();
  }, []);

  const loadRules = async () => {
    setIsLoading(true);
    try {
      const result = await BaseCrudService.getAll<RegrasdoJogo>('regras', [], { limit: 100 });
      setRules(result.items);
    } catch (error) {
      console.error('Failed to load rules:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const categories = ['all', ...Array.from(new Set(rules.map(r => r.category).filter(Boolean)))];
  const filteredRules = selectedCategory === 'all' 
    ? rules 
    : rules.filter(r => r.category === selectedCategory);

  return (
    <div className="w-full bg-background">

      {/* Hero Section */}
      <section className="relative w-full py-20 md:py-32 overflow-hidden">
        <div className="absolute bottom-0 left-0 w-2/5 h-64 bg-primary opacity-10" 
             style={{ clipPath: 'polygon(0 100%, 100% 100%, 80% 0, 0 20%)' }} />
        
        <div className="relative max-w-[100rem] mx-auto px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <BookOpen className="text-primary" size={40} />
              <p className="font-paragraph text-sm text-foreground uppercase tracking-wider">
                Guia Completo
              </p>
            </div>
            <h1 className="font-heading text-6xl md:text-8xl text-primary uppercase leading-none mb-6">
              Regras do
              <br />
              Jogo
            </h1>
            <p className="font-paragraph text-base md:text-lg text-foreground max-w-2xl">
              Conheça todas as regras, mecânicas e diretrizes do Domínio do Comando. Entenda como progredir, completar desafios e conquistar recompensas.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      {categories.length > 1 && (
        <section className="w-full bg-primary py-8">
          <div className="max-w-[100rem] mx-auto px-8 md:px-16">
            <div className="flex flex-wrap gap-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category
                    ? 'font-paragraph text-sm uppercase tracking-wider px-6 py-3 transition-colors bg-primary-foreground text-primary'
                    : 'font-paragraph text-sm uppercase tracking-wider px-6 py-3 transition-colors bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary'
                  }
                >
                  {category === 'all' ? 'Todas' : category}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Rules Content */}
      <section className="w-full bg-background py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-8 md:px-16">
          <div className="min-h-[600px]">
            {isLoading ? null : filteredRules.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                {filteredRules.map((rule, index) => (
                  <motion.div
                    key={rule._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.5 }}
                    className="bg-secondary border-l-4 border-primary p-8 md:p-12"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                      {/* Left: Title and Category */}
                      <div className="lg:col-span-4">
                        {rule.category && (
                          <span className="inline-block bg-primary text-primary-foreground font-paragraph text-xs uppercase tracking-wider px-4 py-2 mb-4">
                            {rule.category}
                          </span>
                        )}
                        <h2 className="font-heading text-3xl md:text-4xl text-primary uppercase mb-4">
                          {rule.ruleTitle}
                        </h2>
                        {rule.lastUpdated && (
                          <div className="flex items-center gap-2 text-foreground">
                            <Clock size={16} />
                            <span className="font-paragraph text-xs">
                              Atualizado em {new Date(rule.lastUpdated).toLocaleDateString('pt-BR')}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Right: Description and Example */}
                      <div className="lg:col-span-8 space-y-6">
                        <div>
                          <h3 className="font-heading text-xl text-primary uppercase mb-3">Descrição</h3>
                          <p className="font-paragraph text-sm text-foreground whitespace-pre-line">
                            {rule.ruleDescription}
                          </p>
                        </div>
                        {rule.example && (
                          <div className="bg-primary p-6">
                            <h3 className="font-heading text-xl text-primary-foreground uppercase mb-3">Exemplo</h3>
                            <p className="font-paragraph text-sm text-primary-foreground whitespace-pre-line">
                              {rule.example}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-20">
                <p className="font-paragraph text-foreground">
                  {selectedCategory === 'all' 
                    ? 'Nenhuma regra disponível no momento.' 
                    : 'Nenhuma regra encontrada nesta categoria.'}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-primary py-20 md:py-32">
        <div className="max-w-[100rem] mx-auto px-8 md:px-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-5xl md:text-6xl text-primary-foreground uppercase mb-6">
              Pronto para Começar?
            </h2>
            <p className="font-paragraph text-base md:text-lg text-primary-foreground mb-8 max-w-2xl mx-auto">
              Agora que você conhece as regras, é hora de iniciar sua jornada pelos 100 níveis do Domínio do Comando.
            </p>
            <Link to="/niveis">
              <button className="bg-primary-foreground text-primary font-paragraph px-10 py-4 uppercase text-sm tracking-wider hover:bg-background hover:text-primary transition-colors">
                Explorar Níveis
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
