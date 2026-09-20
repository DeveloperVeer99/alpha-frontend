import React from 'react';
import { useSectionContent } from '../hooks/useSectionContent';
import EditableArea from './EditableArea';

const DEFAULTS = {
  title: 'Frequently Asked',
  faqs: [
    { question: 'What exactly is ICT?', answer: 'ICT (Inner Circle Trader) concepts are a framework for reading market structure and liquidity — understanding where stops rest, how price seeks liquidity, and where institutions are likely to position. It replaces indicator guessing with a repeatable read of the chart.' },
    { question: 'What is orderflow and why does it matter?', answer: 'Orderflow shows you real-time buying and selling pressure — delta, footprint charts and absorption. It confirms whether a structured idea is actually being respected by the market before you enter, which dramatically improves timing.' },
    { question: "I'm a complete beginner. Is this mentorship for me?", answer: 'Yes. The curriculum starts from fundamentals — what price really is, how structure forms — and builds step by step toward advanced ICT and orderflow execution. Beginners get a clean foundation; experienced traders plug the gaps in their process.' },
    { question: 'Which markets does this apply to?', answer: "The concepts apply anywhere liquidity drives price — futures, forex, indices and crypto. You'll learn the framework once and adapt it to the market you trade." },
    { question: 'How is the mentorship delivered?', answer: 'Through structured lessons, live sessions with Uwesh Mayur, and the private Alpha Circle community where you get trade reviews, feedback and ongoing support.' },
    { question: 'How do I join?', answer: 'Head to the Courses section and pick the mentorship that fits you. Payments are launching soon — join the community to be notified the moment enrollment opens.' },
  ],
};

function FAQSection() {
  const { content } = useSectionContent('faq', DEFAULTS);
  const faqs = (content.faqs || []).filter((f) => f && f.question);

  return (
    <section id="faq" className="py-20 md:py-28 bg-zinc-950 scroll-mt-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <EditableArea section="faq" label="FAQ" data={content}>
          <div className="text-center mb-12">
            <p className="text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] text-zinc-400 mb-3">Questions</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
              {content.title}
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <details key={index} className="group bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden transition-all duration-200 open:border-zinc-600">
                <summary className="flex items-center justify-between gap-4 px-5 md:px-6 py-4 md:py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                  <span className="text-sm md:text-base font-black text-white">
                    {faq.question}
                  </span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 text-zinc-400 transition-transform duration-300 group-open:rotate-180">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </summary>
                <div className="px-5 md:px-6 pb-5 md:pb-6">
                  <p className="text-xs md:text-sm text-zinc-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </EditableArea>
      </div>
    </section>
  );
}

export default FAQSection;
