import React, { useState } from 'react';
import { useSectionContent } from '../hooks/useSectionContent';
import { EditBtn, FieldModal } from './InlineEdit';
import { useAdmin } from '../context/useAdmin';
import API from '../services/api';

const DEFAULTS = {
  title: 'Frequently Asked',
  faqs: [
    { question: 'What exactly is ICT?', answer: 'ICT (Inner Circle Trader) concepts are a framework for reading market structure and liquidity — understanding where stops rest, how price seeks liquidity, and where institutions are likely to position. It replaces indicator guessing with a repeatable read of the chart.' },
    { question: 'What is orderflow and why does it matter?', answer: 'Orderflow shows you real-time buying and selling pressure — delta, footprint charts and absorption. It confirms whether a structured idea is actually being respected by the market before you enter, which dramatically improves timing.' },
    { question: "I'm a complete beginner. Is this mentorship for me?", answer: 'Yes. The curriculum starts from fundamentals — what price really is, how structure forms — and builds step by step toward advanced ICT and orderflow execution. Beginners get a clean foundation; experienced traders plug the gaps in their process.' },
    { question: 'Which markets does this apply to?', answer: "The concepts apply anywhere liquidity drives price — futures, forex, indices and crypto. You'll learn the framework once and adapt it to the market you trade." },
    { question: 'How is the mentorship delivered?', answer: 'Through structured lessons, live sessions with Uwesh Mayur, and the private Alpha Circle community where you get trade reviews, feedback and ongoing support.' },
    { question: 'How do I join?', answer: 'Click "Enroll Now" above. Online payments are launching soon — until then, seats are reserved directly. Join the community to be notified the moment enrollment opens.' },
  ],
};

function FAQSection() {
  const { content, setContent } = useSectionContent('faq', DEFAULTS);
  const { refreshContent } = useAdmin();
  const [openIndex, setOpenIndex] = useState(0);
  const [editing, setEditing] = useState(null);
  const faqs = (content.faqs || []).filter((f) => f && f.question);

  const saveFaq = async (index, key, value) => {
    const updated = { ...content, faqs: content.faqs.map((f, i) => i === index ? { ...f, [key]: value } : f) };
    setContent(updated);
    setEditing(null);
    try { await API.put('/content/faq', { data: updated }); refreshContent(); } catch (e) { console.error(e); }
  };

  const saveTitle = async (value) => {
    const updated = { ...content, title: value };
    setContent(updated);
    setEditing(null);
    try { await API.put('/content/faq', { data: updated }); refreshContent(); } catch (e) { console.error(e); }
  };

  return (
    <>
      <section id="faq" className="py-20 md:py-28 bg-zinc-950 scroll-mt-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] text-zinc-400 mb-3">Questions</p>
            <h2 className="group text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
              {content.title}
              <EditBtn onClick={() => setEditing({ type: 'title', label: 'Section Title', value: content.title })} />
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={index} className={`bg-zinc-900 border rounded-2xl overflow-hidden transition-all duration-200 ${isOpen ? 'border-zinc-600' : 'border-zinc-800'}`}>
                  <div className="flex items-center justify-between gap-4 px-5 md:px-6 py-4 md:py-5">
                    <button type="button" onClick={() => setOpenIndex(isOpen ? -1 : index)} className="flex-1 text-left">
                      <span className="group text-sm md:text-base font-black text-white">
                        {faq.question}
                        <EditBtn onClick={() => setEditing({ type: 'faq-q', label: 'Question', value: faq.question, faqIndex: index, faqKey: 'question' })} />
                      </span>
                    </button>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`flex-shrink-0 text-zinc-400 transition-transform duration-300 cursor-pointer ${isOpen ? 'rotate-180' : ''}`} onClick={() => setOpenIndex(isOpen ? -1 : index)}>
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                  {isOpen && (
                    <div className="px-5 md:px-6 pb-5 md:pb-6">
                      <p className="group text-xs md:text-sm text-zinc-400 leading-relaxed">
                        {faq.answer}
                        <EditBtn onClick={() => setEditing({ type: 'faq-a', label: 'Answer', value: faq.answer, multiline: true, faqIndex: index, faqKey: 'answer' })} />
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {editing && (
        <FieldModal
          label={editing.label}
          value={editing.value}
          multiline={editing.multiline}
          onSave={(val) => editing.faqIndex !== undefined ? saveFaq(editing.faqIndex, editing.faqKey, val) : saveTitle(val)}
          onClose={() => setEditing(null)}
        />
      )}
    </>
  );
}

export default FAQSection;
