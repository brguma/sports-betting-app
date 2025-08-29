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

    filtered.sort((a, b) =>
