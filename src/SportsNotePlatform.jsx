import React, { useState, useMemo, useEffect } from 'react';
import { Search, Plus, Calendar, Users, Trophy, User, FileText, Edit2, Trash2, Tag, X, Settings, Download, Upload, Moon, Sun, Star, Copy, BarChart3, Bell, Clock, TrendingUp, FolderOpen, HelpCircle } from 'lucide-react';

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

  const [currentView, setCurrentView] = useState('notes'); // 'notes', 'stats', 'reminders'

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
      noteType: 'individual', // 'individual' ou 'confronto'
      confrontoTeams: [], // Array com os times/jogadores do confronto
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
      result: null // null, 'win', 'loss'
    },
    {
      id: 2,
      sport: 'tenis',
      championship: 'US Open',
      team: 'Djokovic vs Alcaraz',
      date: '2024-08-05',
      situation: 'Djokovic vence',
      odd: 2.10,
      observation: 'Odd interessante para Djokovic, considerando que está em boa forma.',
      result: 'win'
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
      type: 'analysis', // 'analysis', 'game', 'review'
      relatedItem: null
    }
  ]);

  const [sports, setSports] = useState([
    { name: 'futebol', color: 'bg-green-100 text-green-800' },
    { name: 'tenis', color: 'bg-orange-100 text-orange-800' }
  ]);

  const [config, setConfig] = useState({
    theme: 'light',
    autoSave: true,
    saveLocation: 'browser',
    backupFolder: null,
    firstRun: true
  });

  const [isAddingNote, setIsAddingNote] = useState(false);
  const [isAddingStat, setIsAddingStat] = useState(false);
  const [isAddingReminder, setIsAddingReminder] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [editingStat, setEditingStat] = useState(null);
  const [editingReminder, setEditingReminder] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showFirstRunSetup, setShowFirstRunSetup] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [importData, setImportData] = useState(null);
  const [selectedImportNotes, setSelectedImportNotes] = useState([]);
  const [selectedSport, setSelectedSport] = useState('todos');
  const [selectedTeamPlayer, setSelectedTeamPlayer] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');

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

  const [showConfrontoFilter, setShowConfrontoFilter] = useState(false);
  const [tagInput, setTagInput] = useState('');

  // Carregar dados salvos
  useEffect(() => {
    const savedData = localStorage.getItem('sportsNotes');
    const savedConfig = localStorage.getItem('sportsNotesConfig');
    
    if (savedData) {
      const data = JSON.parse(savedData);
      setNotes(data.notes || []);
      setStatistics(data.statistics || []);
      setReminders(data.reminders || []);
      setSports(data.sports || []);
    }
    
    if (savedConfig) {
      const loadedConfig = JSON.parse(savedConfig);
      setConfig(loadedConfig);
      
      // Se é primeira execução, mostrar setup
      if (loadedConfig.firstRun) {
        setShowFirstRunSetup(true);
      }
    } else {
      // Primeira execução
      setShowFirstRunSetup(true);
    }
  }, []);

  // Auto-save
  useEffect(() => {
    if (config.autoSave && !config.firstRun) {
      const dataToSave = { notes, statistics, reminders, sports };
      localStorage.setItem('sportsNotes', JSON.stringify(dataToSave));
      localStorage.setItem('sportsNotesConfig', JSON.stringify(config));
      
      // Auto-backup se pasta configurada
      if (config.backupFolder && config.saveLocation === 'folder') {
        autoBackup(dataToSave);
      }
    }
  }, [notes, statistics, reminders, sports, config]);

  // Aplicar tema
  useEffect(() => {
    if (config.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [config.theme]);

  // Auto-backup
  const autoBackup = (data) => {
    const backupData = {
      ...data,
      backupDate: new Date().toISOString(),
      version: '1.2'
    };
    
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { 
      type: 'application/json' 
    });
    
    // Simular salvamento na pasta (em um app real, usaria APIs do sistema)
    console.log(`Auto-backup salvo em: ${config.backupFolder}/sports-notes-auto-${new Date().toISOString().split('T')[0]}.json`);
    
    // Para demonstração, vamos criar um link de download automaticamente
    if (config.autoSave) {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `sports-notes-auto-${new Date().toISOString().split('T')[0]}.json`;
      a.style.display = 'none';
      document.body.appendChild(a);
      // a.click(); // Descomente para download automático
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  // Função para processar confrontos
  const processConfrontoTeams = (team1, team2, noteType) => {
    if (noteType !== 'confronto') return [];
    
    if (team1.trim() && team2.trim()) {
      return [team1.trim(), team2.trim()];
    }
    return [];
  };

  // Aplicar filtros quando clicar nos cards de estatísticas
  const applyQuickFilter = (filterType, value) => {
    if (filterType === 'all') {
      setSelectedSport('todos');
      setSelectedTeamPlayer('todos');
      setSortBy('date');
      setSearchTerm('');
      setShowConfrontoFilter(false);
    } else if (filterType === 'sport') {
      setSelectedSport(value);
      setSelectedTeamPlayer('todos');
      setShowConfrontoFilter(false);
    } else if (filterType === 'favorite') {
      setSortBy('favorite');
      setSelectedSport('todos');
      setSelectedTeamPlayer('todos');
      setShowConfrontoFilter(false);
    } else if (filterType === 'noteType') {
      setSearchTerm('');
      setSelectedSport('todos');
      setSelectedTeamPlayer('todos');
      setSortBy('date');
      setShowConfrontoFilter(value === 'confronto');
    }
  };

  // Obter esporte com cor
  const getSportColor = (sportName) => {
    const sport = sports.find(s => s.name === sportName);
    return sport ? sport.color : 'bg-gray-100 text-gray-800';
  };

  // Obter todas as equipes/jogadores únicos
  const getAllTeamsPlayers = () => {
    const items = new Set();
    
    notes.forEach(note => {
      if (note.noteType === 'individual') {
        if (note.team) items.add(note.team);
        if (note.player && note.player !== 'Confronto') items.add(note.player);
      } else if (note.noteType === 'confronto' && note.confrontoTeams) {
        note.confrontoTeams.forEach(team => items.add(team));
      }
    });
    
    return Array.from(items).sort();
  };

  // Filtrar notas considerando confrontos
  const filteredNotes = useMemo(() => {
    let filtered = notes;

    if (selectedSport !== 'todos') {
      filtered = filtered.filter(note => note.sport === selectedSport);
    }

    if (selectedTeamPlayer !== 'todos') {
      filtered = filtered.filter(note => {
        if (note.noteType === 'individual') {
          return note.team === selectedTeamPlayer || note.player === selectedTeamPlayer;
        } else if (note.noteType === 'confronto') {
          return note.confrontoTeams && note.confrontoTeams.includes(selectedTeamPlayer);
        }
        return false;
      });
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
  }, [notes, selectedSport, selectedTeamPlayer, searchTerm, sortBy, showConfrontoFilter]);

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

  const addNote = () => {
    if (!newNote.content) {
      alert('Por favor, preencha o conteúdo da nota');
      return;
    }

    if (newNote.noteType === 'individual' && !newNote.player) {
      alert('Para notas individuais, preencha o campo jogador');
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

    const note = {
      id: Date.now(),
      ...newNote,
      sport: finalSport,
      confrontoTeams,
      player: newNote.noteType === 'confronto' ? 'Confronto' : newNote.player,
      team: newNote.noteType === 'confronto' ? `${newNote.confrontoTeam1} vs ${newNote.confrontoTeam2}` : newNote.team,
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
      odd: parseFloat(newStat.odd),
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

  const updateNote = () => {
    if (!newNote.content) {
      alert('Por favor, preencha o conteúdo da nota');
      return;
    }

    if (newNote.noteType === 'individual' && !newNote.player) {
      alert('Para notas individuais, preencha o campo jogador');
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

    const updatedNotes = notes.map(note => 
      note.id === editingNote.id 
        ? { 
            ...newNote, 
            id: editingNote.id, 
            sport: finalSport,
            confrontoTeams,
            player: newNote.noteType === 'confronto' ? 'Confronto' : newNote.player,
            team: newNote.noteType === 'confronto' ? `${newNote.confrontoTeam1} vs ${newNote.confrontoTeam2}` : newNote.team
          }
        : note
    );

    setNotes(updatedNotes);
    resetNoteForm();
    setEditingNote(null);
  };

  const updateStat = () => {
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

    const updatedStats = statistics.map(stat => 
      stat.id === editingStat.id 
        ? { ...newStat, id: editingStat.id, sport: finalSport, odd: parseFloat(newStat.odd) }
        : stat
    );

    setStatistics(updatedStats);
    resetStatForm();
    setEditingStat(null);
  };

  const updateReminder = () => {
    if (!newReminder.title || !newReminder.date) {
      alert('Por favor, preencha pelo menos o título e a data');
      return;
    }

    const updatedReminders = reminders.map(reminder => 
      reminder.id === editingReminder.id 
        ? { ...newReminder, id: editingReminder.id }
        : reminder
    );

    setReminders(updatedReminders);
    resetReminderForm();
    setEditingReminder(null);
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

  const toggleReminderComplete = (reminderId) => {
    setReminders(reminders.map(reminder => 
      reminder.id === reminderId 
        ? { ...reminder, completed: !reminder.completed }
        : reminder
    ));
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

  const startEditNote = (note) => {
    const confrontoTeams = note.confrontoTeams || [];
    setNewNote({
      sport: note.sport,
      newSport: '',
      year: note.year,
      championship: note.championship,
      team: note.noteType === 'confronto' ? '' : (note.team || ''),
      player: note.noteType === 'confronto' ? '' : note.player,
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

  const startEditStat = (stat) => {
    setNewStat({
      sport: stat.sport,
      newSport: '',
      championship: stat.championship,
      team: stat.team,
      date: stat.date,
      situation: stat.situation,
      odd: stat.odd.toString(),
      observation: stat.observation,
      result: stat.result
    });
    setEditingStat(stat);
  };

  const startEditReminder = (reminder) => {
    setNewReminder({
      title: reminder.title,
      description: reminder.description,
      date: reminder.date,
      time: reminder.time,
      type: reminder.type,
      relatedItem: reminder.relatedItem
    });
    setEditingReminder(reminder);
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

  const exportData = () => {
    const dataToExport = {
      notes,
      statistics,
      reminders,
      sports,
      exportDate: new Date().toISOString(),
      version: '1.2'
    };
    
    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { 
      type: 'application/json' 
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sports-notes-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportFile = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          setImportData(data);
          setSelectedImportNotes(data.notes?.map(note => note.id) || []);
          setShowImport(true);
        } catch (error) {
          alert('Erro ao ler o arquivo. Verifique se é um backup válido.');
        }
      };
      reader.readAsText(file);
    }
  };

  const executeImport = () => {
    if (!importData) return;

    const notesToImport = importData.notes?.filter(note => 
      selectedImportNotes.includes(note.id)
    ) || [];

    // Evitar conflitos de ID
    const maxId = Math.max(...notes.map(n => n.id), ...statistics.map(s => s.id), ...reminders.map(r => r.id), 0);
    const updatedNotesToImport = notesToImport.map((note, index) => ({
      ...note,
      id: maxId + index + 1,
      // Garantir compatibilidade com novas funcionalidades
      noteType: note.noteType || 'individual',
      confrontoTeams: note.confrontoTeams || []
    }));

    setNotes([...notes, ...updatedNotesToImport]);

    // Importar estatísticas se existirem
    if (importData.statistics) {
      const updatedStatsToImport = importData.statistics.map((stat, index) => ({
        ...stat,
        id: maxId + notesToImport.length + index + 1
      }));
      setStatistics([...statistics, ...updatedStatsToImport]);
    }

    // Importar lembretes se existirem
    if (importData.reminders) {
      const updatedRemindersToImport = importData.reminders.map((reminder, index) => ({
        ...reminder,
        id: maxId + notesToImport.length + (importData.statistics?.length || 0) + index + 1
      }));
      setReminders([...reminders, ...updatedRemindersToImport]);
    }

    // Importar novos esportes
    const newSports = importData.sports?.filter(sport => 
      !sports.find(s => s.name === sport.name)
    ) || [];
    setSports([...sports, ...newSports]);

    setShowImport(false);
    setImportData(null);
    setSelectedImportNotes([]);
  };

  const handleFirstRunSetup = (folder) => {
    setConfig({
      ...config,
      firstRun: false,
      backupFolder: folder,
      saveLocation: folder ? 'folder' : 'browser'
    });
    setShowFirstRunSetup(false);
  };

  const selectBackupFolder = () => {
    // Simular seleção de pasta
    const folder = prompt('Digite o caminho da pasta para backups (ex: C:/Backups/SportsNotes):');
    if (folder) {
      setConfig({
        ...config,
        backupFolder: folder,
        saveLocation: 'folder'
      });
    }
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
      confrontoNotes: notes.filter(n => n.noteType === 'confronto').length
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

  const getCurrentData = () => {
    switch(currentView) {
      case 'notes': return filteredNotes;
      case 'stats': return filteredStatistics;
      case 'reminders': return filteredReminders;
      default: return filteredNotes;
    }
  };

  return (
    <div className={themeClasses}>
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Modal de Primeira Execução */}
          {showFirstRunSetup && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className={`rounded-lg p-6 w-full max-w-md mx-4 ${config.theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <h2 className="text-2xl font-bold mb-4">Bem-vindo!</h2>
                <p className="mb-6">Configure onde você deseja salvar seus backups automáticos:</p>
                
                <div className="space-y-4">
                  <button
                    onClick={() => handleFirstRunSetup(null)}
                    className="w-full p-4 text-left border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <div className="font-medium">Salvar no Navegador</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      Dados ficam salvos localmente no navegador
                    </div>
                  </button>
                  
                  <button
                    onClick={() => {
                      const folder = prompt('Digite o caminho da pasta para backups (ex: C:/Backups/SportsNotes):');
                      handleFirstRunSetup(folder);
                    }}
                    className="w-full p-4 text-left border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <div className="font-medium flex items-center gap-2">
                      <FolderOpen className="h-4 w-4" />
                      Escolher Pasta
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      Backups automáticos em uma pasta específica
                    </div>
                  </button>
                </div>
                
                <p className="text-xs text-gray-500 mt-4">
                  Você pode alterar essa configuração a qualquer momento nas configurações.
                </p>
              </div>
            </div>
          )}

          {/* Header */}
          <div className={`rounded-lg shadow-sm p-6 mb-6 ${config.theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold mb-2">Plataforma de Apostas</h1>
                <p className={config.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  Gerencie anotações, estatísticas e lembretes para apostas profissionais
                </p>
                {config.backupFolder && (
                  <p className="text-xs text-green-600 mt-1">
                    📁 Backups salvos em: {config.backupFolder}
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={exportData}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  <Download className="h-4 w-4" />
                  Exportar
                </button>
                <label className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer">
                  <Upload className="h-4 w-4" />
                  Importar
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImportFile}
                    className="hidden"
                  />
                </label>
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
            </div>

            {/* Stats específicos por view */}
            {currentView === 'notes' && (
              <div className="grid grid-cols-auto gap-4" style={{gridTemplateColumns: `repeat(${Math.min(sports.length + 3, 6)}, minmax(0, 1fr))`}}>
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

            {currentView === 'stats' && (
              <div className="grid grid-cols-auto gap-4" style={{gridTemplateColumns: `repeat(${Math.min(sports.length + 3, 6)}, minmax(0, 1fr))`}}>
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
                {sports.map(sport => (
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
          </div>

          {/* Controles e Busca */}
          <div className={`rounded-lg shadow-sm p-6 mb-6 ${config.theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            {/* Indicador de filtros ativos */}
            {(selectedSport !== 'todos' || selectedTeamPlayer !== 'todos' || sortBy === 'favorite' || showConfrontoFilter) && (
              <div className="mb-4 flex flex-wrap gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Filtros ativos:</span>
                {selectedSport !== 'todos' && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                    Esporte: {selectedSport}
                  </span>
                )}
                {selectedTeamPlayer !== 'todos' && (
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                    Time/Jogador: {selectedTeamPlayer}
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
              <div className="flex gap-3">
                {(currentView === 'notes' || currentView === 'stats') && (
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
                )}

                {currentView === 'notes' && (
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
                )}

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
                  {currentView === 'notes' && (
                    <>
                      <option value="year">Ano</option>
                      <option value="player">Jogador</option>
                      <option value="favorite">Favoritas</option>
                    </>
                  )}
                  {currentView === 'stats' && (
                    <>
                      <option value="odd">Odd</option>
                      <option value="team">Time</option>
                    </>
                  )}
                </select>

                {currentView === 'notes' && (
                  <button
                    onClick={() => setIsAddingNote(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Nova Nota
                  </button>
                )}

                {currentView === 'stats' && (
                  <button
                    onClick={() => setIsAddingStat(true)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Nova Estatística
                  </button>
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
              </div>
              <div className="flex-1 min-w-64">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder={`Buscar ${currentView === 'notes' ? 'notas' : currentView === 'stats' ? 'estatísticas' : 'lembretes'}...`}
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
                    <label className="block text-sm font-medium mb-2">Local de Backup</label>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          id="browser"
                          name="saveLocation"
                          checked={config.saveLocation === 'browser'}
                          onChange={() => setConfig({...config, saveLocation: 'browser', backupFolder: null})}
                        />
                        <label htmlFor="browser" className="text-sm">Navegador</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          id="folder"
                          name="saveLocation"
                          checked={config.saveLocation === 'folder'}
                          onChange={() => setConfig({...config, saveLocation: 'folder'})}
                        />
                        <label htmlFor="folder" className="text-sm">Pasta específica</label>
                      </div>
                      {config.saveLocation === 'folder' && (
                        <div className="ml-6 space-y-2">
                          <button
                            onClick={selectBackupFolder}
                            className="flex items-center gap-2 px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
                          >
                            <FolderOpen className="h-4 w-4" />
                            {config.backupFolder || 'Escolher Pasta'}
                          </button>
                          {config.backupFolder && (
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              {config.backupFolder}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={config.autoSave}
                        onChange={(e) => setConfig({...config, autoSave: e.target.checked})}
                        className="rounded"
                      />
                      <span>Salvamento automático</span>
                    </label>
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

          {/* Modal de Importação */}
          {showImport && importData && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className={`rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[80vh] overflow-y-auto ${config.theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <h2 className="text-2xl font-bold mb-4">Importar Dados</h2>
                <p className={`mb-4 ${config.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  Selecione quais itens você deseja importar:
                </p>
                
                <div className="mb-4">
                  <button
                    onClick={() => setSelectedImportNotes(
                      selectedImportNotes.length === (importData.notes?.length || 0)
                        ? [] 
                        : importData.notes?.map(note => note.id) || []
                    )}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    {selectedImportNotes.length === (importData.notes?.length || 0) ? 'Desmarcar todas' : 'Selecionar todas'}
                  </button>
                </div>

                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {importData.notes?.map(note => (
                    <div key={note.id} className={`p-3 border rounded-lg ${config.theme === 'dark' ? 'border-gray-600' : 'border-gray-200'}`}>
                      <label className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          checked={selectedImportNotes.includes(note.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedImportNotes([...selectedImportNotes, note.id]);
                            } else {
                              setSelectedImportNotes(selectedImportNotes.filter(id => id !== note.id));
                            }
                          }}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium">
                              {note.sport} - {note.year} - {note.championship} - {note.player}
                              {note.noteType === 'confronto' && ' (Confronto)'}
                            </span>
                          </div>
                          <p className={`text-sm ${config.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                            {note.content.substring(0, 100)}...
                          </p>
                        </div>
                      </label>
                    </div>
                  )) || []}
                </div>

                <div className="flex gap-3 justify-end mt-6">
                  <button
                    onClick={() => setShowImport(false)}
                    className={`px-4 py-2 border rounded-lg ${
                      config.theme === 'dark' 
                        ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                        : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={executeImport}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    disabled={selectedImportNotes.length === 0}
                  >
                    Importar {selectedImportNotes.length} item(s)
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
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        value="individual"
                        checked={newNote.noteType === 'individual'}
                        onChange={(e) => setNewNote({...newNote, noteType: e.target.value})}
                      />
                      <span>Individual</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        value="confronto"
                        checked={newNote.noteType === 'confronto'}
                        onChange={(e) => setNewNote({...newNote, noteType: e.target.value})}
                      />
                      <span>Confronto</span>
                      <HelpCircle 
                        className="h-4 w-4 text-gray-400" 
                        title="Para confrontos, a nota ficará disponível para ambos os times/jogadores"
                      />
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Campeonato</label>
                    <input
                      type="text"
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                        config.theme === 'dark' 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300'
                      }`}
                      value={newNote.championship}
                      onChange={(e) => setNewNote({...newNote, championship: e.target.value})}
                      placeholder="Ex: Brasileirão Série A, US Open"
                    />
                  </div>

                  {newNote.noteType === 'individual' && newNote.sport === 'futebol' && (
                    <div>
                      <label className="block text-sm font-medium mb-1">Time</label>
                      <input
                        type="text"
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                          config.theme === 'dark' 
                            ? 'bg-gray-700 border-gray-600 text-white' 
                            : 'bg-white border-gray-300'
                        }`}
                        value={newNote.team}
                        onChange={(e) => setNewNote({...newNote, team: e.target.value})}
                        placeholder="Ex: Flamengo"
                      />
                    </div>
                  )}

                  {newNote.noteType === 'confronto' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          {newNote.sport === 'futebol' ? 'Time 1' : 'Jogador 1'}
                        </label>
                        <input
                          type="text"
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                            config.theme === 'dark' 
                              ? 'bg-gray-700 border-gray-600 text-white' 
                              : 'bg-white border-gray-300'
                          }`}
                          value={newNote.confrontoTeam1}
                          onChange={(e) => setNewNote({...newNote, confrontoTeam1: e.target.value})}
                          placeholder={newNote.sport === 'futebol' ? 'Ex: Flamengo' : 'Ex: Djokovic'}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          {newNote.sport === 'futebol' ? 'Time 2' : 'Jogador 2'}
                        </label>
                        <input
                          type="text"
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                            config.theme === 'dark' 
                              ? 'bg-gray-700 border-gray-600 text-white' 
                              : 'bg-white border-gray-300'
                          }`}
                          value={newNote.confrontoTeam2}
                          onChange={(e) => setNewNote({...newNote, confrontoTeam2: e.target.value})}
                          placeholder={newNote.sport === 'futebol' ? 'Ex: Vasco' : 'Ex: Nadal'}
                        />
                      </div>
                    </>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  {newNote.noteType === 'individual' && (
                    <div>
                      <label className="block text-sm font-medium mb-1">Jogador *</label>
                      <input
                        type="text"
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                          config.theme === 'dark' 
                            ? 'bg-gray-700 border-gray-600 text-white' 
                            : 'bg-white border-gray-300'
                        }`}
                        value={newNote.player}
                        onChange={(e) => setNewNote({...newNote, player: e.target.value})}
                        placeholder="Nome do jogador"
                        required
                      />
                    </div>
                  )}

                  <div>
                    <label className="flex items-center gap-2 mt-6">
                      <input
                        type="checkbox"
                        checked={newNote.favorite}
                        onChange={(e) => setNewNote({...newNote, favorite: e.target.checked})}
                        className="rounded"
                      />
                      <Star className="h-4 w-4" />
                      <span>Marcar como favorita</span>
                    </label>
                  </div>
                </div>

                {/* Sistema de Tags */}
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Tags</label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      className={`flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                        config.theme === 'dark' 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300'
                      }`}
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      placeholder="Digite uma tag e pressione Enter"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                    />
                    <button
                      type="button"
                      onClick={handleAddTag}
                      className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                    >
                      <Tag className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {newNote.tags.map((tag, index) => (
                      <span key={index} className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        #{tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium mb-1">Anotações *</label>
                  <textarea
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 h-32 ${
                      config.theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300'
                    }`}
                    value={newNote.content}
                    onChange={(e) => setNewNote({...newNote, content: e.target.value})}
                    placeholder="Descreva os padrões observados, estatísticas, comportamentos..."
                    required
                  />
                </div>

                <div className="flex gap-3 justify-end">
                  <button
                    onClick={() => {
                      setIsAddingNote(false);
                      setEditingNote(null);
                      resetNoteForm();
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
                    onClick={editingNote ? updateNote : addNote}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    {editingNote ? 'Atualizar' : 'Salvar'} Nota
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Modal para Nova Estatística / Edição */}
          {(isAddingStat || editingStat) && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className={`rounded-lg p-6 w-full max-w-3xl mx-4 max-h-[90vh] overflow-y-auto ${config.theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <h2 className="text-2xl font-bold mb-4">
                  {editingStat ? 'Editar Estatística' : 'Nova Estatística'}
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
                      value={newStat.sport}
                      onChange={(e) => setNewStat({...newStat, sport: e.target.value})}
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

                  {newStat.sport === 'novo' && (
                    <div>
                      <label className="block text-sm font-medium mb-1">Nome do Novo Esporte</label>
                      <input
                        type="text"
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                          config.theme === 'dark' 
                            ? 'bg-gray-700 border-gray-600 text-white' 
                            : 'bg-white border-gray-300'
                        }`}
                        value={newStat.newSport}
                        onChange={(e) => setNewStat({...newStat, newSport: e.target.value})}
                        placeholder="Ex: basquete"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium mb-1">Campeonato</label>
                    <input
                      type="text"
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                        config.theme === 'dark' 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300'
                      }`}
                      value={newStat.championship}
                      onChange={(e) => setNewStat({...newStat, championship: e.target.value})}
                      placeholder="Ex: Brasileirão Série A"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Time/Confronto *</label>
                    <input
                      type="text"
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                        config.theme === 'dark' 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300'
                      }`}
                      value={newStat.team}
                      onChange={(e) => setNewStat({...newStat, team: e.target.value})}
                      placeholder="Ex: Flamengo vs Palmeiras"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Data *</label>
                    <input
                      type="date"
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                        config.theme === 'dark' 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300'
                      }`}
                      value={newStat.date}
                      onChange={(e) => setNewStat({...newStat, date: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Situação *</label>
                    <input
                      type="text"
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                        config.theme === 'dark' 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300'
                      }`}
                      value={newStat.situation}
                      onChange={(e) => setNewStat({...newStat, situation: e.target.value})}
                      placeholder="Ex: Over 2.5 gols, Vitória do Flamengo"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Odd *</label>
                    <input
                      type="number"
                      step="0.01"
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                        config.theme === 'dark' 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300'
                      }`}
                      value={newStat.odd}
                      onChange={(e) => setNewStat({...newStat, odd: e.target.value})}
                      placeholder="Ex: 1.85"
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Resultado</label>
                  <select
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                      config.theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300'
                    }`}
                    value={newStat.result || ''}
                    onChange={(e) => setNewStat({...newStat, result: e.target.value || null})}
                  >
                    <option value="">Pendente</option>
                    <option value="win">Ganhou</option>
                    <option value="loss">Perdeu</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium mb-1">Observação</label>
                  <textarea
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 h-24 ${
                      config.theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300'
                    }`}
                    value={newStat.observation}
                    onChange={(e) => setNewStat({...newStat, observation: e.target.value})}
                    placeholder="Contexto da odd, motivação para a aposta..."
                  />
                </div>

                <div className="flex gap-3 justify-end">
                  <button
                    onClick={() => {
                      setIsAddingStat(false);
                      setEditingStat(null);
                      resetStatForm();
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
                    onClick={editingStat ? updateStat : addStat}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    {editingStat ? 'Atualizar' : 'Salvar'} Estatística
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Modal para Novo Lembrete / Edição */}
          {(isAddingReminder || editingReminder) && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className={`rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto ${config.theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <h2 className="text-2xl font-bold mb-4">
                  {editingReminder ? 'Editar Lembrete' : 'Novo Lembrete'}
                </h2>
                
                <div className="grid grid-cols-1 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Título *</label>
                    <input
                      type="text"
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                        config.theme === 'dark' 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300'
                      }`}
                      value={newReminder.title}
                      onChange={(e) => setNewReminder({...newReminder, title: e.target.value})}
                      placeholder="Ex: Analisar jogo do Flamengo"
                      required
                    />
                  </div>
                </div>

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
                      value={newReminder.date}
                      onChange={(e) => setNewReminder({...newReminder, date: e.target.value})}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Horário</label>
                    <input
                      type="time"
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                        config.theme === 'dark' 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300'
                      }`}
                      value={newReminder.time}
                      onChange={(e) => setNewReminder({...newReminder, time: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Tipo</label>
                    <select
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                        config.theme === 'dark' 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300'
                      }`}
                      value={newReminder.type}
                      onChange={(e) => setNewReminder({...newReminder, type: e.target.value})}
                    >
                      <option value="analysis">Análise</option>
                      <option value="game">Jogo</option>
                      <option value="review">Revisão</option>
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium mb-1">Descrição</label>
                  <textarea
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 h-24 ${
                      config.theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300'
                    }`}
                    value={newReminder.description}
                    onChange={(e) => setNewReminder({...newReminder, description: e.target.value})}
                    placeholder="Detalhes do que precisa ser feito..."
                  />
                </div>

                <div className="flex gap-3 justify-end">
                  <button
                    onClick={() => {
                      setIsAddingReminder(false);
                      setEditingReminder(null);
                      resetReminderForm();
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
                    onClick={editingReminder ? updateReminder : addReminder}
                    className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                  >
                    {editingReminder ? 'Atualizar' : 'Salvar'} Lembrete
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Conteúdo principal baseado na view atual */}
          <div className="space-y-4">
            {getCurrentData().length === 0 ? (
              <div className={`rounded-lg shadow-sm p-8 text-center ${config.theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                {currentView === 'notes' && <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />}
                {currentView === 'stats' && <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />}
                {currentView === 'reminders' && <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />}
                <h3 className="text-lg font-medium mb-2">Nenhum item encontrado</h3>
                <p className={config.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  {searchTerm || selectedSport !== 'todos' || selectedTeamPlayer !== 'todos'
                    ? 'Tente ajustar os filtros de busca'
                    : `Comece criando ${currentView === 'notes' ? 'sua primeira anotação' : currentView === 'stats' ? 'sua primeira estatística' : 'seu primeiro lembrete'}`
                  }
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
                          <span className={`text-sm flex items-center gap-1 ${config.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                            <Calendar className="h-4 w-4" />
                            {note.year}
                          </span>
                          <span className={`text-sm flex items-center gap-1 ${config.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                            <Trophy className="h-4 w-4" />
                            {note.championship}
                          </span>
                          {note.noteType === 'individual' && note.team && (
                            <span className={`text-sm flex items-center gap-1 ${config.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                              <Users className="h-4 w-4" />
                              {note.team}
                            </span>
                          )}
                          <span className={`text-sm flex items-center gap-1 ${config.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                            <User className="h-4 w-4" />
                            {note.noteType === 'confronto' ? note.team : note.player}
                          </span>
                          {note.noteType === 'confronto' && (
                            <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs font-medium">
                              Confronto
                            </span>
                          )}
                        </div>

                        {/* Tags */}
                        {note.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-3">
                            {note.tags.map((tag, index) => (
                              <span key={index} className={`inline-flex items-center px-2 py-1 rounded text-xs ${config.theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
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
                          onClick={() => startEditNote(note)}
                          className={`p-1 ${config.theme === 'dark' ? 'text-gray-400 hover:text-blue-400' : 'text-gray-400 hover:text-blue-600'}`}
                          title="Editar nota"
                        >
                          <Edit2 className="h-4 w-4" />
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
                              <strong>Odd: {stat.odd}</strong>
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
                          onClick={() => startEditStat(stat)}
                          className={`p-1 ${config.theme === 'dark' ? 'text-gray-400 hover:text-blue-400' : 'text-gray-400 hover:text-blue-600'}`}
                          title="Editar estatística"
                        >
                          <Edit2 className="h-4 w-4" />
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
                          onClick={() => startEditReminder(reminder)}
                          className={`p-1 ${config.theme === 'dark' ? 'text-gray-400 hover:text-blue-400' : 'text-gray-400 hover:text-blue-600'}`}
                          title="Editar lembrete"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
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
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SportsNotePlatform;