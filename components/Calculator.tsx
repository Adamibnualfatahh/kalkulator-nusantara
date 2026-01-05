import React, { useState, useEffect } from 'react';
import { UserData, Gender, ActivityLevel, TabType, CalculationResult, SugarCondition } from '../types';
import { calculateAll } from '../utils';
import InputSection from './InputSection';
import ResultCards from './ResultCards';
import Navbar from './Navbar';

interface CalculatorProps {
  initialTab?: TabType;
  onNavigate: (page: string, tab?: TabType) => void;
}

const Calculator: React.FC<CalculatorProps> = ({ initialTab, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<TabType>('bmi');

  // Initialize with default values, will be overwritten by useEffect if localStorage exists
  const [userData, setUserData] = useState<UserData>({
    height: 170,
    weight: 65,
    age: 25,
    gender: Gender.Male,
    activityLevel: ActivityLevel.Moderate,
    sugarValue: 100,
    sugarCondition: SugarCondition.Random,
    waistCircumference: 80
  });

  const [result, setResult] = useState<CalculationResult>(calculateAll(userData));

  // Load from LocalStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('kkn_userData');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setUserData(prev => ({ ...prev, ...parsed }));
      } catch (e) {
        console.error("Failed to load user data", e);
      }
    }
  }, []);

  // Save to LocalStorage whenever userData changes
  useEffect(() => {
    localStorage.setItem('kkn_userData', JSON.stringify(userData));
  }, [userData]);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  useEffect(() => {
    setResult(calculateAll(userData));
  }, [userData]);

  const tabs: { id: TabType; label: string; icon: string }[] = [
    { id: 'bmi', label: 'BMI', icon: 'monitor_weight' },
    { id: 'bmr', label: 'Kalori & BMR', icon: 'local_fire_department' },
    { id: 'ideal', label: 'Berat Ideal', icon: 'track_changes' },
    { id: 'sugar', label: 'Gula Darah', icon: 'bloodtype' },
    { id: 'bmi_elderly', label: 'IMT Lansia', icon: 'elderly' },
    { id: 'waist', label: 'Lingkar Perut', icon: 'straighten' }
  ];

  return (
    <div className="flex flex-col font-display bg-background-light text-slate-900 min-h-screen">

      {/* Header */}
      <Navbar onNavigate={onNavigate} />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-background-light pt-10 pb-6 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary-dark text-xs font-bold uppercase tracking-wider mb-4">
            <span className="material-symbols-outlined text-sm">verified</span>
            Gratis & Tanpa Login
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 leading-tight">
            Cek Kesehatan Tubuhmu <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-dark">Standar Nusantara</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            Hitung BMI, Gula Darah, dan indikator kesehatan lainnya dengan standar Indonesia.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-grow px-4 pb-20">
        <div className="max-w-6xl mx-auto">

          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-white p-1.5 rounded-2xl shadow-sm border border-slate-100 overflow-x-auto max-w-full">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap
                    ${activeTab === tab.id
                      ? 'bg-primary text-slate-900 shadow-md shadow-primary/20'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'}
                  `}
                >
                  <span className={`material-symbols-outlined text-[20px] ${activeTab === tab.id ? 'filled-icon' : ''}`}>
                    {tab.icon}
                  </span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Calculator Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

            {/* Left: Inputs */}
            <div className="lg:col-span-7 xl:col-span-8">
              <InputSection userData={userData} onChange={setUserData} activeTab={activeTab} />
            </div>

            {/* Right: Results (Sticky) */}
            <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-24 h-auto min-h-[400px]">
              <ResultCards result={result} activeTab={activeTab} />
            </div>

          </div>

          {/* Info Section */}
          <div className="mt-20 grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-100">
              <div className="size-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                <span className="material-symbols-outlined">science</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Rumus Medis Valid</h3>
              <p className="text-sm text-slate-500">Menggunakan standar WHO dan Kemenkes RI untuk akurasi perhitungan.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-100">
              <div className="size-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                <span className="material-symbols-outlined">lock</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Privasi Aman</h3>
              <p className="text-sm text-slate-500">Semua perhitungan dilakukan di browser Anda. Tidak ada data yang dikirim ke server.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-100">
              <div className="size-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-4">
                <span className="material-symbols-outlined">bolt</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Hasil Instan</h3>
              <p className="text-sm text-slate-500">Dapatkan analisa kesehatan lengkap hanya dalam hitungan detik.</p>
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-[#112116] border-t border-[#e7f3eb] dark:border-[#2a4030] py-12 px-10">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between gap-8">
          <div className="flex flex-col gap-4 max-w-[300px]">
            <div className="flex items-center gap-2 text-[#0e1b12] dark:text-white">
              <span className="material-symbols-outlined text-primary text-2xl">health_and_safety</span>
              <span className="font-bold text-lg">KalkulatorNusantara</span>
            </div>
            <p className="text-sm text-[#4e5d52] dark:text-gray-400">
              Membantu masyarakat Indonesia hidup lebih sehat dengan alat yang sederhana dan gratis.
            </p>
          </div>
          <div className="flex flex-wrap gap-12">
            <div className="flex flex-col gap-3">
              <h4 className="text-sm font-bold text-[#0e1b12] dark:text-white uppercase tracking-wider">Alat</h4>
              <button onClick={() => onNavigate('calculator', 'bmi')} className="text-left text-sm text-[#4e5d52] dark:text-gray-400 hover:text-primary transition-colors">BMI Kalkulator</button>
              <button onClick={() => onNavigate('calculator', 'bmr')} className="text-left text-sm text-[#4e5d52] dark:text-gray-400 hover:text-primary transition-colors">Kebutuhan Kalori</button>
              <button onClick={() => onNavigate('calculator', 'ideal')} className="text-left text-sm text-[#4e5d52] dark:text-gray-400 hover:text-primary transition-colors">Cek Ideal Berat</button>
            </div>
            <div className="flex flex-col gap-3">
              <h4 className="text-sm font-bold text-[#0e1b12] dark:text-white uppercase tracking-wider">Info</h4>
              <button onClick={() => onNavigate('about')} className="text-left text-sm text-[#4e5d52] dark:text-gray-400 hover:text-primary transition-colors">Tentang Kami</button>
            </div>
          </div>
        </div>
        <div className="max-w-[1200px] mx-auto mt-12 pt-8 border-t border-[#f0f0f0] dark:border-[#2a4030] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm mb-4 md:mb-0">
            © 2026 KalkulatorNusantara. Dibuat oleh Adam Ibnu Alfatah.
          </p>
          <div className="flex gap-6">
            {/* Social media links or other footer elements can go here */}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Calculator;