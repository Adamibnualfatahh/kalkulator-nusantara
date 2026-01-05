import React from 'react';
import { TabType } from '../types';
import Navbar from './Navbar';

interface AboutProps {
  onNavigate: (page: string, tab?: TabType) => void;
}

const About: React.FC<AboutProps> = ({ onNavigate }) => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col font-display bg-background-light dark:bg-background-dark text-[#0e1b12] dark:text-white overflow-x-hidden">
      {/* Navbar */}
      <Navbar onNavigate={onNavigate} />

      {/* Main Content Wrapper */}
      <main className="flex-1 flex flex-col items-center">
        {/* Hero Section */}
        <section className="w-full max-w-[1200px] px-6 lg:px-10 py-12 lg:py-20">
          <div className="@container">
            <div className="flex flex-col-reverse lg:flex-row gap-10 items-center">
              <div className="flex flex-col gap-6 flex-1 text-center lg:text-left">
                <h1 className="text-[#0e1b12] dark:text-white text-4xl lg:text-6xl font-black leading-tight tracking-tight">
                  Sehat itu <span className="text-primary">Sederhana.</span>
                </h1>
                <p className="text-[#4e5d52] dark:text-gray-300 text-lg leading-relaxed max-w-[600px] mx-auto lg:mx-0">
                  Kami hadir untuk menjembatani dunia medis yang rumit dengan kehidupan sehari-hari masyarakat Indonesia. Tanpa biaya, tanpa login, dan menggunakan bahasa yang kita semua mengerti.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                  <button
                    onClick={() => onNavigate('calculator')}
                    className="flex items-center justify-center gap-2 rounded-full h-12 px-8 bg-[#0e1b12] dark:bg-white text-white dark:text-[#0e1b12] text-base font-bold shadow-lg hover:shadow-xl transition-all">
                    <span className="material-symbols-outlined">calculate</span>
                    <span>Coba Kalkulator</span>
                  </button>
                  <button
                    onClick={() => scrollToSection('philosophy')}
                    className="flex items-center justify-center gap-2 rounded-full h-12 px-8 bg-transparent border-2 border-[#e7f3eb] dark:border-[#2a4030] text-[#0e1b12] dark:text-white text-base font-bold hover:bg-[#e7f3eb] dark:hover:bg-[#2a4030] transition-colors">
                    <span>Baca Cerita Kami</span>
                  </button>
                </div>
              </div>
              <div className="flex-1 w-full max-w-[500px] lg:max-w-none">
                <div className="aspect-square w-full rounded-[2rem] bg-surface-warm dark:bg-[#1a2c20] relative overflow-hidden shadow-sm">
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-90"
                    data-alt="Illustration of healthy diverse Indonesian community smiling in a park"
                    style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBlaTItK-f5sARwL20HPm0KmK-uaBrraKFd0Xn7KAiZlDFMTccjZ2jW1dqEQVVNsTvf09My0FetFoToAgNu3hJorasL0G-jQ_JSZu4jM89UZJHLUoNj_kY994aM17C06izv0u_pXGY-devsZRZVgrnwQ9c-Zcj1Ks7yFaHa4dDJEQSfnih9oahT9sEFhuwNazoUQq_9c85C0nAzL2qglECPvd3PXjjqnx6rC6Iiiw1fpchEvQxPzHvTZVkWu5VRSqQA3m-gkwxqKWqo')" }}
                  >
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/90 dark:bg-black/60 backdrop-blur-sm rounded-xl border border-white/20">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-full bg-primary flex items-center justify-center text-[#0e1b12]">
                        <span className="material-symbols-outlined">favorite</span>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#0e1b12] dark:text-white">Dibuat dengan Hati</p>
                        <p className="text-xs text-[#4e5d52] dark:text-gray-300">Untuk kesehatan Indonesia</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy Section (Cards) */}
        <section id="philosophy" className="w-full bg-surface-warm dark:bg-[#1a2c20] py-16">
          <div className="w-full max-w-[1200px] px-6 lg:px-10 mx-auto">
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-4 text-center max-w-[720px] mx-auto">
                <h2 className="text-[#0e1b12] dark:text-white text-3xl font-bold leading-tight">Filosofi Kami</h2>
                <p className="text-[#4e5d52] dark:text-gray-300 text-base">Kami percaya kesehatan harus mudah diakses oleh siapa saja, kapan saja, dan di mana saja.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Card 1 */}
                <div className="group flex flex-col gap-4 rounded-2xl border border-[#e7f3eb] dark:border-[#2a4030] bg-white dark:bg-[#112116] p-8 transition-all hover:shadow-lg hover:-translate-y-1">
                  <div className="size-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary mb-2 group-hover:bg-primary group-hover:text-[#0e1b12] transition-colors">
                    <span className="material-symbols-outlined text-3xl">savings</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-[#0e1b12] dark:text-white text-xl font-bold">Gratis &amp; Terbuka</h3>
                    <p className="text-[#4e5d52] dark:text-gray-400 text-sm leading-relaxed">
                      Kesehatan adalah hak dasar. Semua fitur premium di tempat lain, kami berikan gratis tanpa biaya tersembunyi.
                    </p>
                  </div>
                </div>
                {/* Card 2 */}
                <div className="group flex flex-col gap-4 rounded-2xl border border-[#e7f3eb] dark:border-[#2a4030] bg-white dark:bg-[#112116] p-8 transition-all hover:shadow-lg hover:-translate-y-1">
                  <div className="size-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary mb-2 group-hover:bg-primary group-hover:text-[#0e1b12] transition-colors">
                    <span className="material-symbols-outlined text-3xl">no_accounts</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-[#0e1b12] dark:text-white text-xl font-bold">Tanpa Login</h3>
                    <p className="text-[#4e5d52] dark:text-gray-400 text-sm leading-relaxed">
                      Privasi Anda prioritas kami. Langsung gunakan kalkulator tanpa perlu mendaftar atau menyerahkan data email.
                    </p>
                  </div>
                </div>
                {/* Card 3 */}
                <div className="group flex flex-col gap-4 rounded-2xl border border-[#e7f3eb] dark:border-[#2a4030] bg-white dark:bg-[#112116] p-8 transition-all hover:shadow-lg hover:-translate-y-1">
                  <div className="size-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary mb-2 group-hover:bg-primary group-hover:text-[#0e1b12] transition-colors">
                    <span className="material-symbols-outlined text-3xl">school</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-[#0e1b12] dark:text-white text-xl font-bold">Bahasa Manusia</h3>
                    <p className="text-[#4e5d52] dark:text-gray-400 text-sm leading-relaxed">
                      Penjelasan yang membumi. Kami menghindari istilah medis yang membingungkan agar mudah dipahami semua orang.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cultural Connection Section */}
        <section className="w-full max-w-[1200px] px-6 lg:px-10 py-16 lg:py-24">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="w-full lg:w-1/2 order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden aspect-video shadow-xl">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  data-alt="Traditional Indonesian market scene with fresh vegetables and fruits"
                  style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDkDhDeakHjTPiWFIF1cmgrFH1LF36hS5z8MvzGVxU79vc1g7h3NINN0kI3moPKIllfrVwe8kkZ2Q8dFdVkLUgaJN0GcXH2-PhRdnkkIKb-wR2WxfxlnGp16dclzMAIWnGHKFUmu5IBZJrXqmV3laSMsWjD1_hoNPaf5ioMmK5hT_iRE_hH4eArfiiZuhRKYznC6SCqL3fcMtJ7s-yPp7Ur6_--yyBtvLRkjUve3pnMkBCvPziDu_S8IuVm0Q2MT-xbhOKF0cu6nliq')" }}
                >
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-accent-brown/80 to-transparent mix-blend-multiply"></div>
                <div className="absolute bottom-6 left-6 text-white max-w-[80%]">
                  <p className="font-bold text-lg mb-1">Dari Pasar ke Piring</p>
                  <p className="text-sm opacity-90">Kesehatan dimulai dari pilihan sederhana setiap hari.</p>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 order-1 lg:order-2 flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-brown/10 dark:bg-accent-brown/20 w-fit">
                <span className="material-symbols-outlined text-accent-brown text-sm">public</span>
                <span className="text-accent-brown text-sm font-bold">Lokal &amp; Relevan</span>
              </div>
              <h2 className="text-[#0e1b12] dark:text-white text-3xl lg:text-4xl font-black leading-tight">
                Dekat dengan <br className="hidden lg:block" />Budaya Kita
              </h2>
              <p className="text-[#4e5d52] dark:text-gray-300 text-base leading-relaxed">
                Kesehatan seringkali terasa asing karena standarnya menggunakan ukuran barat. Kami menggunakan pendekatan lokal.
              </p>
              <p className="text-[#4e5d52] dark:text-gray-300 text-base leading-relaxed">
                Aplikasi ini membandingkan kalori dengan makanan khas seperti <span className="font-semibold text-accent-brown">Nasi Goreng</span> atau <span className="font-semibold text-accent-brown">Gado-gado</span>, bukan sandwich atau hamburger, agar lebih relevan dengan apa yang ada di piring Anda setiap hari.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => onNavigate('food-list')}
                  className="text-accent-brown font-bold text-sm hover:underline underline-offset-4 flex items-center gap-1">
                  Lihat Daftar Makanan Indonesia
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Disclaimer Card */}
        <section className="w-full max-w-[960px] px-6 lg:px-10 pb-20">
          <div className="relative overflow-hidden rounded-2xl bg-[#eefcf2] dark:bg-[#1a2c20] p-8 border border-primary/20">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center relative z-10">
              <div className="size-14 rounded-full bg-white dark:bg-[#112116] flex items-center justify-center text-primary shadow-sm shrink-0">
                <span className="material-symbols-outlined text-3xl">medical_services</span>
              </div>
              <div className="flex-1">
                <h3 className="text-[#0e1b12] dark:text-white text-lg font-bold mb-2">Penting: Disclaimer Medis</h3>
                <p className="text-[#4e5d52] dark:text-gray-400 text-sm leading-relaxed">
                  Hasil dari kalkulator ini hanya untuk tujuan edukasi dan informasi awal. Angka yang disajikan
                  <span className="font-bold text-[#0e1b12] dark:text-white pl-1">bukan pengganti diagnosa </span>
                  atau saran medis profesional. Selalu konsultasikan kondisi kesehatan Anda dengan dokter.
                </p>
              </div>
              <div className="shrink-0 w-full md:w-auto">
                <button
                  onClick={() => onNavigate('disclaimer')}
                  className="w-full md:w-auto flex items-center justify-center gap-2 rounded-lg h-10 px-6 bg-white dark:bg-[#2a4030] text-[#0e1b12] dark:text-white text-sm font-bold border border-[#d0e7d7] dark:border-[#2a4030] hover:bg-[#f8fcf9] transition-colors whitespace-nowrap">
                  Baca Syarat Lengkap
                </button>
              </div>
            </div>
            {/* Decorative background element */}
            <div className="absolute -right-10 -top-10 size-40 rounded-full bg-primary/5 dark:bg-primary/10 blur-2xl"></div>
          </div>
        </section>
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

export default About;