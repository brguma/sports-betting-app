import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, Plus, Calendar, Users, Trophy, User, FileText, Edit2, Trash2, 
  Tag, X, Settings, Download, Upload, Moon, Sun, Star, Copy, BarChart3, 
  Bell, Clock, TrendingUp, FolderOpen, HelpCircle, Building, Globe, Filter, 
  DollarSign, PiggyBank, TrendingDown, Target, Activity, CheckCircle, Save, 
  AlertTriangle, Minus 
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar 
} from 'recharts';

const CompleteSportsPlatform = () => {
  // ========== ESTADOS E CONFIGURAÇÕES ==========
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

  const [notes, setNotes] = useState([
    {
      id: 1,
      sport: 'futebol',
      year: '2024',
      championship: 'Brasileirão Série A',
      team: 'Flamengo',
      player: 'Gabigol',
      content: 'Gabigol tem melhor performance em jogos em casa.',
      tags: ['atacante', 'casa', 'conversão'],
      favorite: false,
      noteType: 'individual',
      confrontoTeams: [],
      date: '2024-08-01'
    }
  ]);

  const [statistics, setStatistics] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [bancaEntries, setBancaEntries] = useState([]);
  const [sports, setSports] = useState([
    { name: 'futebol', color: 'bg-green-100 text-green-800' },
    { name: 'tenis', color: 'bg-orange-100 text-orange-800' }
  ]);

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

  // ========= FUNÇÕES =========

  const getTagColor = (tag) => {
    const hash = tag.split('').reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);
    return tagColors[Math.abs(hash) % tagColors.length];
  };

  const addNote = () => {
    if (!newNote.content) {
      alert('Preencha o conteúdo da nota');
      return;
    }
    let finalSport = newNote.sport;
    if (newNote.sport === 'novo' && newNote.newSport.trim()) {
      finalSport = newNote.newSport.trim().toLowerCase();
      if (!sports.find(s => s.name === finalSport)) {
        const colorIndex = sports.length % sportColors.length;
        setSports([...sports, { name: finalSport, color: sportColors[colorIndex] }]);
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
  };

  const toggleFavorite = (id) => {
    setNotes(notes.map(n => n.id === id ? { ...n, favorite: !n.favorite } : n));
  };

  const deleteNote = (id) => {
    if (window.confirm('Excluir nota?')) {
      setNotes(notes.filter(n => n.id !== id));
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
      totalBancaEntries: bancaEntries.length
    };
    
    sports.forEach(sport => {
      stats[sport.name + '_notes'] = notes.filter(n => n.sport === sport.name).length;
    });
    return stats;
  };

  // ========= RENDER =========

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Sports Note Platform</h1>

      <button 
        className="px-4 py-2 bg-blue-500 text-white rounded"
        onClick={addNote}
      >
        Adicionar Nota
      </button>

      <ul className="mt-4 space-y-2">
        {notes.map(note => (
          <li key={note.id} className="p-3 border rounded flex justify-between items-center">
            <div>
              <strong>{note.sport}</strong> - {note.content}
            </div>
            <div className="space-x-2">
              <button onClick={() => toggleFavorite(note.id)} className="text-yellow-600">
                {note.favorite ? '★' : '☆'}
              </button>
              <button onClick={() => deleteNote(note.id)} className="text-red-600">Excluir</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompleteSportsPlatform;
