import { createContext } from 'react';

// AdminContext value shape:
// {
//   isAdminMode, isLoginOpen, openLogin, closeLogin, login, logout,
//   editingSection, editingData, setEditingSection(section, data), closeEditor,
//   contentVersion, refreshContent, editSession
// }
export const AdminContext = createContext(undefined);
