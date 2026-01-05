import React from 'react';
import { CalculationResult, TabType } from '../types';

interface ResultProps {
  result: CalculationResult;
  activeTab: TabType;
}

const ResultCards: React.FC<ResultProps> = ({ result, activeTab }) => {

  const handleShare = () => {
    let text = `Hasil Cek Kesehatan (${activeTab.toUpperCase()}):\n`;

    if (activeTab === 'bmi') {
      text += `BMI: ${result.bmi}\nKategori: ${result.bmiCategory}\n${result.bmiAdvice}`;
    } else if (activeTab === 'bmr') {
      text += `BMR: ${result.bmr} kkal\nTDEE: ${result.tdee} kkal`;
    } else if (activeTab === 'ideal') {
      text += `Berat Ideal: ${result.idealWeightMin} - ${result.idealWeightMax} kg`;
    } else if (activeTab === 'sugar') {
      text += `Gula Darah: ${result.sugarStatus}\nSaran: ${result.sugarAdvice}`;
    } else if (activeTab === 'bmi_elderly') {
      text += `IMT Lansia: ${result.bmi}\nKategori: ${result.elderlyBmiCategory}\n${result.elderlyBmiAdvice}`;
    } else if (activeTab === 'waist') {
      text += `Lingkar Perut: ${result.waistStatus} (${result.waistRisk})\n${result.waistAdvice}`;
    }

    text += `\n\nCek kesehatanmu di KalkulatorNusantara!`;

    navigator.clipboard.writeText(text);
    alert('Hasil disalin ke clipboard!');
  };

  const ShareButton = () => (
    <button
      onClick={handleShare}
      className="mt-6 flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-colors text-sm"
    >
      <span className="material-symbols-outlined">share</span>
      Bagikan Hasil
    </button>
  );

  const Disclaimer = () => (
    <p className="mt-4 text-[10px] text-slate-400 text-center leading-tight">
      *Tidak menggantikan diagnosis medis. Gunakan sebagai alat bantu edukasi.
    </p>
  );

  if (activeTab === 'sugar') {
    return (
      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-md border border-slate-100 flex flex-col items-center text-center relative overflow-hidden h-full justify-center">
        <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl -mr-10 -mt-10 ${result.sugarColor ? result.sugarColor.replace('text-', 'bg-').replace('500', '100').replace('600', '100') : 'bg-slate-100'}`}></div>

        <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-xs font-bold uppercase tracking-wider mb-4">
          Status Gula Darah
        </span>

        <div className={`text-4xl font-black mb-2 ${result.sugarColor}`}>
          {result.sugarStatus}
        </div>

        <div className="w-full bg-slate-50 rounded-xl p-4 border-l-4 border-slate-300 text-left mt-4 mb-2">
          <p className="text-sm font-bold text-slate-800 mb-1">Catatan</p>
          <p className="text-sm text-slate-600 leading-relaxed">
            {result.sugarAdvice}
          </p>
        </div>

        <ShareButton />
        <Disclaimer />
      </div>
    );
  }

  if (activeTab === 'bmi_elderly') {
    return (
      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-md border border-slate-100 flex flex-col items-center text-center relative overflow-hidden h-full justify-center">
        {result.isElderly ? (
          <>
            <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-xs font-bold uppercase tracking-wider mb-4">
              IMT Khusus Lansia
            </span>

            <div className="text-6xl font-black text-slate-900 mb-2">
              {result.bmi}
            </div>

            <div className={`px-4 py-2 rounded-full font-bold text-sm mb-6 ${result.elderlyBmiColor?.replace('text-', 'bg-').replace('500', '100')} ${result.elderlyBmiColor}`}>
              {result.elderlyBmiCategory}
            </div>

            <div className="w-full bg-slate-50 rounded-xl p-4 border-l-4 border-primary text-left">
              <p className="text-sm font-bold text-slate-800 mb-1">Rekomendasi Lansia</p>
              <p className="text-sm text-slate-600 leading-relaxed">
                {result.elderlyBmiAdvice}
              </p>
            </div>
            <ShareButton />
            <Disclaimer />
          </>
        ) : (
          <div className="text-slate-400">
            <span className="material-symbols-outlined text-4xl mb-2">elderly</span>
            <p>Masukkan usia 60 tahun ke atas untuk melihat hasil.</p>
          </div>
        )}
      </div>
    );
  }

  if (activeTab === 'waist') {
    return (
      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-md border border-slate-100 flex flex-col items-center text-center relative overflow-hidden h-full justify-center">
        <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-xs font-bold uppercase tracking-wider mb-4">
          Analisa Lingkar Perut
        </span>

        <div className={`text-3xl font-black mb-2 ${result.waistColor}`}>
          {result.waistStatus}
        </div>
        <div className="text-sm font-bold text-slate-500 mb-6">
          {result.waistRisk}
        </div>

        <div className="w-full bg-slate-50 rounded-xl p-4 border-l-4 border-primary text-left">
          <p className="text-sm font-bold text-slate-800 mb-1">Info Kesehatan</p>
          <p className="text-sm text-slate-600 leading-relaxed">
            {result.waistAdvice}
          </p>
        </div>

        <ShareButton />
        <Disclaimer />
      </div>
    );
  }

  // Existing Cards with Share Button Update
  if (activeTab === 'bmi') {
    return (
      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-md border border-slate-100 flex flex-col items-center text-center relative overflow-hidden h-full justify-center">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-10 -mt-10"></div>

        <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-xs font-bold uppercase tracking-wider mb-4">
          Indeks Massa Tubuh
        </span>

        <div className="text-6xl font-black text-slate-900 mb-2">
          {result.bmi}
        </div>

        <div className={`px-4 py-2 rounded-full font-bold text-sm mb-6 ${result.bmiColor.replace('text-', 'bg-').replace('500', '100')} ${result.bmiColor}`}>
          {result.bmiCategory}
        </div>

        <div className="w-full bg-slate-50 rounded-xl p-4 border-l-4 border-primary text-left">
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-primary mt-1">tips_and_updates</span>
            <div>
              <p className="text-sm font-bold text-slate-800 mb-1">Catatan Singkat</p>
              <p className="text-sm text-slate-600 leading-relaxed">
                {result.bmiAdvice}
              </p>
            </div>
          </div>
        </div>
        <ShareButton />
        <Disclaimer />
      </div>
    );
  }

  if (activeTab === 'bmr') {
    return (
      <div className="flex flex-col gap-6 h-full">
        {/* BMR Card */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 md:p-8 text-white relative overflow-hidden shadow-lg">
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/20 rounded-full blur-2xl -ml-5 -mb-5"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2 text-primary">
              <span className="material-symbols-outlined">local_fire_department</span>
              <span className="text-sm font-bold uppercase tracking-wider">BMR (Basal Metabolic Rate)</span>
            </div>
            <div className="flex items-baseline gap-2 mb-4">
              <h3 className="text-5xl font-black">{result.bmr}</h3>
              <span className="text-lg text-slate-400 font-medium">kkal/hari</span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              Energi minimal yang dibakar tubuh Anda saat istirahat total (tidur/rebahan) untuk fungsi vital.
            </p>
          </div>
        </div>

        {/* TDEE Card */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100 relative overflow-hidden flex-1">
          <div className="flex items-center gap-2 mb-2 text-orange-500">
            <span className="material-symbols-outlined">directions_run</span>
            <span className="text-sm font-bold uppercase tracking-wider">Kebutuhan Harian (TDEE)</span>
          </div>
          <div className="flex items-baseline gap-2 mb-4">
            <h3 className="text-5xl font-black text-slate-900">{result.tdee}</h3>
            <span className="text-lg text-slate-500 font-medium">kkal/hari</span>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed mb-4">
            Total kalori yang dibutuhkan berdasarkan tingkat aktivitas Anda untuk mempertahankan berat badan saat ini.
          </p>

          <ShareButton />
          <Disclaimer />
        </div>
      </div>
    );
  }

  if (activeTab === 'ideal') {
    return (
      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-md border border-slate-100 flex flex-col items-center text-center relative overflow-hidden h-full justify-center">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent-brown/10 rounded-full blur-3xl"></div>

        <div className="size-16 bg-green-50 rounded-full flex items-center justify-center text-primary mb-6">
          <span className="material-symbols-outlined text-3xl">accessibility_new</span>
        </div>

        <h3 className="text-xl font-bold text-slate-800 mb-1">Berat Badan Ideal</h3>
        <p className="text-sm text-slate-500 mb-8">Rumus Broca (Indonesia)</p>

        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="text-center">
            <div className="text-5xl font-black text-primary">
              {result.idealWeightMin} - {result.idealWeightMax}
            </div>
            <span className="text-lg font-bold text-slate-400">kg</span>
          </div>
        </div>

        <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 text-left w-full">
          <p className="text-sm text-orange-800 font-medium mb-1">💡 Fakta Menarik</p>
          <p className="text-xs text-orange-700/80 leading-relaxed">
            Rumus Broca dimodifikasi untuk postur tubuh orang Indonesia yang umumnya memiliki massa tulang berbeda dengan orang Eropa.
          </p>
        </div>
        <ShareButton />
        <Disclaimer />
      </div>
    );
  }

  return null;
};

export default ResultCards;