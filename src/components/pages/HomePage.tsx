import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 w-full pt-32 md:pt-40">
        {/* Hero Section */}
        <section className="w-full max-w-[120rem] mx-auto px-8 md:px-16 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="font-heading text-6xl md:text-8xl text-primary uppercase mb-6 tracking-tight">
              Domínio do Comando
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground mb-12 max-w-2xl mx-auto">
              Conquiste 100 níveis de maestria através de tarefas, missões e batalhas estratégicas. Teste suas habilidades e suba no ranking.
            </p>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center gap-8 mb-16"
          >
            <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
              <Link 
                to="/niveis"
                className="px-8 py-4 bg-primary text-primary-foreground font-heading text-lg uppercase hover:bg-opacity-90 transition-all"
              >
                Explorar Níveis
              </Link>
              <Link 
                to="/regras"
                className="px-8 py-4 border-2 border-primary text-primary font-heading text-lg uppercase hover:bg-primary hover:text-primary-foreground transition-all"
              >
                Ver Regras
              </Link>
            </div>
          </motion.div>

          {/* Features Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20"
          >
            <div className="p-8 bg-primary/10 border border-primary">
              <h3 className="font-heading text-2xl text-primary uppercase mb-4">100 Níveis</h3>
              <p className="font-paragraph text-sm text-foreground">
                Progresse através de 100 níveis desafiadores, cada um com dificuldade crescente.
              </p>
            </div>
            <div className="p-8 bg-primary/10 border border-primary">
              <h3 className="font-heading text-2xl text-primary uppercase mb-4">Desafios Variados</h3>
              <p className="font-paragraph text-sm text-foreground">
                Tarefas, missões e batalhas estratégicas para testar suas habilidades.
              </p>
            </div>
            <div className="p-8 bg-primary/10 border border-primary">
              <h3 className="font-heading text-2xl text-primary uppercase mb-4">Recompensas</h3>
              <p className="font-paragraph text-sm text-foreground">
                Desbloqueie recompensas exclusivas ao completar cada nível com sucesso.
              </p>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
