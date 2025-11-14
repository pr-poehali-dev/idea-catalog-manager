import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

type Idea = {
  id: string;
  imageUrl: string;
  description: string;
  tags: {
    productType?: string[];
    technique?: string[];
    material?: string[];
  };
  status: 'inbox' | 'processed';
};

const mockIdeas: Idea[] = [
  {
    id: '1',
    imageUrl: 'https://cdn.poehali.dev/projects/14e4722d-3d0b-4eff-b770-bd2d7db820d9/files/a6fd9309-1c5c-4cd0-bcfe-a83c0d6d0245.jpg',
    description: 'Минималистичный обеденный стол из массива дуба с коническими ножками',
    tags: {
      productType: ['Стол'],
      technique: ['Шиповое соединение'],
      material: ['Дуб', 'Массив'],
    },
    status: 'processed',
  },
  {
    id: '2',
    imageUrl: 'https://cdn.poehali.dev/projects/14e4722d-3d0b-4eff-b770-bd2d7db820d9/files/8ed24d04-c302-4a95-8b89-cc70d07a706c.jpg',
    description: 'Детали японских соединений без использования крепежа',
    tags: {
      productType: ['Элемент'],
      technique: ['Японские соединения', 'Mortise & Tenon'],
      material: ['Дуб'],
    },
    status: 'processed',
  },
  {
    id: '3',
    imageUrl: 'https://cdn.poehali.dev/projects/14e4722d-3d0b-4eff-b770-bd2d7db820d9/files/399612b2-bd49-4676-a05d-41a602e5b369.jpg',
    description: 'Эскиз стула в скандинавском стиле с элегантной спинкой',
    tags: {
      productType: ['Стул'],
      technique: ['Гнутье'],
      material: ['Ясень'],
    },
    status: 'inbox',
  },
];

const Index = () => {
  const [activeSection, setActiveSection] = useState<'inbox' | 'catalog' | 'projects'>('catalog');
  const [selectedIdea, setSelectedIdea] = useState<Idea | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredIdeas = mockIdeas.filter(idea => {
    if (activeSection === 'inbox') return idea.status === 'inbox';
    if (activeSection === 'catalog') return idea.status === 'processed';
    return false;
  });

  const displayedIdeas = filteredIdeas.filter(idea =>
    idea.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-background">
      <aside className="w-64 border-r border-border bg-sidebar flex flex-col">
        <div className="p-6 border-b border-sidebar-border">
          <h1 className="text-2xl font-heading font-bold text-sidebar-foreground flex items-center gap-2">
            <Icon name="Hammer" size={28} className="text-primary" />
            Мастерская
          </h1>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Button
            variant={activeSection === 'inbox' ? 'default' : 'ghost'}
            className="w-full justify-start"
            onClick={() => setActiveSection('inbox')}
          >
            <Icon name="Inbox" size={20} className="mr-2" />
            Входящие
            <Badge variant="secondary" className="ml-auto">
              {mockIdeas.filter(i => i.status === 'inbox').length}
            </Badge>
          </Button>

          <Button
            variant={activeSection === 'catalog' ? 'default' : 'ghost'}
            className="w-full justify-start"
            onClick={() => setActiveSection('catalog')}
          >
            <Icon name="Grid3x3" size={20} className="mr-2" />
            Каталог
          </Button>

          <Button
            variant={activeSection === 'projects' ? 'default' : 'ghost'}
            className="w-full justify-start"
            onClick={() => setActiveSection('projects')}
          >
            <Icon name="FolderOpen" size={20} className="mr-2" />
            Проекты
          </Button>
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <Button variant="outline" className="w-full justify-start">
            <Icon name="Settings" size={20} className="mr-2" />
            Настройки
          </Button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="border-b border-border p-6 bg-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-3xl font-heading font-bold text-foreground">
              {activeSection === 'inbox' && 'Входящие'}
              {activeSection === 'catalog' && 'Каталог идей'}
              {activeSection === 'projects' && 'Проекты'}
            </h2>
            <Button>
              <Icon name="Plus" size={20} className="mr-2" />
              Добавить
            </Button>
          </div>

          <div className="relative">
            <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Поиск по описанию или тегам..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6">
          {activeSection === 'projects' ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Icon name="FolderOpen" size={64} className="mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-heading font-semibold mb-2">Проектов пока нет</h3>
                <p className="text-muted-foreground mb-6">Создайте первый проект из идей каталога</p>
                <Button>
                  <Icon name="Plus" size={20} className="mr-2" />
                  Создать проект
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {displayedIdeas.map((idea) => (
                <div
                  key={idea.id}
                  className="group cursor-pointer animate-fade-in"
                  onClick={() => setSelectedIdea(idea)}
                >
                  <div className="relative overflow-hidden rounded-lg bg-card border border-border transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    <div className="aspect-[3/4] overflow-hidden">
                      <img
                        src={idea.imageUrl}
                        alt={idea.description}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-white text-sm font-medium line-clamp-2">
                        {idea.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {idea.tags.productType?.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {idea.tags.technique?.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Dialog open={!!selectedIdea} onOpenChange={() => setSelectedIdea(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedIdea && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-heading">Детали идеи</DialogTitle>
              </DialogHeader>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="rounded-lg overflow-hidden">
                  <img
                    src={selectedIdea.imageUrl}
                    alt={selectedIdea.description}
                    className="w-full h-auto"
                  />
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground mb-2">Описание</h3>
                    <p className="text-foreground">{selectedIdea.description}</p>
                  </div>

                  {selectedIdea.tags.productType && selectedIdea.tags.productType.length > 0 && (
                    <div>
                      <h3 className="text-sm font-semibold text-muted-foreground mb-2">Тип изделия</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedIdea.tags.productType.map((tag) => (
                          <Badge key={tag} variant="secondary">{tag}</Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedIdea.tags.technique && selectedIdea.tags.technique.length > 0 && (
                    <div>
                      <h3 className="text-sm font-semibold text-muted-foreground mb-2">Техника</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedIdea.tags.technique.map((tag) => (
                          <Badge key={tag} variant="outline">{tag}</Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedIdea.tags.material && selectedIdea.tags.material.length > 0 && (
                    <div>
                      <h3 className="text-sm font-semibold text-muted-foreground mb-2">Материал</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedIdea.tags.material.map((tag) => (
                          <Badge key={tag}>{tag}</Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-4 flex gap-2">
                    <Button className="flex-1">
                      <Icon name="Plus" size={20} className="mr-2" />
                      Добавить в проект
                    </Button>
                    <Button variant="outline">
                      <Icon name="Share2" size={20} />
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
