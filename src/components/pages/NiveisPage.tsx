import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Trophy } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { NveisdoJogo } from '@/entities';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function NiveisPage() {
  const [levels, setLevels] = useState<NveisdoJogo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasNext, setHasNext] = useState(false);
  const [skip, setSkip] = useState(0);
  const limit = 12;

  useEffect(() => {
    loadLevels();
  }, [skip]);

  const loadLevels = async () => {
    setIsLoading(true);
    try {
      const result = await BaseCrudService.getAll<NveisdoJogo>('niveis', [], { limit, skip });
      if (skip === 0) {
        setLevels(result.items);
      } else {
        setLevels(prev => [...prev, ...result.items]);
      }
      setHasNext(result.hasNext);
    } catch (error) {
      console.error('Failed to load levels:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMore = () => {
    if (hasNext && !isLoading) {
      setSkip(prev => prev + limit);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative w-full pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-abstractshape opacity-20" 
             style={{ clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0 100%)' }} />
        
        <div className="relative max-w-[100rem] mx-auto px-8 md:px-16">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <Trophy className="text-primary" size={40} />
                <p className="font-paragraph text-sm text-foreground uppercase tracking-wider">
                  100 Níveis de Progressão
                </p>
              </div>
              <h1 className="font-heading text-6xl md:text-8xl text-primary uppercase leading-none mb-6">
                Todos os
                <br />
                Níveis
              </h1>
              <p className="font-paragraph text-base md:text-lg text-foreground max-w-2xl">
                Explore todos os níveis do Domínio do Comando. Cada nível apresenta desafios únicos, tarefas específicas e recompensas exclusivas.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Levels Grid */}
      <section className="w-full bg-background py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-8 md:px-16">
          <div className="min-h-[600px]">
            {isLoading && skip === 0 ? null : levels.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {levels.map((level, index) => (
                  <motion.div
                    key={level._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: (index % 12) * 0.05, duration: 0.5 }}
                  >
                    <Link to={`/niveis/${level._id}`}>
                      <div className="bg-secondary border-2 border-transparent hover:border-primary transition-all group overflow-hidden">
                        {level.levelImage && (
                          <div className="aspect-square overflow-hidden bg-abstractshape">
                            <Image
                              src={level.levelImage}
                              alt={level.levelName || `Nível ${level.levelNumber}`}
                              width={400}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        )}
                        <div className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <span className="font-heading text-5xl text-primary">
                              {level.levelNumber?.toString().padStart(2, '0')}
                            </span>
                            <ChevronRight className="text-primary group-hover:translate-x-1 transition-transform" size={24} />
                          </div>
                          <h3 className="font-heading text-xl text-primary uppercase mb-2 line-clamp-1">
                            {level.levelName}
                          </h3>
                          <p className="font-paragraph text-xs text-foreground line-clamp-2">
                            {level.levelDescription}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-20">
                <p className="font-paragraph text-foreground">Nenhum nível disponível no momento.</p>
              </div>
            )}
          </div>

          {/* Load More Button */}
          {hasNext && (
            <div className="mt-12 text-center">
              <button
                onClick={loadMore}
                disabled={isLoading}
                className="bg-primary text-primary-foreground font-paragraph px-10 py-4 uppercase text-sm tracking-wider hover:bg-foreground hover:text-background transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Carregando...' : 'Carregar Mais Níveis'}
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
