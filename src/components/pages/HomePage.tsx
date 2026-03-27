// HPI 1.7-V
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ChevronRight, ArrowDownRight, Crosshair, Terminal, ShieldAlert } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { NveisdoJogo } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';

export default function HomePage() {
  const [featuredLevels, setFeaturedLevels] = useState<NveisdoJogo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Refs for scroll animations
  const heroRef = useRef<HTMLDivElement>(null);
  const protocolRef = useRef<HTMLDivElement>(null);
  const levelsRef = useRef<HTMLDivElement>(null);

  // Scroll Progress
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const { scrollYProgress: protocolProgress } = useScroll({
    target: protocolRef,
    offset: ["start end", "end start"]
  });

  // Parallax Transforms
  const yHeroText = useTransform(heroProgress, [0, 1], [0, 300]);
  const yHeroShapes = useTransform(heroProgress, [0, 1], [0, -200]);
  const rotateHeroShapes = useTransform(heroProgress, [0, 1], [0, 45]);
  const opacityHero = useTransform(heroProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    loadFeaturedLevels();
  }, []);

  const loadFeaturedLevels = async () => {
    try {
      const result = await BaseCrudService.getAll<NveisdoJogo>('niveis', [], { limit: 3 });
      setFeaturedLevels(result.items);
    } catch (error) {
      console.error('Failed to load levels:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
      <style>{`
        .noise-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          pointer-events: none;
          z-index: 50;
          opacity: 0.4;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          mix-blend-mode: overlay;
        }
        
        .jagged-circle {
          clip-path: polygon(
            50% 0%, 54% 2%, 58% 0%, 62% 3%, 66% 1%, 70% 4%, 74% 2%, 78% 6%, 81% 4%, 85% 8%, 
            88% 6%, 91% 11%, 93% 9%, 96% 14%, 97% 12%, 99% 18%, 100% 16%, 100% 22%, 98% 20%, 
            99% 26%, 97% 25%, 98% 31%, 95% 30%, 96% 36%, 93% 35%, 93% 41%, 90% 40%, 90% 46%, 
            87% 46%, 86% 52%, 83% 51%, 82% 57%, 79% 56%, 77% 62%, 74% 61%, 72% 67%, 69% 65%, 
            66% 71%, 63% 69%, 60% 75%, 57% 73%, 53% 78%, 50% 76%, 47% 81%, 44% 79%, 40% 84%, 
            37% 82%, 33% 87%, 30% 84%, 26% 89%, 23% 86%, 19% 90%, 16% 87%, 13% 91%, 10% 88%, 
            7% 91%, 5% 87%, 3% 90%, 1% 86%, 0% 88%, 0% 82%, 2% 84%, 1% 78%, 3% 80%, 2% 74%, 
            5% 75%, 4% 69%, 7% 70%, 6% 64%, 9% 65%, 9% 59%, 12% 60%, 12% 54%, 15% 54%, 15% 48%, 
            18% 49%, 19% 43%, 22% 44%, 23% 38%, 26% 39%, 28% 33%, 31% 35%, 34% 29%, 37% 31%, 
            40% 25%, 43% 27%, 47% 22%, 50% 24%
          );
        }

        .stepped-edge {
          clip-path: polygon(
            0% 0%, 10% 0%, 10% 5%, 20% 5%, 20% 10%, 30% 10%, 30% 15%, 40% 15%, 40% 20%, 
            50% 20%, 50% 25%, 60% 25%, 60% 30%, 70% 30%, 70% 35%, 80% 35%, 80% 40%, 
            90% 40%, 90% 45%, 100% 45%, 100% 100%, 0% 100%
          );
        }

        .text-outline {
          -webkit-text-stroke: 2px var(--tw-colors-primary);
          color: transparent;
        }
      `}</style>

      <div className="noise-overlay" />
      <Header />

      {/* HERO SECTION - The Zeko Replication */}
      <section ref={heroRef} className="relative w-full min-h-[110vh] flex items-center overflow-hidden pt-20">
        {/* Abstract Background Elements */}
        <motion.div 
          style={{ y: yHeroShapes, rotate: rotateHeroShapes }}
          className="absolute top-[-20%] right-[-10%] w-[80vw] h-[80vw] rounded-full border-[8vw] border-abstractshape/40 border-dashed opacity-60 mix-blend-multiply"
        />
        <motion.div 
          style={{ y: yHeroShapes, rotate: useTransform(heroProgress, [0, 1], [0, -30]) }}
          className="absolute bottom-[-30%] left-[-20%] w-[90vw] h-[90vw] rounded-full border-[6vw] border-abstractshape/30 border-dotted opacity-50 mix-blend-multiply"
        />

        {/* Crosshairs / Markers */}
        <div className="absolute top-32 left-12 md:left-24 flex flex-col items-center gap-1 opacity-50">
          <div className="w-[1px] h-4 bg-primary" />
          <div className="w-4 h-[1px] bg-primary" />
        </div>
        <div className="absolute bottom-32 right-12 md:right-24 flex flex-col items-center gap-1 opacity-50">
          <div className="w-4 h-[1px] bg-primary" />
          <div className="w-[1px] h-4 bg-primary" />
        </div>

        <div className="relative w-full max-w-[120rem] mx-auto px-6 md:px-12 lg:px-24 z-10">
          <motion.div style={{ y: yHeroText, opacity: opacityHero }} className="relative">
            
            {/* Editorial Annotations */}
            <div className="absolute top-0 left-0 md:-left-12 -translate-y-full mb-8 font-paragraph text-xs md:text-sm text-primary uppercase tracking-widest flex flex-col gap-1">
              <span className="flex items-center gap-2"><Terminal size={14} /> SYS.INIT</span>
              <span>NÍVEL 01 — 100</span>
            </div>

            <div className="absolute bottom-0 right-0 md:-right-12 translate-y-full mt-8 font-paragraph text-xs md:text-sm text-primary uppercase tracking-widest text-right flex flex-col gap-1">
              <span>STATUS: ATIVO</span>
              <span>ACESSO RESTRITO</span>
            </div>

            {/* Massive Typography */}
            <h1 className="font-heading text-[18vw] md:text-[15vw] leading-[0.8] text-primary uppercase tracking-tighter mix-blend-multiply flex flex-col">
              <motion.span 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="block"
              >
                DOMÍNIO
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="block ml-[10vw] md:ml-[15vw] text-outline"
              >
                DO
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="block"
              >
                COMANDO
              </motion.span>
            </h1>

            {/* Action Area */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="mt-16 md:mt-24 flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-16"
            >
              <div className="max-w-md">
                <p className="font-paragraph text-sm md:text-base text-foreground leading-relaxed">
                  A JORNADA DEFINITIVA. CONQUISTE O COMANDO ATRAVÉS DE TAREFAS, MISSÕES E BATALHAS ESTRATÉGICAS. O FRACASSO NÃO É UMA OPÇÃO.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link to="/niveis">
                  <button className="group relative bg-primary text-primary-foreground font-paragraph px-8 py-4 uppercase text-sm tracking-widest overflow-hidden">
                    <span className="relative z-10 flex items-center gap-2">
                      Iniciar Protocolo <ArrowDownRight size={16} className="group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-foreground transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out" />
                  </button>
                </Link>
                <Link to="/regras">
                  <button className="group bg-transparent border border-primary text-primary font-paragraph px-8 py-4 uppercase text-sm tracking-widest hover:bg-primary hover:text-primary-foreground transition-colors duration-300">
                    Manual do Usuário
                  </button>
                </Link>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* THE PROTOCOL - Sticky Narrative Section */}
      <section ref={protocolRef} className="relative w-full bg-foreground text-background py-32 md:py-48">
        <div className="max-w-[120rem] mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            
            {/* Sticky Left Column */}
            <div className="lg:col-span-5">
              <div className="sticky top-32">
                <div className="flex items-center gap-4 mb-8">
                  <Crosshair className="text-primary-foreground" size={24} />
                  <span className="font-paragraph text-sm uppercase tracking-widest text-primary-foreground">Metodologia</span>
                </div>
                <h2 className="font-heading text-6xl md:text-8xl uppercase leading-none mb-8">
                  COMO<br/>FUNCIONA
                </h2>
                <p className="font-paragraph text-base text-background/70 max-w-md mb-12">
                  A ascensão ao nível 100 exige disciplina, estratégia e execução impecável. Entenda as fases do seu desenvolvimento.
                </p>
                
                {/* Decorative Element */}
                <div className="w-full h-[1px] bg-background/20 relative">
                  <motion.div 
                    className="absolute top-0 left-0 h-full bg-primary-foreground"
                    style={{ width: useTransform(protocolProgress, [0, 1], ["0%", "100%"]) }}
                  />
                </div>
              </div>
            </div>

            {/* Scrolling Right Column */}
            <div className="lg:col-span-7 space-y-32 pt-16 lg:pt-0">
              {[
                { num: "01", title: "Complete Tarefas", desc: "Cada nível apresenta tarefas específicas que testam suas habilidades e conhecimento fundamental. A base de tudo." },
                { num: "02", title: "Cumpra Missões", desc: "Missões complexas que exigem estratégia e planejamento para serem concluídas. Onde a teoria encontra a prática." },
                { num: "03", title: "Vença Batalhas", desc: "Enfrente desafios épicos que colocam à prova tudo o que você aprendeu. O teste definitivo de capacidade." },
                { num: "04", title: "Receba Recompensas", desc: "Conquiste recompensas exclusivas e avance para o próximo nível de maestria. O ciclo se repete, mais difícil." }
              ].map((step, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20%" }}
                  transition={{ duration: 0.6 }}
                  className="relative pl-8 md:pl-16 border-l border-background/20"
                >
                  <span className="absolute top-0 left-0 -translate-x-1/2 bg-foreground text-primary-foreground font-paragraph text-sm py-2 px-1">
                    {step.num}
                  </span>
                  <h3 className="font-heading text-4xl md:text-5xl uppercase mb-4 text-primary-foreground">{step.title}</h3>
                  <p className="font-paragraph text-base md:text-lg text-background/80 max-w-xl">
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* FEATURED LEVELS - Data Fidelity & Asymmetrical Layout */}
      <section ref={levelsRef} className="relative w-full bg-primary py-32 md:py-48 overflow-hidden">
        {/* Background Texture */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, var(--tw-colors-primary-foreground) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        
        <div className="relative w-full max-w-[120rem] mx-auto px-6 md:px-12 lg:px-24">
          
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <div>
              <h2 className="font-heading text-6xl md:text-8xl text-primary-foreground uppercase leading-none mb-6">
                PRIMEIROS<br/>DESAFIOS
              </h2>
              <p className="font-paragraph text-background max-w-xl">
                Inicie sua jornada pelos níveis iniciais e descubra o que te aguarda no caminho para o domínio total. Os dados abaixo são extraídos diretamente do núcleo do sistema.
              </p>
            </div>
            <Link to="/niveis">
              <button className="bg-primary-foreground text-primary font-paragraph px-8 py-4 uppercase text-sm tracking-widest hover:bg-background transition-colors">
                Acessar Banco de Dados
              </button>
            </Link>
          </div>

          <div className="relative min-h-[60vh]">
            {/* Loading State handled via CSS opacity to prevent ref crashes */}
            <div className={`transition-opacity duration-500 ${isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'} absolute inset-0 flex items-center justify-center`}>
              <div className="font-paragraph text-primary-foreground animate-pulse flex items-center gap-4">
                <Terminal size={20} /> CARREGANDO DADOS DO SISTEMA...
              </div>
            </div>

            <div className={`transition-opacity duration-1000 ${!isLoading ? 'opacity-100' : 'opacity-0'}`}>
              {featuredLevels.length > 0 ? (
                <div className="space-y-32 md:space-y-48">
                  {featuredLevels.map((level, index) => {
                    const isEven = index % 2 === 0;
                    return (
                      <motion.div 
                        key={level._id}
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-16 items-center`}
                      >
                        {/* Image Container with Parallax */}
                        <div className="w-full lg:w-3/5 relative h-[50vh] md:h-[70vh] overflow-hidden group">
                          <div className="absolute inset-0 bg-primary/20 z-10 group-hover:bg-transparent transition-colors duration-500" />
                          <Image 
                            src="https://static.wixstatic.com/media/50f4bf_fdba032acff646d6bce59be7606ccce7~mv2.png?originWidth=960&originHeight=512" 
                            alt={level.levelName || 'Level Image'} 
                            className="w-full h-full object-cover grayscale contrast-125 mix-blend-luminosity transform group-hover:scale-105 transition-transform duration-1000"
                          />
                          {/* Decorative Corner Brackets */}
                          <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-primary-foreground z-20" />
                          <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-primary-foreground z-20" />
                        </div>

                        {/* Content Card */}
                        <div className={`w-full lg:w-2/5 ${isEven ? 'lg:-ml-24' : 'lg:-mr-24'} z-30`}>
                          <div className="bg-background p-8 md:p-12 shadow-2xl relative">
                            <div className="absolute top-0 left-0 w-full h-1 bg-primary-foreground" />
                            
                            <div className="flex items-center justify-between mb-8">
                              <span className="font-paragraph text-sm text-primary uppercase tracking-widest">
                                Nível {level.levelNumber?.toString().padStart(2, '0')}
                              </span>
                              <ShieldAlert className="text-primary" size={20} />
                            </div>
                            
                            <h3 className="font-heading text-4xl md:text-5xl text-primary uppercase mb-6 leading-tight">
                              {level.levelName}
                            </h3>
                            
                            <p className="font-paragraph text-sm md:text-base text-foreground/80 mb-8 line-clamp-4">
                              {level.levelDescription}
                            </p>
                            
                            <Link to={`/niveis/${level._id}`}>
                              <button className="group flex items-center gap-4 font-paragraph text-sm uppercase tracking-widest text-primary hover:text-primary-foreground transition-colors">
                                <span className="border-b border-primary group-hover:border-primary-foreground pb-1">Detalhes da Missão</span>
                                <ChevronRight size={16} className="group-hover:translate-x-2 transition-transform" />
                              </button>
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-32 border border-primary-foreground/20">
                  <p className="font-paragraph text-primary-foreground uppercase tracking-widest">Nenhum registro encontrado no banco de dados.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION - The Arsenal / Rules */}
      <section className="relative w-full min-h-[80vh] flex items-center justify-center bg-background overflow-hidden py-32">
        {/* Massive Background Text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
          <h2 className="font-heading text-[30vw] text-primary uppercase leading-none whitespace-nowrap">
            REGRAS
          </h2>
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block bg-primary px-4 py-2 mb-8">
              <span className="font-paragraph text-xs text-primary-foreground uppercase tracking-widest">Aviso do Sistema</span>
            </div>
            <h2 className="font-heading text-5xl md:text-7xl text-primary uppercase mb-8 leading-tight">
              A IGNORÂNCIA NÃO É DESCULPA PARA O FRACASSO.
            </h2>
            <p className="font-paragraph text-base md:text-lg text-foreground/80 mb-12 max-w-2xl mx-auto">
              Antes de iniciar sua jornada, é imperativo compreender as leis que regem este domínio. Leia o manual. Sobreviva.
            </p>
            
            <Link to="/regras">
              <button className="relative group inline-flex items-center justify-center px-12 py-6 font-paragraph text-sm uppercase tracking-widest text-background bg-foreground overflow-hidden">
                <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black"></span>
                <span className="relative z-10 flex items-center gap-3">
                  Acessar Regras do Jogo <ArrowDownRight size={18} className="group-hover:rotate-[-45deg] transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-primary transform scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-500 ease-out" />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}