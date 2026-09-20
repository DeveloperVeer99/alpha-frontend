import React, { useState } from 'react';
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
    }
    return result;
  };

  const logout = () => {
    authService.logout();
    setIsAdminMode(false);
    setEditingSectionState(null);
    setEditingData(null);
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
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}
