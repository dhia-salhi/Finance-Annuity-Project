import React, { useState, useEffect } from 'react';
import { LoanParams, SimulationResult } from './types';
import { calculateLoan, formatCurrency } from './utils/financial';
import Calculator from './components/Calculator';
import AmortizationTable from './components/AmortizationTable';
import LoanChart from './components/LoanChart';
import { GraduationCap, Landmark, Calculator as CalcIcon } from 'lucide-react';

const App: React.FC = () => {
  const [result, setResult] = useState<SimulationResult | null>(null);

  // Initial calculation on mount
  useEffect(() => {
    handleCalculate({
      capital: 10000,
      rate: 5,
      duration: 5
    });
  }, []);

  const handleCalculate = (params: LoanParams) => {
    const res = calculateLoan(params);
    setResult(res);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-blue-700 text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-lg">
              <Landmark size={28} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold tracking-tight">Les Annuités</h1>
              <p className="text-xs md:text-sm text-blue-100 font-light">Projet Emprunts Indivis</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 text-sm bg-blue-800/50 py-1 px-3 rounded-full">
            <GraduationCap size={16} />
            <span>Mathématiques Financières</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-6xl mx-auto space-y-8">
          
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-slate-800 mb-3">Simulateur d'Emprunt</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Calculez instantanément vos annuités constantes et visualisez la répartition entre le capital et les intérêts grâce à notre outil interactif.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Left Column: Calculator */}
            <div className="md:col-span-5 lg:col-span-4 sticky top-24">
              <Calculator onCalculate={handleCalculate} />
              
              {/* Summary Card (Visible only when result exists) */}
              {result && (
                <div className="mt-6 bg-blue-600 rounded-xl p-6 text-white shadow-lg">
                  <h3 className="text-lg font-semibold mb-4 border-b border-blue-400 pb-2">Résumé</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-blue-100">Annuité Constante</span>
                      <span className="text-xl font-bold">{result.schedule.length > 0 ? formatCurrency(result.schedule[0].annuity) : '-'}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-100">Coût Total Intérêts</span>
                      <span className="font-medium text-amber-300">{formatCurrency(result.totalInterest)}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Charts & Table */}
            <div className="md:col-span-7 lg:col-span-8 space-y-8">
              {result ? (
                <>
                  <LoanChart result={result} />
                  <AmortizationTable schedule={result.schedule} />
                </>
              ) : (
                <div className="bg-white p-12 rounded-xl border-2 border-dashed border-slate-300 text-center text-slate-400">
                  <CalcIcon size={48} className="mx-auto mb-4 opacity-50" />
                  <p className="text-lg">Entrez les paramètres et cliquez sur calculer pour voir les résultats.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-2 font-medium text-white">Projet Finance</p>
          <div className="w-16 h-1 bg-blue-600 mx-auto mb-4 rounded-full"></div>
          <p className="text-sm">
            © 2026 - Projet réalisé par <span className="text-white font-bold">DHIA SALHI</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;