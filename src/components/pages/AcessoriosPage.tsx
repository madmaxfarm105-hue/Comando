import { useState, useEffect } from 'react';
import { BaseCrudService } from '@/integrations';
import { ColeesdeAcessrios } from '@/entities';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Image } from '@/components/ui/image';

const ACCESSORY_TYPES = [
  { name: 'Anel', icon: '💍' },
  { name: 'Pulseira', icon: '⌚' },
  { name: 'Corrente', icon: '⛓️' },
  { name: 'Bolsa', icon: '👜' },
  { name: 'Relógio', icon: '⏰' },
  { name: 'Óculos de Sol', icon: '🕶️' },
];

export default function AcessoriosPage() {
  const [collections, setCollections] = useState<ColeesdeAcessrios[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCollections = async () => {
      try {
        const result = await BaseCrudService.getAll<ColeesdeAcessrios>('colecoesdeacessorios', [], { limit: 100 });
        const sorted = result.items.sort((a, b) => (a.level || 0) - (b.level || 0));
        setCollections(sorted);
      } catch (error) {
        console.error('Erro ao carregar coleções:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCollections();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (collections.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-xl font-paragraph">Nenhuma coleção encontrada</p>
      </div>
    );
  }

  const currentCollection = collections[currentIndex];
  const mainColor = currentCollection.mainColor || '#FFD700';
  const bgImage = currentCollection.themeBackgroundImage || 'https://static.wixstatic.com/media/50f4bf_ed2e2332548b4d3282734e26fbc11ec4~mv2.png?originWidth=1152&originHeight=576';

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? collections.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === collections.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header da Coleção */}
      <div className="w-full max-w-[100rem] mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="font-heading text-6xl mb-2" style={{ color: mainColor }}>
            {currentCollection.collectionName}
          </h1>
          <p className="font-paragraph text-lg text-foreground">
            Nível {currentCollection.level} • {currentCollection.themeDescription}
          </p>
        </div>
      </div>

      {/* Background Temático com Acessórios */}
      <div
        className="w-full py-16 relative"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        {/* Overlay para melhor legibilidade */}
        <div className="absolute inset-0 bg-black/20"></div>

        <div className="relative z-10 w-full max-w-[100rem] mx-auto px-4">
          {/* Grid de Acessórios */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {ACCESSORY_TYPES.map((accessory, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center justify-center p-8 rounded-lg backdrop-blur-sm"
                style={{
                  backgroundColor: `${mainColor}20`,
                  border: `2px solid ${mainColor}`,
                }}
              >
                {/* Ícone do Acessório */}
                <div className="text-6xl mb-4">{accessory.icon}</div>

                {/* Nome do Acessório */}
                <h3
                  className="font-heading text-2xl font-bold text-center"
                  style={{ color: mainColor }}
                >
                  {accessory.name}
                </h3>

                {/* Descrição */}
                <p className="font-paragraph text-sm text-foreground mt-2 text-center opacity-80">
                  Coleção {currentCollection.collectionName}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navegação */}
      <div className="w-full max-w-[100rem] mx-auto px-4 py-12">
        <div className="flex items-center justify-between">
          <Button
            onClick={handlePrevious}
            variant="outline"
            size="lg"
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-5 h-5" />
            Coleção Anterior
          </Button>

          {/* Indicador de Página */}
          <div className="text-center">
            <p className="font-paragraph text-lg font-bold">
              {currentIndex + 1} / {collections.length}
            </p>
            <p className="font-paragraph text-sm text-foreground/70">
              Nível {currentCollection.level}
            </p>
          </div>

          <Button
            onClick={handleNext}
            variant="outline"
            size="lg"
            className="flex items-center gap-2"
          >
            Próxima Coleção
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Barra de Progresso */}
        <div className="mt-8 w-full bg-secondary rounded-full h-2 overflow-hidden">
          <div
            className="h-full transition-all duration-300"
            style={{
              width: `${((currentIndex + 1) / collections.length) * 100}%`,
              backgroundColor: currentCollection.mainColor || '#FFD700',
            }}
          ></div>
        </div>
      </div>

      {/* Grid de Miniaturas para Navegação Rápida */}
      <div className="w-full max-w-[100rem] mx-auto px-4 py-12">
        <h2 className="font-heading text-2xl mb-6">Todas as Coleções</h2>
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-10 gap-2">
          {collections.map((collection, idx) => (
            <button
              key={collection._id}
              onClick={() => setCurrentIndex(idx)}
              className={`aspect-square rounded-lg transition-all duration-200 border-2 flex items-center justify-center font-heading font-bold text-sm ${
                idx === currentIndex
                  ? 'ring-4 ring-offset-2 scale-110'
                  : 'hover:scale-105'
              }`}
              style={{
                backgroundColor: collection.mainColor || '#FFD700',
                borderColor: collection.mainColor || '#FFD700',
                color: '#fff',
                textShadow: '0 1px 2px rgba(0,0,0,0.5)',
              }}
              title={`Nível ${collection.level}`}
            >
              {collection.level}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
