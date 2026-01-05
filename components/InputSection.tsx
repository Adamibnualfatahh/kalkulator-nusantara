import React from 'react';
import { UserData, Gender, ActivityLevel, TabType, SugarCondition } from '../types';

interface InputSectionProps {
  userData: UserData;
  onChange: (data: UserData) => void;
  activeTab: TabType;
}

const InputSection: React.FC<InputSectionProps> = ({ userData, onChange, activeTab }) => {

  const handleChange = (field: keyof UserData, value: string | number) => {
    onChange({
      ...userData,
      [field]: value
    });
  };

  const showGender = ['bmi', 'bmr', 'ideal', 'bmi_elderly', 'waist'].includes(activeTab);
  const showHeight = ['bmi', 'bmr', 'ideal', 'bmi_elderly'].includes(activeTab);
  const showWeight = ['bmi', 'bmr', 'bmi_elderly'].includes(activeTab);
  const showAge = ['bmi', 'bmr', 'bmi_elderly'].includes(activeTab); // BMI standard technically uses age for children/teens but here we might just keep it.
  const showActivity = ['bmr'].includes(activeTab);
  const showSugar = ['sugar'].includes(activeTab);
  const showWaist = ['waist'].includes(activeTab);

  return (
    <div className="flex flex-col gap-6 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100">
      <div className="flex items-center gap-3 mb-2">
        <span className="material-symbols-outlined text-accent-brown text-3xl">edit_note</span>
        <h3 className="text-xl font-bold text-slate-800">
          {activeTab === 'sugar' ? 'Input Gula Darah' :
            activeTab === 'waist' ? 'Ukuran Lingkar Perut' :
              'Data Diri'}
        </h3>
      </div>

      {/* Warning for Elderly BMI */}
      {activeTab === 'bmi_elderly' && userData.age < 60 && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-xl flex items-start gap-3">
          <span className="material-symbols-outlined text-yellow-600 mt-0.5">warning</span>
          <p className="text-sm">Fitur ini khusus untuk usia 60 tahun ke atas.</p>
        </div>
      )}

      {/* Sugar Inputs */}
      {showSugar && (
        <>
          <div className="flex flex-col gap-3">
            <label className="text-sm font-semibold text-slate-700">Kondisi Pengukuran</label>
            <select
              className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all cursor-pointer"
              value={userData.sugarCondition}
              onChange={(e) => handleChange('sugarCondition', e.target.value as SugarCondition)}
            >
              <option value={SugarCondition.Fasting}>Puasa (Tidak makan 8 jam)</option>
              <option value={SugarCondition.AfterMeal}>2 Jam Setelah Makan</option>
              <option value={SugarCondition.Random}>Sewaktu (Kapan saja)</option>
            </select>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-end">
              <label className="text-sm font-semibold text-slate-700">Kadar Gula Darah</label>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-primary">{userData.sugarValue}</span>
                <span className="text-sm font-medium text-slate-500">mg/dL</span>
              </div>
            </div>
            <input
              type="range"
              min="20"
              max="600"
              value={userData.sugarValue || 0}
              onChange={(e) => handleChange('sugarValue', parseInt(e.target.value))}
              className="w-full accent-primary"
            />
            <div className="flex justify-between text-xs text-slate-400 font-medium px-1">
              <span>Rendah</span>
              <span>100</span>
              <span>200</span>
              <span>300</span>
              <span>Tinggi</span>
            </div>
          </div>
        </>
      )}

      {/* Gender */}
      {showGender && (
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-slate-700">Jenis Kelamin</label>
          <div className="flex w-full rounded-xl bg-slate-50 p-1.5 border border-slate-200">
            <label className="cursor-pointer relative flex-1">
              <input
                type="radio"
                name="gender"
                className="peer sr-only"
                checked={userData.gender === Gender.Male}
                onChange={() => handleChange('gender', Gender.Male)}
              />
              <div className="flex h-12 items-center justify-center gap-2 rounded-lg text-slate-500 peer-checked:bg-white peer-checked:shadow-sm peer-checked:text-primary-dark transition-all duration-200">
                <span className="material-symbols-outlined">male</span>
                <span className="text-sm font-bold">Pria</span>
              </div>
            </label>
            <label className="cursor-pointer relative flex-1">
              <input
                type="radio"
                name="gender"
                className="peer sr-only"
                checked={userData.gender === Gender.Female}
                onChange={() => handleChange('gender', Gender.Female)}
              />
              <div className="flex h-12 items-center justify-center gap-2 rounded-lg text-slate-500 peer-checked:bg-white peer-checked:shadow-sm peer-checked:text-primary-dark transition-all duration-200">
                <span className="material-symbols-outlined">female</span>
                <span className="text-sm font-bold">Wanita</span>
              </div>
            </label>
          </div>
        </div>
      )}

      {/* Sliders for Height, Weight, Age */}
      <div className="grid grid-cols-1 gap-6">

        {/* Waist Circumference */}
        {showWaist && (
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-end">
              <label className="text-sm font-semibold text-slate-700">Lingkar Perut</label>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-primary">{userData.waistCircumference}</span>
                <span className="text-sm font-medium text-slate-500">cm</span>
              </div>
            </div>
            <input
              type="range"
              min="40"
              max="200"
              value={userData.waistCircumference || 0}
              onChange={(e) => handleChange('waistCircumference', parseInt(e.target.value))}
              className="w-full accent-primary"
            />
          </div>
        )}

        {/* Height */}
        {showHeight && (
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-end">
              <label className="text-sm font-semibold text-slate-700">Tinggi Badan</label>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-primary">{userData.height}</span>
                <span className="text-sm font-medium text-slate-500">cm</span>
              </div>
            </div>
            <input
              type="range"
              min="100"
              max="220"
              value={userData.height}
              onChange={(e) => handleChange('height', parseInt(e.target.value))}
              className="w-full accent-primary"
            />
          </div>
        )}

        {/* Weight */}
        {showWeight && (
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-end">
              <label className="text-sm font-semibold text-slate-700">Berat Badan</label>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-primary">{userData.weight}</span>
                <span className="text-sm font-medium text-slate-500">kg</span>
              </div>
            </div>
            <input
              type="range"
              min="30"
              max="150"
              value={userData.weight}
              onChange={(e) => handleChange('weight', parseInt(e.target.value))}
              className="w-full accent-primary"
            />
          </div>
        )}

        {/* Age */}
        {showAge && (
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-end">
              <label className="text-sm font-semibold text-slate-700">Usia</label>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-primary">{userData.age}</span>
                <span className="text-sm font-medium text-slate-500">tahun</span>
              </div>
            </div>
            <input
              type="range"
              min={activeTab === 'bmi_elderly' ? 40 : 10}
              max={100}
              value={userData.age}
              onChange={(e) => handleChange('age', parseInt(e.target.value))}
              className="w-full accent-primary"
            />
            {activeTab === 'bmi_elderly' && (
              <p className="text-xs text-slate-400">Geser ke kanan untuk usia lansia (60+)</p>
            )}
          </div>
        )}

      </div>

      {/* Activity Level */}
      {showActivity && (
        <div className="flex flex-col gap-3 pt-2">
          <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">directions_run</span>
            Aktivitas Fisik
          </label>
          <select
            className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all cursor-pointer"
            value={userData.activityLevel}
            onChange={(e) => handleChange('activityLevel', e.target.value as ActivityLevel)}
          >
            <option value={ActivityLevel.Sedentary}>Rendah (Jarang Olahraga)</option>
            <option value={ActivityLevel.Moderate}>Sedang (1-3x / minggu)</option>
            <option value={ActivityLevel.Active}>Tinggi (Rutinitas Fisik Berat)</option>
          </select>
        </div>
      )}

    </div>
  );
};

export default InputSection;