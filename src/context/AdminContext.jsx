import React, { useState, useEffect } from 'react';
import { AdminContext } from './adminContext';
import { authService } from '../services/authService';

export function AdminProvider({ children }) {
  // Admin mode persists per browser session (tab)
  const [isAdminMode, setIsAdminModeState] = useState(() => {
    try {
      return sessionStorage.getItem('ac_admin_mode') === 'true' && !!localStorage.getItem('admin_token');
    } catch {
      return false;
    }
  });
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  // which section is being edited + the content currently displayed in it
  const [editingSection, setEditingSectionState] = useState(null);
  const [editingData, setEditingData] = useState(null);
  // bump counter tells sections to refetch after a save
  const [contentVersion, setContentVersion] = useState(0);
  // increments every time the editor opens — used as a stable remount key
  const [editSession, setEditSession] = useState(0);
  // toast message when the session dies mid-edit (so saves never fail silently)
  const [authNotice, setAuthNotice] = useState('');

  // The API layer clears an expired/invalid token and fires this event.
  // We must visibly tell the user — silent failures made edits look like
  // they "reverted on refresh".
  useEffect(() => {
    const onAuthExpired = () => {
      setIsAdminModeState(false);
      setEditingSectionState(null);
      setEditingData(null);
      setAuthNotice('Your admin session expired — the last save was NOT stored. Log in again to continue editing.');
    };
    window.addEventListener('ac:auth-expired', onAuthExpired);
    return () => window.removeEventListener('ac:auth-expired', onAuthExpired);
  }, []);

  const setIsAdminMode = (value) => {
    try {
      if (value) {
        sessionStorage.setItem('ac_admin_mode', 'true');
      } else {
        sessionStorage.removeItem('ac_admin_mode');
      }
    } catch {
      /* ignore */
    }
    setIsAdminModeState(value);
  };

  const login = async (secretKey) => {
    const result = await authService.adminLogin(secretKey);
    if (result.success) {
      setIsAdminMode(true);
      setIsLoginOpen(false);
      setAuthNotice('');
    }
    return result;
  };

  const logout = () => {
    authService.logout();
    setIsAdminModeState(false);
    setEditingSectionState(null);
    setEditingData(null);
    setAuthNotice('');
  };

  // Open the editor for a section, pre-filled with what the site currently shows
  const setEditingSection = (section, data = null) => {
    setEditingSectionState(section);
    setEditingData(data);
    setEditSession((s) => s + 1);
  };

  const closeEditor = () => {
    setEditingSectionState(null);
    setEditingData(null);
  };

  const refreshContent = () => setContentVersion((v) => v + 1);

  const value = {
    isAdminMode,
    isLoginOpen,
    openLogin: () => setIsLoginOpen(true),
    closeLogin: () => setIsLoginOpen(false),
    login,
    logout,
    editingSection,
    editingData,
    setEditingSection,
    closeEditor,
    contentVersion,
    refreshContent,
    editSession,
    authNotice,
    clearAuthNotice: () => setAuthNotice(''),
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}
