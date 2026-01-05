import React from 'react';
import Navbar from './Navbar';
import { TabType } from '../types';

interface DisclaimerProps {
    onNavigate: (page: string, tab?: TabType) => void;
}

const Disclaimer: React.FC<DisclaimerProps> = ({ onNavigate }) => {
    return (
        <div className="flex flex-col min-h-screen bg-background-light font-display text-slate-900">
            <Navbar onNavigate={onNavigate} />

            <main className="flex-grow w-full max-w-4xl mx-auto px-6 py-12">
                <div className="mb-8">
                    <button
                        onClick={() => onNavigate('about')}
                        className="flex items-center gap-2 text-primary font-bold hover:underline mb-4"
                    >
                        <span className="material-symbols-outlined">arrow_back</span>
                        Kembali
                    </button>
                    <h1 className="text-3xl font-black mb-6">Disclaimer & Syarat Ketentuan</h1>

                    <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
                        <section>
                            <h2 className="text-xl font-bold mb-3">1. Tujuan Informasi</h2>
                            <p className="text-slate-600 leading-relaxed">
                                Segala informasi dan hasil perhitungan yang disajikan dalam KalkulatorNusantara.id ditujukan hanya untuk keperluan edukasi dan informasi umum. Aplikasi ini tidak dirancang untuk memberikan nasihat medis, diagnosis, atau rencana perawatan.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold mb-3">2. Bukan Pengganti Medis</h2>
                            <p className="text-slate-600 leading-relaxed">
                                Hasil perhitungan BMI, kalori, atau indikator lainnya adalah estimasi kasar. Jangan pernah menjadikan hasil ini sebagai dasar tunggal untuk mengubah pola makan, aktivitas fisik, atau pengobatan Anda tanpa berkonsultasi dengan dokter atau ahli gizi profesional.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold mb-3">3. Akurasi Data</h2>
                            <p className="text-slate-600 leading-relaxed">
                                Kami berupaya menggunakan rumus standar yang diakui secara internasional dan nasional (Kemenkes RI/WHO). Namun, variasi individu seperti massa otot, kepadatan tulang, dan kondisi kesehatan tertentu dapat mempengaruhi akurasi hasil.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold mb-3">4. Privasi Data</h2>
                            <p className="text-slate-600 leading-relaxed">
                                Kami sangat menghargai privasi Anda. Kalkulator ini bekerja sepenuhnya di sisi klien (browser). Kami tidak menyimpan, merekam, atau mengirimkan data input kesehatan Anda ke server mana pun.
                            </p>
                        </section>
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
                    </div>
                </div>
                <div className="max-w-[1200px] mx-auto mt-12 pt-8 border-t border-[#f0f0f0] dark:border-[#2a4030] flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-[#8e9d92] dark:text-gray-500">© 2026 KalkulatorNusantara. Dibuat oleh Adam Ibnu Alfatah.</p>
                </div>
            </footer>
        </div>
    );
};

export default Disclaimer;
