import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Target, Swords, Award, CheckCircle } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { NveisdoJogo } from '@/entities';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function NivelDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [level, setLevel] = useState<NveisdoJogo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadLevel();
  }, [id]);

  const loadLevel = async () => {
    if (!id) return;
    setIsLoading(true);
    try {
      const data = await BaseCrudService.getById<NveisdoJogo>('niveis', id);
      setLevel(data);
    } catch (error) {
      console.error('Failed to load level:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="pb-20 md:pb-32">
        <div className="max-w-[100rem] mx-auto px-8 md:px-16">
          {/* Back Button */}
          <Link to="/niveis" className="inline-flex items-center gap-2 font-paragraph text-sm text-foreground hover:text-primary transition-colors mb-8">
            <ChevronLeft size={20} />
            Voltar para Níveis
          </Link>

          <div className="min-h-[600px]">
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <LoadingSpinner />
              </div>
            ) : !level ? (
              <div className="text-center py-20">
                <h2 className="font-heading text-4xl text-primary uppercase mb-4">Nível não encontrado</h2>
                <p className="font-paragraph text-foreground mb-8">O nível que você procura não existe.</p>
                <Link to="/niveis">
                  <button className="bg-primary text-primary-foreground font-paragraph px-8 py-4 uppercase text-sm tracking-wider hover:bg-foreground hover:text-background transition-colors">
                    Ver Todos os Níveis
                  </button>
                </Link>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                {/* Hero Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                  {/* Left: Image */}
                  {level.levelImage && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                      className="relative"
                    >
                      <div className="aspect-square bg-abstractshape overflow-hidden">
                        <Image
                          src={level.levelImage}
                          alt={level.levelName || `Nível ${level.levelNumber}`}
                          width={800}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute top-8 left-8 bg-primary px-6 py-3">
                        <span className="font-heading text-4xl text-primary-foreground">
                          {level.levelNumber?.toString().padStart(2, '0')}
                        </span>
                      </div>
                    </motion.div>
                  )}

                  {/* Right: Info */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                  >
                    <div className="bg-primary p-8 md:p-12 h-full flex flex-col justify-center">
                      <p className="font-paragraph text-sm text-primary-foreground uppercase tracking-wider mb-4">
                        Nível {level.levelNumber}
                      </p>
                      <h1 className="font-heading text-5xl md:text-6xl text-primary-foreground uppercase leading-none mb-6">
                        {level.levelName}
                      </h1>
                      <p className="font-paragraph text-base text-primary-foreground mb-8">
                        {level.levelDescription}
                      </p>
                      {level.levelReward && (
                        <div className="bg-primary-foreground px-6 py-4 inline-block">
                          <p className="font-paragraph text-sm text-primary uppercase">
                            Recompensa: {level.levelReward}
                          </p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Tasks */}
                  {level.levelTasks && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                      className="bg-secondary p-8"
                    >
                      <div className="flex items-center gap-3 mb-6">
                        <CheckCircle className="text-primary" size={32} />
                        <h2 className="font-heading text-2xl text-primary uppercase">Tarefas</h2>
                      </div>
                      <p className="font-paragraph text-sm text-foreground whitespace-pre-line">
                        {level.levelTasks}
                      </p>
                    </motion.div>
                  )}

                  {/* Missions */}
                  {level.levelMissions && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.6 }}
                      className="bg-secondary p-8"
                    >
                      <div className="flex items-center gap-3 mb-6">
                        <Target className="text-primary" size={32} />
                        <h2 className="font-heading text-2xl text-primary uppercase">Missões</h2>
                      </div>
                      <p className="font-paragraph text-sm text-foreground whitespace-pre-line">
                        {level.levelMissions}
                      </p>
                    </motion.div>
                  )}

                  {/* Challenges */}
                  {level.levelChallenges && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.6 }}
                      className="bg-secondary p-8"
                    >
                      <div className="flex items-center gap-3 mb-6">
                        <Swords className="text-primary" size={32} />
                        <h2 className="font-heading text-2xl text-primary uppercase">Desafios</h2>
                      </div>
                      <p className="font-paragraph text-sm text-foreground whitespace-pre-line">
                        {level.levelChallenges}
                      </p>
                    </motion.div>
                  )}
                </div>

                {/* CTA Section */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                  className="mt-16 bg-primary p-12 text-center"
                >
                  <Award className="text-primary-foreground mx-auto mb-6" size={48} />
                  <h3 className="font-heading text-4xl text-primary-foreground uppercase mb-4">
                    Pronto para o Desafio?
                  </h3>
                  <p className="font-paragraph text-base text-primary-foreground mb-8 max-w-2xl mx-auto">
                    Complete todas as tarefas, missões e desafios deste nível para desbloquear sua recompensa e avançar na jornada.
                  </p>
                  <Link to="/niveis">
                    <button className="bg-primary-foreground text-primary font-paragraph px-10 py-4 uppercase text-sm tracking-wider hover:bg-background hover:text-primary transition-colors">
                      Explorar Mais Níveis
                    </button>
                  </Link>
                </motion.div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
