import React, { useState, useMemo, useEffect } from 'react';
import { Search, Plus, Calendar, Users, Trophy, User, FileText, Edit2, Trash2, Tag, X, Settings, Download, Upload, Moon, Sun, Star, Copy, BarChart3, Bell, Clock, TrendingUp, FolderOpen, HelpCircle, Building, Globe, Filter, DollarSign, PiggyBank, TrendingDown, Target, Activity, CheckCircle, Save } from 'lucide-react';

const SportsNotePlatform = () => {
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

  // Cores para as tags - versão simplificada e mais estável
  const tagColors = [
    'bg-blue-100 text-blue-800',
    'bg-green-100 text-green-800',
    'bg-yellow-100 text-yellow-800',
    'bg-purple-100 text-purple-800',
    'bg-red-100 text-red-800',
    'bg-indigo-100 text-indigo-800',
    'bg-pink-100 text-pink-800',
    'bg-gray-100 text-gray-800'
  ];

  const [config, setConfig] = useState({
    theme: 'light',
    autoSave: true,
    autoBackup: true,
    saveLocation: 'browser',
    backupFolder: null,
    firstRun: false,
    valorUnidade: 100
  });

  const [currentView, setCurrentView] = useState('notes');
  const [activeComprovacao, setActiveComprovacao] = useState(null);
  const [comprovacoes, setComprovacoes] = useState([]);
  const [isAddingComprovacao, setIsAddingComprovacao] = useState(false);
  const [newComprovacaoName, setNewComprovacaoName] = useState('');
  const [editingUnidade, setEditingUnidade] = useState(false);
  const [tempValorUnidade, setTempValorUnidade] = useState(100);
  const [editingComprovacaoUnidade, setEditingComprovacaoUnidade] = useState(false);
  const [tempComprovacaoUnidade, setTempComprovacaoUnidade] = useState(100);

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
    },
    {
      id: 3,
      sport: 'futebol',
      year: '2024',
      championship: 'Brasileirão Série A',
      team: 'Vasco x Flamengo',
      player: 'Confronto',
      content: 'Clássicos entre Vasco e Flamengo sempre têm muitas emoções. Historicamente, jogos no Maracanã tendem a ter mais de 2.5 gols.',
      tags: ['clássico', 'maracanã', 'gols'],
      favorite: false,
      noteType: 'confronto',
      confrontoTeams: ['Vasco', 'Flamengo'],
      date: '2024-08-03'
    },
    {
      id: 4,
      sport: 'futebol',
      year: '2024',
      championship: 'Copa do Brasil',
      team: 'Flamengo',
      player: '',
      content: 'O Flamengo tem excelente retrospecto jogando no Maracanã. Nos últimos 20 jogos em casa, apenas 2 derrotas. Time muito forte defensivamente quando joga em casa.',
      tags: ['casa', 'maracanã', 'defesa', 'retrospecto'],
      favorite: false,
      noteType: 'time',
      confrontoTeams: [],
      date: '2024-08-06'
    },
    {
      id: 5,
      sport: 'futebol',
      year: '2024',
      championship: 'Brasileirão Série A',
      team: '',
      player: '',
      content: 'O Brasileirão 2024 tem sido muito equilibrado. Muitos jogos com poucos gols na primeira rodada. Recomendo cautela com apostas em over 2.5 nas primeiras 10 rodadas.',
      tags: ['equilibrado', 'poucos gols', 'cautela', 'over'],
      favorite: true,
      noteType: 'campeonato',
      confrontoTeams: [],
      date: '2024-08-07'
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
      sport: 'futebol',
      competition: 'Brasileirão',
      team1: 'Flamengo',
      team2: 'Botafogo',
      tipo: 'Simples',
      mercado: 'Over 2.5',
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
  const [showFirstRunSetup, setShowFirstRunSetup] = useState(false);
  const [selectedSport, setSelectedSport] = useState('todos');
  const [selectedChampionship, setSelectedChampionship] = useState('todos');
  const [selectedTeamPlayer, setSelectedTeamPlayer] = useState('todos');
  const [selectedTag, setSelectedTag] = useState('todas');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [showConfrontoFilter, setShowConfrontoFilter] = useState(false);
  const [bancaMonth, setBancaMonth] = useState(new Date().toISOString().slice(0, 7));
  const [tagInput, setTagInput] = useState('');

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

  // Usar useMemo para criar o estado inicial do newBanca com o valor correto
  const getInitialBancaState = () => ({
    date: new Date().toISOString().split('T')[0],
    site: '',
    sport: '',
    competition: '',
    team1: '',
    team2: '',
    tipo: 'Simples',
    mercado: '',
    unidades: 1,
    resultadoJogo: '',
    valor: config.valorUnidade,
    odds: '',
    resultado: '',
    lucroReais: 0,
    lucroUnidades: 0
  });

  const [newBanca, setNewBanca] = useState(getInitialBancaState());

  // Atualizar tempValorUnidade quando config.valorUnidade mudar
  useEffect(() => {
    setTempValorUnidade(config.valorUnidade);
  }, [config.valorUnidade]);

  // Função para obter cor da tag baseada no hash da string - versão simplificada
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

  // Aplicar filtros quando clicar nos cards de estatísticas - versão simplificada
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

  // Filtrar notas considerando todos os filtros - versão simplificada e estável
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

    // Filtro especial para confrontos
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

    // Aplicar filtro especial para favoritas
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

  const filteredBancaEntries = useMemo(() => {
    let filtered = bancaEntries.filter(entry => 
      entry.date && entry.date.startsWith(bancaMonth)
    );

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(entry => 
        entry.site.toLowerCase().includes(term) ||
        entry.sport.toLowerCase().includes(term) ||
        entry.competition.toLowerCase().includes(term) ||
        entry.team1.toLowerCase().includes(term) ||
        entry.team2.toLowerCase().includes(term) ||
        entry.mercado.toLowerCase().includes(term)
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
        entry.sport.toLowerCase().includes(term) ||
        entry.competition.toLowerCase().includes(term) ||
        entry.team1.toLowerCase().includes(term) ||
        entry.team2.toLowerCase().includes(term) ||
        entry.mercado.toLowerCase().includes(term)
      );
    }

    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

    return filtered;
  }, [activeComprovacao, comprovacoes, bancaMonth, searchTerm]);

  // Funções para manipulação de tags - versão corrigida e simplificada
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

  // Funções para manipulação de notas - versão corrigida baseada no SportsNotePlatform.jsx
  const addNote = () => {
    if (!newNote.content) {
      alert('Por favor, preencha o conteúdo da nota');
      return;
    }

    // Validação baseada no tipo de nota
    if (newNote.noteType === 'individual' && !newNote.player) {
      alert('Para notas individuais, preencha o campo jogador');
      return;
    }

    if (newNote.noteType === 'time' && !newNote.team) {
      alert('Para notas de time, preencha o campo time');
      return;
    }

    if (newNote.noteType === 'campeonato' && !newNote.championship) {
      alert('Para notas de campeonato, preencha o campo campeonato');
      return;
    }

    if (newNote.noteType === 'confronto' && (!newNote.confrontoTeam1 || !newNote.confrontoTeam2)) {
      alert('Para confrontos, preencha ambos os times/jogadores');
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

    const confrontoTeams = newNote.noteType === 'confronto' 
      ? processConfrontoTeams(newNote.confrontoTeam1, newNote.confrontoTeam2, newNote.noteType)
      : [];

    // Definir player e team baseado no tipo
    let finalPlayer = '';
    let finalTeam = '';

    switch (newNote.noteType) {
      case 'individual':
        finalPlayer = newNote.player;
        finalTeam = newNote.team;
        break;
      case 'time':
        finalPlayer = '';
        finalTeam = newNote.team;
        break;
      case 'campeonato':
        finalPlayer = '';
        finalTeam = '';
        break;
      case 'confronto':
        finalPlayer = 'Confronto';
        finalTeam = `${newNote.confrontoTeam1} vs ${newNote.confrontoTeam2}`;
        break;
    }

    const note = {
      id: Date.now(),
      ...newNote,
      sport: finalSport,
      confrontoTeams,
      player: finalPlayer,
      team: finalTeam,
      date: newNote.date || new Date().toISOString().split('T')[0]
    };

    setNotes([...notes, note]);
    resetNoteForm();
    setIsAddingNote(false);
  };

  const updateNote = () => {
    if (!newNote.content) {
      alert('Por favor, preencha o conteúdo da nota');
      return;
    }

    // Validação baseada no tipo de nota
    if (newNote.noteType === 'individual' && !newNote.player) {
      alert('Para notas individuais, preencha o campo jogador');
      return;
    }

    if (newNote.noteType === 'time' && !newNote.team) {
      alert('Para notas de time, preencha o campo time');
      return;
    }

    if (newNote.noteType === 'campeonato' && !newNote.championship) {
      alert('Para notas de campeonato, preencha o campo campeonato');
      return;
    }

    if (newNote.noteType === 'confronto' && (!newNote.confrontoTeam1 || !newNote.confrontoTeam2)) {
      alert('Para confrontos, preencha ambos os times/jogadores');
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

    const confrontoTeams = newNote.noteType === 'confronto' 
      ? processConfrontoTeams(newNote.confrontoTeam1, newNote.confrontoTeam2, newNote.noteType)
      : [];

    // Definir player e team baseado no tipo
    let finalPlayer = '';
    let finalTeam = '';

    switch (newNote.noteType) {
      case 'individual':
        finalPlayer = newNote.player;
        finalTeam = newNote.team;
        break;
      case 'time':
        finalPlayer = '';
        finalTeam = newNote.team;
        break;
      case 'campeonato':
        finalPlayer = '';
        finalTeam = '';
        break;
      case 'confronto':
        finalPlayer = 'Confronto';
        finalTeam = `${newNote.confrontoTeam1} vs ${newNote.confrontoTeam2}`;
        break;
    }

    const updatedNotes = notes.map(note => 
      note.id === editingNote.id 
        ? { 
            ...newNote, 
            id: editingNote.id, 
            sport: finalSport,
            confrontoTeams,
            player: finalPlayer,
            team: finalTeam
          }
        : note
    );

    setNotes(updatedNotes);
    resetNoteForm();
    setEditingNote(null);
  };

  const deleteNote = (noteId) => {
    if (window.confirm('Tem certeza que deseja excluir esta nota?')) {
      setNotes(notes.filter(note => note.id !== noteId));
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

  const toggleFavorite = (noteId) => {
    setNotes(notes.map(note => 
      note.id === noteId 
        ? { ...note, favorite: !note.favorite }
        : note
    ));
  };

  // Função para iniciar edição de nota - versão corrigida
  const startEditNote = (note) => {
    const confrontoTeams = note.confrontoTeams || [];
    setNewNote({
      sport: note.sport,
      newSport: '',
      year: note.year,
      championship: note.championship,
      team: note.noteType === 'confronto' ? '' : (note.team || ''),
      player: note.noteType === 'confronto' ? '' : (note.player || ''),
      confrontoTeam1: note.noteType === 'confronto' ? (confrontoTeams[0] || '') : '',
      confrontoTeam2: note.noteType === 'confronto' ? (confrontoTeams[1] || '') : '',
      content: note.content,
      tags: [...note.tags],
      favorite: note.favorite,
      noteType: note.noteType || 'individual',
      date: note.date
    });
    setEditingNote(note);
  };

  // Resetar formulário de nota - versão corrigida
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

  const addBanca = () => {
    if (!newBanca.date || !newBanca.site || !newBanca.sport || !newBanca.odds) {
      alert('Por favor, preencha os campos obrigatórios');
      return;
    }

    // Determinar qual valor de unidade usar
    const activeComp = getActiveComprovacao();
    const valorUnidadeAtual = currentView === 'comprovacoes' && activeComprovacao && activeComp
      ? activeComp.valorUnidade
      : config.valorUnidade;

    const { lucroReais, lucroUnidades } = calculateProfit(
      parseFloat(newBanca.unidades),
      parseFloat(newBanca.odds),
      newBanca.resultado,
      valorUnidadeAtual
    );

    const banca = {
      id: Date.now(),
      ...newBanca,
      unidades: parseFloat(newBanca.unidades),
      valor: parseFloat(newBanca.unidades) * valorUnidadeAtual,
      odds: parseFloat(newBanca.odds),
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

  const updateBanca = () => {
    if (!newBanca.date || !newBanca.site || !newBanca.sport || !newBanca.odds) {
      alert('Por favor, preencha os campos obrigatórios');
      return;
    }

    // Determinar qual valor de unidade usar
    const activeComp = getActiveComprovacao();
    const valorUnidadeAtual = currentView === 'comprovacoes' && activeComprovacao && activeComp
      ? activeComp.valorUnidade
      : config.valorUnidade;

    const { lucroReais, lucroUnidades } = calculateProfit(
      parseFloat(newBanca.unidades),
      parseFloat(newBanca.odds),
      newBanca.resultado,
      valorUnidadeAtual
    );

    const updatedEntry = {
      ...newBanca,
      id: editingBanca.id,
      unidades: parseFloat(newBanca.unidades),
      valor: parseFloat(newBanca.unidades) * valorUnidadeAtual,
      odds: parseFloat(newBanca.odds),
      lucroReais,
      lucroUnidades
    };

    // Atualizar na Banca principal ou na Comprovação ativa
    if (currentView === 'comprovacoes' && activeComprovacao) {
      updateComprovacaoEntry(activeComprovacao, editingBanca.id, updatedEntry);
    } else {
      const updatedBanca = bancaEntries.map(entry => 
        entry.id === editingBanca.id ? updatedEntry : entry
      );
      setBancaEntries(updatedBanca);
    }

    resetBancaForm();
    setEditingBanca(null);
  };

  const deleteBanca = (bancaId) => {
    if (window.confirm('Tem certeza que deseja excluir esta entrada?')) {
      setBancaEntries(bancaEntries.filter(entry => entry.id !== bancaId));
    }
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

  const startEditBanca = (entry) => {
    setNewBanca({
      date: entry.date,
      site: entry.site,
      sport: entry.sport,
      competition: entry.competition,
      team1: entry.team1,
      team2: entry.team2,
      tipo: entry.tipo,
      mercado: entry.mercado,
      unidades: entry.unidades,
      resultadoJogo: entry.resultadoJogo,
      valor: entry.valor,
      odds: entry.odds.toString(),
      resultado: entry.resultado,
      lucroReais: entry.lucroReais,
      lucroUnidades: entry.lucroUnidades
    });
    setEditingBanca(entry);
  };

  const resetBancaForm = () => {
    const activeComp = currentView === 'comprovacoes' && activeComprovacao ? getActiveComprovacao() : null;
    const valorUnidadeAtual = activeComp ? activeComp.valorUnidade : config.valorUnidade;

    setNewBanca({
      date: new Date().toISOString().split('T')[0],
      site: '',
      sport: '',
      competition: '',
      team1: '',
      team2: '',
      tipo: 'Simples',
      mercado: '',
      unidades: 1,
      resultadoJogo: '',
      valor: valorUnidadeAtual,
      odds: '',
      resultado: '',
      lucroReais: 0,
      lucroUnidades: 0
    });
  };

  // Função para obter estatísticas - versão corrigida e simplificada
  const getStats = () => {
    const stats = { 
      totalNotes: notes.length,
      totalStats: statistics.length,
      totalReminders: reminders.length,
      completedReminders: reminders.filter(r => r.completed).length,
      pendingReminders: reminders.filter(r => !r.completed).length,
      favorites: notes.filter(n => n.favorite).length,
      confrontoNotes: notes.filter(n => n.noteType === 'confronto').length,
      timeNotes: notes.filter(n => n.noteType === 'time').length,
      campeonatoNotes: notes.filter(n => n.noteType === 'campeonato').length,
      individualNotes: notes.filter(n => n.noteType === 'individual').length,
      totalBancaEntries: bancaEntries.length
    };
    
    sports.forEach(sport => {
      stats[sport.name + '_notes'] = notes.filter(n => n.sport === sport.name).length;
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
                <h1 className="text-3xl font-bold mb-2">Plataforma de Apostas</h1>
                <p className={config.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  Gerencie anotações, estatísticas, lembretes e sua banca profissional
                </p>
                {/* Stats específicos para Comprovações */}
            {currentView === 'comprovacoes' && (
              <div className="space-y-4">
                {/* Sub-navegação das comprovações */}
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

                {/* Stats da comprovação ativa */}
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
                              {getComprovacaoStats(getActiveComprovacao(), bancaMonth).totalLucroUnidades >= 0 ? '+' : ''}{getComprovacaoStats(getActiveComprovacao(), bancaMonth).totalLucroUnidades.toFixed(2)}u
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
                              R$ {getComprovacaoStats(getActiveComprovacao(), bancaMonth).totalLucroReais >= 0 ? '+' : ''}{getComprovacaoStats(getActiveComprovacao(), bancaMonth).totalLucroReais.toFixed(2)}
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

                    {/* Controles da comprovação */}
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
                            R$ {getActiveComprovacao() ? getActiveComprovacao().valorUnidade.toFixed(2) : '0.00'}
                            <Edit2 className="h-3 w-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  </>
                )}

                {/* Mensagem quando não há comprovação selecionada */}
                {!activeComprovacao && comprovacoes.length > 0 && (
                  <div className="text-center py-8">
                    <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">
                      Selecione uma comprovação acima para visualizar os dados
                    </p>
                  </div>
                )}

                {/* Mensagem quando não há comprovações */}
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
          </div>
              <div className="flex gap-2">
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
              <div className="grid grid-cols-auto gap-4" style={{gridTemplateColumns: `repeat(${Math.min(sports.length + 6, 8)}, minmax(0, 1fr))`}}>
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
                {sports.map(sport => (
                  <button
                    key={sport.name}
                    onClick={() => applyQuickFilter('sport', sport.name)}
                    className={`p-4 rounded-lg hover:opacity-80 transition-colors text-left ${sport.color.replace('text-', 'bg-').replace('-800', '-50')}`}
                  >
                    <div className={`text-2xl font-bold ${sport.color.replace('bg-', 'text-').replace('-100', '-600')}`}>
                      {stats[sport.name + '_notes'] || 0}
                    </div>
                    <div className={`text-sm ${sport.color.replace('bg-', 'text-').replace('-100', '-800')}`}>
                      {sport.name.charAt(0).toUpperCase() + sport.name.slice(1)}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Stats específicos para Banca */}
            {currentView === 'banca' && (
              <div className="space-y-4">
                {/* Cards de destaque da Banca */}
                <div className="grid grid-cols-4 gap-4">
                  <div className={`p-6 rounded-lg ${getBancaStats.totalLucroUnidades >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`text-sm font-medium ${getBancaStats.totalLucroUnidades >= 0 ? 'text-green-800' : 'text-red-800'}`}>
                          Lucro/Prejuízo (Unidades)
                        </p>
                        <p className={`text-3xl font-bold ${getBancaStats.totalLucroUnidades >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {getBancaStats.totalLucroUnidades >= 0 ? '+' : ''}{getBancaStats.totalLucroUnidades.toFixed(2)}u
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
                          R$ {getBancaStats.totalLucroReais >= 0 ? '+' : ''}{getBancaStats.totalLucroReais.toFixed(2)}
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

                {/* Seletor de mês para a Banca */}
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
                        R$ {config.valorUnidade.toFixed(2)}
                        <Edit2 className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Controles e Busca */}
          <div className={`rounded-lg shadow-sm p-6 mb-6 ${config.theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            {/* Indicador de filtros ativos */}
            {currentView === 'notes' && (selectedSport !== 'todos' || selectedChampionship !== 'todos' || selectedTeamPlayer !== 'todos' || selectedTag !== 'todas' || sortBy === 'favorite' || showConfrontoFilter) && (
              <div className="mb-4 flex flex-wrap gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Filtros ativos:</span>
                {selectedSport !== 'todos' && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                    Esporte: {selectedSport}
                  </span>
                )}
                {selectedChampionship !== 'todos' && (
                  <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">
                    Campeonato: {selectedChampionship}
                  </span>
                )}
                {selectedTeamPlayer !== 'todos' && (
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                    Time/Jogador: {selectedTeamPlayer}
                  </span>
                )}
                {selectedTag !== 'todas' && (
                  <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-xs">
                    Tag: #{selectedTag}
                  </span>
                )}
                {sortBy === 'favorite' && (
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">
                    Apenas Favoritas
                  </span>
                )}
                {showConfrontoFilter && (
                  <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">
                    Apenas Confrontos
                  </span>
                )}
                <button
                  onClick={() => applyQuickFilter('all', 'todos')}
                  className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs hover:bg-red-200"
                >
                  Limpar filtros
                </button>
              </div>
            )}
            
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

                    <select
                      className={`px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                        config.theme === 'dark' 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300'
                      }`}
                      value={selectedTeamPlayer}
                      onChange={(e) => setSelectedTeamPlayer(e.target.value)}
                    >
                      <option value="todos">Todos Times/Jogadores</option>
                      {getAllTeamsPlayers().map(item => (
                        <option key={item} value={item}>{item}</option>
                      ))}
                    </select>

                    <select
                      className={`px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                        config.theme === 'dark' 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300'
                      }`}
                      value={selectedTag}
                      onChange={(e) => setSelectedTag(e.target.value)}
                    >
                      <option value="todas">Todas as Tags</option>
                      {getAllTags().map(tag => (
                        <option key={tag} value={tag}>#{tag}</option>
                      ))}
                    </select>

                    <select
                      className={`px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                        config.theme === 'dark' 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300'
                      }`}
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      <option value="date">Data</option>
                      <option value="year">Ano</option>
                      <option value="player">Jogador</option>
                      <option value="favorite">Favoritas</option>
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
                    placeholder={`Buscar ${currentView === 'notes' ? 'notas' : currentView === 'banca' ? 'entradas' : ''}...`}
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

            {/* Tags Navigation - versão simplificada */}
            {currentView === 'notes' && getAllTags().length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                <div className="flex items-center gap-2 mb-3">
                  <Filter className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Filtro rápido por tags:
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedTag('todas')}
                    className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                      selectedTag === 'todas'
                        ? 'bg-blue-100 text-blue-800'
                        : config.theme === 'dark'
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Todas as tags
                  </button>
                  {getAllTags().map(tag => (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(tag)}
                      className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                        selectedTag === tag
                          ? 'bg-blue-100 text-blue-800'
                          : config.theme === 'dark'
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Modal de Configurações */}
          {showSettings && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className={`rounded-lg p-6 w-full max-w-md mx-4 ${config.theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
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

          {/* Modal para Nova Comprovação */}
          {isAddingComprovacao && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className={`rounded-lg p-6 w-full max-w-md mx-4 ${config.theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <h2 className="text-2xl font-bold mb-4">Nova Comprovação</h2>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Nome da Comprovação</label>
                  <input
                    type="text"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                      config.theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300'
                    }`}
                    value={newComprovacaoName}
                    onChange={(e) => setNewComprovacaoName(e.target.value)}
                    placeholder="Ex: Método Over 2.5, Sistema Favoritos"
                    autoFocus
                  />
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    Use um nome descritivo para identificar este método de apostas
                  </p>
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
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Criar Comprovação
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Modal para Nova Nota / Edição */}
          {(isAddingNote || editingNote) && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className={`rounded-lg p-6 w-full max-w-3xl mx-4 max-h-[90vh] overflow-y-auto ${config.theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <h2 className="text-2xl font-bold mb-4">
                  {editingNote ? 'Editar Anotação' : 'Nova Anotação'}
                </h2>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Esporte</label>
                    <select
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                        config.theme === 'dark' 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300'
                      }`}
                      value={newNote.sport}
                      onChange={(e) => setNewNote({...newNote, sport: e.target.value})}
                    >
                      <option value="">Selecione um esporte</option>
                      {sports.map(sport => (
                        <option key={sport.name} value={sport.name}>
                          {sport.name.charAt(0).toUpperCase() + sport.name.slice(1)}
                        </option>
                      ))}
                      <option value="novo">+ Novo Esporte</option>
                    </select>
                  </div>

                  {newNote.sport === 'novo' && (
                    <div>
                      <label className="block text-sm font-medium mb-1">Nome do Novo Esporte</label>
                      <input
                        type="text"
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                          config.theme === 'dark' 
                            ? 'bg-gray-700 border-gray-600 text-white' 
                            : 'bg-white border-gray-300'
                        }`}
                        value={newNote.newSport}
                        onChange={(e) => setNewNote({...newNote, newSport: e.target.value})}
                        placeholder="Ex: basquete"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium mb-1">Ano</label>
                    <input
                      type="text"
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                        config.theme === 'dark' 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300'
                      }`}
                      value={newNote.year}
                      onChange={(e) => setNewNote({...newNote, year: e.target.value})}
                      placeholder="2024"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Tipo de Nota</label>
                  <div className="grid grid-cols-2 gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        value="individual"
                        checked={newNote.noteType === 'individual'}
                        onChange={(e) => setNewNote({...newNote, noteType: e.target.value})}
                      />
                      <User className="h-4 w-4" />