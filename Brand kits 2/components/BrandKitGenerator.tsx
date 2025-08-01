import React, { useState } from 'react';
import { 
  brandPalettes, 
  BrandPalette, 
  getPalettesByLevel, 
  getPalettesByTheme,
  exportPaletteAsCSS,
  exportPaletteAsJSON,
  exportPaletteAsSCSS,
  exportPaletteAsJavaScript,
  exportPaletteAsSketch,
  exportPaletteAsFigma
} from './BrandPalettes';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Avatar } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Calendar } from './ui/calendar';
import { Switch } from './ui/switch';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { 
  TrendingUp, TrendingDown, Play, Users, MessageCircle, 
  ShoppingCart, Star, BookOpen, BarChart3, Wallet,
  Bell, Settings, Search, Filter, Download, CreditCard,
  Heart, Lock, Unlock, Video, Clock, Trophy, Target,
  Globe, Zap, Shield, Gift, ThumbsUp, MessageSquare,
  Eye, ChevronRight, Plus, Menu, X, Home, User,
  Calendar as CalendarIcon, Phone, Mail, MapPin,
  CheckCircle, AlertCircle, Info, Award, Briefcase,
  PieChart, Activity, DollarSign, Package, Truck,
  Edit, Trash2, Share2, Bookmark, Flag, ArrowUp,
  ArrowDown, MoreHorizontal, Copy, ExternalLink,
  Headphones, Camera, Mic, FileText, Upload,
  Monitor, Smartphone, Tablet, Wifi, Volume2,
  Sun, Moon, Palette, Code, Layers
} from 'lucide-react';

interface BrandKitGeneratorProps {}

