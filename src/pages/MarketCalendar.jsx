import React from 'react';
import { useNavigate } from 'react-router-dom';

function MarketCalendar() {
  const navigate = useNavigate();

  return (
    <div className="pt-16 md:pt-24 min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-100 px-3 md:px-4 py-6 md:py-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-4 md:p-8 border border-zinc-200 mb-4 md:mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-tight text-zinc-900 mb-1 md:mb-2">
                Economic Calendar
              </h1>
              <p className="text-sm md:text-base text-zinc-600">
                Stay updated with upcoming economic events and market news
              </p>
            </div>
            <button
              onClick={() => navigate(-1)}
              className="w-full md:w-auto bg-zinc-100 text-zinc-900 px-4 md:px-6 py-2 md:py-3 rounded-xl text-xs md:text-sm font-black uppercase tracking-wider hover:bg-zinc-200 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>

        {/* Calendar Widget */}
        <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 border border-zinc-200">
          <div className="w-full overflow-auto rounded-xl">
            <iframe
              src="https://sslecal2.investing.com?columns=exc_flags,exc_currency,exc_importance,exc_actual,exc_forecast,exc_previous&features=datepicker,timezone&countries=25,32,6,37,72,22,17,39,14,10,35,43,56,36,110,11,26,12,4,5&calType=week&timeZone=15&lang=1"
              width="750"
              height="500"
              frameBorder="0"
              allowTransparency="true"
              marginWidth="0"
              marginHeight="0"
              className="mx-auto"
            ></iframe>
          </div>
          <div className="mt-4 text-xs text-zinc-500 text-center">
            Economic calendar powered by Investing.com
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-4 md:gap-6 mt-4 md:mt-6">
          <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 border border-zinc-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <h3 className="text-sm md:text-base font-black uppercase tracking-wider text-zinc-900">
                High Impact
              </h3>
            </div>
            <p className="text-xs md:text-sm text-zinc-600">
              Events that typically cause significant market volatility
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 border border-zinc-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <h3 className="text-sm md:text-base font-black uppercase tracking-wider text-zinc-900">
                Medium Impact
              </h3>
            </div>
            <p className="text-xs md:text-sm text-zinc-600">
              Events with moderate potential for market movement
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 border border-zinc-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <h3 className="text-sm md:text-base font-black uppercase tracking-wider text-zinc-900">
                Low Impact
              </h3>
            </div>
            <p className="text-xs md:text-sm text-zinc-600">
              Events with minimal expected market impact
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MarketCalendar;
