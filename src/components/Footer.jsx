import React, { useState } from 'react';
import { useSectionContent } from '../hooks/useSectionContent';
import { EditBtn, FieldModal } from './InlineEdit';
import { useAdmin } from '../context/useAdmin';
import API from '../services/api';

const DEFAULTS = {
  companyName: 'Alpha Circle',
  tagline: 'Trading Mentorship',
  description: 'Private trading mentorship by Uwesh Mayur — institutional-grade ICT concepts and orderflow, taught end to end.',
  copyright: '© 2026 Alpha Circle. All rights reserved.',
};

function Footer() {
  const { content, setContent } = useSectionContent('footer', DEFAULTS);
  const { refreshContent } = useAdmin();
  const [editing, setEditing] = useState(null);

  const save = async (value) => {
    const updated = { ...content, [editing.field]: value };
    setContent(updated);
    setEditing(null);
    try { await API.put('/content/footer', { data: updated }); refreshContent(); } catch (e) { console.error(e); }
  };

  const links = [
    { name: 'Mentor', href: '#mentor' },
    { name: 'Curriculum', href: '#curriculum' },
    { name: 'Community', href: '#community' },
    { name: 'Enroll', href: '#enroll' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <>
      <footer className="bg-zinc-950 text-white py-8 sm:py-10 md:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#D4AF37] rounded-xl flex items-center justify-center">
                  <span className="text-zinc-950 font-black text-xs sm:text-sm">AC</span>
                </div>
                <div>
                  <div className="group text-xs sm:text-sm font-black uppercase tracking-wider">
                    {content.companyName}
                    <EditBtn onClick={() => setEditing({ field: 'companyName', label: 'Company Name', value: content.companyName })} />
                  </div>
                  <div className="group text-[10px] sm:text-xs text-zinc-400 uppercase tracking-wider">
                    {content.tagline}
                    <EditBtn onClick={() => setEditing({ field: 'tagline', label: 'Tagline', value: content.tagline })} />
                  </div>
                </div>
              </div>
              <p className="group text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-sm">
                {content.description}
                <EditBtn onClick={() => setEditing({ field: 'description', label: 'Description', value: content.description, multiline: true })} />
              </p>
            </div>

            <div>
              <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider mb-3 sm:mb-4">Quick Links</h3>
              <ul className="space-y-1.5 sm:space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-zinc-400 hover:text-white text-xs sm:text-sm transition-colors">{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-zinc-800 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
            <p className="group text-zinc-400 text-xs sm:text-sm text-center md:text-left">
              {content.copyright}
              <EditBtn onClick={() => setEditing({ field: 'copyright', label: 'Copyright Text', value: content.copyright })} />
            </p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm">
              <a href="#" className="text-zinc-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-zinc-400 hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {editing && <FieldModal label={editing.label} value={editing.value} multiline={editing.multiline} onSave={save} onClose={() => setEditing(null)} />}
    </>
  );
}

export default Footer;