export function BrandKitGenerator({}: BrandKitGeneratorProps) {
  const [selectedPalette, setSelectedPalette] = useState<BrandPalette>(brandPalettes[0]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [currentVideo, setCurrentVideo] = useState(0);
  const [themeFilter, setThemeFilter] = useState<'all' | 'light' | 'dark'>('all');
  const [levelFilter, setLevelFilter] = useState<'all' | 'conservative' | 'moderate' | 'bold'>('all');
  const [showExportModal, setShowExportModal] = useState(false);
  const [cartItems, setCartItems] = useState([
    { id: 1, title: "Основи крипто-трейдингу", price: 99, quantity: 1 },
    { id: 2, title: "Технічний аналіз Bitcoin", price: 199, quantity: 1 }
  ]);

  const applyPalette = (palette: BrandPalette) => {
    const root = document.documentElement;
    root.style.setProperty('--demo-primary', palette.colors.primary);
    root.style.setProperty('--demo-secondary', palette.colors.secondary);
    root.style.setProperty('--demo-background', palette.colors.background);
    root.style.setProperty('--demo-surface', palette.colors.surface);
    root.style.setProperty('--demo-text', palette.colors.text);
    root.style.setProperty('--demo-text-muted', palette.colors.textMuted);
    root.style.setProperty('--demo-border', palette.colors.border);
    root.style.setProperty('--demo-success', palette.colors.success);
    root.style.setProperty('--demo-warning', palette.colors.warning);
    root.style.setProperty('--demo-error', palette.colors.error);
  };

  React.useEffect(() => {
    applyPalette(selectedPalette);
  }, [selectedPalette]);

  const getLevelBadgeColor = (level: string) => {
    switch (level) {
      case 'conservative': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'moderate': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'bold': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  const getThemeBadgeColor = (theme: string) => {
    switch (theme) {
      case 'light': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'dark': return 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  const filteredPalettes = brandPalettes.filter(palette => {
    const themeMatch = themeFilter === 'all' || palette.theme === themeFilter;
    const levelMatch = levelFilter === 'all' || palette.level === levelFilter;
    return themeMatch && levelMatch;
  });

  const handleExportPalette = (format: string) => {
    let content = '';
    let filename = '';
    let mimeType = 'text/plain';

    switch (format) {
      case 'css':
        content = exportPaletteAsCSS(selectedPalette);
        filename = `${selectedPalette.name.replace(/\s+/g, '-').toLowerCase()}.css`;
        mimeType = 'text/css';
        break;
      case 'scss':
        content = exportPaletteAsSCSS(selectedPalette);
        filename = `${selectedPalette.name.replace(/\s+/g, '-').toLowerCase()}.scss`;
        mimeType = 'text/scss';
        break;
      case 'json':
        content = exportPaletteAsJSON(selectedPalette);
        filename = `${selectedPalette.name.replace(/\s+/g, '-').toLowerCase()}.json`;
        mimeType = 'application/json';
        break;
      case 'js':
        content = exportPaletteAsJavaScript(selectedPalette);
        filename = `${selectedPalette.name.replace(/\s+/g, '-').toLowerCase()}.js`;
        mimeType = 'text/javascript';
        break;
      case 'sketch':
        content = exportPaletteAsSketch(selectedPalette);
        filename = `${selectedPalette.name.replace(/\s+/g, '-').toLowerCase()}-sketch.json`;
        mimeType = 'application/json';
        break;
      case 'figma':
        content = exportPaletteAsFigma(selectedPalette);
        filename = `${selectedPalette.name.replace(/\s+/g, '-').toLowerCase()}-figma-tokens.json`;
        mimeType = 'application/json';
        break;
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exportFormats = [
    { id: 'css', name: 'CSS Variables', icon: Code, desc: 'CSS кастомні властивості' },
    { id: 'scss', name: 'SCSS Variables', icon: Code, desc: 'SCSS змінні для Sass' },
    { id: 'json', name: 'JSON', icon: FileText, desc: 'Структурований JSON формат' },
    { id: 'js', name: 'JavaScript', icon: Code, desc: 'ES6 модуль експорт' },
    { id: 'sketch', name: 'Sketch', icon: Layers, desc: 'Для Sketch App' },
    { id: 'figma', name: 'Figma Tokens', icon: Palette, desc: 'Figma дизайн токени' }
  ];

  const videos = [
    { title: "Що таке криптовалюта?", duration: "15:30", views: "12.5k", instructor: "Олександр П." },
    { title: "Читання графіків", duration: "22:45", views: "8.9k", instructor: "Марія К." },
    { title: "Управління ризиками", duration: "18:20", views: "15.2k", instructor: "Іван М." },
    { title: "DeFi протоколи", duration: "28:15", views: "7.8k", instructor: "Анна С." }
  ];

  const forumTopics = [
    { title: "Що думаєте про нові ETF на Bitcoin?", replies: 234, author: "CryptoGuru", time: "2 год" },
    { title: "Стратегія DCA - поділіться досвідом", replies: 156, author: "TradingPro", time: "4 год" },
    { title: "Аналіз Ethereum після оновлення", replies: 89, author: "EthExpert", time: "6 год" },
    { title: "Альткоїни з потенціалом 2024", replies: 312, author: "AltSeeker", time: "8 год" }
  ];

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: 'var(--demo-background)' }}>
      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto" 
                style={{ backgroundColor: 'var(--demo-surface)' }}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold" style={{ color: 'var(--demo-text)' }}>
                  Експорт палітри: {selectedPalette.name}
                </h2>
                <Button variant="ghost" size="sm" onClick={() => setShowExportModal(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {exportFormats.map((format) => (
                  <Card key={format.id} 
                        className="p-4 cursor-pointer hover:shadow-md transition-shadow"
                        style={{ backgroundColor: 'var(--demo-background)' }}
                        onClick={() => {
                          handleExportPalette(format.id);
                          setShowExportModal(false);
                        }}>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                           style={{ backgroundColor: 'var(--demo-primary)' }}>
                        <format.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium" style={{ color: 'var(--demo-text)' }}>
                          {format.name}
                        </h3>
                        <p className="text-sm" style={{ color: 'var(--demo-text-muted)' }}>
                          {format.desc}
                        </p>
                      </div>
                      <Download className="w-4 h-4" style={{ color: 'var(--demo-text-muted)' }} />
                    </div>
                  </Card>
                ))}
              </div>

              <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: 'var(--demo-background)' }}>
                <h3 className="font-medium mb-3" style={{ color: 'var(--demo-text)' }}>
                  Попередній перегляд (CSS)
                </h3>
                <pre className="text-xs overflow-x-auto p-3 rounded" 
                     style={{ 
                       backgroundColor: 'var(--demo-surface)', 
                       color: 'var(--demo-text)',
                       fontFamily: 'monospace'
                     }}>
                  {exportPaletteAsCSS(selectedPalette)}
                </pre>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Fixed Sidebar - Палітри */}
      <div className="w-80 h-screen sticky top-0 border-r overflow-y-auto" 
           style={{ 
             borderColor: 'var(--demo-border)',
             backgroundColor: 'var(--demo-surface)'
           }}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-bold text-lg" style={{ color: 'var(--demo-text)' }}>
              Brand Kits
            </h2>
            <Badge>{filteredPalettes.length} з {brandPalettes.length}</Badge>
          </div>

          {/* Filters */}
          <div className="space-y-4 mb-6">
            <div>
              <label className="text-sm font-medium mb-2 block" 
                     style={{ color: 'var(--demo-text)' }}>
                Тема
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['all', 'light', 'dark'].map((theme) => (
                  <Button
                    key={theme}
                    variant={themeFilter === theme ? "default" : "outline"}
                    size="sm"
                    onClick={() => setThemeFilter(theme as any)}
                    className="text-xs"
                  >
                    {theme === 'all' ? 'Всі' : theme === 'light' ? 'Світлі' : 'Темні'}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block" 
                     style={{ color: 'var(--demo-text)' }}>
                Рівень
              </label>
              <div className="grid grid-cols-2 gap-2">
                {['all', 'conservative', 'moderate', 'bold'].map((level) => (
                  <Button
                    key={level}
                    variant={levelFilter === level ? "default" : "outline"}
                    size="sm"
                    onClick={() => setLevelFilter(level as any)}
                    className="text-xs"
                  >
                    {level === 'all' ? 'Всі' : 
                     level === 'conservative' ? 'Конс.' : 
                     level === 'moderate' ? 'Помір.' : 'Смілив.'}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Поточна палітра */}
          <Card className="p-4 mb-6" style={{ backgroundColor: 'var(--demo-background)' }}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium" style={{ color: 'var(--demo-text)' }}>
                Поточна палітра
              </h3>
              <Button variant="ghost" size="sm" onClick={() => setShowExportModal(true)}>
                <Download className="w-4 h-4" />
              </Button>
            </div>
            <div className="text-sm font-medium mb-1" style={{ color: 'var(--demo-text)' }}>
              {selectedPalette.name}
            </div>
            <div className="flex items-center space-x-2 mb-3">
              <Badge className={`text-xs ${getLevelBadgeColor(selectedPalette.level)}`}>
                {selectedPalette.level}
              </Badge>
              <Badge className={`text-xs ${getThemeBadgeColor(selectedPalette.theme)}`}>
                {selectedPalette.theme === 'light' ? (
                  <><Sun className="w-3 h-3 mr-1" />світла</>
                ) : (
                  <><Moon className="w-3 h-3 mr-1" />темна</>
                )}
              </Badge>
            </div>
            <div className="text-xs mb-3" style={{ color: 'var(--demo-text-muted)' }}>
              {selectedPalette.description}
            </div>
            <div className="grid grid-cols-5 gap-1">
              {Object.entries(selectedPalette.colors).slice(0, 10).map(([name, color], idx) => (
                <div
                  key={idx}
                  className="w-6 h-6 rounded border cursor-pointer hover:scale-110 transition-transform"
                  style={{ 
                    backgroundColor: color,
                    borderColor: 'var(--demo-border)'
                  }}
                  title={`${name}: ${color}`}
                />
              ))}
            </div>
          </Card>

          {/* Статистика */}
          <div className="grid grid-cols-2 gap-2 mb-6">
            <Card className="p-3 text-center" style={{ backgroundColor: 'var(--demo-background)' }}>
              <div className="text-lg font-bold" style={{ color: 'var(--demo-text)' }}>
                {getPalettesByTheme('light').length}
              </div>
              <div className="text-xs" style={{ color: 'var(--demo-text-muted)' }}>
                Світлих
              </div>
            </Card>
            <Card className="p-3 text-center" style={{ backgroundColor: 'var(--demo-background)' }}>
              <div className="text-lg font-bold" style={{ color: 'var(--demo-text)' }}>
                {getPalettesByTheme('dark').length}
              </div>
              <div className="text-xs" style={{ color: 'var(--demo-text-muted)' }}>
                Темних
              </div>
            </Card>
          </div>

          {/* Список палітр */}
          <div className="space-y-2">
            {filteredPalettes.map((palette) => (
              <div
                key={palette.id}
                className={`p-3 rounded-lg cursor-pointer transition-all border ${
                  selectedPalette.id === palette.id ? 'ring-2' : ''
                }`}
                style={{
                  backgroundColor: selectedPalette.id === palette.id ? 'var(--demo-primary)' : 'transparent',
                  borderColor: 'var(--demo-border)',
                  color: selectedPalette.id === palette.id ? 'white' : 'var(--demo-text)'
                }}
                onClick={() => setSelectedPalette(palette)}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium truncate pr-2">{palette.name}</span>
                  <div className="flex items-center space-x-1">
                    {palette.theme === 'light' ? (
                      <Sun className="w-3 h-3 opacity-60" />
                    ) : (
                      <Moon className="w-3 h-3 opacity-60" />
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <Badge className={`text-xs ${
                    selectedPalette.id === palette.id 
                      ? 'bg-white bg-opacity-20 text-white' 
                      : getLevelBadgeColor(palette.level)
                  }`}>
                    {palette.level}
                  </Badge>
                </div>
                <div className="flex space-x-1">
                  {Object.values(palette.colors).slice(0, 6).map((color, idx) => (
                    <div
                      key={idx}
                      className="w-3 h-3 rounded-sm"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1">
        {/* Header */}
        <header className="border-b sticky top-0 z-10" style={{ 
          borderColor: 'var(--demo-border)',
          backgroundColor: 'var(--demo-surface)'
        }}>
          <div className="px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" 
                       style={{ backgroundColor: 'var(--demo-primary)' }}>
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="font-bold text-xl" style={{ color: 'var(--demo-text)' }}>
                      CryptoTrading Academy
                    </h1>
                    <p className="text-sm" style={{ color: 'var(--demo-text-muted)' }}>
                      Професійна освіта в галузі криптовалют
                    </p>
                  </div>
                </div>
                
                {/* Navigation */}
                <nav className="hidden lg:flex items-center space-x-8">
                  {['Дашборд', 'Курси', 'Торгівля', 'Спільнота', 'Портфоліо'].map((item) => (
                    <a key={item} href="#" className="text-sm hover:opacity-80 transition-opacity"
                       style={{ color: 'var(--demo-text)' }}>
                      {item}
                    </a>
                  ))}
                </nav>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2" 
                          style={{ color: 'var(--demo-text-muted)' }} />
                  <Input 
                    className="pl-10 w-64" 
                    placeholder="Пошук курсів, стратегій..."
                    style={{ backgroundColor: 'var(--demo-background)' }}
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Bell className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4" />
                </Button>
                <Avatar className="w-10 h-10">
                  <div className="w-full h-full rounded-full flex items-center justify-center"
                       style={{ backgroundColor: 'var(--demo-secondary)' }}>
                    <span className="text-white font-medium">УП</span>
                  </div>
                </Avatar>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="p-8">
          <Tabs defaultValue="overview" className="space-y-8">
            <TabsList className="grid w-full grid-cols-8" 
                      style={{ backgroundColor: 'var(--demo-surface)' }}>
              <TabsTrigger value="overview">Огляд</TabsTrigger>
              <TabsTrigger value="courses">Курси</TabsTrigger>
              <TabsTrigger value="videos">Відео</TabsTrigger>
              <TabsTrigger value="trading">Торгівля</TabsTrigger>
              <TabsTrigger value="cart">Корзина</TabsTrigger>
              <TabsTrigger value="calendar">Календар</TabsTrigger>
              <TabsTrigger value="chat">Чат</TabsTrigger>
              <TabsTrigger value="profile">Профіль</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-8">
              {/* Brand Kit Showcase */}
              <Card className="p-8" style={{ 
                backgroundColor: 'var(--demo-primary)',
                color: 'white'
              }}>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">
                      Професійні Brand Kits для Crypto Academy
                    </h2>
                    <p className="text-lg opacity-90">
                      50 унікальних кольорових палітр з світлими та темними варіантами
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Palette className="w-16 h-16 opacity-80" />
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Button className="bg-white text-black hover:bg-gray-100">
                    <Download className="w-4 h-4 mr-2" />
                    Експорт поточної
                  </Button>
                  <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                    <Code className="w-4 h-4 mr-2" />
                    Переглянути код
                  </Button>
                </div>
              </Card>

              {/* Hero Section */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2 p-8" 
                      style={{ 
                        backgroundColor: 'var(--demo-surface)',
                        borderColor: 'var(--demo-border)'
                      }}>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-3xl font-bold mb-2" style={{ color: 'var(--demo-text)' }}>
                        Ласкаво просимо до майбутнього фінансів
                      </h2>
                      <p className="text-lg" style={{ color: 'var(--demo-text-muted)' }}>
                        Освойте навички торгівлі криптовалютами з нашими експертами
                      </p>
                    </div>
                    <Trophy className="w-16 h-16" style={{ color: 'var(--demo-warning)' }} />
                  </div>
                  <div className="flex items-center space-x-4">
                    <Button style={{ backgroundColor: 'var(--demo-primary)', color: 'white' }}>
                      <Play className="w-4 h-4 mr-2" />
                      Почати навчання
                    </Button>
                    <Button variant="outline">
                      Переглянути курси
                    </Button>
                  </div>
                </Card>

                {/* Quick Stats */}
                <div className="space-y-4">
                  <Card className="p-6" style={{ backgroundColor: 'var(--demo-surface)' }}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p style={{ color: 'var(--demo-text-muted)' }}>Ваш прогрес</p>
                        <p className="text-2xl font-bold" style={{ color: 'var(--demo-text)' }}>
                          68%
                        </p>
                      </div>
                      <Target className="w-8 h-8" style={{ color: 'var(--demo-success)' }} />
                    </div>
                    <Progress value={68} className="mt-4" />
                  </Card>

                  <Card className="p-6" style={{ backgroundColor: 'var(--demo-surface)' }}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p style={{ color: 'var(--demo-text-muted)' }}>Активних курсів</p>
                        <p className="text-2xl font-bold" style={{ color: 'var(--demo-text)' }}>
                          3
                        </p>
                      </div>
                      <BookOpen className="w-8 h-8" style={{ color: 'var(--demo-primary)' }} />
                    </div>
                  </Card>

                  <Card className="p-6" style={{ backgroundColor: 'var(--demo-surface)' }}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p style={{ color: 'var(--demo-text-muted)' }}>Зароблених сертифікатів</p>
                        <p className="text-2xl font-bold" style={{ color: 'var(--demo-text)' }}>
                          2
                        </p>
                      </div>
                      <Award className="w-8 h-8" style={{ color: 'var(--demo-warning)' }} />
                    </div>
                  </Card>
                </div>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: Shield, title: 'Безпечне навчання', desc: 'Захищені протоколи та методики' },
                  { icon: Zap, title: 'Швидкі результати', desc: 'Перші прибутки вже через тиждень' },
                  { icon: Users, title: 'Спільнота', desc: '50k+ активних трейдерів' },
                  { icon: Globe, title: 'Глобальний доступ', desc: 'Навчання 24/7 в любій точці світу' }
                ].map((feature, idx) => (
                  <Card key={idx} className="p-6 text-center hover:shadow-lg transition-shadow"
                        style={{ backgroundColor: 'var(--demo-surface)' }}>
                    <feature.icon className="w-12 h-12 mx-auto mb-4" 
                                 style={{ color: 'var(--demo-primary)' }} />
                    <h3 className="font-semibold mb-2" style={{ color: 'var(--demo-text)' }}>
                      {feature.title}
                    </h3>
                    <p className="text-sm" style={{ color: 'var(--demo-text-muted)' }}>
                      {feature.desc}
                    </p>
                  </Card>
                ))}
              </div>

              {/* Market Overview */}
              <Card className="p-6" style={{ backgroundColor: 'var(--demo-surface)' }}>
                <h3 className="font-semibold mb-6" style={{ color: 'var(--demo-text)' }}>
                  Огляд ринку
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {[
                    { coin: 'BTC', price: '$43,250', change: '+2.5%', positive: true },
                    { coin: 'ETH', price: '$2,650', change: '+1.8%', positive: true },
                    { coin: 'BNB', price: '$315', change: '-0.5%', positive: false },
                    { coin: 'ADA', price: '$0.48', change: '+3.2%', positive: true },
                    { coin: 'SOL', price: '$85', change: '+5.1%', positive: true },
                    { coin: 'DOT', price: '$6.2', change: '-1.2%', positive: false }
                  ].map((coin, idx) => (
                    <div key={idx} className="p-4 rounded-lg border"
                         style={{ borderColor: 'var(--demo-border)' }}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium" style={{ color: 'var(--demo-text)' }}>
                          {coin.coin}
                        </span>
                        <div className={`flex items-center text-sm`} 
                             style={{ color: coin.positive ? 'var(--demo-success)' : 'var(--demo-error)' }}>
                          {coin.positive ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
                          {coin.change}
                        </div>
                      </div>
                      <div className="text-lg font-bold" style={{ color: 'var(--demo-text)' }}>
                        {coin.price}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* News & Updates */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="p-6" style={{ backgroundColor: 'var(--demo-surface)' }}>
                  <h3 className="font-semibold mb-4" style={{ color: 'var(--demo-text)' }}>
                    Останні новини
                  </h3>
                  <div className="space-y-4">
                    {[
                      'Bitcoin досяг нового максимуму в $45,000',
                      'Ethereum запустив нове оновлення мережі',
                      'Регуляція криптовалют: останні зміни',
                      'DeFi протоколи показують зростання'
                    ].map((news, idx) => (
                      <div key={idx} className="flex items-center space-x-3 p-3 rounded border"
                           style={{ borderColor: 'var(--demo-border)' }}>
                        <div className="w-2 h-2 rounded-full" 
                             style={{ backgroundColor: 'var(--demo-primary)' }}></div>
                        <span style={{ color: 'var(--demo-text)' }}>{news}</span>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-6" style={{ backgroundColor: 'var(--demo-surface)' }}>
                  <h3 className="font-semibold mb-4" style={{ color: 'var(--demo-text)' }}>
                    Популярні курси
                  </h3>
                  <div className="space-y-4">
                    {[
                      { title: 'Основи Bitcoin', students: '12.5k', rating: 4.8 },
                      { title: 'DeFi Мастер-клас', students: '8.2k', rating: 4.9 },
                      { title: 'NFT для початківців', students: '15.1k', rating: 4.7 },
                      { title: 'Алгоритмічна торгівля', students: '5.8k', rating: 4.9 }
                    ].map((course, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 rounded border"
                           style={{ borderColor: 'var(--demo-border)' }}>
                        <div>
                          <div className="font-medium" style={{ color: 'var(--demo-text)' }}>
                            {course.title}
                          </div>
                          <div className="text-sm" style={{ color: 'var(--demo-text-muted)' }}>
                            {course.students} студентів
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4" style={{ color: 'var(--demo-warning)' }} fill="currentColor" />
                          <span className="text-sm" style={{ color: 'var(--demo-text)' }}>
                            {course.rating}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </TabsContent>

            {/* Courses Tab */}
            <TabsContent value="courses" className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold" style={{ color: 'var(--demo-text)' }}>
                    Каталог курсів
                  </h2>
                  <p style={{ color: 'var(--demo-text-muted)' }}>
                    Виберіть курс відповідно до свого рівня підготовки
                  </p>
                </div>
                <div className="flex space-x-4">
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    Фільтри
                  </Button>
                  <Button variant="outline">
                    <Search className="w-4 h-4 mr-2" />
                    Пошук
                  </Button>
                </div>
              </div>

              {/* Course Categories */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['Початківець', 'Середній', 'Просунутий', 'Експерт'].map((level, idx) => (
                  <Button key={level} variant="outline" className="h-16">
                    <div className="text-center">
                      <div className="font-medium">{level}</div>
                      <div className="text-sm opacity-60">{8 + idx * 3} курсів</div>
                    </div>
                  </Button>
                ))}
              </div>

              {/* Courses Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  { 
                    title: "Криптовалюти від А до Я", 
                    instructor: "Олександр Петренко", 
                    level: "Початківець", 
                    price: "$99", 
                    originalPrice: "$149",
                    lessons: 15, 
                    duration: "8 годин",
                    rating: 4.9,
                    students: "12.5k"
                  },
                  { 
                    title: "Технічний аналіз Bitcoin", 
                    instructor: "Марія Коваленко", 
                    level: "Середній", 
                    price: "$199", 
                    originalPrice: "$299",
                    lessons: 22, 
                    duration: "12 годин",
                    rating: 4.8,
                    students: "8.9k"
                  },
                  { 
                    title: "DeFi та пасивний дохід", 
                    instructor: "Іван Мельник", 
                    level: "Просунутий", 
                    price: "$299", 
                    originalPrice: "$399",
                    lessons: 28, 
                    duration: "16 годин",
                    rating: 4.9,
                    students: "5.8k"
                  },
                  { 
                    title: "Алгоритмічна торгівля", 
                    instructor: "Анна Сидоренко", 
                    level: "Експерт", 
                    price: "$499", 
                    originalPrice: "$699",
                    lessons: 35, 
                    duration: "24 години",
                    rating: 4.9,
                    students: "3.2k"
                  },
                  { 
                    title: "NFT: створення та торгівля", 
                    instructor: "Віктор Лебедєв", 
                    level: "Середній", 
                    price: "$179", 
                    originalPrice: "$249",
                    lessons: 18, 
                    duration: "10 годин",
                    rating: 4.7,
                    students: "9.1k"
                  },
                  { 
                    title: "Смарт-контракти Ethereum", 
                    instructor: "Дмитро Шевченко", 
                    level: "Просунутий", 
                    price: "$399", 
                    originalPrice: "$549",
                    lessons: 30, 
                    duration: "20 годин",
                    rating: 4.8,
                    students: "4.7k"
                  }
                ].map((course, idx) => (
                  <Card key={idx} className="overflow-hidden hover:shadow-xl transition-shadow"
                        style={{ backgroundColor: 'var(--demo-surface)' }}>
                    {/* Course Thumbnail */}
                    <div className="h-48 relative" 
                         style={{ backgroundColor: 'var(--demo-primary)' }}>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Play className="w-16 h-16 text-white opacity-80" />
                      </div>
                      <Badge className="absolute top-4 left-4 bg-white text-black">
                        {course.level}
                      </Badge>
                      <Button size="sm" variant="ghost" 
                              className="absolute top-4 right-4 text-white hover:bg-white hover:text-black">
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="p-6">
                      {/* Course Info */}
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-1">
                          {[1,2,3,4,5].map((star) => (
                            <Star key={star} className="w-4 h-4" 
                                 style={{ color: 'var(--demo-warning)' }} 
                                 fill={star <= Math.floor(course.rating) ? "currentColor" : "none"} />
                          ))}
                          <span className="text-sm ml-2" style={{ color: 'var(--demo-text-muted)' }}>
                            {course.rating} ({course.students})
                          </span>
                        </div>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>

                      <h3 className="font-bold text-lg mb-2" style={{ color: 'var(--demo-text)' }}>
                        {course.title}
                      </h3>

                      <p className="text-sm mb-4" style={{ color: 'var(--demo-text-muted)' }}>
                        Викладач: {course.instructor}
                      </p>

                      {/* Course Details */}
                      <div className="flex items-center justify-between text-sm mb-4"
                           style={{ color: 'var(--demo-text-muted)' }}>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <BookOpen className="w-4 h-4" />
                            <span>{course.lessons} уроків</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{course.duration}</span>
                          </div>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <span className="text-2xl font-bold" 
                                style={{ color: 'var(--demo-primary)' }}>
                            {course.price}
                          </span>
                          <span className="text-sm line-through ml-2" 
                                style={{ color: 'var(--demo-text-muted)' }}>
                            {course.originalPrice}
                          </span>
                        </div>
                        <Badge style={{ backgroundColor: 'var(--demo-success)' }}>
                          ЗНИЖКА
                        </Badge>
                      </div>

                      {/* Actions */}
                      <div className="flex space-x-2">
                        <Button className="flex-1" 
                                style={{ backgroundColor: 'var(--demo-primary)' }}>
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Купити
                        </Button>
                        <Button variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Load More */}
              <div className="text-center">
                <Button variant="outline" size="lg">
                  Завантажити ще курси
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </TabsContent>

            {/* Videos Tab */}
            <TabsContent value="videos" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Video Player */}
                <div className="lg:col-span-2">
                  <Card className="overflow-hidden" style={{ backgroundColor: 'var(--demo-surface)' }}>
                    <div className="aspect-video bg-black relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Button size="lg" className="bg-white bg-opacity-20 hover:bg-opacity-30">
                          <Play className="w-8 h-8 text-white" />
                        </Button>
                      </div>
                      {/* Video Controls */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                        <div className="flex items-center space-x-4 text-white">
                          <Button size="sm" variant="ghost" className="text-white hover:bg-white hover:bg-opacity-20">
                            <Play className="w-4 h-4" />
                          </Button>
                          <div className="flex-1">
                            <Progress value={35} className="h-1" />
                          </div>
                          <span className="text-sm">05:30 / 15:42</span>
                          <Button size="sm" variant="ghost" className="text-white hover:bg-white hover:bg-opacity-20">
                            <Volume2 className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="text-white hover:bg-white hover:bg-opacity-20">
                            <Monitor className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--demo-text)' }}>
                        {videos[currentVideo].title}
                      </h2>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4 text-sm" 
                             style={{ color: 'var(--demo-text-muted)' }}>
                          <span>{videos[currentVideo].views} переглядів</span>
                          <span>Викладач: {videos[currentVideo].instructor}</span>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <ThumbsUp className="w-4 h-4 mr-2" />
                            Подобається
                          </Button>
                          <Button variant="outline" size="sm">
                            <Bookmark className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <p style={{ color: 'var(--demo-text)' }}>
                        У цьому відео ми розглянемо основні принципи роботи з криптовалютами, 
                        навчимося читати графіки та зрозуміємо, як правильно оцінювати ризики.
                      </p>
                    </div>
                  </Card>

                  {/* Comments */}
                  <Card className="mt-6 p-6" style={{ backgroundColor: 'var(--demo-surface)' }}>
                    <h3 className="font-semibold mb-4" style={{ color: 'var(--demo-text)' }}>
                      Коментарі (23)
                    </h3>
                    <div className="space-y-4">
                      <div className="flex space-x-2">
                        <Textarea 
                          placeholder="Додати коментар..."
                          className="flex-1"
                          style={{ backgroundColor: 'var(--demo-background)' }}
                        />
                        <Button style={{ backgroundColor: 'var(--demo-primary)' }}>
                          Відправити
                        </Button>
                      </div>
                      {[
                        { user: 'Андрій К.', text: 'Дуже корисне відео! Дякую за пояснення', time: '2 год' },
                        { user: 'Марина П.', text: 'Можете порекомендувати додаткову літературу?', time: '3 год' },
                        { user: 'Сергій М.', text: 'Чудове пояснення складних концепцій', time: '5 год' }
                      ].map((comment, idx) => (
                        <div key={idx} className="flex space-x-3 p-3 rounded border"
                             style={{ borderColor: 'var(--demo-border)' }}>
                          <Avatar className="w-8 h-8">
                            <div className="w-full h-full rounded-full flex items-center justify-center"
                                 style={{ backgroundColor: 'var(--demo-secondary)' }}>
                              <span className="text-white text-sm">{comment.user[0]}</span>
                            </div>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-medium text-sm" style={{ color: 'var(--demo-text)' }}>
                                {comment.user}
                              </span>
                              <span className="text-xs" style={{ color: 'var(--demo-text-muted)' }}>
                                {comment.time} тому
                              </span>
                            </div>
                            <p className="text-sm" style={{ color: 'var(--demo-text)' }}>
                              {comment.text}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>

                {/* Video Playlist */}
                <div>
                  <Card className="p-6" style={{ backgroundColor: 'var(--demo-surface)' }}>
                    <h3 className="font-semibold mb-4" style={{ color: 'var(--demo-text)' }}>
                      Плейлист курсу
                    </h3>
                    <div className="space-y-3">
                      {videos.map((video, idx) => (
                        <div key={idx} 
                             className={`p-3 rounded cursor-pointer transition-colors ${
                               idx === currentVideo ? 'ring-2' : ''
                             }`}
                             style={{
                               backgroundColor: idx === currentVideo ? 'var(--demo-primary)' : 'transparent',
                               color: idx === currentVideo ? 'white' : 'var(--demo-text)',
                               borderColor: 'var(--demo-border)'
                             }}
                             onClick={() => setCurrentVideo(idx)}>
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded flex items-center justify-center"
                                 style={{ 
                                   backgroundColor: idx === currentVideo ? 'white' : 'var(--demo-primary)',
                                   color: idx === currentVideo ? 'var(--demo-primary)' : 'white'
                                 }}>
                              {idx === currentVideo ? <Play className="w-4 h-4" /> : <span>{idx + 1}</span>}
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-sm">{video.title}</div>
                              <div className="text-xs opacity-75">{video.duration}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>

                  {/* Related Videos */}
                  <Card className="mt-6 p-6" style={{ backgroundColor: 'var(--demo-surface)' }}>
                    <h3 className="font-semibold mb-4" style={{ color: 'var(--demo-text)' }}>
                      Рекомендації
                    </h3>
                    <div className="space-y-3">
                      {[
                        'Основи блокчейну',
                        'Майнінг криптовалют',
                        'Портфельне управління',
                        'Психологія торгівлі'
                      ].map((title, idx) => (
                        <div key={idx} className="flex items-center space-x-3 p-2 rounded hover:bg-opacity-50 cursor-pointer"
                             style={{ backgroundColor: 'var(--demo-background)' }}>
                          <div className="w-16 h-12 rounded" 
                               style={{ backgroundColor: 'var(--demo-primary)' }}>
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-sm" style={{ color: 'var(--demo-text)' }}>
                              {title}
                            </div>
                            <div className="text-xs" style={{ color: 'var(--demo-text-muted)' }}>
                              {Math.floor(Math.random() * 20) + 5}:{Math.floor(Math.random() * 60).toString().padStart(2, '0')}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Trading Tab */}
            <TabsContent value="trading" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Trading Form */}
                <Card className="p-6" style={{ backgroundColor: 'var(--demo-surface)' }}>
                  <h3 className="font-semibold mb-6" style={{ color: 'var(--demo-text)' }}>
                    Створити угоду
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block" 
                             style={{ color: 'var(--demo-text)' }}>
                        Торгова пара
                      </label>
                      <select className="w-full p-3 rounded border" 
                              style={{ 
                                borderColor: 'var(--demo-border)',
                                backgroundColor: 'var(--demo-background)' 
                              }}>
                        <option>BTC/USDT</option>
                        <option>ETH/USDT</option>
                        <option>BNB/USDT</option>
                        <option>ADA/USDT</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-2 block" 
                             style={{ color: 'var(--demo-text)' }}>
                        Тип ордеру
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <Button variant="outline" className="w-full">Market</Button>
                        <Button variant="outline" className="w-full">Limit</Button>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block" 
                             style={{ color: 'var(--demo-text)' }}>
                        Кількість
                      </label>
                      <Input 
                        type="number" 
                        placeholder="0.001" 
                        style={{ backgroundColor: 'var(--demo-background)' }}
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block" 
                             style={{ color: 'var(--demo-text)' }}>
                        Ціна
                      </label>
                      <Input 
                        type="number" 
                        placeholder="43,250" 
                        style={{ backgroundColor: 'var(--demo-background)' }}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-4">
                      <Button className="w-full" style={{ backgroundColor: 'var(--demo-success)' }}>
                        <TrendingUp className="w-4 h-4 mr-2" />
                        Купити
                      </Button>
                      <Button className="w-full" style={{ backgroundColor: 'var(--demo-error)' }}>
                        <TrendingDown className="w-4 h-4 mr-2" />
                        Продати
                      </Button>
                    </div>

                    <div className="pt-4 border-t" style={{ borderColor: 'var(--demo-border)' }}>
                      <div className="text-sm" style={{ color: 'var(--demo-text-muted)' }}>
                        Доступно: <span style={{ color: 'var(--demo-text)' }}>$2,450.00</span>
                      </div>
                      <div className="text-sm" style={{ color: 'var(--demo-text-muted)' }}>
                        Комісія: <span style={{ color: 'var(--demo-text)' }}>0.1%</span>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Price Chart */}
                <Card className="lg:col-span-2 p-6" style={{ backgroundColor: 'var(--demo-surface)' }}>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-semibold" style={{ color: 'var(--demo-text)' }}>
                      BTC/USDT
                    </h3>
                    <div className="flex space-x-2">
                      {['1H', '4H', '1D', '1W'].map((timeframe) => (
                        <Button key={timeframe} variant="outline" size="sm">
                          {timeframe}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="h-80 rounded border" 
                       style={{ 
                         backgroundColor: 'var(--demo-background)',
                         borderColor: 'var(--demo-border)'
                       }}>
                    <div className="h-full flex items-center justify-center" 
                         style={{ color: 'var(--demo-text-muted)' }}>
                      <div className="text-center">
                        <BarChart3 className="w-16 h-16 mx-auto mb-4" />
                        <div>Інтерактивний графік цін</div>
                        <div className="text-sm">Тут відображається динаміка цін в реальному часі</div>
                      </div>
                    </div>
                  </div>

                  {/* Trading Tools */}
                  <div className="mt-6 grid grid-cols-3 gap-4">
                    <Button variant="outline" className="flex items-center space-x-2">
                      <Target className="w-4 h-4" />
                      <span>Індикатори</span>
                    </Button>
                    <Button variant="outline" className="flex items-center space-x-2">
                      <Activity className="w-4 h-4" />
                      <span>Аналіз</span>
                    </Button>
                    <Button variant="outline" className="flex items-center space-x-2">
                      <Settings className="w-4 h-4" />
                      <span>Налаштування</span>
                    </Button>
                  </div>
                </Card>

                {/* Order Book */}
                <Card className="p-6" style={{ backgroundColor: 'var(--demo-surface)' }}>
                  <h3 className="font-semibold mb-4" style={{ color: 'var(--demo-text)' }}>
                    Книга ордерів
                  </h3>
                  
                  {/* Sell Orders */}
                  <div className="space-y-1 mb-4">
                    <div className="text-xs font-medium mb-2" style={{ color: 'var(--demo-text-muted)' }}>
                      Продажі
                    </div>
                    {Array.from({ length: 5 }, (_, i) => (
                      <div key={i} className="flex justify-between text-xs">
                        <span style={{ color: 'var(--demo-error)' }}>
                          {(43250 + i * 5).toLocaleString()}
                        </span>
                        <span style={{ color: 'var(--demo-text-muted)' }}>
                          {(Math.random() * 2).toFixed(3)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Current Price */}
                  <div className="py-2 text-center border-y" style={{ borderColor: 'var(--demo-border)' }}>
                    <div className="font-bold text-lg" style={{ color: 'var(--demo-success)' }}>
                      $43,250.00
                    </div>
                    <div className="text-xs" style={{ color: 'var(--demo-text-muted)' }}>
                      ≈ 0.5% ↑
                    </div>
                  </div>

                  {/* Buy Orders */}
                  <div className="space-y-1 mt-4">
                    <div className="text-xs font-medium mb-2" style={{ color: 'var(--demo-text-muted)' }}>
                      Покупки
                    </div>
                    {Array.from({ length: 5 }, (_, i) => (
                      <div key={i} className="flex justify-between text-xs">
                        <span style={{ color: 'var(--demo-success)' }}>
                          {(43240 - i * 5).toLocaleString()}
                        </span>
                        <span style={{ color: 'var(--demo-text-muted)' }}>
                          {(Math.random() * 2).toFixed(3)}
                        </span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Open Positions */}
              <Card className="p-6" style={{ backgroundColor: 'var(--demo-surface)' }}>
                <h3 className="font-semibold mb-6" style={{ color: 'var(--demo-text)' }}>
                  Відкриті позиції
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b" style={{ borderColor: 'var(--demo-border)' }}>
                        <th className="text-left py-3 px-4 text-sm font-medium" 
                            style={{ color: 'var(--demo-text-muted)' }}>Пара</th>
                        <th className="text-left py-3 px-4 text-sm font-medium" 
                            style={{ color: 'var(--demo-text-muted)' }}>Тип</th>
                        <th className="text-left py-3 px-4 text-sm font-medium" 
                            style={{ color: 'var(--demo-text-muted)' }}>Розмір</th>
                        <th className="text-left py-3 px-4 text-sm font-medium" 
                            style={{ color: 'var(--demo-text-muted)' }}>Ціна входу</th>
                        <th className="text-left py-3 px-4 text-sm font-medium" 
                            style={{ color: 'var(--demo-text-muted)' }}>Поточна ціна</th>
                        <th className="text-left py-3 px-4 text-sm font-medium" 
                            style={{ color: 'var(--demo-text-muted)' }}>PnL</th>
                        <th className="text-left py-3 px-4 text-sm font-medium" 
                            style={{ color: 'var(--demo-text-muted)' }}>Дії</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { 
                          pair: 'BTC/USDT', 
                          type: 'LONG', 
                          size: '0.1', 
                          entry: '$42,100', 
                          current: '$43,250', 
                          pnl: '+$115.00',
                          pnlPercent: '+2.7%'
                        },
                        { 
                          pair: 'ETH/USDT', 
                          type: 'SHORT', 
                          size: '2.5', 
                          entry: '$2,720', 
                          current: '$2,650', 
                          pnl: '+$175.00',
                          pnlPercent: '+2.6%'
                        },
                        { 
                          pair: 'ADA/USDT', 
                          type: 'LONG', 
                          size: '1000', 
                          entry: '$0.485', 
                          current: '$0.468', 
                          pnl: '-$17.00',
                          pnlPercent: '-3.5%'
                        }
                      ].map((position, idx) => (
                        <tr key={idx} className="border-b" style={{ borderColor: 'var(--demo-border)' }}>
                          <td className="py-3 px-4">
                            <span className="font-medium" style={{ color: 'var(--demo-text)' }}>
                              {position.pair}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <Badge style={{ 
                              backgroundColor: position.type === 'LONG' ? 'var(--demo-success)' : 'var(--demo-error)' 
                            }}>
                              {position.type}
                            </Badge>
                          </td>
                          <td className="py-3 px-4" style={{ color: 'var(--demo-text)' }}>
                            {position.size}
                          </td>
                          <td className="py-3 px-4" style={{ color: 'var(--demo-text)' }}>
                            {position.entry}
                          </td>
                          <td className="py-3 px-4" style={{ color: 'var(--demo-text)' }}>
                            {position.current}
                          </td>
                          <td className="py-3 px-4">
                            <div style={{ 
                              color: position.pnl.startsWith('+') ? 'var(--demo-success)' : 'var(--demo-error)' 
                            }}>
                              <div className="font-medium">{position.pnl}</div>
                              <div className="text-xs">{position.pnlPercent}</div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                <Edit className="w-3 h-3" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <X className="w-3 h-3" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>

              {/* Trading History */}
              <Card className="p-6" style={{ backgroundColor: 'var(--demo-surface)' }}>
                <h3 className="font-semibold mb-6" style={{ color: 'var(--demo-text)' }}>
                  Історія торгівлі
                </h3>
                <div className="space-y-3">
                  {[
                    { pair: 'BTC/USDT', type: 'BUY', amount: '0.05', price: '$42,850', time: '10:30', pnl: '+$67.50' },
                    { pair: 'ETH/USDT', type: 'SELL', amount: '1.2', price: '$2,680', time: '09:15', pnl: '+$45.20' },
                    { pair: 'BNB/USDT', type: 'BUY', amount: '15', price: '$315', time: '08:45', pnl: '-$22.50' }
                  ].map((trade, idx) => (
                    <div key={idx} 
                         className="flex items-center justify-between p-4 rounded border"
                         style={{ borderColor: 'var(--demo-border)' }}>
                      <div className="flex items-center space-x-4">
                        <Badge style={{ 
                          backgroundColor: trade.type === 'BUY' ? 'var(--demo-success)' : 'var(--demo-error)' 
                        }}>
                          {trade.type}
                        </Badge>
                        <div>
                          <div className="font-medium" style={{ color: 'var(--demo-text)' }}>
                            {trade.pair}
                          </div>
                          <div className="text-sm" style={{ color: 'var(--demo-text-muted)' }}>
                            {trade.amount} за {trade.price}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div style={{ 
                          color: trade.pnl.startsWith('+') ? 'var(--demo-success)' : 'var(--demo-error)' 
                        }}>
                          {trade.pnl}
                        </div>
                        <div className="text-sm" style={{ color: 'var(--demo-text-muted)' }}>
                          {trade.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            {/* Cart Tab */}
            <TabsContent value="cart" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2">
                  <Card className="p-6" style={{ backgroundColor: 'var(--demo-surface)' }}>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold" style={{ color: 'var(--demo-text)' }}>
                        Корзина ({cartItems.length} товарів)
                      </h2>
                      <Button variant="outline" size="sm">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Очистити все
                      </Button>
                    </div>

                    <div className="space-y-6">
                      {cartItems.map((item) => (
                        <div key={item.id} 
                             className="flex items-center space-x-4 p-4 rounded border"
                             style={{ borderColor: 'var(--demo-border)' }}>
                          {/* Course Thumbnail */}
                          <div className="w-20 h-16 rounded flex items-center justify-center"
                               style={{ backgroundColor: 'var(--demo-primary)' }}>
                            <Play className="w-6 h-6 text-white" />
                          </div>

                          {/* Course Details */}
                          <div className="flex-1">
                            <h3 className="font-medium" style={{ color: 'var(--demo-text)' }}>
                              {item.title}
                            </h3>
                            <p className="text-sm" style={{ color: 'var(--demo-text-muted)' }}>
                              Цифровий курс • Пожиттєвий доступ
                            </p>
                            <div className="flex items-center mt-2 space-x-4">
                              <div className="flex items-center space-x-2">
                                <Button variant="outline" size="sm" 
                                        onClick={() => {
                                          setCartItems(items => 
                                            items.map(i => 
                                              i.id === item.id ? {...i, quantity: Math.max(1, i.quantity - 1)} : i
                                            )
                                          )
                                        }}>
                                  -
                                </Button>
                                <span className="w-8 text-center" style={{ color: 'var(--demo-text)' }}>
                                  {item.quantity}
                                </span>
                                <Button variant="outline" size="sm"
                                        onClick={() => {
                                          setCartItems(items => 
                                            items.map(i => 
                                              i.id === item.id ? {...i, quantity: i.quantity + 1} : i
                                            )
                                          )
                                        }}>
                                  +
                                </Button>
                              </div>
                              <Button variant="ghost" size="sm">
                                <Heart className="w-4 h-4 mr-2" />
                                Зберегти
                              </Button>
                              <Button variant="ghost" size="sm"
                                      onClick={() => {
                                        setCartItems(items => items.filter(i => i.id !== item.id))
                                      }}>
                                <Trash2 className="w-4 h-4 mr-2" />
                                Видалити
                              </Button>
                            </div>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            <div className="text-xl font-bold" style={{ color: 'var(--demo-primary)' }}>
                              ${item.price * item.quantity}
                            </div>
                            <div className="text-sm line-through" style={{ color: 'var(--demo-text-muted)' }}>
                              ${Math.round(item.price * 1.4) * item.quantity}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Recommended Items */}
                    <div className="mt-8 pt-6 border-t" style={{ borderColor: 'var(--demo-border)' }}>
                      <h3 className="font-semibold mb-4" style={{ color: 'var(--demo-text)' }}>
                        Рекомендації для вас
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          { title: 'NFT для початківців', price: 149, originalPrice: 199 },
                          { title: 'Смарт-контракти', price: 299, originalPrice: 399 }
                        ].map((rec, idx) => (
                          <div key={idx} 
                               className="flex items-center space-x-3 p-3 rounded border"
                               style={{ borderColor: 'var(--demo-border)' }}>
                            <div className="w-12 h-10 rounded flex items-center justify-center"
                                 style={{ backgroundColor: 'var(--demo-secondary)' }}>
                              <BookOpen className="w-4 h-4 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-sm" style={{ color: 'var(--demo-text)' }}>
                                {rec.title}
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="font-bold" style={{ color: 'var(--demo-primary)' }}>
                                  ${rec.price}
                                </span>
                                <span className="text-sm line-through" style={{ color: 'var(--demo-text-muted)' }}>
                                  ${rec.originalPrice}
                                </span>
                              </div>
                            </div>
                            <Button size="sm" style={{ backgroundColor: 'var(--demo-primary)' }}>
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Order Summary */}
                <div>
                  <Card className="p-6 sticky top-24" style={{ backgroundColor: 'var(--demo-surface)' }}>
                    <h3 className="font-semibold mb-6" style={{ color: 'var(--demo-text)' }}>
                      Підсумок замовлення
                    </h3>

                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span style={{ color: 'var(--demo-text-muted)' }}>Підсумок</span>
                        <span style={{ color: 'var(--demo-text)' }}>
                          ${cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span style={{ color: 'var(--demo-text-muted)' }}>Знижка</span>
                        <span style={{ color: 'var(--demo-success)' }}>
                          -$85
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span style={{ color: 'var(--demo-text-muted)' }}>ПДВ</span>
                        <span style={{ color: 'var(--demo-text)' }}>$42</span>
                      </div>
                      <hr style={{ borderColor: 'var(--demo-border)' }} />
                      <div className="flex justify-between text-lg font-bold">
                        <span style={{ color: 'var(--demo-text)' }}>Всього</span>
                        <span style={{ color: 'var(--demo-primary)' }}>
                          ${cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) - 85 + 42}
                        </span>
                      </div>
                    </div>

                    {/* Promo Code */}
                    <div className="mt-6">
                      <label className="text-sm font-medium mb-2 block" style={{ color: 'var(--demo-text)' }}>
                        Промокод
                      </label>
                      <div className="flex space-x-2">
                        <Input 
                          placeholder="Введіть код"
                          style={{ backgroundColor: 'var(--demo-background)' }}
                        />
                        <Button variant="outline">Застосувати</Button>
                      </div>
                    </div>

                    {/* Payment Methods */}
                    <div className="mt-6">
                      <label className="text-sm font-medium mb-3 block" style={{ color: 'var(--demo-text)' }}>
                        Спосіб оплати
                      </label>
                      <div className="space-y-2">
                        {[
                          { icon: CreditCard, name: 'Банківська карта', desc: 'Visa, MasterCard' },
                          { icon: Wallet, name: 'PayPal', desc: 'Безпечна оплата' },
                          { icon: DollarSign, name: 'Криптовалюта', desc: 'BTC, ETH, USDT' }
                        ].map((method, idx) => (
                          <div key={idx} 
                               className="flex items-center space-x-3 p-3 rounded border cursor-pointer hover:bg-opacity-50"
                               style={{ 
                                 borderColor: 'var(--demo-border)',
                                 backgroundColor: idx === 0 ? 'var(--demo-primary)' : 'transparent',
                                 color: idx === 0 ? 'white' : 'var(--demo-text)'
                               }}>
                            <method.icon className="w-5 h-5" />
                            <div className="flex-1">
                              <div className="font-medium text-sm">{method.name}</div>
                              <div className="text-xs opacity-75">{method.desc}</div>
                            </div>
                            <div className={`w-4 h-4 rounded-full border-2 ${
                              idx === 0 ? 'bg-white border-white' : 'border-gray-300'
                            }`}></div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-6 space-y-3">
                      <Button className="w-full" size="lg" 
                              style={{ backgroundColor: 'var(--demo-primary)' }}>
                        <Lock className="w-4 h-4 mr-2" />
                        Оформити замовлення
                      </Button>
                      <Button variant="outline" className="w-full">
                        Продовжити покупки
                      </Button>
                    </div>

                    {/* Security Badge */}
                    <div className="mt-6 text-center">
                      <div className="flex items-center justify-center space-x-2 text-sm"
                           style={{ color: 'var(--demo-text-muted)' }}>
                        <Shield className="w-4 h-4" />
                        <span>Захищена оплата SSL</span>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Calendar Tab */}
            <TabsContent value="calendar" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Calendar */}
                <Card className="lg:col-span-2 p-6" style={{ backgroundColor: 'var(--demo-surface)' }}>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold" style={{ color: 'var(--demo-text)' }}>
                      Календар подій
                    </h2>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Додати подію
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Експорт
                      </Button>
                    </div>
                  </div>
                  
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border w-full"
                  />

                  {/* Mini Events for Selected Date */}
                  <div className="mt-6">
                    <h3 className="font-semibold mb-4" style={{ color: 'var(--demo-text)' }}>
                      Події на {selectedDate?.toLocaleDateString('uk-UA')}
                    </h3>
                    <div className="space-y-3">
                      {[
                        { time: '09:00', title: 'Ранковий огляд ринків', type: 'webinar', color: 'var(--demo-primary)' },
                        { time: '14:00', title: 'Q&A сесія з експертом', type: 'live', color: 'var(--demo-success)' },
                        { time: '18:30', title: 'Вечірній аналіз', type: 'analysis', color: 'var(--demo-warning)' }
                      ].map((event, idx) => (
                        <div key={idx} 
                             className="flex items-center space-x-3 p-3 rounded border"
                             style={{ borderColor: 'var(--demo-border)' }}>
                          <div className="w-3 h-3 rounded-full" 
                               style={{ backgroundColor: event.color }}></div>
                          <div className="flex-1">
                            <div className="font-medium" style={{ color: 'var(--demo-text)' }}>
                              {event.title}
                            </div>
                            <div className="text-sm" style={{ color: 'var(--demo-text-muted)' }}>
                              {event.time}
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <ChevronRight className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>

                {/* Upcoming Events */}
                <div className="space-y-6">
                  <Card className="p-6" style={{ backgroundColor: 'var(--demo-surface)' }}>
                    <h3 className="font-semibold mb-4" style={{ color: 'var(--demo-text)' }}>
                      Найближчі події
                    </h3>
                    <div className="space-y-4">
                      {[
                        { 
                          date: 'Сьогодні', 
                          time: '15:00', 
                          title: 'Вебінар: Аналіз Bitcoin', 
                          instructor: 'Олександр П.',
                          attendees: 234
                        },
                        { 
                          date: 'Завтра', 
                          time: '10:30', 
                          title: 'Майстер-клас DeFi', 
                          instructor: 'Марія К.',
                          attendees: 187
                        },
                        { 
                          date: '15 лют', 
                          time: '19:00', 
                          title: 'Торгові стратегії', 
                          instructor: 'Іван М.',
                          attendees: 156
                        }
                      ].map((event, idx) => (
                        <div key={idx} 
                             className="p-4 rounded border hover:shadow-md transition-shadow cursor-pointer"
                             style={{ borderColor: 'var(--demo-border)' }}>
                          <div className="flex items-start justify-between mb-2">
                            <Badge style={{ backgroundColor: 'var(--demo-primary)' }}>
                              {event.date}
                            </Badge>
                            <Button variant="ghost" size="sm">
                              <Bell className="w-4 h-4" />
                            </Button>
                          </div>
                          <h4 className="font-medium mb-1" style={{ color: 'var(--demo-text)' }}>
                            {event.title}
                          </h4>
                          <div className="text-sm mb-2" style={{ color: 'var(--demo-text-muted)' }}>
                            {event.time} • {event.instructor}
                          </div>
                          <div className="flex items-center space-x-2 text-sm"
                               style={{ color: 'var(--demo-text-muted)' }}>
                            <Users className="w-4 h-4" />
                            <span>{event.attendees} учасників</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>

                  <Card className="p-6" style={{ backgroundColor: 'var(--demo-surface)' }}>
                    <h3 className="font-semibold mb-4" style={{ color: 'var(--demo-text)' }}>
                      Мої підписки
                    </h3>
                    <div className="space-y-3">
                      {[
                        { name: 'Щоденний огляд ринків', active: true },
                        { name: 'Новини DeFi', active: true },
                        { name: 'Технічний аналіз', active: false },
                        { name: 'Економічний календар', active: true }
                      ].map((sub, idx) => (
                        <div key={idx} className="flex items-center justify-between">
                          <span style={{ color: 'var(--demo-text)' }}>{sub.name}</span>
                          <Switch checked={sub.active} />
                        </div>
                      ))}
                    </div>
                  </Card>

                  <Card className="p-6" style={{ backgroundColor: 'var(--demo-surface)' }}>
                    <h3 className="font-semibold mb-4" style={{ color: 'var(--demo-text)' }}>
                      Швидкі дії
                    </h3>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start">
                        <Video className="w-4 h-4 mr-2" />
                        Записатися на вебінар
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Calendar className="w-4 h-4 mr-2" />
                        Синхронізувати календар
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Bell className="w-4 h-4 mr-2" />
                        Налаштувати сповіщення
                      </Button>
                    </div>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Chat Tab */}
            <TabsContent value="chat" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 h-[600px]">
                {/* Chat Rooms */}
                <Card className="p-4" style={{ backgroundColor: 'var(--demo-surface)' }}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold" style={{ color: 'var(--demo-text)' }}>
                      Чат-кімнати
                    </h3>
                    <Button variant="ghost" size="sm">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="space-y-2 overflow-y-auto">
                    {[
                      { name: 'Загальний чат', users: 1243, active: true, unread: 0 },
                      { name: 'Bitcoin аналітика', users: 856, active: false, unread: 3 },
                      { name: 'Новачки', users: 432, active: false, unread: 0 },
                      { name: 'DeFi стратегії', users: 187, active: false, unread: 7 },
                      { name: 'NFT обговорення', users: 298, active: false, unread: 1 },
                      { name: 'Технічний аналіз', users: 567, active: false, unread: 0 },
                      { name: 'Альткоїни', users: 743, active: false, unread: 2 },
                      { name: 'Торгові сигнали', users: 1456, active: false, unread: 12 }
                    ].map((room, idx) => (
                      <div key={idx} 
                           className={`p-3 rounded cursor-pointer transition-colors relative ${
                             room.active ? 'ring-2' : ''
                           }`}
                           style={{ 
                             backgroundColor: room.active ? 'var(--demo-primary)' : 'transparent',
                             color: room.active ? 'white' : 'var(--demo-text)',
                             borderColor: room.active ? 'var(--demo-primary)' : 'var(--demo-border)'
                           }}>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{room.name}</span>
                          {room.unread > 0 && (
                            <Badge className="bg-red-500 text-white text-xs">
                              {room.unread}
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-1 text-xs opacity-75 mt-1">
                          <Users className="w-3 h-3" />
                          <span>{room.users.toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Online Users */}
                  <div className="mt-6 pt-4 border-t" style={{ borderColor: 'var(--demo-border)' }}>
                    <h4 className="font-medium text-sm mb-3" style={{ color: 'var(--demo-text)' }}>
                      Онлайн (24)
                    </h4>
                    <div className="space-y-2">
                      {['Олександр П.', 'Марія К.', 'Іван М.', 'Анна С.'].map((user, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          <span className="text-xs" style={{ color: 'var(--demo-text)' }}>
                            {user}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>

                {/* Chat Messages */}
                <Card className="lg:col-span-2 flex flex-col" 
                      style={{ backgroundColor: 'var(--demo-surface)' }}>
                  {/* Chat Header */}
                  <div className="p-4 border-b flex items-center justify-between"
                       style={{ borderColor: 'var(--demo-border)' }}>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center"
                           style={{ backgroundColor: 'var(--demo-primary)' }}>
                        <MessageCircle className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold" style={{ color: 'var(--demo-text)' }}>
                          Загальний чат
                        </h3>
                        <p className="text-sm" style={{ color: 'var(--demo-text-muted)' }}>
                          1,243 учасників онлайн
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Phone className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Video className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {[
                      { 
                        user: 'Максим К.', 
                        message: 'Хто що думає про BTC зараз? Чи варто зараз входити в позицію?', 
                        time: '14:23', 
                        avatar: 'М',
                        replies: 3
                      },
                      { 
                        user: 'Анна В.', 
                        message: 'Я думаю буде корекція до $40k. RSI показує перекупленість на денному таймфреймі', 
                        time: '14:25', 
                        avatar: 'А',
                        replies: 0
                      },
                      { 
                        user: 'Олександр П.', 
                        message: 'Згоден з Анною. Також варто звернути увагу на об\'єми торгівлі - вони знижуються', 
                        time: '14:27', 
                        avatar: 'О',
                        replies: 1,
                        isExpert: true
                      },
                      { 
                        user: 'Іван М.', 
                        message: 'А що скажете про Ethereum? Там ситуація інша', 
                        time: '14:30', 
                        avatar: 'І',
                        replies: 0
                      },
                      { 
                        user: 'CryptoExpert', 
                        message: 'Провів детальний аналіз. Поділюся графіками в приватних повідомленнях', 
                        time: '14:32', 
                        avatar: 'C',
                        replies: 8,
                        isExpert: true
                      }
                    ].map((msg, idx) => (
                      <div key={idx} className="flex items-start space-x-3">
                        <div className="relative">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center"
                               style={{ backgroundColor: 'var(--demo-secondary)' }}>
                            <span className="text-white text-sm font-medium">{msg.avatar}</span>
                          </div>
                          {msg.isExpert && (
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center"
                                 style={{ backgroundColor: 'var(--demo-warning)' }}>
                              <Award className="w-2 h-2 text-white" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 max-w-lg">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-medium text-sm" style={{ color: 'var(--demo-text)' }}>
                              {msg.user}
                            </span>
                            {msg.isExpert && (
                              <Badge className="text-xs" style={{ backgroundColor: 'var(--demo-warning)' }}>
                                ЕКСПЕРТ
                              </Badge>
                            )}
                            <span className="text-xs" style={{ color: 'var(--demo-text-muted)' }}>
                              {msg.time}
                            </span>
                          </div>
                          <div className="p-3 rounded-lg" 
                               style={{ backgroundColor: 'var(--demo-background)' }}>
                            <p className="text-sm" style={{ color: 'var(--demo-text)' }}>
                              {msg.message}
                            </p>
                          </div>
                          <div className="flex items-center space-x-4 mt-2">
                            <Button variant="ghost" size="sm" className="text-xs">
                              <ThumbsUp className="w-3 h-3 mr-1" />
                              24
                            </Button>
                            {msg.replies > 0 && (
                              <Button variant="ghost" size="sm" className="text-xs">
                                <MessageSquare className="w-3 h-3 mr-1" />
                                {msg.replies} відповідей
                              </Button>
                            )}
                            <Button variant="ghost" size="sm" className="text-xs">
                              Відповісти
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Message Input */}
                  <div className="p-4 border-t" style={{ borderColor: 'var(--demo-border)' }}>
                    <div className="flex space-x-2">
                      <div className="flex-1 relative">
                        <Textarea 
                          placeholder="Написати повідомлення... (Enter для відправки)"
                          className="resize-none pr-20"
                          rows={2}
                          style={{ backgroundColor: 'var(--demo-background)' }}
                        />
                        <div className="absolute bottom-2 right-2 flex space-x-1">
                          <Button variant="ghost" size="sm">
                            <Upload className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Camera className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <Button style={{ backgroundColor: 'var(--demo-primary)' }}>
                        <MessageCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>

                {/* Chat Info */}
                <div className="space-y-6">
                  <Card className="p-4" style={{ backgroundColor: 'var(--demo-surface)' }}>
                    <h3 className="font-semibold mb-4" style={{ color: 'var(--demo-text)' }}>
                      Інформація про кімнату
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div>
                        <span style={{ color: 'var(--demo-text-muted)' }}>Учасників:</span>
                        <span className="ml-2" style={{ color: 'var(--demo-text)' }}>1,243</span>
                      </div>
                      <div>
                        <span style={{ color: 'var(--demo-text-muted)' }}>Онлайн:</span>
                        <span className="ml-2" style={{ color: 'var(--demo-success)' }}>387</span>
                      </div>
                      <div>
                        <span style={{ color: 'var(--demo-text-muted)' }}>Створено:</span>
                        <span className="ml-2" style={{ color: 'var(--demo-text)' }}>15 січ 2024</span>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4" style={{ backgroundColor: 'var(--demo-surface)' }}>
                    <h3 className="font-semibold mb-4" style={{ color: 'var(--demo-text)' }}>
                      Популярні теми
                    </h3>
                    <div className="space-y-2">
                      {[
                        '#bitcoin',
                        '#ethereum', 
                        '#defi',
                        '#nft',
                        '#trading'
                      ].map((tag, idx) => (
                        <Badge key={idx} variant="outline" className="mr-2 mb-2">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </Card>

                  <Card className="p-4" style={{ backgroundColor: 'var(--demo-surface)' }}>
                    <h3 className="font-semibold mb-4" style={{ color: 'var(--demo-text)' }}>
                      Швидкі дії
                    </h3>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <Users className="w-4 h-4 mr-2" />
                        Запросити друзів
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <Bell className="w-4 h-4 mr-2" />
                        Налаштування
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <Flag className="w-4 h-4 mr-2" />
                        Поскаржитися
                      </Button>
                    </div>
                  </Card>
                </div>
              </div>

              {/* Forum Section */}
              <Card className="p-6" style={{ backgroundColor: 'var(--demo-surface)' }}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold" style={{ color: 'var(--demo-text)' }}>
                    Форум спільноти
                  </h2>
                  <Button style={{ backgroundColor: 'var(--demo-primary)' }}>
                    <Plus className="w-4 h-4 mr-2" />
                    Нова тема
                  </Button>
                </div>

                <div className="space-y-4">
                  {forumTopics.map((topic, idx) => (
                    <div key={idx} 
                         className="flex items-center justify-between p-4 rounded border hover:shadow-md transition-shadow cursor-pointer"
                         style={{ borderColor: 'var(--demo-border)' }}>
                      <div className="flex-1">
                        <h3 className="font-medium mb-2" style={{ color: 'var(--demo-text)' }}>
                          {topic.title}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm" 
                             style={{ color: 'var(--demo-text-muted)' }}>
                          <span>Автор: {topic.author}</span>
                          <span>•</span>
                          <span>{topic.time} тому</span>
                          <span>•</span>
                          <span>{topic.replies} відповідей</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{topic.replies}</Badge>
                        <ChevronRight className="w-5 h-5" style={{ color: 'var(--demo-text-muted)' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Profile Info */}
                <Card className="p-6" style={{ backgroundColor: 'var(--demo-surface)' }}>
                  <div className="text-center mb-6">
                    <Avatar className="w-24 h-24 mx-auto mb-4">
                      <div className="w-full h-full rounded-full flex items-center justify-center"
                           style={{ backgroundColor: 'var(--demo-primary)' }}>
                        <span className="text-white text-2xl font-medium">УП</span>
                      </div>
                    </Avatar>
                    <h2 className="font-bold text-xl" style={{ color: 'var(--demo-text)' }}>
                      Український Пользователь
                    </h2>
                    <p style={{ color: 'var(--demo-text-muted)' }}>
                      user@example.com
                    </p>
                    <Badge className="mt-2" style={{ backgroundColor: 'var(--demo-warning)' }}>
                      PRO Користувач
                    </Badge>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span style={{ color: 'var(--demo-text-muted)' }}>Дата реєстрації</span>
                      <span style={{ color: 'var(--demo-text)' }}>15 січ 2024</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span style={{ color: 'var(--demo-text-muted)' }}>Завершених курсів</span>
                      <span style={{ color: 'var(--demo-text)' }}>2</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span style={{ color: 'var(--demo-text-muted)' }}>Загальний прогрес</span>
                      <span style={{ color: 'var(--demo-text)' }}>68%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span style={{ color: 'var(--demo-text-muted)' }}>Рейтинг</span>
                      <div className="flex items-center space-x-1">
                        {[1,2,3,4,5].map((star) => (
                          <Star key={star} className="w-4 h-4" 
                               style={{ color: 'var(--demo-warning)' }} 
                               fill={star <= 4 ? "currentColor" : "none"} />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 space-y-2">
                    <Button className="w-full" variant="outline">
                      <Edit className="w-4 h-4 mr-2" />
                      Редагувати профіль
                    </Button>
                    <Button className="w-full" variant="outline">
                      <Settings className="w-4 h-4 mr-2" />
                      Налаштування
                    </Button>
                  </div>
                </Card>

                {/* Statistics & Progress */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Learning Progress */}
                  <Card className="p-6" style={{ backgroundColor: 'var(--demo-surface)' }}>
                    <h3 className="font-semibold mb-6" style={{ color: 'var(--demo-text)' }}>
                      Прогрес навчання
                    </h3>
                    <div className="space-y-4">
                      {[
                        { course: 'Основи крипто-трейдингу', progress: 100, status: 'completed' },
                        { course: 'Технічний аналіз Bitcoin', progress: 75, status: 'inprogress' },
                        { course: 'DeFi та пасивний дохід', progress: 30, status: 'inprogress' },
                        { course: 'Алгоритмічна торгівля', progress: 0, status: 'notstarted' }
                      ].map((course, idx) => (
                        <div key={idx} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-medium" style={{ color: 'var(--demo-text)' }}>
                              {course.course}
                            </span>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm" style={{ color: 'var(--demo-text-muted)' }}>
                                {course.progress}%
                              </span>
                              {course.status === 'completed' && (
                                <CheckCircle className="w-4 h-4" style={{ color: 'var(--demo-success)' }} />
                              )}
                            </div>
                          </div>
                          <Progress value={course.progress} />
                        </div>
                      ))}
                    </div>
                  </Card>

                  {/* Achievement & Certificates */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="p-6" style={{ backgroundColor: 'var(--demo-surface)' }}>
                      <h3 className="font-semibold mb-4" style={{ color: 'var(--demo-text)' }}>
                        Досягнення
                      </h3>
                      <div className="grid grid-cols-3 gap-4">
                        {[
                          { icon: Trophy, name: 'Перший курс', earned: true },
                          { icon: Target, name: 'Швидке навчання', earned: true },
                          { icon: Award, name: 'Експерт', earned: false },
                          { icon: Star, name: 'Відмінник', earned: false },
                          { icon: Zap, name: 'Активіст', earned: true },
                          { icon: Shield, name: 'Ментор', earned: false }
                        ].map((achievement, idx) => (
                          <div key={idx} 
                               className={`p-3 rounded text-center ${
                                 achievement.earned ? '' : 'opacity-50'
                               }`}
                               style={{ backgroundColor: 'var(--demo-background)' }}>
                            <achievement.icon className={`w-8 h-8 mx-auto mb-2 ${
                              achievement.earned ? 'text-yellow-500' : 'text-gray-400'
                            }`} />
                            <div className="text-xs" style={{ color: 'var(--demo-text)' }}>
                              {achievement.name}
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>

                    <Card className="p-6" style={{ backgroundColor: 'var(--demo-surface)' }}>
                      <h3 className="font-semibold mb-4" style={{ color: 'var(--demo-text)' }}>
                        Сертифікати
                      </h3>
                      <div className="space-y-3">
                        {[
                          { name: 'Основи криптовалют', date: '15 лют 2024', verified: true },
                          { name: 'Технічний аналіз', date: 'В процесі', verified: false }
                        ].map((cert, idx) => (
                          <div key={idx} 
                               className="flex items-center justify-between p-3 rounded border"
                               style={{ borderColor: 'var(--demo-border)' }}>
                            <div>
                              <div className="font-medium text-sm" style={{ color: 'var(--demo-text)' }}>
                                {cert.name}
                              </div>
                              <div className="text-xs" style={{ color: 'var(--demo-text-muted)' }}>
                                {cert.date}
                              </div>
                            </div>
                            {cert.verified ? (
                              <CheckCircle className="w-5 h-5" style={{ color: 'var(--demo-success)' }} />
                            ) : (
                              <Clock className="w-5 h-5" style={{ color: 'var(--demo-warning)' }} />
                            )}
                          </div>
                        ))}
                      </div>
                    </Card>
                  </div>

                  {/* Trading Stats */}
                  <Card className="p-6" style={{ backgroundColor: 'var(--demo-surface)' }}>
                    <h3 className="font-semibold mb-6" style={{ color: 'var(--demo-text)' }}>
                      Торгова статистика
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold" style={{ color: 'var(--demo-success)' }}>
                          +24.5%
                        </div>
                        <div className="text-sm" style={{ color: 'var(--demo-text-muted)' }}>
                          Загальний прибуток
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold" style={{ color: 'var(--demo-text)' }}>
                          67%
                        </div>
                        <div className="text-sm" style={{ color: 'var(--demo-text-muted)' }}>
                          Успішних угод
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold" style={{ color: 'var(--demo-text)' }}>
                          $12,540
                        </div>
                        <div className="text-sm" style={{ color: 'var(--demo-text-muted)' }}>
                          Портфель
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold" style={{ color: 'var(--demo-text)' }}>
                          156
                        </div>
                        <div className="text-sm" style={{ color: 'var(--demo-text-muted)' }}>
                          Всього угод
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Activity Feed */}
                  <Card className="p-6" style={{ backgroundColor: 'var(--demo-surface)' }}>
                    <h3 className="font-semibold mb-6" style={{ color: 'var(--demo-text)' }}>
                      Остання активність
                    </h3>
                    <div className="space-y-4">
                      {[
                        { action: 'Завершено урок', item: '"Читання японських свічок"', time: '2 години тому', icon: BookOpen },
                        { action: 'Отримано сертифікат', item: '"Основи криптовалют"', time: '1 день тому', icon: Award },
                        { action: 'Приєднався до групи', item: '"Bitcoin аналітика"', time: '3 дні тому', icon: Users },
                        { action: 'Зроблено угоду', item: 'BTC/USDT +$67.50', time: '5 днів тому', icon: TrendingUp }
                      ].map((activity, idx) => (
                        <div key={idx} className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center"
                               style={{ backgroundColor: 'var(--demo-primary)' }}>
                            <activity.icon className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1">
                            <div style={{ color: 'var(--demo-text)' }}>
                              <span>{activity.action}</span>
                              <span className="font-medium"> {activity.item}</span>
                            </div>
                            <div className="text-sm" style={{ color: 'var(--demo-text-muted)' }}>
                              {activity.time}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}