import React, { useState, useMemo } from 'react';
import Navbar from './Navbar';
import { TabType } from '../types';
import { foodData, FoodCategory, FoodRecommendation } from '../data/foodData';

interface FoodListProps {
    onNavigate: (page: string, tab?: TabType) => void;
}

const FoodList: React.FC<FoodListProps> = ({ onNavigate }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<FoodCategory | 'Semua'>('Semua');
    const [selectedGoal, setSelectedGoal] = useState<FoodRecommendation | 'Semua'>('Semua');

    const categories: (FoodCategory | 'Semua')[] = ['Semua', 'Makanan Berat', 'Jajanan', 'Minuman', 'Buah & Sayur', 'Lauk Pauk'];
    const goals: (FoodRecommendation | 'Semua')[] = ['Semua', 'Bulking', 'Diet', 'Netral'];

    const filteredFoods = useMemo(() => {
        return foodData.filter((food) => {
            const matchesSearch = food.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === 'Semua' || food.category === selectedCategory;
            const matchesGoal = selectedGoal === 'Semua' || food.recommendation === selectedGoal;
            return matchesSearch && matchesCategory && matchesGoal;
        });
    }, [searchQuery, selectedCategory, selectedGoal]);

    return (
        <div className="flex flex-col min-h-screen bg-background-light font-display text-slate-900">
            <Navbar onNavigate={onNavigate} />

            <main className="flex-grow w-full max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12">
                <div className="mb-8">
                    <button
                        onClick={() => onNavigate('about')}
                        className="flex items-center gap-2 text-primary font-bold hover:underline mb-4"
                    >
                        <span className="material-symbols-outlined">arrow_back</span>
                        Kembali
                    </button>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-black mb-2 text-[#0e1b12]">Daftar Makanan Indonesia</h1>
                            <p className="text-slate-500 text-lg">Estimasi kalori & nutrisi makanan harian nusantara.</p>
                        </div>

                        {/* Search Input */}
                        <div className="w-full md:w-auto relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400">search</span>
                            <input
                                type="text"
                                placeholder="Cari makanan (misal: Soto)"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full md:w-[300px] pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                            />
                        </div>
                    </div>

                    {/* Filters Container */}
                    <div className="flex flex-col gap-4 mb-8">
                        {/* Goal Filters */}
                        <div className="flex flex-col gap-2">
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Rekomendasi</h3>
                            <div className="flex flex-wrap gap-2">
                                {goals.map((goal) => (
                                    <button
                                        key={goal}
                                        onClick={() => setSelectedGoal(goal)}
                                        className={`px-4 py-2 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${selectedGoal === goal
                                            ? goal === 'Bulking' ? 'bg-orange-600 text-white shadow-lg shadow-orange-200'
                                                : goal === 'Diet' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200'
                                                    : goal === 'Netral' ? 'bg-slate-600 text-white shadow-lg'
                                                        : 'bg-[#0e1b12] text-white shadow-lg'
                                            : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                                            }`}
                                    >
                                        {goal === 'Bulking' && <span className="material-symbols-outlined text-lg">fitness_center</span>}
                                        {goal === 'Diet' && <span className="material-symbols-outlined text-lg">spa</span>}
                                        {goal}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Category Filters */}
                        <div className="flex flex-col gap-2">
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Kategori</h3>
                            <div className="flex flex-wrap gap-2">
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => setSelectedCategory(category)}
                                        className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${selectedCategory === category
                                            ? 'bg-[#0e1b12] text-white shadow-lg'
                                            : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                                            }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Results Count */}
                    <div className="mb-4 text-sm text-slate-500 font-medium flex items-center justify-between">
                        <span>Menampilkan {filteredFoods.length} makanan</span>
                        {(selectedCategory !== 'Semua' || selectedGoal !== 'Semua' || searchQuery) && (
                            <button
                                onClick={() => {
                                    setSearchQuery('');
                                    setSelectedCategory('Semua');
                                    setSelectedGoal('Semua');
                                }}
                                className="text-primary text-xs font-bold hover:underline"
                            >
                                Reset Filter
                            </button>
                        )}
                    </div>

                    {/* Food Grid */}
                    {filteredFoods.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredFoods.map((food) => (
                                <div key={food.id} className="group bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 relative overflow-hidden">
                                    {/* Recommendation Badge */}
                                    <div className={`absolute top-0 right-0 px-3 py-1 rounded-bl-xl text-[10px] font-bold uppercase tracking-wider ${food.recommendation === 'Bulking' ? 'bg-orange-100 text-orange-700' :
                                            food.recommendation === 'Diet' ? 'bg-emerald-100 text-emerald-700' :
                                                'bg-slate-100 text-slate-500'
                                        }`}>
                                        {food.recommendation}
                                    </div>

                                    <div className="flex justify-between items-start mb-3 mt-2">
                                        <div>
                                            <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider mb-2 ${food.category === 'Makanan Berat' ? 'bg-amber-100 text-amber-800' :
                                                food.category === 'Jajanan' ? 'bg-purple-100 text-purple-700' :
                                                    food.category === 'Minuman' ? 'bg-sky-100 text-sky-700' :
                                                        food.category === 'Buah & Sayur' ? 'bg-lime-100 text-lime-700' :
                                                            'bg-slate-100 text-slate-700'
                                                }`}>
                                                {food.category}
                                            </span>
                                            <h3 className="font-bold text-lg text-[#0e1b12] leading-tight pr-8">{food.name}</h3>
                                            <p className="text-sm text-slate-500 mt-1">
                                                {food.serving} <span className="text-slate-400">({food.grams}g)</span>
                                            </p>
                                        </div>
                                        <div className="flex flex-col items-end pt-6">
                                            <span className="text-2xl font-black text-primary">{food.calories}</span>
                                            <span className="text-xs text-slate-400 font-bold">kkal</span>
                                        </div>
                                    </div>

                                    {/* Macros */}
                                    <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100">
                                        <div className="text-center">
                                            <p className="text-[10px] text-slate-400 uppercase font-bold">Protein</p>
                                            <p className="text-sm font-bold text-slate-700">{food.protein}g</p>
                                        </div>
                                        <div className="text-center border-l border-slate-100">
                                            <p className="text-[10px] text-slate-400 uppercase font-bold">Karbo</p>
                                            <p className="text-sm font-bold text-slate-700">{food.carbs}g</p>
                                        </div>
                                        <div className="text-center border-l border-slate-100">
                                            <p className="text-[10px] text-slate-400 uppercase font-bold">Lemak</p>
                                            <p className="text-sm font-bold text-slate-700">{food.fat}g</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <div className="size-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-400">
                                <span className="material-symbols-outlined text-3xl">search_off</span>
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-1">Tidak ditemukan</h3>
                            <p className="text-slate-500">Coba atur ulang filter atau cari dengan kata kunci lain.</p>
                            <button
                                onClick={() => {
                                    setSearchQuery('');
                                    setSelectedCategory('Semua');
                                    setSelectedGoal('Semua');
                                }}
                                className="mt-4 px-6 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-colors"
                            >
                                Reset Filter
                            </button>
                        </div>
                    )}
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
                    </div>
                </div>
                <div className="max-w-[1200px] mx-auto mt-12 pt-8 border-t border-[#f0f0f0] dark:border-[#2a4030] flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-[#8e9d92] dark:text-gray-500">© 2026 KalkulatorNusantara. Dibuat oleh Adam Ibnu Alfatah.</p>
                </div>
            </footer>
        </div>
    );
};

export default FoodList;
