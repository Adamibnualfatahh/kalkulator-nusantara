export enum Gender {
  Male = 'male',
  Female = 'female'
}

export enum ActivityLevel {
  Sedentary = 'sedentary', // x 1.2
  Moderate = 'moderate',   // x 1.55
  Active = 'active'        // x 1.9
}

export interface UserData {
  height: number; // cm
  weight: number; // kg
  age: number;    // years
  gender: Gender;
  activityLevel: ActivityLevel;
  sugarValue?: number; // mg/dL
  sugarCondition?: SugarCondition;
  waistCircumference?: number; // cm
}

export enum SugarCondition {
  Fasting = 'fasting',     // Puasa
  AfterMeal = 'after_meal', // 2 Jam Setelah Makan
  Random = 'random'        // Sewaktu
}

export type TabType = 'bmi' | 'bmr' | 'ideal' | 'sugar' | 'bmi_elderly' | 'waist';

export interface CalculationResult {
  bmi: number;
  bmiCategory: string;
  bmiColor: string;
  bmiAdvice: string;

  // Elderly BMI specific
  isElderly?: boolean;
  elderlyBmiCategory?: string;
  elderlyBmiColor?: string;
  elderlyBmiAdvice?: string;

  bmr: number;
  tdee: number;
  idealWeightMin: number;
  idealWeightMax: number;
  idealWeightPoint: number;

  // New features
  sugarStatus?: string;
  sugarColor?: string;
  sugarAdvice?: string;

  waistStatus?: string;
  waistRisk?: string;
  waistAdvice?: string;
  waistColor?: string;
}