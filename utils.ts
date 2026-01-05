import { Gender, ActivityLevel, UserData, CalculationResult, SugarCondition } from './types';

export const calculateBMI = (weight: number, height: number) => {
  const heightM = height / 100;
  return weight / (heightM * heightM);
};

export const getBMICategory = (bmi: number) => {
  if (bmi < 18.5) return { label: 'Kurus', color: 'text-blue-500', bg: 'bg-blue-100', advice: 'Perbanyak asupan nutrisi dan protein untuk mencapai berat ideal.' };
  if (bmi < 25) return { label: 'Normal', color: 'text-green-500', bg: 'bg-green-100', advice: 'Pertahankan pola makan sehat dan olahraga teratur.' };
  if (bmi < 30) return { label: 'Gemuk', color: 'text-orange-500', bg: 'bg-orange-100', advice: 'Kurangi kalori harian dan tingkatkan aktivitas fisik.' };
  return { label: 'Obesitas', color: 'text-red-500', bg: 'bg-red-100', advice: 'Segera konsultasikan dengan ahli gizi untuk program penurunan berat badan.' };
};

export const getElderlyBMICategory = (bmi: number) => {
  // Kategori IMT Lansia (Indonesia)
  // < 18.5 → Kurus
  // 18.5 – 22.9 → Normal
  // 23 – 24.9 → Overweight
  // ≥ 25 → Obesitas
  if (bmi < 18.5) return { label: 'Kurus', color: 'text-blue-500', bg: 'bg-blue-100', advice: 'Tingkatkan asupan gizi. Konsultasikan dengan dokter jika berat badan turun drastis.' };
  if (bmi <= 22.9) return { label: 'Normal', color: 'text-green-500', bg: 'bg-green-100', advice: 'Selamat! Jaga pola makan seimbang dan tetap aktif bergerak ringan.' };
  if (bmi <= 24.9) return { label: 'Overweight', color: 'text-orange-500', bg: 'bg-orange-100', advice: 'Perhatikan porsi makan. Batasi gula dan lemak. Lakukan senam lansia.' };
  return { label: 'Obesitas', color: 'text-red-500', bg: 'bg-red-100', advice: 'Risiko penyakit metabolik meningkat. Konsultasikan diet yang tepat dengan dokter.' };
};

export const calculateBloodSugar = (value: number, condition: SugarCondition) => {
  let status = '';
  let color = '';
  let bg = '';
  let advice = '';

  if (condition === SugarCondition.Fasting) {
    if (value < 70) {
      status = 'Hipoglikemia'; color = 'text-red-500'; bg = 'bg-red-100';
      advice = 'Gula darah terlalu rendah. Segera konsumsi makanan/minuman manis.';
    } else if (value <= 99) {
      status = 'Normal'; color = 'text-green-500'; bg = 'bg-green-100';
      advice = 'Kadar gula darah puasa Anda dalam batas aman.';
    } else if (value <= 125) {
      status = 'Pra-diabetes'; color = 'text-orange-500'; bg = 'bg-orange-100';
      advice = 'Waspada! Mulai kurangi gula dan karbohidrat sederhana.';
    } else {
      status = 'Diabetes'; color = 'text-red-600'; bg = 'bg-red-200';
      advice = 'Kadar gula tinggi. Segera periksakan diri ke dokter.';
    }
  } else if (condition === SugarCondition.AfterMeal) {
    if (value < 140) {
      status = 'Normal'; color = 'text-green-500'; bg = 'bg-green-100';
      advice = 'Respons tubuh terhadap makanan baik.';
    } else if (value <= 199) {
      status = 'Pra-diabetes'; color = 'text-orange-500'; bg = 'bg-orange-100';
      advice = 'Tubuh mulai kesulitan mengelola gula. Perbanyak serat dan olahraga.';
    } else {
      status = 'Diabetes'; color = 'text-red-600'; bg = 'bg-red-200';
      advice = 'Indikasi diabetes. Konsultasikan dengan tenaga medis.';
    }
  } else { // Sewaktu
    if (value < 200) {
      status = 'Normal'; color = 'text-green-500'; bg = 'bg-green-100';
      advice = 'Gula darah sewaktu Anda dalam batas normal.';
    } else {
      status = 'Diabetes'; color = 'text-red-600'; bg = 'bg-red-200';
      advice = 'Gula darah sewaktu tinggi. Waspadai gejala sering haus/kencing.';
    }
  }

  return { status, color, bg, advice };
};

