import React, { useState, useMemo, useEffect } from 'react';
import { Search, Plus, Calendar, Users, Trophy, User, FileText, Edit2, Trash2, Tag, X, Settings, Download, Upload, Moon, Sun, Star, Copy, BarChart3, Bell, Clock, TrendingUp, FolderOpen, HelpCircle, Building, Globe, Filter, DollarSign, PiggyBank, TrendingDown, Target, Activity, CheckCircle, Save, AlertTriangle, Minus } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';

const CompleteSportsPlatform = () => {
  // Cores predefinidas para os esportes
  const sportColors = [
    'bg-green-100 text-green-800',
    'bg-orange-100 text-orange-800', 
    'bg-blue-100 text-blue-800',
    'bg-purple-100 text-purple-800',
    'bg-red-100 text-red-800',
    'bg-yellow-100 text-yellow-800',
    'bg-indigo-100 text-indigo-800',
    'bg-pink-100 text-pink-800',
    'bg-gray-100 text-gray-800'
  ];

  // Cores para as tags
  const tagColors = [
    'bg-red-100 text-red-800 border-red-200',
    'bg-blue-100 text-blue-800 border-blue-200',
    'bg-green-100 text-green-800 border-green-200',
    'bg-yellow-100 text-yellow-800 border-yellow-200',
    'bg-purple-100 text-purple-800 border-purple-200',
    'bg-pink-100 text-pink-800 border-pink-200',
    'bg-indigo-100 text-indigo-800 border-indigo-200',
    'bg-orange-100 text-orange-800 border-orange-200',
    'bg-cyan-100 text-cyan-800 border-cyan-200',
    'bg-emerald-100 text-emerald-800 border-emerald-200',
    'bg-amber-100 text-amber-800 border-amber-200',
    'bg-lime-100 text-lime-800 border-lime-200'
  ];

  const [config, setConfig] = useState({
    theme: 'light',
    autoSave: true,
    autoBackup: true,
    autoBackupInterval: 5,
    lastBackup: null,
    showBackupReminder: true,
    askBeforeClose: true,
    saveLocation: 'browser',
    backupFolder: null,
    firstRun: true,
    valorUnidade: 100
  });

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [lastAutoBackup, setLastAutoBackup] = useState(null);
  const [showBackupModal, setShowBackupModal] = useState(false);
  const [isFirstTimeSetup, setIsFirstTimeSetup] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isBackingUp, setIsBackingUp] = useState(false);

  const [currentView, setCurrentView] = useState('notes');
  const [activeComprovacao, setActiveComprovacao] = useState(null);
  const [comprovacoes, setComprovacoes] = useState([]);
  const [isAddingComprovacao, setIsAddingComprovacao] = useState(false);
  const [newComprovacaoName, setNewComprovacaoName] = useState('');
  const [editingUnidade, setEditingUnidade] = useState(false);
  const [tempValorUnidade, setTempValorUnidade] = useState(100);
  const [editingComprovacaoUnidade, setEditingComprovacaoUnidade] = useState(false);
  const [tempComprovacaoUnidade, setTempComprovacaoUnidade] = useState(100);
  const [showStatistics, setShowStatistics] = useState(false);

  // Atualizar tempValorUnidade quando config.valorUnidade mudar
  useEffect(() => {
    setTempValorUnidade(config.valorUnidade);
  }, [config.valorUnidade]);

  const [notes, setNotes] = useState([
    {
      id: 1,
      sport: 'futebol',
      year: '2024',
      championship: 'Brasileirão Série A',
      team: 'Flamengo',
      player: 'Gabigol',
      content: 'Gabigol tem melhor performance em jogos em casa, especialmente contra times da zona de rebaixamento. Taxa de conversão de 78% nos últimos 10 jogos.',
      tags: ['atacante', 'casa', 'conversão'],
      favorite: false,
      noteType: 'individual',
      confrontoTeams: [],
      date: '2024-08-01'
    },
    {
      id: 2,
      sport: 'tenis',
      year: '2024',
      championship: 'US Open',
      player: 'Novak Djokovic',
      content: 'Djokovic historicamente tem dificuldades na primeira semana de torneios Grand Slam no verão americano. Perda de energia nos sets longos.',
      tags: ['grand slam', 'primeira semana', 'resistência'],
      favorite: true,
      noteType: 'individual',
      confrontoTeams: [],
      date: '2024-08-05'
    }
  ]);

  const [statistics, setStatistics] = useState([
    {
      id: 1,
      sport: 'futebol',
      championship: 'Brasileirão Série A',
      team: 'Flamengo vs Botafogo',
      date: '2024-08-01',
      situation: 'Casa - Over 2.5 gols',
      odd: 1.85,
      observation: 'Clássico carioca sempre tem muitos gols. Flamengo em casa é mais ofensivo.',
      result: null
    }
  ]);

  const [reminders, setReminders] = useState([
    {
      id: 1,
      title: 'Analisar Flamengo vs Vasco',
      description: 'Verificar as odds para o clássico da próxima semana',
      date: '2024-08-15',
      time: '14:00',
      completed: false,
      type: 'analysis',
      relatedItem: null
    }
  ]);

  const [bancaEntries, setBancaEntries] = useState([
    {
      id: 1,
      date: '2024-08-01',
      site: 'Bet365',
      tipo: 'Simples',
      padrao: 'Over em clássicos',
      games: [
        {
          sport: 'futebol',
          competition: 'Brasileirão',
          team1: 'Flamengo',
          team2: 'Botafogo',
          mercado: 'Over 2.5'
        }
      ],
      unidades: 2,
      resultadoJogo: '3-1',
      valor: 200,
      odds: 1.85,
      resultado: 'certo',
      lucroReais: 170,
      lucroUnidades: 1.7
    }
  ]);

  const [sports, setSports] = useState([
    { name: 'futebol', color: 'bg-green-100 text-green-800' },
    { name: 'tenis', color: 'bg-orange-100 text-orange-800' }
  ]);

  const [isAddingNote, setIsAddingNote] = useState(false);
  const [isAddingStat, setIsAddingStat] = useState(false);
  const [isAddingReminder, setIsAddingReminder] = useState(false);
  const [isAddingBanca, setIsAddingBanca] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [editingStat, setEditingStat] = useState(null);
  const [editingReminder, setEditingReminder] = useState(null);
  const [editingBanca, setEditingBanca] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [importData, setImportData] = useState(null);
  const [selectedImportNotes, setSelectedImportNotes] = useState([]);
  const [selectedSport, setSelectedSport] = useState('todos');
  const [selectedChampionship, setSelectedChampionship] = useState('todos');
  const [selectedTeamPlayer, setSelectedTeamPlayer] = useState('todos');
  const [selectedTag, setSelectedTag] = useState('todas');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [showConfrontoFilter, setShowConfrontoFilter] = useState(false);
  const [bancaMonth, setBancaMonth] = useState(new Date().toISOString().slice(0, 7));
  const [tagInput, setTagInput] = useState('');

  // Estados para estatísticas
  const [statFilters, setStatFilters] = useState({
    resultado: 'todos',
    site: 'todos',
    sport: 'todos',
    competition: 'todos',
    team: 'todos',
    tipo: 'todos',
    mercado: 'todos',
    padrao: 'todos',
    startDate: '',
    endDate: ''
  });

  const [newNote, setNewNote] = useState({
    sport: '',
    newSport: '',
    year: '',
    championship: '',
    team: '',
    player: '',
    confrontoTeam1: '',
    confrontoTeam2: '',
    content: '',
    tags: [],
    favorite: false,
    noteType: 'individual',
    date: new Date().toISOString().split('T')[0]
  });

  const [newStat, setNewStat] = useState({
    sport: '',
    newSport: '',
    championship: '',
    team: '',
    date: new Date().toISOString().split('T')[0],
    situation: '',
    odd: '',
    observation: '',
    result: null
  });

  const [newReminder, setNewReminder] = useState({
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    time: '12:00',
    type: 'analysis',
    relatedItem: null
  });

  const [newBanca, setNewBanca] = useState({
    date: new Date().toISOString().split('T')[0],
    site: '',
    tipo: 'Simples',
    padrao: '',
    games: [
      {
        sport: '',
        competition: '',
        team1: '',
        team2: '',
        mercado: ''
      }
    ],
    unidades: 1,
    resultadoJogo: '',
    valor: 100,
    odds: '',
    resultado: '',
    lucroReais: 0,
    lucroUnidades: 0
  });

  // Função para obter cor da tag baseada no hash da string
  const getTagColor = (tag) => {
    const hash = tag.split('').reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);
    return tagColors[Math.abs(hash) % tagColors.length];
  };

  // Função para adicionar nova comprovação
  const addComprovacao = () => {
    if (!newComprovacaoName.trim()) {
      alert('Por favor, digite um nome para a comprovação');
      return;
    }

    const newComprovacao = {
      id: Date.now(),
      name: newComprovacaoName.trim(),
      entries: [],
      valorUnidade: 100,
      createdAt: new Date().toISOString()
    };

    setComprovacoes([...comprovacoes, newComprovacao]);
    setNewComprovacaoName('');
    setIsAddingComprovacao(false);
    setActiveComprovacao(newComprovacao.id);
  };

  // Função para deletar comprovação
  const deleteComprovacao = (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta comprovação?')) {
      setComprovacoes(comprovacoes.filter(c => c.id !== id));
      if (activeComprovacao === id) {
        setActiveComprovacao(null);
      }
    }
  };

  // Função para obter comprovação ativa
  const getActiveComprovacao = () => {
    return comprovacoes.find(c => c.id === activeComprovacao);
  };

  // Função para adicionar entrada em comprovação
  const addComprovacaoEntry = (comprovacaoId, entry) => {
    setComprovacoes(comprovacoes.map(c => 
      c.id === comprovacaoId 
        ? { ...c, entries: [...c.entries, entry] }
        : c
    ));
  };

  // Função para atualizar entrada em comprovação
  const updateComprovacaoEntry = (comprovacaoId, entryId, updatedEntry) => {
    setComprovacoes(comprovacoes.map(c => 
      c.id === comprovacaoId 
        ? { 
            ...c, 
            entries: c.entries.map(e => e.id === entryId ? updatedEntry : e)
          }
        : c
    ));
  };

  // Função para deletar entrada em comprovação
  const deleteComprovacaoEntry = (comprovacaoId, entryId) => {
    setComprovacoes(comprovacoes.map(c => 
      c.id === comprovacaoId 
        ? { ...c, entries: c.entries.filter(e => e.id !== entryId) }
        : c
    ));
  };

  // Função para atualizar valor da unidade na comprovação
  const updateComprovacaoUnidade = (comprovacaoId, novoValor) => {
    setComprovacoes(comprovacoes.map(c => 
      c.id === comprovacaoId 
        ? { ...c, valorUnidade: novoValor }
        : c
    ));
  };

  // Função para adicionar nova linha de jogo na aposta múltipla
  const addGameLine = () => {
    setNewBanca({
      ...newBanca,
      games: [...newBanca.games, {
        sport: '',
        competition: '',
        team1: '',
        team2: '',
        mercado: ''
      }]
    });
  };

  // Função para remover linha de jogo
  const removeGameLine = (index) => {
    if (newBanca.games.length > 1) {
      const newGames = newBanca.games.filter((_, i) => i !== index);
      setNewBanca({
        ...newBanca,
        games: newGames
      });
    }
  };

  // Função para atualizar jogo específico
  const updateGame = (index, field, value) => {
    const newGames = [...newBanca.games];
    newGames[index] = {
      ...newGames[index],
      [field]: value
    };
    setNewBanca({
      ...newBanca,
      games: newGames
    });
  };

  // Função para obter estatísticas de uma comprovação específica
  const getComprovacaoStats = (comprovacao, month) => {
    if (!comprovacao) return { totalUnidades: 0, totalLucroUnidades: 0, totalLucroReais: 0, roi: '0.00', totalEntries: 0 };

    const monthEntries = comprovacao.entries.filter(entry => 
      entry.date && entry.date.startsWith(month)
    );

    const totalUnidades = monthEntries.reduce((sum, entry) => sum + (entry.unidades || 0), 0);
    const totalLucroUnidades = monthEntries.reduce((sum, entry) => sum + (entry.lucroUnidades || 0), 0);
    const totalLucroReais = monthEntries.reduce((sum, entry) => sum + (entry.lucroReais || 0), 0);
    
    const roi = totalUnidades > 0 ? ((totalLucroUnidades / totalUnidades) * 100).toFixed(2) : '0.00';

    return {
      totalUnidades,
      totalLucroUnidades,
      totalLucroReais,
      roi,
      totalEntries: monthEntries.length
    };
  };

  // Função para calcular lucros baseado no resultado
  const calculateProfit = (unidades, odds, resultado, valorUnidade) => {
    const valor = unidades * valorUnidade;
    let lucroReais = 0;
    let lucroUnidades = 0;

    switch(resultado) {
      case 'certo':
        lucroReais = (odds - 1) * valor;
        lucroUnidades = (odds - 1) * unidades;
        break;
      case 'errado':
        lucroReais = valor * -1;
        lucroUnidades = unidades * -1;
        break;
      case 'anulada':
        lucroReais = 0;
        lucroUnidades = 0;
        break;
      case 'meio_certo':
        lucroReais = ((odds - 1) * valor) / 2;
        lucroUnidades = ((odds - 1) * unidades) / 2;
        break;
      case 'meio_errado':
        lucroReais = (valor / 2) * -1;
        lucroUnidades = (unidades / 2) * -1;
        break;
      default:
        lucroReais = 0;
        lucroUnidades = 0;
    }

    return { lucroReais, lucroUnidades };
  };

  // Função para obter dados filtrados para estatísticas
  const getFilteredBancaData = useMemo(() => {
    let filtered = [...bancaEntries];

    // Filtros básicos
    if (statFilters.resultado === 'lucro') {
      filtered = filtered.filter(entry => entry.lucroUnidades > 0);
    } else if (statFilters.resultado === 'prejuizo') {
      filtered = filtered.filter(entry => entry.lucroUnidades < 0);
    }

    if (statFilters.site !== 'todos') {
      filtered = filtered.filter(entry => entry.site === statFilters.site);
    }

    if (statFilters.tipo !== 'todos') {
      filtered = filtered.filter(entry => entry.tipo === statFilters.tipo);
    }

    if (statFilters.padrao !== 'todos') {
      filtered = filtered.filter(entry => entry.padrao === statFilters.padrao);
    }

    // Filtros de data
    if (statFilters.startDate) {
      filtered = filtered.filter(entry => entry.date >= statFilters.startDate);
    }

    if (statFilters.endDate) {
      filtered = filtered.filter(entry => entry.date <= statFilters.endDate);
    }

    // Filtros relacionados aos jogos
    if (statFilters.sport !== 'todos' || statFilters.competition !== 'todos' || 
        statFilters.team !== 'todos' || statFilters.mercado !== 'todos') {
      filtered = filtered.filter(entry => {
        return entry.games && entry.games.some(game => {
          const sportMatch = statFilters.sport === 'todos' || game.sport === statFilters.sport;
          const competitionMatch = statFilters.competition === 'todos' || game.competition === statFilters.competition;
          const teamMatch = statFilters.team === 'todos' || game.team1 === statFilters.team || game.team2 === statFilters.team;
          const mercadoMatch = statFilters.mercado === 'todos' || game.mercado === statFilters.mercado;
          
          return sportMatch && competitionMatch && teamMatch && mercadoMatch;
        });
      });
    }

    return filtered;
  }, [bancaEntries, statFilters]);

  // Calcular estatísticas dos dados filtrados
  const filteredStats = useMemo(() => {
    const data = getFilteredBancaData;
    const totalEntries = data.length;
    const totalUnidades = data.reduce((sum, entry) => sum + (entry.unidades || 0), 0);
    const totalLucroUnidades = data.reduce((sum, entry) => sum + (entry.lucroUnidades || 0), 0);
    const totalLucroReais = data.reduce((sum, entry) => sum + (entry.lucroReais || 0), 0);
    const totalOdds = data.reduce((sum, entry) => sum + (parseFloat(entry.odds) || 0), 0);
    const oddMedia = totalEntries > 0 ? (totalOdds / totalEntries).toFixed(2) : '0.00';
    const roi = totalUnidades > 0 ? ((totalLucroUnidades / totalUnidades) * 100).toFixed(2) : '0.00';
    const certas = data.filter(entry => entry.resultado === 'certo').length;
    const erradas = data.filter(entry => entry.resultado === 'errado').length;
    const assertividade = totalEntries > 0 ? ((certas / totalEntries) * 100).toFixed(1) : '0.0';

    return {
      totalEntries,
      totalUnidades,
      totalLucroUnidades,
      totalLucroReais,
      oddMedia,
      roi,
      certas,
      erradas,
      assertividade
    };
  }, [getFilteredBancaData]);

  // Dados para o gráfico de evolução da banca
  const chartData = useMemo(() => {
    const data = getFilteredBancaData.sort((a, b) => new Date(a.date) - new Date(b.date));
    let acumulado = 0;
    
    return data.map(entry => {
      acumulado += entry.lucroUnidades || 0;
      return {
        date: new Date(entry.date).toLocaleDateString('pt-BR'),
        lucro: acumulado,
        entry: entry.lucroUnidades
      };
    });
  }, [getFilteredBancaData]);

  // Função para obter estatísticas da banca
  const getBancaStats = useMemo(() => {
    const monthEntries = bancaEntries.filter(entry => 
      entry.date && entry.date.startsWith(bancaMonth)
    );

    const totalUnidades = monthEntries.reduce((sum, entry) => sum + (entry.unidades || 0), 0);
    const totalLucroUnidades = monthEntries.reduce((sum, entry) => sum + (entry.lucroUnidades || 0), 0);
    const totalLucroReais = monthEntries.reduce((sum, entry) => sum + (entry.lucroReais || 0), 0);
    
    const roi = totalUnidades > 0 ? ((totalLucroUnidades / totalUnidades) * 100).toFixed(2) : '0.00';

    return {
      totalUnidades,
      totalLucroUnidades,
      totalLucroReais,
      roi,
      totalEntries: monthEntries.length
    };
  }, [bancaEntries, bancaMonth]);

  // Função para obter valores únicos para os filtros
  const getUniqueValues = (field) => {
    const values = new Set();
    
    bancaEntries.forEach(entry => {
      if (field === 'games') {
        if (entry.games) {
          entry.games.forEach(game => {
            if (game.sport) values.add(game.sport);
            if (game.competition) values.add(game.competition);
            if (game.team1) values.add(game.team1);
            if (game.team2) values.add(game.team2);
            if (game.mercado) values.add(game.mercado);
          });
        }
      } else if (entry[field]) {
        values.add(entry[field]);
      }
    });
    
    return Array.from(values).sort();
  };

  // Função para obter todas as tags únicas
  const getAllTags = () => {
    const tags = new Set();
    notes.forEach(note => {
      note.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  };

  // Função para obter todos os campeonatos únicos
  const getAllChampionships = () => {
    const championships = new Set();
    notes.forEach(note => {
      if (note.championship) championships.add(note.championship);
    });
    statistics.forEach(stat => {
      if (stat.championship) championships.add(stat.championship);
    });
    return Array.from(championships).sort();
  };

  // Função para obter todas as equipes/jogadores únicos
  const getAllTeamsPlayers = () => {
    const items = new Set();
    
    notes.forEach(note => {
      if (note.noteType === 'individual' || note.noteType === 'time') {
        if (note.team) items.add(note.team);
        if (note.player && note.player !== 'Confronto' && note.player !== '') items.add(note.player);
      } else if (note.noteType === 'confronto' && note.confrontoTeams) {
        note.confrontoTeams.forEach(team => items.add(team));
      }
    });
    
    return Array.from(items).sort();
  };

  // Obter esporte com cor
  const getSportColor = (sportName) => {
    const sport = sports.find(s => s.name === sportName);
    return sport ? sport.color : 'bg-gray-100 text-gray-800';
  };

  // Função para processar confrontos
  const processConfrontoTeams = (team1, team2, noteType) => {
    if (noteType !== 'confronto') return [];
    
    if (team1.trim() && team2.trim()) {
      return [team1.trim(), team2.trim()];
    }
    return [];
  };

  // Função para obter ícone do tipo de nota
  const getNoteTypeIcon = (noteType) => {
    switch (noteType) {
      case 'individual': return <User className="h-4 w-4" />;
      case 'time': return <Building className="h-4 w-4" />;
      case 'campeonato': return <Globe className="h-4 w-4" />;
      case 'confronto': return <Users className="h-4 w-4" />;
      default: return <User className="h-4 w-4" />;
    }
  };

  const getNoteTypeName = (noteType) => {
    switch (noteType) {
      case 'individual': return 'Individual';
      case 'time': return 'Time';
      case 'campeonato': return 'Campeonato';
      case 'confronto': return 'Confronto';
      default: return 'Individual';
    }
  };

  // Aplicar filtros quando clicar nos cards de estatísticas
  const applyQuickFilter = (filterType, value) => {
    if (filterType === 'all') {
      setSelectedSport('todos');
      setSelectedChampionship('todos');
      setSelectedTeamPlayer('todos');
      setSelectedTag('todas');
      setSortBy('date');
      setSearchTerm('');
      setShowConfrontoFilter(false);
    } else if (filterType === 'sport') {
      setSelectedSport(value);
      setSelectedChampionship('todos');
      setSelectedTeamPlayer('todos');
      setSelectedTag('todas');
      setShowConfrontoFilter(false);
    } else if (filterType === 'favorite') {
      setSortBy('favorite');
      setSelectedSport('todos');
      setSelectedChampionship('todos');
      setSelectedTeamPlayer('todos');
      setSelectedTag('todas');
      setShowConfrontoFilter(false);
    } else if (filterType === 'noteType') {
      setSearchTerm('');
      setSelectedSport('todos');
      setSelectedChampionship('todos');
      setSelectedTeamPlayer('todos');
      setSelectedTag('todas');
      setSortBy('date');
      setShowConfrontoFilter(value === 'confronto');
    } else if (filterType === 'tag') {
      setSelectedTag(value);
      setSelectedSport('todos');
      setSelectedChampionship('todos');
      setSelectedTeamPlayer('todos');
      setShowConfrontoFilter(false);
    }
  };

  // Função para obter cor do resultado da banca
  const getResultColor = (resultado) => {
    switch(resultado) {
      case 'certo': return 'bg-green-500';
      case 'errado': return 'bg-red-500';
      case 'anulada': return 'bg-gray-400';
      case 'meio_certo': return 'bg-gradient-to-r from-green-500 to-gray-400';
      case 'meio_errado': return 'bg-gradient-to-r from-gray-400 to-red-500';
      default: return 'bg-white';
    }
  };

  // Função para obter texto do resultado
  const getResultText = (resultado) => {
    switch(resultado) {
      case 'certo': return 'Certo';
      case 'errado': return 'Errado';
      case 'anulada': return 'Anulada';
      case 'meio_certo': return 'Meio Certo';
      case 'meio_errado': return 'Meio Errado';
      default: return '-';
    }
  };

  // Função para obter texto do tipo de aposta
  const getTipoText = (tipo) => {
    const tipoMap = {
      'Simples': 'Simples',
      'Dupla': 'Dupla',
      'Tripla': 'Tripla',
      'Quadrupla': 'Quádrupla',
      'Multipla': 'Múltipla'
    };
    return tipoMap[tipo] || tipo;
  };

  // Filtrar notas considerando todos os filtros
  const filteredNotes = useMemo(() => {
    let filtered = notes;

    if (selectedSport !== 'todos') {
      filtered = filtered.filter(note => note.sport === selectedSport);
    }

    if (selectedChampionship !== 'todos') {
      filtered = filtered.filter(note => note.championship === selectedChampionship);
    }

    if (selectedTeamPlayer !== 'todos') {
      filtered = filtered.filter(note => {
        if (note.noteType === 'individual' || note.noteType === 'time') {
          return note.team === selectedTeamPlayer || note.player === selectedTeamPlayer;
        } else if (note.noteType === 'confronto') {
          return note.confrontoTeams && note.confrontoTeams.includes(selectedTeamPlayer);
        }
        return false;
      });
    }

    if (selectedTag !== 'todas') {
      filtered = filtered.filter(note => note.tags.includes(selectedTag));
    }

    if (showConfrontoFilter) {
      filtered = filtered.filter(note => note.noteType === 'confronto');
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(note => 
        note.content.toLowerCase().includes(term) ||
        (note.player && note.player.toLowerCase().includes(term)) ||
        (note.team && note.team.toLowerCase().includes(term)) ||
        note.championship.toLowerCase().includes(term) ||
        note.tags.some(tag => tag.toLowerCase().includes(term)) ||
        (note.confrontoTeams && note.confrontoTeams.some(team => team.toLowerCase().includes(term)))
      );
    }

    if (sortBy === 'favorite') {
      filtered = filtered.filter(note => note.favorite);
    }

    filtered.sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.date) - new Date(a.date);
      } else if (sortBy === 'year') {
        return b.year - a.year;
      } else if (sortBy === 'player') {
        return (a.player || '').localeCompare(b.player || '');
      } else if (sortBy === 'favorite') {
        return b.favorite - a.favorite;
      }
      return 0;
    });

    return filtered;
  }, [notes, selectedSport, selectedChampionship, selectedTeamPlayer, selectedTag, searchTerm, sortBy, showConfrontoFilter]);

  const filteredStatistics = useMemo(() => {
    let filtered = statistics;

    if (selectedSport !== 'todos') {
      filtered = filtered.filter(stat => stat.sport === selectedSport);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(stat => 
        stat.team.toLowerCase().includes(term) ||
        stat.championship.toLowerCase().includes(term) ||
        stat.situation.toLowerCase().includes(term) ||
        stat.observation.toLowerCase().includes(term)
      );
    }

    filtered.sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.date) - new Date(a.date);
      } else if (sortBy === 'odd') {
        return b.odd - a.odd;
      } else if (sortBy === 'team') {
        return a.team.localeCompare(b.team);
      }
      return 0;
    });

    return filtered;
  }, [statistics, selectedSport, searchTerm, sortBy]);

  const filteredReminders = useMemo(() => {
    let filtered = reminders;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(reminder => 
        reminder.title.toLowerCase().includes(term) ||
        reminder.description.toLowerCase().includes(term)
      );
    }

    filtered.sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(a.date + ' ' + a.time) - new Date(b.date + ' ' + b.time);
      }
      return 0;
    });

    return filtered;
  }, [reminders, searchTerm, sortBy]);

  const filteredBancaEntries = useMemo(() => {
    let filtered = bancaEntries.filter(entry => 
      entry.date && entry.date.startsWith(bancaMonth)
    );

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(entry => 
        entry.site.toLowerCase().includes(term) ||
        entry.tipo.toLowerCase().includes(term) ||
        (entry.padrao && entry.padrao.toLowerCase().includes(term)) ||
        (entry.games && entry.games.some(game => 
          game.sport && game.sport.toLowerCase().includes(term) ||
          game.competition && game.competition.toLowerCase().includes(term) ||
          game.team1 && game.team1.toLowerCase().includes(term) ||
          game.team2 && game.team2.toLowerCase().includes(term) ||
          game.mercado && game.mercado.toLowerCase().includes(term)
        ))
      );
    }

    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

    return filtered;
  }, [bancaEntries, bancaMonth, searchTerm]);

  const filteredComprovacaoEntries = useMemo(() => {
    if (!activeComprovacao) return [];
    
    const comprovacao = getActiveComprovacao();
    if (!comprovacao) return [];

    let filtered = comprovacao.entries.filter(entry => 
      entry.date && entry.date.startsWith(bancaMonth)
    );

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(entry => 
        entry.site.toLowerCase().includes(term) ||
        entry.tipo.toLowerCase().includes(term) ||
        (entry.padrao && entry.padrao.toLowerCase().includes(term)) ||
        (entry.games && entry.games.some(game => 
          game.sport && game.sport.toLowerCase().includes(term) ||
          game.competition && game.competition.toLowerCase().includes(term) ||
          game.team1 && game.team1.toLowerCase().includes(term) ||
          game.team2 && game.team2.toLowerCase().includes(term) ||
          game.mercado && game.mercado.toLowerCase().includes(term)
        ))
      );
    }

    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

    return filtered;
  }, [activeComprovacao, comprovacoes, bancaMonth, searchTerm]);

  // Funções para manipulação de tags
  const handleAddTag = () => {
    if (tagInput.trim() && !newNote.tags.includes(tagInput.trim())) {
      setNewNote({
        ...newNote,
        tags: [...newNote.tags, tagInput.trim()]
      });
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setNewNote({
      ...newNote,
      tags: newNote.tags.filter(tag => tag !== tagToRemove)
    });
  };

  // Funções para manipulação de notas
  const addNote = () => {
    if (!newNote.content) {
      alert('Por favor, preencha o conteúdo da nota');
      return;
    }

    let finalSport = newNote.sport;
    
    if (newNote.sport === 'novo' && newNote.newSport.trim()) {
      finalSport = newNote.newSport.trim().toLowerCase();
      
      if (!sports.find(s => s.name === finalSport)) {
        const colorIndex = sports.length % sportColors.length;
        setSports([...sports, { 
          name: finalSport, 
          color: sportColors[colorIndex] 
        }]);
      }
    }

    const note = {
      id: Date.now(),
      ...newNote,
      sport: finalSport,
      date: newNote.date || new Date().toISOString().split('T')[0]
    };

    setNotes([...notes, note]);
    resetNoteForm();
    setIsAddingNote(false);
  };

  const addStat = () => {
    if (!newStat.team || !newStat.situation || !newStat.odd) {
      alert('Por favor, preencha pelo menos o time, situação e odd');
      return;
    }

    let finalSport = newStat.sport;
    
    if (newStat.sport === 'novo' && newStat.newSport.trim()) {
      finalSport = newStat.newSport.trim().toLowerCase();
      
      if (!sports.find(s => s.name === finalSport)) {
        const colorIndex = sports.length % sportColors.length;
        setSports([...sports, { 
          name: finalSport, 
          color: sportColors[colorIndex] 
        }]);
      }
    }

    const stat = {
      id: Date.now(),
      ...newStat,
      sport: finalSport,
      odd: parseFloat(newStat.odd) || 0,
      date: newStat.date || new Date().toISOString().split('T')[0]
    };

    setStatistics([...statistics, stat]);
    resetStatForm();
    setIsAddingStat(false);
  };

  const addReminder = () => {
    if (!newReminder.title || !newReminder.date) {
      alert('Por favor, preencha pelo menos o título e a data');
      return;
    }

    const reminder = {
      id: Date.now(),
      ...newReminder,
      completed: false
    };

    setReminders([...reminders, reminder]);
    resetReminderForm();
    setIsAddingReminder(false);
  };

  const addBanca = () => {
    if (!newBanca.date || !newBanca.site || !newBanca.odds) {
      alert('Por favor, preencha os campos obrigatórios');
      return;
    }

    // Validar se pelo menos um jogo tem esporte preenchido
    const hasValidGame = newBanca.games.some(game => game.sport.trim() !== '');
    if (!hasValidGame) {
      alert('Por favor, preencha pelo menos um esporte');
      return;
    }

    // Determinar qual valor de unidade usar
    const activeComp = getActiveComprovacao();
    const valorUnidadeAtual = currentView === 'comprovacoes' && activeComprovacao && activeComp
      ? (activeComp.valorUnidade || 100)
      : (config.valorUnidade || 100);

    const { lucroReais, lucroUnidades } = calculateProfit(
      parseFloat(newBanca.unidades) || 0,
      parseFloat(newBanca.odds) || 0,
      newBanca.resultado,
      valorUnidadeAtual
    );

    const banca = {
      id: Date.now(),
      ...newBanca,
      unidades: parseFloat(newBanca.unidades) || 0,
      valor: (parseFloat(newBanca.unidades) || 0) * valorUnidadeAtual,
      odds: parseFloat(newBanca.odds) || 0,
      lucroReais,
      lucroUnidades
    };

    // Adicionar na Banca principal ou na Comprovação ativa
    if (currentView === 'comprovacoes' && activeComprovacao) {
      addComprovacaoEntry(activeComprovacao, banca);
    } else {
      setBancaEntries([...bancaEntries, banca]);
    }
    
    resetBancaForm();
    setIsAddingBanca(false);
  };

  const toggleFavorite = (noteId) => {
    setNotes(notes.map(note => 
      note.id === noteId 
        ? { ...note, favorite: !note.favorite }
        : note
    ));
  };

  const updateStatResult = (statId, result) => {
    setStatistics(statistics.map(stat => 
      stat.id === statId 
        ? { ...stat, result }
        : stat
    ));
  };

  const toggleReminderComplete = (reminderId) => {
    setReminders(reminders.map(reminder => 
      reminder.id === reminderId 
        ? { ...reminder, completed: !reminder.completed }
        : reminder
    ));
  };

  const deleteNote = (noteId) => {
    if (window.confirm('Tem certeza que deseja excluir esta nota?')) {
      setNotes(notes.filter(note => note.id !== noteId));
    }
  };

  const deleteStat = (statId) => {
    if (window.confirm('Tem certeza que deseja excluir esta estatística?')) {
      setStatistics(statistics.filter(stat => stat.id !== statId));
    }
  };

  const deleteReminder = (reminderId) => {
    if (window.confirm('Tem certeza que deseja excluir este lembrete?')) {
      setReminders(reminders.filter(reminder => reminder.id !== reminderId));
    }
  };

  const deleteBanca = (bancaId) => {
    if (window.confirm('Tem certeza que deseja excluir esta entrada?')) {
      setBancaEntries(bancaEntries.filter(entry => entry.id !== bancaId));
    }
  };

  const duplicateNote = (note) => {
    const duplicated = {
      ...note,
      id: Date.now(),
      content: `[CÓPIA] ${note.content}`,
      date: new Date().toISOString().split('T')[0]
    };
    setNotes([...notes, duplicated]);
  };

  const duplicateStat = (stat) => {
    const duplicated = {
      ...stat,
      id: Date.now(),
      observation: `[CÓPIA] ${stat.observation}`,
      date: new Date().toISOString().split('T')[0],
      result: null
    };
    setStatistics([...statistics, duplicated]);
  };

  const duplicateBanca = (entry) => {
    const duplicated = {
      ...entry,
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      resultado: '',
      lucroReais: 0,
      lucroUnidades: 0
    };
    setBancaEntries([...bancaEntries, duplicated]);
  };

  const resetNoteForm = () => {
    setNewNote({
      sport: '',
      newSport: '',
      year: '',
      championship: '',
      team: '',
      player: '',
      confrontoTeam1: '',
      confrontoTeam2: '',
      content: '',
      tags: [],
      favorite: false,
      noteType: 'individual',
      date: new Date().toISOString().split('T')[0]
    });
    setTagInput('');
  };

  const resetStatForm = () => {
    setNewStat({
      sport: '',
      newSport: '',
      championship: '',
      team: '',
      date: new Date().toISOString().split('T')[0],
      situation: '',
      odd: '',
      observation: '',
      result: null
    });
  };

  const resetReminderForm = () => {
    setNewReminder({
      title: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
      time: '12:00',
      type: 'analysis',
      relatedItem: null
    });
  };

  const resetBancaForm = () => {
    const activeComp = currentView === 'comprovacoes' && activeComprovacao ? getActiveComprovacao() : null;
    const valorUnidadeAtual = activeComp ? (activeComp.valorUnidade || 100) : (config.valorUnidade || 100);

    setNewBanca({
      date: new Date().toISOString().split('T')[0],
      site: '',
      tipo: 'Simples',
      padrao: '',
      games: [
        {
          sport: '',
          competition: '',
          team1: '',
          team2: '',
          mercado: ''
        }
      ],
      unidades: 1,
      resultadoJogo: '',
      valor: valorUnidadeAtual,
      odds: '',
      resultado: '',
      lucroReais: 0,
      lucroUnidades: 0
    });
  };

  const getStats = () => {
    const stats = { 
      totalNotes: notes.length,
      totalStats: statistics.length,
      totalReminders: reminders.length,
      completedReminders: reminders.filter(r => r.completed).length,
      pendingReminders: reminders.filter(r => !r.completed).length,
      favorites: notes.filter(n => n.favorite).length,
      winningBets: statistics.filter(s => s.result === 'win').length,
      losingBets: statistics.filter(s => s.result === 'loss').length,
      confrontoNotes: notes.filter(n => n.noteType === 'confronto').length,
      timeNotes: notes.filter(n => n.noteType === 'time').length,
      campeonatoNotes: notes.filter(n => n.noteType === 'campeonato').length,
      individualNotes: notes.filter(n => n.noteType === 'individual').length,
      totalBancaEntries: bancaEntries.length
    };
    
    sports.forEach(sport => {
      stats[sport.name + '_notes'] = notes.filter(n => n.sport === sport.name).length;
      stats[sport.name + '_stats'] = statistics.filter(s => s.sport === sport.name).length;
    });
    
    return stats;
  };

  const stats = getStats();
  const themeClasses = config.theme === 'dark' 
    ? 'min-h-screen bg-gray-900 text-white' 
    : 'min-h-screen bg-gray-50';

  return (
    <div className={themeClasses}>
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className={`rounded-lg shadow-sm p-6 mb-6 ${config.theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold mb-2">
                  Plataforma de Apostas
                  {hasUnsavedChanges && (
                    <span className="ml-3 text-sm font-normal text-orange-500">
                      • Alterações não salvas
                    </span>
                  )}
                </h1>
                <p className={config.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  Gerencie anotações, estatísticas, lembretes e sua banca profissional
                </p>
                {lastAutoBackup && (
                  <p className="text-xs text-green-600 mt-1">
                    ✓ Último backup automático: {lastAutoBackup.toLocaleTimeString('pt-BR')}
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                {hasUnsavedChanges && !isBackingUp && (
                  <button
                    onClick={() => alert('Função de backup em desenvolvimento')}
                    className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 animate-pulse"
                  >
                    <Save className="h-4 w-4" />
                    Backup
                  </button>
                )}
                <button
                  onClick={() => alert('Função de importação em desenvolvimento')}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Upload className="h-4 w-4" />
                  Importar
                </button>
                <button
                  onClick={() => alert('Função de exportação em desenvolvimento')}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  <Download className="h-4 w-4" />
                  Exportar
                </button>
                <button
                  onClick={() => setShowSettings(true)}
                  className={`p-2 rounded-lg ${config.theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
                >
                  <Settings className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            {/* Navigation */}
            <div className="flex gap-1 mt-6 mb-4">
              <button
                onClick={() => setCurrentView('notes')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  currentView === 'notes' 
                    ? 'bg-blue-600 text-white' 
                    : config.theme === 'dark' 
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <FileText className="h-4 w-4" />
                Anotações ({stats.totalNotes})
              </button>
              <button
                onClick={() => setCurrentView('stats')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  currentView === 'stats' 
                    ? 'bg-blue-600 text-white' 
                    : config.theme === 'dark' 
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <BarChart3 className="h-4 w-4" />
                Estatísticas ({stats.totalStats})
              </button>
              <button
                onClick={() => setCurrentView('reminders')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  currentView === 'reminders' 
                    ? 'bg-blue-600 text-white' 
                    : config.theme === 'dark' 
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Bell className="h-4 w-4" />
                Lembretes ({stats.pendingReminders}/{stats.totalReminders})
              </button>
              <button
                onClick={() => setCurrentView('banca')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  currentView === 'banca' 
                    ? 'bg-blue-600 text-white' 
                    : config.theme === 'dark' 
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <PiggyBank className="h-4 w-4" />
                Banca ({stats.totalBancaEntries})
              </button>
              <button
                onClick={() => setCurrentView('comprovacoes')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  currentView === 'comprovacoes' 
                    ? 'bg-blue-600 text-white' 
                    : config.theme === 'dark' 
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <CheckCircle className="h-4 w-4" />
                Comprovações ({comprovacoes.length})
              </button>
            </div>

            {/* Stats específicos por view */}
            {currentView === 'notes' && (
              <div className="grid grid-cols-6 gap-4">
                <button
                  onClick={() => applyQuickFilter('all', 'todos')}
                  className="bg-blue-50 p-4 rounded-lg hover:bg-blue-100 transition-colors text-left"
                >
                  <div className="text-2xl font-bold text-blue-600">{stats.totalNotes}</div>
                  <div className="text-sm text-blue-800">Total</div>
                </button>
                <button
                  onClick={() => applyQuickFilter('favorite', true)}
                  className="bg-yellow-50 p-4 rounded-lg hover:bg-yellow-100 transition-colors text-left"
                >
                  <div className="text-2xl font-bold text-yellow-600">{stats.favorites}</div>
                  <div className="text-sm text-yellow-800">Favoritas</div>
                </button>
                <div className="bg-emerald-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-emerald-600">{stats.individualNotes}</div>
                  <div className="text-sm text-emerald-800">Individual</div>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-amber-600">{stats.timeNotes}</div>
                  <div className="text-sm text-amber-800">Times</div>
                </div>
                <div className="bg-sky-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-sky-600">{stats.campeonatoNotes}</div>
                  <div className="text-sm text-sky-800">Campeonatos</div>
                </div>
                <button
                  onClick={() => applyQuickFilter('noteType', 'confronto')}
                  className="bg-purple-50 p-4 rounded-lg hover:bg-purple-100 transition-colors text-left"
                >
                  <div className="text-2xl font-bold text-purple-600">{stats.confrontoNotes}</div>
                  <div className="text-sm text-purple-800">Confrontos</div>
                </button>
              </div>
            )}

            {currentView === 'stats' && (
              <div className="grid grid-cols-6 gap-4">
                <button
                  onClick={() => applyQuickFilter('all', 'todos')}
                  className="bg-blue-50 p-4 rounded-lg hover:bg-blue-100 transition-colors text-left"
                >
                  <div className="text-2xl font-bold text-blue-600">{stats.totalStats}</div>
                  <div className="text-sm text-blue-800">Total</div>
                </button>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{stats.winningBets}</div>
                  <div className="text-sm text-green-800">Ganhas</div>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">{stats.losingBets}</div>
                  <div className="text-sm text-red-800">Perdas</div>
                </div>
                {sports.slice(0, 3).map(sport => (
                  <button
                    key={sport.name}
                    onClick={() => applyQuickFilter('sport', sport.name)}
                    className={`p-4 rounded-lg hover:opacity-80 transition-colors text-left ${sport.color.replace('text-', 'bg-').replace('-800', '-50')}`}
                  >
                    <div className={`text-2xl font-bold ${sport.color.replace('bg-', 'text-').replace('-100', '-600')}`}>
                      {stats[sport.name + '_stats'] || 0}
                    </div>
                    <div className={`text-sm ${sport.color.replace('bg-', 'text-').replace('-100', '-800')}`}>
                      {sport.name.charAt(0).toUpperCase() + sport.name.slice(1)}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {currentView === 'reminders' && (
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{stats.totalReminders}</div>
                  <div className="text-sm text-blue-800">Total</div>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">{stats.pendingReminders}</div>
                  <div className="text-sm text-orange-800">Pendentes</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{stats.completedReminders}</div>
                  <div className="text-sm text-green-800">Concluídos</div>
                </div>
              </div>
            )}

            {currentView === 'comprovacoes' && (
              <div className="space-y-4">
                <div className="flex gap-2 flex-wrap items-center">
                  <button
                    onClick={() => setIsAddingComprovacao(true)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                  >
                    <Plus className="h-4 w-4" />
                    Nova Comprovação
                  </button>
                  
                  {comprovacoes.map(comp => (
                    <div key={comp.id} className="flex items-center">
                      <button
                        onClick={() => setActiveComprovacao(comp.id)}
                        className={`px-3 py-1.5 rounded-l-lg text-sm transition-colors ${
                          activeComprovacao === comp.id
                            ? 'bg-purple-600 text-white'
                            : config.theme === 'dark'
                            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {comp.name}
                      </button>
                      <button
                        onClick={() => deleteComprovacao(comp.id)}
                        className={`px-2 py-1.5 rounded-r-lg text-sm transition-colors border-l ${
                          activeComprovacao === comp.id
                            ? 'bg-purple-700 text-white hover:bg-purple-800 border-purple-800'
                            : config.theme === 'dark'
                            ? 'bg-gray-700 text-gray-300 hover:bg-red-700 border-gray-600'
                            : 'bg-gray-200 text-gray-700 hover:bg-red-100 hover:text-red-600 border-gray-300'
                        }`}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>

                {activeComprovacao && getActiveComprovacao() && (
                  <>
                    <div className="grid grid-cols-4 gap-4">
                      <div className={`p-6 rounded-lg ${getComprovacaoStats(getActiveComprovacao(), bancaMonth).totalLucroUnidades >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className={`text-sm font-medium ${getComprovacaoStats(getActiveComprovacao(), bancaMonth).totalLucroUnidades >= 0 ? 'text-green-800' : 'text-red-800'}`}>
                              Lucro/Prejuízo (Unidades)
                            </p>
                            <p className={`text-3xl font-bold ${getComprovacaoStats(getActiveComprovacao(), bancaMonth).totalLucroUnidades >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {getComprovacaoStats(getActiveComprovacao(), bancaMonth).totalLucroUnidades >= 0 ? '+' : ''}{(getComprovacaoStats(getActiveComprovacao(), bancaMonth).totalLucroUnidades || 0).toFixed(2)}u
                            </p>
                          </div>
                          {getComprovacaoStats(getActiveComprovacao(), bancaMonth).totalLucroUnidades >= 0 ? (
                            <TrendingUp className="h-8 w-8 text-green-600" />
                          ) : (
                            <TrendingDown className="h-8 w-8 text-red-600" />
                          )}
                        </div>
                      </div>

                      <div className={`p-6 rounded-lg ${getComprovacaoStats(getActiveComprovacao(), bancaMonth).roi >= 0 ? 'bg-blue-50' : 'bg-orange-50'}`}>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className={`text-sm font-medium ${getComprovacaoStats(getActiveComprovacao(), bancaMonth).roi >= 0 ? 'text-blue-800' : 'text-orange-800'}`}>
                              ROI
                            </p>
                            <p className={`text-3xl font-bold ${getComprovacaoStats(getActiveComprovacao(), bancaMonth).roi >= 0 ? 'text-blue-600' : 'text-orange-600'}`}>
                              {getComprovacaoStats(getActiveComprovacao(), bancaMonth).roi}%
                            </p>
                          </div>
                          <Target className="h-8 w-8 text-blue-600" />
                        </div>
                      </div>

                      <div className={`p-6 rounded-lg ${getComprovacaoStats(getActiveComprovacao(), bancaMonth).totalLucroReais >= 0 ? 'bg-emerald-50' : 'bg-pink-50'}`}>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className={`text-sm font-medium ${getComprovacaoStats(getActiveComprovacao(), bancaMonth).totalLucroReais >= 0 ? 'text-emerald-800' : 'text-pink-800'}`}>
                              Lucro/Prejuízo (R$)
                            </p>
                            <p className={`text-3xl font-bold ${getComprovacaoStats(getActiveComprovacao(), bancaMonth).totalLucroReais >= 0 ? 'text-emerald-600' : 'text-pink-600'}`}>
                              R$ {getComprovacaoStats(getActiveComprovacao(), bancaMonth).totalLucroReais >= 0 ? '+' : ''}{(getComprovacaoStats(getActiveComprovacao(), bancaMonth).totalLucroReais || 0).toFixed(2)}
                            </p>
                          </div>
                          <DollarSign className="h-8 w-8 text-emerald-600" />
                        </div>
                      </div>

                      <div className="p-6 rounded-lg bg-purple-50">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-purple-800">
                              Total de Apostas
                            </p>
                            <p className="text-3xl font-bold text-purple-600">
                              {getComprovacaoStats(getActiveComprovacao(), bancaMonth).totalEntries}
                            </p>
                          </div>
                          <Activity className="h-8 w-8 text-purple-600" />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <label className="text-sm font-medium">Mês:</label>
                        <input
                          type="month"
                          value={bancaMonth}
                          onChange={(e) => setBancaMonth(e.target.value)}
                          className={`px-3 py-1 border rounded-lg ${
                            config.theme === 'dark' 
                              ? 'bg-gray-700 border-gray-600 text-white' 
                              : 'bg-white border-gray-300'
                          }`}
                        />
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <label className="text-sm font-medium">Valor da unidade:</label>
                        {editingComprovacaoUnidade ? (
                          <div className="flex items-center gap-2">
                            <span className="text-sm">R$</span>
                            <input
                              type="number"
                              value={tempComprovacaoUnidade}
                              onChange={(e) => setTempComprovacaoUnidade(parseFloat(e.target.value) || 0)}
                              className={`w-24 px-2 py-1 border rounded ${
                                config.theme === 'dark' 
                                  ? 'bg-gray-700 border-gray-600 text-white' 
                                  : 'bg-white border-gray-300'
                              }`}
                              autoFocus
                            />
                            <button
                              onClick={() => {
                                updateComprovacaoUnidade(activeComprovacao, tempComprovacaoUnidade);
                                setEditingComprovacaoUnidade(false);
                              }}
                              className="p-1 text-green-600 hover:text-green-700"
                            >
                              <Save className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => {
                                const activeComp = getActiveComprovacao();
                                if (activeComp) {
                                  setTempComprovacaoUnidade(activeComp.valorUnidade);
                                }
                                setEditingComprovacaoUnidade(false);
                              }}
                              className="p-1 text-red-600 hover:text-red-700"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              const activeComp = getActiveComprovacao();
                              if (activeComp) {
                                setTempComprovacaoUnidade(activeComp.valorUnidade);
                                setEditingComprovacaoUnidade(true);
                              }
                            }}
                            className={`px-3 py-1 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2 ${
                              config.theme === 'dark' 
                                ? 'border-gray-600 text-gray-300' 
                                : 'border-gray-300'
                            }`}
                          >
                            R$ {getActiveComprovacao() ? (getActiveComprovacao().valorUnidade || 100).toFixed(2) : '100.00'}
                            <Edit2 className="h-3 w-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  </>
                )}

                {!activeComprovacao && comprovacoes.length > 0 && (
                  <div className="text-center py-8">
                    <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">
                      Selecione uma comprovação acima para visualizar os dados
                    </p>
                  </div>
                )}

                {comprovacoes.length === 0 && (
                  <div className="text-center py-8">
                    <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">
                      Nenhuma comprovação criada ainda. Clique em "Nova Comprovação" para começar.
                    </p>
                  </div>
                )}
              </div>
            )}

            {currentView === 'banca' && (
              <div className="space-y-4">
                <div className="grid grid-cols-4 gap-4">
                  <div className={`p-6 rounded-lg ${getBancaStats.totalLucroUnidades >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`text-sm font-medium ${getBancaStats.totalLucroUnidades >= 0 ? 'text-green-800' : 'text-red-800'}`}>
                          Lucro/Prejuízo (Unidades)
                        </p>
                        <p className={`text-3xl font-bold ${getBancaStats.totalLucroUnidades >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {getBancaStats.totalLucroUnidades >= 0 ? '+' : ''}{(getBancaStats.totalLucroUnidades || 0).toFixed(2)}u
                        </p>
                      </div>
                      {getBancaStats.totalLucroUnidades >= 0 ? (
                        <TrendingUp className="h-8 w-8 text-green-600" />
                      ) : (
                        <TrendingDown className="h-8 w-8 text-red-600" />
                      )}
                    </div>
                  </div>

                  <div className={`p-6 rounded-lg ${getBancaStats.roi >= 0 ? 'bg-blue-50' : 'bg-orange-50'}`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`text-sm font-medium ${getBancaStats.roi >= 0 ? 'text-blue-800' : 'text-orange-800'}`}>
                          ROI
                        </p>
                        <p className={`text-3xl font-bold ${getBancaStats.roi >= 0 ? 'text-blue-600' : 'text-orange-600'}`}>
                          {getBancaStats.roi}%
                        </p>
                      </div>
                      <Target className="h-8 w-8 text-blue-600" />
                    </div>
                  </div>

                  <div className={`p-6 rounded-lg ${getBancaStats.totalLucroReais >= 0 ? 'bg-emerald-50' : 'bg-pink-50'}`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`text-sm font-medium ${getBancaStats.totalLucroReais >= 0 ? 'text-emerald-800' : 'text-pink-800'}`}>
                          Lucro/Prejuízo (R$)
                        </p>
                        <p className={`text-3xl font-bold ${getBancaStats.totalLucroReais >= 0 ? 'text-emerald-600' : 'text-pink-600'}`}>
                          R$ {getBancaStats.totalLucroReais >= 0 ? '+' : ''}{(getBancaStats.totalLucroReais || 0).toFixed(2)}
                        </p>
                      </div>
                      <DollarSign className="h-8 w-8 text-emerald-600" />
                    </div>
                  </div>

                  <div className="p-6 rounded-lg bg-purple-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-purple-800">
                          Total de Apostas
                        </p>
                        <p className="text-3xl font-bold text-purple-600">
                          {getBancaStats.totalEntries}
                        </p>
                      </div>
                      <Activity className="h-8 w-8 text-purple-600" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium">Mês:</label>
                    <input
                      type="month"
                      value={bancaMonth}
                      onChange={(e) => setBancaMonth(e.target.value)}
                      className={`px-3 py-1 border rounded-lg ${
                        config.theme === 'dark' 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300'
                      }`}
                    />
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium">Valor da unidade:</label>
                    {editingUnidade ? (
                      <div className="flex items-center gap-2">
                        <span className="text-sm">R$</span>
                        <input
                          type="number"
                          value={tempValorUnidade}
                          onChange={(e) => setTempValorUnidade(parseFloat(e.target.value) || 0)}
                          className={`w-24 px-2 py-1 border rounded ${
                            config.theme === 'dark' 
                              ? 'bg-gray-700 border-gray-600 text-white' 
                              : 'bg-white border-gray-300'
                          }`}
                          autoFocus
                        />
                        <button
                          onClick={() => {
                            setConfig({...config, valorUnidade: tempValorUnidade});
                            setEditingUnidade(false);
                          }}
                          className="p-1 text-green-600 hover:text-green-700"
                        >
                          <Save className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => {
                            setTempValorUnidade(config.valorUnidade);
                            setEditingUnidade(false);
                          }}
                          className="p-1 text-red-600 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setTempValorUnidade(config.valorUnidade);
                          setEditingUnidade(true);
                        }}
                        className={`px-3 py-1 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2 ${
                          config.theme === 'dark' 
                            ? 'border-gray-600 text-gray-300' 
                            : 'border-gray-300'
                        }`}
                      >
                        R$ {(config.valorUnidade || 100).toFixed(2)}
                        <Edit2 className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                  
                  <button
                    onClick={() => setShowStatistics(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    <BarChart3 className="h-4 w-4" />
                    Estatísticas
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Controles e Busca */}
          <div className={`rounded-lg shadow-sm p-6 mb-6 ${config.theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <div className="flex gap-3 flex-wrap">
                {currentView === 'notes' && (
                  <>
                    <select
                      className={`px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                        config.theme === 'dark' 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300'
                      }`}
                      value={selectedSport}
                      onChange={(e) => setSelectedSport(e.target.value)}
                    >
                      <option value="todos">Todos os Esportes</option>
                      {sports.map(sport => (
                        <option key={sport.name} value={sport.name}>
                          {sport.name.charAt(0).toUpperCase() + sport.name.slice(1)}
                        </option>
                      ))}
                    </select>

                    <select
                      className={`px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                        config.theme === 'dark' 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300'
                      }`}
                      value={selectedChampionship}
                      onChange={(e) => setSelectedChampionship(e.target.value)}
                    >
                      <option value="todos">Todos os Campeonatos</option>
                      {getAllChampionships().map(championship => (
                        <option key={championship} value={championship}>
                          {championship}
                        </option>
                      ))}
                    </select>

                    <button
                      onClick={() => setIsAddingNote(true)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      Nova Nota
                    </button>
                  </>
                )}

                {currentView === 'stats' && (
                  <>
                    <select
                      className={`px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                        config.theme === 'dark' 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300'
                      }`}
                      value={selectedSport}
                      onChange={(e) => setSelectedSport(e.target.value)}
                    >
                      <option value="todos">Todos os Esportes</option>
                      {sports.map(sport => (
                        <option key={sport.name} value={sport.name}>
                          {sport.name.charAt(0).toUpperCase() + sport.name.slice(1)}
                        </option>
                      ))}
                    </select>

                    <button
                      onClick={() => setIsAddingStat(true)}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      Nova Estatística
                    </button>
                  </>
                )}

                {currentView === 'reminders' && (
                  <button
                    onClick={() => setIsAddingReminder(true)}
                    className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Novo Lembrete
                  </button>
                )}

                {currentView === 'banca' && (
                  <button
                    onClick={() => setIsAddingBanca(true)}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Nova Entrada
                  </button>
                )}

                {currentView === 'comprovacoes' && activeComprovacao && (
                  <button
                    onClick={() => setIsAddingBanca(true)}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Nova Entrada
                  </button>
                )}
              </div>
              <div className="flex-1 min-w-64">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder={`Buscar ${currentView === 'notes' ? 'notas' : currentView === 'stats' ? 'estatísticas' : currentView === 'reminders' ? 'lembretes' : 'entradas'}...`}
                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      config.theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300'
                    }`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Modal de Estatísticas */}
          {showStatistics && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className={`rounded-lg p-6 w-full max-w-7xl mx-4 max-h-[90vh] overflow-y-auto ${config.theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Estatísticas Detalhadas</h2>
                  <button
                    onClick={() => setShowStatistics(false)}
                    className={`p-2 rounded-lg ${config.theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Filtros */}
                <div className={`p-4 rounded-lg mb-6 ${config.theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Filtros</h3>
                    <button
                      onClick={() => {
                        setShowStatistics(false);
                        setCurrentView('banca');
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                    >
                      <PiggyBank className="h-4 w-4" />
                      Voltar para Banca
                    </button>
                  </div>
                  <div className="grid grid-cols-4 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Padrão</label>
                      <select
                        className={`w-full px-3 py-2 border rounded-lg ${
                          config.theme === 'dark' 
                            ? 'bg-gray-600 border-gray-500 text-white' 
                            : 'bg-white border-gray-300'
                        }`}
                        value={statFilters.padrao}
                        onChange={(e) => setStatFilters({...statFilters, padrao: e.target.value})}
                      >
                        <option value="todos">Todos os Padrões</option>
                        {getUniqueValues('padrao').map(padrao => (
                          <option key={padrao} value={padrao}>{padrao}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Data Início</label>
                      <input
                        type="date"
                        className={`w-full px-3 py-2 border rounded-lg ${
                          config.theme === 'dark' 
                            ? 'bg-gray-600 border-gray-500 text-white' 
                            : 'bg-white border-gray-300'
                        }`}
                        value={statFilters.startDate}
                        onChange={(e) => setStatFilters({...statFilters, startDate: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Data Fim</label>
                      <input
                        type="date"
                        className={`w-full px-3 py-2 border rounded-lg ${
                          config.theme === 'dark' 
                            ? 'bg-gray-600 border-gray-500 text-white' 
                            : 'bg-white border-gray-300'
                        }`}
                        value={statFilters.endDate}
                        onChange={(e) => setStatFilters({...statFilters, endDate: e.target.value})}
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => setStatFilters({
                      resultado: 'todos',
                      site: 'todos',
                      sport: 'todos',
                      competition: 'todos',
                      team: 'todos',
                      tipo: 'todos',
                      mercado: 'todos',
                      padrao: 'todos',
                      startDate: '',
                      endDate: ''
                    })}
                    className="mt-4 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center gap-2"
                  >
                    <Filter className="h-4 w-4" />
                    Limpar Filtros
                  </button>
                </div>

                {/* Resumo das Estatísticas */}
                <div className="grid grid-cols-4 gap-4 mb-6">
                  <div className={`p-4 rounded-lg ${filteredStats.totalLucroUnidades >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
                    <div className={`text-2xl font-bold ${filteredStats.totalLucroUnidades >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {filteredStats.totalLucroUnidades >= 0 ? '+' : ''}{filteredStats.totalLucroUnidades.toFixed(2)}u
                    </div>
                    <div className={`text-sm ${filteredStats.totalLucroUnidades >= 0 ? 'text-green-800' : 'text-red-800'}`}>
                      Lucro Total (Unidades)
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{filteredStats.roi}%</div>
                    <div className="text-sm text-blue-800">ROI</div>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{filteredStats.oddMedia}</div>
                    <div className="text-sm text-purple-800">Odd Média</div>
                  </div>

                  <div className="bg-amber-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-amber-600">{filteredStats.assertividade}%</div>
                    <div className="text-sm text-amber-800">Assertividade</div>
                  </div>
                </div>

                {/* Gráficos */}
                <div className="grid grid-cols-2 gap-6">
                  <div className={`p-4 rounded-lg ${config.theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <h4 className="text-lg font-medium mb-4">Evolução da Banca</h4>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="lucro" 
                          stroke="#8884d8" 
                          strokeWidth={2}
                          name="Lucro Acumulado (Un.)"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  <div className={`p-4 rounded-lg ${config.theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <h4 className="text-lg font-medium mb-4">Distribuição de Resultados</h4>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={[
                            { name: 'Certas', value: filteredStats.certas, fill: '#10b981' },
                            { name: 'Erradas', value: filteredStats.erradas, fill: '#ef4444' }
                          ]}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        />
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Lista de entradas filtradas */}
                <div className="mt-6">
                  <h4 className="text-lg font-medium mb-4">
                    Entradas Filtradas ({filteredStats.totalEntries} de {bancaEntries.length})
                  </h4>
                  <div className="max-h-60 overflow-y-auto">
                    {getFilteredBancaData.slice(0, 10).map(entry => (
                      <div key={entry.id} className={`p-3 rounded-lg mb-2 ${config.theme === 'dark' ? 'bg-gray-600' : 'bg-gray-100'}`}>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-4">
                            <span className="text-sm">{new Date(entry.date).toLocaleDateString('pt-BR')}</span>
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                              {entry.site}
                            </span>
                            <span className="text-sm">{getTipoText(entry.tipo)}</span>
                            {entry.padrao && (
                              <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">
                                {entry.padrao}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-sm">Odd: {entry.odds}</span>
                            <span className={`font-medium ${entry.lucroUnidades >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {entry.lucroUnidades >= 0 ? '+' : ''}{entry.lucroUnidades.toFixed(2)}u
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                    {getFilteredBancaData.length > 10 && (
                      <div className="text-center text-gray-500 text-sm mt-2">
                        ... e mais {getFilteredBancaData.length - 10} entradas
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Modal para Nova Comprovação */}
          {isAddingComprovacao && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className={`rounded-lg p-6 w-full max-w-md mx-4 ${config.theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <h2 className="text-2xl font-bold mb-4">Nova Comprovação</h2>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Nome da Comprovação</label>
                  <input
                    type="text"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 ${
                      config.theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300'
                    }`}
                    value={newComprovacaoName}
                    onChange={(e) => setNewComprovacaoName(e.target.value)}
                    placeholder="Ex: Método X, Sistema Y"
                    autoFocus
                  />
                </div>

                <div className="flex gap-3 justify-end">
                  <button
                    onClick={() => {
                      setIsAddingComprovacao(false);
                      setNewComprovacaoName('');
                    }}
                    className={`px-4 py-2 border rounded-lg ${
                      config.theme === 'dark' 
                        ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                        : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={addComprovacao}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                  >
                    Criar Comprovação
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Modal para Nova Entrada Banca */}
          {isAddingBanca && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className={`rounded-lg p-6 w-full max-w-5xl mx-4 max-h-[90vh] overflow-y-auto ${config.theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <h2 className="text-2xl font-bold mb-4">Nova Entrada</h2>
                
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Data *</label>
                    <input
                      type="date"
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                        config.theme === 'dark' 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300'
                      }`}
                      value={newBanca.date}
                      onChange={(e) => setNewBanca({...newBanca, date: e.target.value})}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Site *</label>
                    <input
                      type="text"
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                        config.theme === 'dark' 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300'
                      }`}
                      value={newBanca.site}
                      onChange={(e) => setNewBanca({...newBanca, site: e.target.value})}
                      placeholder="Ex: Bet365, Betfair"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Tipo *</label>
                    <select
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                        config.theme === 'dark' 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300'
                      }`}
                      value={newBanca.tipo}
                      onChange={(e) => {
                        const tipo = e.target.value;
                        let gamesCount = 1;
                        
                        switch(tipo) {
                          case 'Dupla': gamesCount = 2; break;
                          case 'Tripla': gamesCount = 3; break;
                          case 'Quadrupla': gamesCount = 4; break;
                          case 'Multipla': gamesCount = 5; break;
                          default: gamesCount = 1;
                        }
                        
                        const newGames = Array(gamesCount).fill().map((_, index) => 
                          newBanca.games[index] || {
                            sport: '',
                            competition: '',
                            team1: '',
                            team2: '',
                            mercado: ''
                          }
                        );
                        
                        setNewBanca({...newBanca, tipo, games: newGames});
                      }}
                    >
                      <option value="Simples">Simples</option>
                      <option value="Dupla">Dupla</option>
                      <option value="Tripla">Tripla</option>
                      <option value="Quadrupla">Quádrupla</option>
                      <option value="Multipla">Múltipla</option>
                    </select>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Padrão</label>
                  <input
                    type="text"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                      config.theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300'
                    }`}
                    value={newBanca.padrao}
                    onChange={(e) => setNewBanca({...newBanca, padrao: e.target.value})}
                    placeholder="Ex: Over em clássicos, Favoritos em casa"
                  />
                </div>

                {/* Seção de Jogos */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-sm font-medium">Jogos da Aposta</label>
                    {newBanca.tipo === 'Multipla' && (
                      <button
                        type="button"
                        onClick={addGameLine}
                        className="flex items-center gap-1 px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                      >
                        <Plus className="h-4 w-4" />
                        Adicionar Jogo
                      </button>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    {newBanca.games.map((game, index) => (
                      <div key={index} className={`border rounded-lg p-4 ${config.theme === 'dark' ? 'border-gray-600 bg-gray-700' : 'border-gray-300 bg-gray-50'}`}>
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium">Jogo {index + 1}</h4>
                          {newBanca.tipo === 'Multipla' && newBanca.games.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeGameLine(index)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-3 gap-3 mb-3">
                          <div>
                            <label className="block text-xs font-medium mb-1">Esporte *</label>
                            <input
                              type="text"
                              className={`w-full px-2 py-1 border rounded text-sm ${
                                config.theme === 'dark' 
                                  ? 'bg-gray-600 border-gray-500 text-white' 
                                  : 'bg-white border-gray-300'
                              }`}
                              value={game.sport}
                              onChange={(e) => updateGame(index, 'sport', e.target.value)}
                              placeholder="Ex: Futebol"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-xs font-medium mb-1">Competição</label>
                            <input
                              type="text"
                              className={`w-full px-2 py-1 border rounded text-sm ${
                                config.theme === 'dark' 
                                  ? 'bg-gray-600 border-gray-500 text-white' 
                                  : 'bg-white border-gray-300'
                              }`}
                              value={game.competition}
                              onChange={(e) => updateGame(index, 'competition', e.target.value)}
                              placeholder="Ex: Brasileirão"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-xs font-medium mb-1">Mercado</label>
                            <input
                              type="text"
                              className={`w-full px-2 py-1 border rounded text-sm ${
                                config.theme === 'dark' 
                                  ? 'bg-gray-600 border-gray-500 text-white' 
                                  : 'bg-white border-gray-300'
                              }`}
                              value={game.mercado}
                              onChange={(e) => updateGame(index, 'mercado', e.target.value)}
                              placeholder="Ex: Over 2.5"
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-medium mb-1">Time/Jogador 1</label>
                            <input
                              type="text"
                              className={`w-full px-2 py-1 border rounded text-sm ${
                                config.theme === 'dark' 
                                  ? 'bg-gray-600 border-gray-500 text-white' 
                                  : 'bg-white border-gray-300'
                              }`}
                              value={game.team1}
                              onChange={(e) => updateGame(index, 'team1', e.target.value)}
                              placeholder="Ex: Flamengo"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-xs font-medium mb-1">Time/Jogador 2</label>
                            <input
                              type="text"
                              className={`w-full px-2 py-1 border rounded text-sm ${
                                config.theme === 'dark' 
                                  ? 'bg-gray-600 border-gray-500 text-white' 
                                  : 'bg-white border-gray-300'
                              }`}
                              value={game.team2}
                              onChange={(e) => updateGame(index, 'team2', e.target.value)}
                              placeholder="Ex: Vasco"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Unidades</label>
                    <input
                      type="number"
                      step="0.5"
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                        config.theme === 'dark' 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300'
                      }`}
                      value={newBanca.unidades}
                      onChange={(e) => {
                        const unidades = parseFloat(e.target.value) || 0;
                        const valor = unidades * (config.valorUnidade || 100);
                        setNewBanca({...newBanca, unidades, valor});
                      }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Odds *</label>
                    <input
                      type="number"
                      step="0.01"
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                        config.theme === 'dark' 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300'
                      }`}
                      value={newBanca.odds}
                      onChange={(e) => setNewBanca({...newBanca, odds: e.target.value})}
                      placeholder="Ex: 1.85"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Resultado da Aposta</label>
                    <select
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                        config.theme === 'dark' 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300'
                      }`}
                      value={newBanca.resultado}
                      onChange={(e) => {
                        const resultado = e.target.value;
                        const valorUnidadeAtual = config.valorUnidade || 100;
                        const { lucroReais, lucroUnidades } = calculateProfit(
                          parseFloat(newBanca.unidades) || 0,
                          parseFloat(newBanca.odds) || 0,
                          resultado,
                          valorUnidadeAtual
                        );
                        setNewBanca({...newBanca, resultado, lucroReais, lucroUnidades});
                      }}
                    >
                      <option value="">Pendente</option>
                      <option value="certo">Certo</option>
                      <option value="errado">Errado</option>
                      <option value="anulada">Anulada</option>
                      <option value="meio_certo">Meio Certo</option>
                      <option value="meio_errado">Meio Errado</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Valor (R$)</label>
                    <input
                      type="text"
                      className={`w-full px-3 py-2 border rounded-lg bg-gray-100 ${
                        config.theme === 'dark' 
                          ? 'bg-gray-600 text-gray-300' 
                          : 'bg-gray-100 text-gray-600'
                      }`}
                      value={`R$ ${((newBanca.unidades || 0) * (config.valorUnidade || 100)).toFixed(2)}`}
                      disabled
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Resultado do Jogo</label>
                  <input
                    type="text"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                      config.theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300'
                    }`}
                    value={newBanca.resultadoJogo}
                    onChange={(e) => setNewBanca({...newBanca, resultadoJogo: e.target.value})}
                    placeholder="Ex: 2-1, 3 sets a 1"
                  />
                </div>

                {newBanca.resultado && (
                  <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <label className="block text-sm font-medium mb-1">Lucro/Prejuízo (R$)</label>
                      <div className={`text-2xl font-bold ${newBanca.lucroReais >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        R$ {newBanca.lucroReais >= 0 ? '+' : ''}{(newBanca.lucroReais || 0).toFixed(2)}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Lucro/Prejuízo (Unidades)</label>
                      <div className={`text-2xl font-bold ${newBanca.lucroUnidades >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {newBanca.lucroUnidades >= 0 ? '+' : ''}{(newBanca.lucroUnidades || 0).toFixed(2)}u
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-3 justify-end">
                  <button
                    onClick={() => {
                      setIsAddingBanca(false);
                      resetBancaForm();
                    }}
                    className={`px-4 py-2 border rounded-lg ${
                      config.theme === 'dark' 
                        ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                        : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={addBanca}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                  >
                    Salvar Entrada
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Modal de Configurações */}
          {showSettings && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className={`rounded-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto ${config.theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <h2 className="text-2xl font-bold mb-4">Configurações</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Tema</label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setConfig({...config, theme: 'light'})}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                          config.theme === 'light' 
                            ? 'bg-blue-600 text-white' 
                            : config.theme === 'dark' 
                              ? 'bg-gray-700 text-gray-300' 
                              : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        <Sun className="h-4 w-4" />
                        Claro
                      </button>
                      <button
                        onClick={() => setConfig({...config, theme: 'dark'})}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                          config.theme === 'dark' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        <Moon className="h-4 w-4" />
                        Escuro
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Valor da Unidade (R$)</label>
                    <input
                      type="number"
                      step="10"
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                        config.theme === 'dark' 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300'
                      }`}
                      value={config.valorUnidade}
                      onChange={(e) => setConfig({...config, valorUnidade: parseFloat(e.target.value) || 100})}
                      placeholder="100"
                    />
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      Define o valor em reais de cada unidade para cálculo da banca
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 justify-end mt-6">
                  <button
                    onClick={() => setShowSettings(false)}
                    className={`px-4 py-2 border rounded-lg ${
                      config.theme === 'dark' 
                        ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                        : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    Fechar
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Conteúdo principal baseado na view atual */}
          <div className="space-y-4">
            {currentView === 'notes' && filteredNotes.length === 0 ? (
              <div className={`rounded-lg shadow-sm p-8 text-center ${config.theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Nenhuma nota encontrada</h3>
                <p className={config.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  {searchTerm || selectedSport !== 'todos' || selectedChampionship !== 'todos' || selectedTeamPlayer !== 'todos' || selectedTag !== 'todas'
                    ? 'Tente ajustar os filtros de busca'
                    : 'Comece criando sua primeira anotação'}
                </p>
              </div>
            ) : currentView === 'stats' && filteredStatistics.length === 0 ? (
              <div className={`rounded-lg shadow-sm p-8 text-center ${config.theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Nenhuma estatística encontrada</h3>
                <p className={config.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  {searchTerm || selectedSport !== 'todos' ? 'Tente ajustar os filtros de busca' : 'Comece criando sua primeira estatística'}
                </p>
              </div>
            ) : currentView === 'reminders' && filteredReminders.length === 0 ? (
              <div className={`rounded-lg shadow-sm p-8 text-center ${config.theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Nenhum lembrete encontrado</h3>
                <p className={config.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  {searchTerm ? 'Tente ajustar os filtros de busca' : 'Comece criando seu primeiro lembrete'}
                </p>
              </div>
            ) : currentView === 'banca' && filteredBancaEntries.length === 0 ? (
              <div className={`rounded-lg shadow-sm p-8 text-center ${config.theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <PiggyBank className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Nenhuma entrada encontrada</h3>
                <p className={config.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  {searchTerm ? 'Tente ajustar os filtros de busca' : 'Comece criando sua primeira entrada na banca'}
                </p>
              </div>
            ) : currentView === 'comprovacoes' && activeComprovacao && filteredComprovacaoEntries.length === 0 ? (
              <div className={`rounded-lg shadow-sm p-8 text-center ${config.theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Nenhuma entrada nesta comprovação</h3>
                <p className={config.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  {searchTerm ? 'Tente ajustar os filtros de busca' : 'Comece adicionando entradas para testar este método'}
                </p>
              </div>
            ) : currentView === 'comprovacoes' && !activeComprovacao ? (
              <div className={`rounded-lg shadow-sm p-8 text-center ${config.theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Selecione uma comprovação</h3>
                <p className={config.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  {comprovacoes.length === 0 
                    ? 'Crie uma nova comprovação para começar a testar seus métodos'
                    : 'Selecione uma comprovação acima para visualizar e adicionar entradas'}
                </p>
              </div>
            ) : (
              <>
                {/* Renderização das Notas */}
                {currentView === 'notes' && filteredNotes.map((note) => (
                  <div key={note.id} className={`rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow ${config.theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        {/* Layout organizado em linha */}
                        <div className="flex items-center gap-4 mb-3 flex-wrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSportColor(note.sport)}`}>
                            {note.sport.charAt(0).toUpperCase() + note.sport.slice(1)}
                          </span>
                          
                          {note.year && (
                            <span className={`text-sm flex items-center gap-1 ${config.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                              <Calendar className="h-4 w-4" />
                              {note.year}
                            </span>
                          )}
                          
                          {note.championship && (
                            <span className={`text-sm flex items-center gap-1 ${config.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                              <Trophy className="h-4 w-4" />
                              {note.championship}
                            </span>
                          )}
                          
                          {note.team && note.noteType !== 'confronto' && (
                            <span className={`text-sm flex items-center gap-1 ${config.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                              <Building className="h-4 w-4" />
                              {note.team}
                            </span>
                          )}
                          
                          {note.player && note.noteType === 'individual' && (
                            <span className={`text-sm flex items-center gap-1 ${config.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                              <User className="h-4 w-4" />
                              {note.player}
                            </span>
                          )}
                          
                          {note.noteType === 'confronto' && (
                            <span className={`text-sm flex items-center gap-1 ${config.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                              <Users className="h-4 w-4" />
                              {note.team}
                            </span>
                          )}
                          
                          {/* Badge do tipo de nota */}
                          <span className={`px-2 py-1 rounded text-xs font-medium flex items-center gap-1 ${
                            note.noteType === 'individual' ? 'bg-blue-100 text-blue-800' :
                            note.noteType === 'time' ? 'bg-amber-100 text-amber-800' :
                            note.noteType === 'campeonato' ? 'bg-sky-100 text-sky-800' :
                            'bg-purple-100 text-purple-800'
                          }`}>
                            {getNoteTypeIcon(note.noteType)}
                            {getNoteTypeName(note.noteType)}
                          </span>
                        </div>

                        {/* Tags coloridas */}
                        {note.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-3">
                            {note.tags.map((tag, index) => (
                              <span 
                                key={index} 
                                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border cursor-pointer hover:opacity-80 transition-opacity ${getTagColor(tag)}`}
                                onClick={() => applyQuickFilter('tag', tag)}
                                title={`Filtrar por #${tag}`}
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}

                        <p className={`leading-relaxed ${config.theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>{note.content}</p>
                      </div>

                      <div className="flex items-start gap-2 ml-4">
                        <div className={`text-xs ${config.theme === 'dark' ? 'text-gray-400' : 'text-gray-400'}`}>
                          {new Date(note.date).toLocaleDateString('pt-BR')}
                        </div>
                        <button
                          onClick={() => toggleFavorite(note.id)}
                          className={`p-1 ${note.favorite ? 'text-yellow-500' : config.theme === 'dark' ? 'text-gray-400 hover:text-yellow-500' : 'text-gray-400 hover:text-yellow-500'}`}
                          title={note.favorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                        >
                          <Star className="h-4 w-4" fill={note.favorite ? 'currentColor' : 'none'} />
                        </button>
                        <button
                          onClick={() => duplicateNote(note)}
                          className={`p-1 ${config.theme === 'dark' ? 'text-gray-400 hover:text-green-500' : 'text-gray-400 hover:text-green-600'}`}
                          title="Duplicar nota"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => deleteNote(note.id)}
                          className={`p-1 ${config.theme === 'dark' ? 'text-gray-400 hover:text-red-400' : 'text-gray-400 hover:text-red-600'}`}
                          title="Excluir nota"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Renderização das Estatísticas */}
                {currentView === 'stats' && filteredStatistics.map((stat) => (
                  <div key={stat.id} className={`rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow ${config.theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        {/* Layout organizado em linha */}
                        <div className="flex items-center gap-4 mb-3 flex-wrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSportColor(stat.sport)}`}>
                            {stat.sport.charAt(0).toUpperCase() + stat.sport.slice(1)}
                          </span>
                          <span className={`text-sm flex items-center gap-1 ${config.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                            <Trophy className="h-4 w-4" />
                            {stat.championship}
                          </span>
                          <span className={`text-sm flex items-center gap-1 ${config.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                            <Users className="h-4 w-4" />
                            {stat.team}
                          </span>
                          <span className={`text-sm flex items-center gap-1 ${config.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                            <Calendar className="h-4 w-4" />
                            {new Date(stat.date).toLocaleDateString('pt-BR')}
                          </span>
                        </div>

                        <div className="mb-3">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-medium">Situação:</span>
                            <span>{stat.situation}</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <TrendingUp className="h-4 w-4" />
                              <strong>Odd: {stat.odd || 0}</strong>
                            </span>
                            {stat.result && (
                              <span className={`px-2 py-1 rounded text-xs font-medium ${
                                stat.result === 'win' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {stat.result === 'win' ? 'Ganhou' : 'Perdeu'}
                              </span>
                            )}
                          </div>
                        </div>

                        {stat.observation && (
                          <p className={`leading-relaxed ${config.theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                            {stat.observation}
                          </p>
                        )}
                      </div>

                      <div className="flex items-start gap-2 ml-4">
                        {!stat.result && (
                          <div className="flex gap-1">
                            <button
                              onClick={() => updateStatResult(stat.id, 'win')}
                              className="p-1 text-gray-400 hover:text-green-600"
                              title="Marcar como ganhou"
                            >
                              ✓
                            </button>
                            <button
                              onClick={() => updateStatResult(stat.id, 'loss')}
                              className="p-1 text-gray-400 hover:text-red-600"
                              title="Marcar como perdeu"
                            >
                              ✗
                            </button>
                          </div>
                        )}
                        <button
                          onClick={() => duplicateStat(stat)}
                          className={`p-1 ${config.theme === 'dark' ? 'text-gray-400 hover:text-green-500' : 'text-gray-400 hover:text-green-600'}`}
                          title="Duplicar estatística"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => deleteStat(stat.id)}
                          className={`p-1 ${config.theme === 'dark' ? 'text-gray-400 hover:text-red-400' : 'text-gray-400 hover:text-red-600'}`}
                          title="Excluir estatística"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Renderização dos Lembretes */}
                {currentView === 'reminders' && filteredReminders.map((reminder) => (
                  <div key={reminder.id} className={`rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow ${config.theme === 'dark' ? 'bg-gray-800' : 'bg-white'} ${reminder.completed ? 'opacity-60' : ''}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <input
                          type="checkbox"
                          checked={reminder.completed}
                          onChange={() => toggleReminderComplete(reminder.id)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className={`font-medium ${reminder.completed ? 'line-through' : ''}`}>
                              {reminder.title}
                            </h3>
                            <span className={`px-2 py-1 rounded text-xs ${
                              reminder.type === 'analysis' 
                                ? 'bg-blue-100 text-blue-800' 
                                : reminder.type === 'game'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-purple-100 text-purple-800'
                            }`}>
                              {reminder.type === 'analysis' ? 'Análise' : reminder.type === 'game' ? 'Jogo' : 'Revisão'}
                            </span>
                          </div>
                          
                          <div className={`flex items-center gap-4 mb-2 text-sm ${config.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {new Date(reminder.date).toLocaleDateString('pt-BR')}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {reminder.time}
                            </span>
                          </div>

                          {reminder.description && (
                            <p className={`leading-relaxed ${config.theme === 'dark' ? 'text-gray-100' : 'text-gray-900'} ${reminder.completed ? 'line-through' : ''}`}>
                              {reminder.description}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-start gap-2 ml-4">
                        <button
                          onClick={() => deleteReminder(reminder.id)}
                          className={`p-1 ${config.theme === 'dark' ? 'text-gray-400 hover:text-red-400' : 'text-gray-400 hover:text-red-600'}`}
                          title="Excluir lembrete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Renderização das Entradas da Banca */}
                {currentView === 'banca' && filteredBancaEntries.map((entry) => (
                  <div key={entry.id} className={`rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow ${config.theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        {/* Layout organizado em linha */}
                        <div className="flex items-center gap-4 mb-3 flex-wrap">
                          <span className="text-sm flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(entry.date).toLocaleDateString('pt-BR')}
                          </span>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                            {entry.site}
                          </span>
                          <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-xs font-medium">
                            {getTipoText(entry.tipo)}
                          </span>
                          {entry.padrao && (
                            <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs font-medium">
                              {entry.padrao}
                            </span>
                          )}
                        </div>

                        {/* Jogos da aposta */}
                        <div className="mb-3">
                          {entry.games && entry.games.map((game, index) => (
                            <div key={index} className="mb-2 last:mb-0">
                              <div className="flex items-center gap-2 mb-1">
                                {entry.games.length > 1 && (
                                  <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">
                                    Jogo {index + 1}
                                  </span>
                                )}
                                {game.sport && (
                                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">
                                    {game.sport}
                                  </span>
                                )}
                                {game.competition && (
                                  <span className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded text-xs font-medium">
                                    {game.competition}
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                {game.team1 && game.team2 ? (
                                  <span className="font-medium">
                                    {game.team1} vs {game.team2}
                                  </span>
                                ) : game.team1 ? (
                                  <span className="font-medium">{game.team1}</span>
                                ) : null}
                                {game.mercado && (
                                  <span className="text-gray-600 dark:text-gray-400">
                                    - {game.mercado}
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}
                          
                          {entry.resultadoJogo && (
                            <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                              Resultado: {entry.resultadoJogo}
                            </div>
                          )}
                        </div>

                        <div className="grid grid-cols-6 gap-4 mb-3">
                          <div>
                            <span className="text-xs text-gray-500 dark:text-gray-400">Unidades</span>
                            <div className="font-medium">{entry.unidades}u</div>
                          </div>
                          <div>
                            <span className="text-xs text-gray-500 dark:text-gray-400">Valor</span>
                            <div className="font-medium">R$ {(entry.valor || 0).toFixed(2)}</div>
                          </div>
                          <div>
                            <span className="text-xs text-gray-500 dark:text-gray-400">Odds</span>
                            <div className="font-medium">{entry.odds || 0}</div>
                          </div>
                          <div>
                            <span className="text-xs text-gray-500 dark:text-gray-400">Resultado</span>
                            <div className={`px-2 py-1 rounded text-xs font-medium inline-block ${getResultColor(entry.resultado)} text-white`}>
                              {getResultText(entry.resultado)}
                            </div>
                          </div>
                          <div>
                            <span className="text-xs text-gray-500 dark:text-gray-400">Lucro R$</span>
                            <div className={`font-bold ${entry.lucroReais >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {entry.lucroReais >= 0 ? '+' : ''}{(entry.lucroReais || 0).toFixed(2)}
                            </div>
                          </div>
                          <div>
                            <span className="text-xs text-gray-500 dark:text-gray-400">Lucro Un.</span>
                            <div className={`font-bold ${entry.lucroUnidades >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {entry.lucroUnidades >= 0 ? '+' : ''}{(entry.lucroUnidades || 0).toFixed(2)}u
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-2 ml-4">
                        <button
                          onClick={() => duplicateBanca(entry)}
                          className={`p-1 ${config.theme === 'dark' ? 'text-gray-400 hover:text-green-500' : 'text-gray-400 hover:text-green-600'}`}
                          title="Duplicar entrada"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => deleteBanca(entry.id)}
                          className={`p-1 ${config.theme === 'dark' ? 'text-gray-400 hover:text-red-400' : 'text-gray-400 hover:text-red-600'}`}
                          title="Excluir entrada"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Renderização das Entradas das Comprovações */}
                {currentView === 'comprovacoes' && activeComprovacao && filteredComprovacaoEntries.map((entry) => (
                  <div key={entry.id} className={`rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow ${config.theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-3 flex-wrap">
                          <span className="text-sm flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(entry.date).toLocaleDateString('pt-BR')}
                          </span>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                            {entry.site}
                          </span>
                          <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-xs font-medium">
                            {getTipoText(entry.tipo)}
                          </span>
                          {entry.padrao && (
                            <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs font-medium">
                              {entry.padrao}
                            </span>
                          )}
                        </div>

                        {/* Jogos da aposta */}
                        <div className="mb-3">
                          {entry.games && entry.games.map((game, index) => (
                            <div key={index} className="mb-2 last:mb-0">
                              <div className="flex items-center gap-2 mb-1">
                                {entry.games.length > 1 && (
                                  <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">
                                    Jogo {index + 1}
                                  </span>
                                )}
                                {game.sport && (
                                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">
                                    {game.sport}
                                  </span>
                                )}
                                {game.competition && (
                                  <span className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded text-xs font-medium">
                                    {game.competition}
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                {game.team1 && game.team2 ? (
                                  <span className="font-medium">
                                    {game.team1} vs {game.team2}
                                  </span>
                                ) : game.team1 ? (
                                  <span className="font-medium">{game.team1}</span>
                                ) : null}
                                {game.mercado && (
                                  <span className="text-gray-600 dark:text-gray-400">
                                    - {game.mercado}
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}
                          
                          {entry.resultadoJogo && (
                            <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                              Resultado: {entry.resultadoJogo}
                            </div>
                          )}
                        </div>

                        <div className="grid grid-cols-6 gap-4 mb-3">
                          <div>
                            <span className="text-xs text-gray-500 dark:text-gray-400">Unidades</span>
                            <div className="font-medium">{entry.unidades}u</div>
                          </div>
                          <div>
                            <span className="text-xs text-gray-500 dark:text-gray-400">Valor</span>
                            <div className="font-medium">R$ {(entry.valor || 0).toFixed(2)}</div>
                          </div>
                          <div>
                            <span className="text-xs text-gray-500 dark:text-gray-400">Odds</span>
                            <div className="font-medium">{entry.odds || 0}</div>
                          </div>
                          <div>
                            <span className="text-xs text-gray-500 dark:text-gray-400">Resultado</span>
                            <div className={`px-2 py-1 rounded text-xs font-medium inline-block ${getResultColor(entry.resultado)} text-white`}>
                              {getResultText(entry.resultado)}
                            </div>
                          </div>
                          <div>
                            <span className="text-xs text-gray-500 dark:text-gray-400">Lucro R$</span>
                            <div className={`font-bold ${entry.lucroReais >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {entry.lucroReais >= 0 ? '+' : ''}{(entry.lucroReais || 0).toFixed(2)}
                            </div>
                          </div>
                          <div>
                            <span className="text-xs text-gray-500 dark:text-gray-400">Lucro Un.</span>
                            <div className={`font-bold ${entry.lucroUnidades >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {entry.lucroUnidades >= 0 ? '+' : ''}{(entry.lucroUnidades || 0).toFixed(2)}u
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-2 ml-4">
                        <button
                          onClick={() => {
                            const duplicated = {
                              ...entry,
                              id: Date.now(),
                              date: new Date().toISOString().split('T')[0],
                              resultado: '',
                              lucroReais: 0,
                              lucroUnidades: 0
                            };
                            if (activeComprovacao) {
                              addComprovacaoEntry(activeComprovacao, duplicated);
                            }
                          }}
                          className={`p-1 ${config.theme === 'dark' ? 'text-gray-400 hover:text-green-500' : 'text-gray-400 hover:text-green-600'}`}
                          title="Duplicar entrada"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm('Tem certeza que deseja excluir esta entrada?') && activeComprovacao) {
                              deleteComprovacaoEntry(activeComprovacao, entry.id);
                            }
                          }}
                          className={`p-1 ${config.theme === 'dark' ? 'text-gray-400 hover:text-red-400' : 'text-gray-400 hover:text-red-600'}`}
                          title="Excluir entrada"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Toast de Notificação */}
          {showToast && (
            <div className="fixed bottom-4 right-4 z-50 animate-pulse">
              <div className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                {toastMessage}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompleteSportsPlatform;="block text-sm font-medium mb-1">Resultado</label>
                      <select
                        className={`w-full px-3 py-2 border rounded-lg ${
                          config.theme === 'dark' 
                            ? 'bg-gray-600 border-gray-500 text-white' 
                            : 'bg-white border-gray-300'
                        }`}
                        value={statFilters.resultado}
                        onChange={(e) => setStatFilters({...statFilters, resultado: e.target.value})}
                      >
                        <option value="todos">Todos</option>
                        <option value="lucro">Apenas Lucro</option>
                        <option value="prejuizo">Apenas Prejuízo</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Site</label>
                      <select
                        className={`w-full px-3 py-2 border rounded-lg ${
                          config.theme === 'dark' 
                            ? 'bg-gray-600 border-gray-500 text-white' 
                            : 'bg-white border-gray-300'
                        }`}
                        value={statFilters.site}
                        onChange={(e) => setStatFilters({...statFilters, site: e.target.value})}
                      >
                        <option value="todos">Todos os Sites</option>
                        {getUniqueValues('site').map(site => (
                          <option key={site} value={site}>{site}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Tipo</label>
                      <select
                        className={`w-full px-3 py-2 border rounded-lg ${
                          config.theme === 'dark' 
                            ? 'bg-gray-600 border-gray-500 text-white' 
                            : 'bg-white border-gray-300'
                        }`}
                        value={statFilters.tipo}
                        onChange={(e) => setStatFilters({...statFilters, tipo: e.target.value})}
                      >
                        <option value="todos">Todos os Tipos</option>
                        {getUniqueValues('tipo').map(tipo => (
                          <option key={tipo} value={tipo}>{getTipoText(tipo)}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className