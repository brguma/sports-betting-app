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
      championship: 'Brasileirao Serie A',
      team: 'Flamengo',
      player: 'Gabigol',
      content: 'Gabigol tem melhor performance em jogos em casa, especialmente contra times da zona de rebaixamento. Taxa de conversao de 78% nos ultimos 10 jogos.',
      tags: ['atacante', 'casa', 'conversao'],
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
      content: 'Djokovic historicamente tem dificuldades na primeira semana de torneios Grand Slam no verao americano. Perda de energia nos sets longos.',
      tags: ['grand slam', 'primeira semana', 'resistencia'],
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
      championship: 'Brasileirao Serie A',
      team: 'Flamengo vs Botafogo',
      date: '2024-08-01',
      situation: 'Casa - Over 2.5 gols',
      odd: 1.85,
      observation: 'Classico carioca sempre tem muitos gols. Flamengo em casa e mais ofensivo.',
      result: null
    }
  ]);

  const [reminders, setReminders] = useState([
    {
      id: 1,
      title: 'Analisar Flamengo vs Vasco',
      description: 'Verificar as odds para o classico da proxima semana',
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
      padrao: 'Over em classicos',
      games: [
        {
          sport: 'futebol',
          competition: 'Brasileirao',
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

  // Estados para estatisticas
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

  // Funcao para obter cor da tag baseada no hash da string
  const getTagColor = (tag) => {
    const hash = tag.split('').reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);
    return tagColors[Math.abs(hash) % tagColors.length];
  };

  // Funcao para adicionar nova comprovacao
  const addComprovacao = () => {
    if (!newComprovacaoName.trim()) {
      alert('Por favor, digite um nome para a comprovacao');
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

  // Funcao para deletar comprovacao
  const deleteComprovacao = (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta comprovacao?')) {
      setComprovacoes(comprovacoes.filter(c => c.id !== id));
      if (activeComprovacao === id) {
        setActiveComprovacao(null);
      }
    }
  };

  // Funcao para obter comprovacao ativa
  const getActiveComprovacao = () => {
    return comprovacoes.find(c => c.id === activeComprovacao);
  };

  // Funcao para adicionar entrada em comprovacao
  const addComprovacaoEntry = (comprovacaoId, entry) => {
    setComprovacoes(comprovacoes.map(c => 
      c.id === comprovacaoId 
        ? { ...c, entries: [...c.entries, entry] }
        : c
    ));
  };

  // Funcao para atualizar entrada em comprovacao
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

  // Funcao para deletar entrada em comprovacao
  const deleteComprovacaoEntry = (comprovacaoId, entryId) => {
    setComprovacoes(comprovacoes.map(c => 
      c.id === comprovacaoId 
        ? { ...c, entries: c.entries.filter(e => e.id !== entryId) }
        : c
    ));
  };

  // Funcao para atualizar valor da unidade na comprovacao
  const updateComprovacaoUnidade = (comprovacaoId, novoValor) => {
    setComprovacoes(comprovacoes.map(c => 
      c.id === comprovacaoId 
        ? { ...c, valorUnidade: novoValor }
        : c
    ));
  };

  // Funcao para adicionar nova linha de jogo na aposta multipla
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

  // Funcao para remover linha de jogo
  const removeGameLine = (index) => {
    if (newBanca.games.length > 1) {
      const newGames = newBanca.games.filter((_, i) => i !== index);
      setNewBanca({
        ...newBanca,
        games: newGames
      });
    }
  };

  // Funcao para atualizar jogo especifico
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

  // Funcao para obter estatisticas de uma comprovacao especifica
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

  // Funcao para calcular lucros baseado no resultado
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

  // Funcao para obter dados filtrados para estatisticas
  const getFilteredBancaData = useMemo(() => {
    let filtered = [...bancaEntries];

    // Filtros basicos
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

  // Calcular estatisticas dos dados filtrados
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

  // Dados para o grafico de evolucao da banca
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

  // Funcao para obter estatisticas da banca
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

  // Funcao para obter valores unicos para os filtros
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

  // Funcao para obter todas as tags unicas
  const getAllTags = () => {
    const tags = new Set();
    notes.forEach(note => {
      note.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  };

  // Funcao para obter todos os campeonatos unicos
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

  // Funcao para obter todas as equipes/jogadores unicos
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

  // Funcao para processar confrontos
  const processConfrontoTeams = (team1, team2, noteType) => {
    if (noteType !== 'confronto') return [];
    
    if (team1.trim() && team2.trim()) {
      return [team1.trim(), team2.trim()];
    }
    return [];
  };

  // Funcao para obter icone do tipo de nota
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

  // Aplicar filtros quando clicar nos cards de estatisticas
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

  // Funcao para obter cor do resultado da banca
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

  // Funcao para obter texto do resultado
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

  // Funcao para obter texto do tipo de aposta
  const getTipoText = (tipo) => {
    const tipoMap = {
      'Simples': 'Simples',
      'Dupla': 'Dupla',
      'Tripla': 'Tripla',
      'Quadrupla': 'Quadrupla',
      'Multipla': 'Multipla'
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
          (game.sport && game.sport.toLowerCase().includes(term)) ||
          (game.competition && game.competition.toLowerCase().includes(term)) ||
          (game.team1 && game.team1.toLowerCase().includes(term)) ||
          (game.team2 && game.team2.toLowerCase().includes(term)) ||
          (game.mercado && game.mercado.toLowerCase().includes(term))
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
          (game.sport && game.sport.toLowerCase().includes(term)) ||
          (game.competition && game.competition.toLowerCase().includes(term)) ||
          (game.team1 && game.team1.toLowerCase().includes(term)) ||
          (game.team2 && game.team2.toLowerCase().includes(term)) ||
          (game.mercado && game.mercado.toLowerCase().includes(term))
        ))
      );
    }

    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

    return filtered;
  }, [activeComprovacao, comprovacoes, bancaMonth, searchTerm]);

  // Funcoes para manipulacao de tags
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

  // Funcoes para manipulacao de notas
  const addNote = () => {
    if (!newNote.content) {
      alert('Por favor, preencha o conteudo da nota');
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
      alert('Por favor, preencha pelo menos o time, situacao e odd');
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
      alert('Por favor, preencha pelo menos o titulo e a data');
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
      alert('Por favor, preencha os campos obrigatorios');
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

    // Adicionar na Banca principal ou na Comprovacao ativa
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
    if (window.confirm('Tem certeza que deseja excluir esta estatistica?')) {
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
      content: `[COPIA] ${note.content}`,
      date: new Date().toISOString().split('T')[0]
    };
    setNotes([...notes, duplicated]);
  };

  const duplicateStat = (stat) => {
    const duplicated = {
      ...stat,
      id: Date.now(),
      observation: `[COPIA] ${stat.observation}`,
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
                      • Alteracoes nao salvas
                    </span>
                  )}
                </h1>
                <p className={config.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  Gerencie anotacoes, estatisticas, lembretes e sua banca profissional
                </p>
                {lastAutoBackup && (
                  <p className="text-xs text-green-600 mt-1">
                    ✓ Ultimo backup automatico: {lastAutoBackup.toLocaleTimeString('pt-BR')}
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                {hasUnsavedChanges && !isBackingUp && (
                  <button
                    onClick={() => alert('Funcao de backup em desenvolvimento')}
                    className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 animate-pulse"
                  >
                    <Save className="h-4 w-4" />
                    Backup
                  </button>
                )}
                <button
                  onClick={() => alert('Funcao de importacao em desenvolvimento')}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Upload className="h-4 w-4" />
                  Importar
                </button>
                <button
                  onClick={() => alert('Funcao de exportacao em desenvolvimento')}
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
                Anotacoes ({stats.totalNotes})
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
                Estatisticas ({stats.totalStats})
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
                Comprovacoes ({comprovacoes.length})
              </button>
            </div>

            {/* Stats especificos por view */}
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
                  <div className="text-sm text-green-800">Concluidos</div>
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
                    Nova Comprovacao
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
                              Lucro/Prejuizo (Unidades)
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
                              Lucro/Prejuizo (R$)
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
                        <label className="text-sm font-medium">Mes:</label>
                        <input
                          type="month"
                          value={bancaMonth}
                          onChange={(e) => setStatFilters({...statFilters, startDate: e.target.value})}BancaMonth(e.target.value)}
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
                      Selecione uma comprovacao acima para visualizar os dados
                    </p>
                  </div>
                )}

                {comprovacoes.length === 0 && (
                  <div className="text-center py-8">
                    <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">
                      Nenhuma comprovacao criada ainda. Clique em "Nova Comprovacao" para comecar.
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
                          Lucro/Prejuizo (Unidades)
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
                          Lucro/Prejuizo (R$)
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
                    <label className="text-sm font-medium">Mes:</label>
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
                    Estatisticas
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
                      Nova Estatistica
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
                    placeholder={`Buscar ${currentView === 'notes' ? 'notas' : currentView === 'stats' ? 'estatisticas' : currentView === 'reminders' ? 'lembretes' : 'entradas'}...`}
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

          {/* Modal de Estatisticas */}
          {showStatistics && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className={`rounded-lg p-6 w-full max-w-7xl mx-4 max-h-[90vh] overflow-y-auto ${config.theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Estatisticas Detalhadas</h2>
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
                      <label className="block text-sm font-medium mb-1">Resultado</label>
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
                        <option value="prejuizo">Apenas Prejuizo</option>
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
                      <label className="block text-sm font-medium mb-1">Padrao</label>
                      <select
                        className={`w-full px-3 py-2 border rounded-lg ${
                          config.theme === 'dark' 
                            ? 'bg-gray-600 border-gray-500 text-white' 
                            : 'bg-white border-gray-300'
                        }`}
                        value={statFilters.padrao}
                        onChange={(e) => setStatFilters({...statFilters, padrao: e.target.value})}
                      >
                        <option value="todos">Todos os Padroes</option>
                        {getUniqueValues('padrao').map(padrao => (
                          <option key={padrao} value={padrao}>{padrao}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Data Inicio</label>
                      <input
                        type="date"
                        className={`w-full px-3 py-2 border rounded-lg ${
                          config.theme === 'dark' 
                            ? 'bg-gray-600 border-gray-500 text-white' 
                            : 'bg-white border-gray-300'
                        }`}
                        value={statFilters.startDate}
                        onChange={(e) => set