export const calculateWaistRisk = (circumference: number, gender: Gender) => {
  let isNormal = false;

  if (gender === Gender.Male) {
    isNormal = circumference <= 90;
  } else {
    isNormal = circumference <= 80;
  }

  if (isNormal) {
    return {
      status: 'Normal',
      risk: 'Risiko Rendah',
      advice: 'Lingkar perut ideal. Pertahankan untuk mencegah penyakit kardiovaskular.',
      color: 'text-green-500',
      bg: 'bg-green-100'
    };
  } else {
    return {
      status: 'Berisiko',
      risk: 'Obesitas Sentral',
      advice: 'Tumpukan lemak di perut meningkatkan risiko diabetes & jantung. Kurangi gorengan & rutin kardio.',
      color: 'text-red-500',
      bg: 'bg-red-100'
    };
  }
};

export const calculateBMR = (data: UserData) => {
  // Harris-Benedict (Prompt Version)
  if (data.gender === Gender.Male) {
    return 66 + (13.7 * data.weight) + (5 * data.height) - (6.8 * data.age);
  } else {
    return 655 + (9.6 * data.weight) + (1.8 * data.height) - (4.7 * data.age);
  }
};

export const calculateTDEE = (bmr: number, activity: ActivityLevel) => {
  switch (activity) {
    case ActivityLevel.Sedentary: return bmr * 1.2;
    case ActivityLevel.Moderate: return bmr * 1.55;
    case ActivityLevel.Active: return bmr * 1.9;
    default: return bmr * 1.2;
  }
};

export const calculateIdealWeight = (height: number, gender: Gender) => {
  // Broca Indonesia
  const base = height - 100;
  let ideal = 0;

  if (gender === Gender.Male) {
    ideal = base - (base * 0.10);
  } else {
    ideal = base - (base * 0.15);
  }

  return {
    point: ideal,
    min: ideal - 2,
    max: ideal + 2
  };
};

export const calculateAll = (data: UserData): CalculationResult => {
  const bmi = calculateBMI(data.weight, data.height);
  const bmiInfo = getBMICategory(bmi);
  const existingBmr = calculateBMR(data);
  const tdee = calculateTDEE(existingBmr, data.activityLevel);
  const ideal = calculateIdealWeight(data.height, data.gender);

  // New Calculations
  const sugarInfo = calculateBloodSugar(data.sugarValue || 0, data.sugarCondition || SugarCondition.Random);
  const waistInfo = calculateWaistRisk(data.waistCircumference || 0, data.gender);

  // Elderly BMI logic (only valid if age >= 60, but we calculate anyway and handle display logic in component)
  const isElderly = data.age >= 60;
  const elderlyBmiInfo = getElderlyBMICategory(bmi);

  return {
    bmi: parseFloat(bmi.toFixed(1)),
    bmiCategory: bmiInfo.label,
    bmiColor: bmiInfo.color,
    bmiAdvice: bmiInfo.advice,

    isElderly,
    elderlyBmiCategory: elderlyBmiInfo.label,
    elderlyBmiColor: elderlyBmiInfo.color,
    elderlyBmiAdvice: elderlyBmiInfo.advice,

    bmr: Math.round(existingBmr),
    tdee: Math.round(tdee),
    idealWeightPoint: Math.round(ideal.point),
    idealWeightMin: Math.round(ideal.min),
    idealWeightMax: Math.round(ideal.max),

    sugarStatus: sugarInfo.status,
    sugarColor: sugarInfo.color,
    sugarAdvice: sugarInfo.advice,

    waistStatus: waistInfo.status,
    waistRisk: waistInfo.risk,
    waistAdvice: waistInfo.advice,
    waistColor: waistInfo.color,
  };
};