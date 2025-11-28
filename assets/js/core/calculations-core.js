// assets/js/core/calculations-core.js

import { SecurityUtils, ValidationUtils, LoggingUtils } from './utils.js';

export class NutritionCalculations {
    static calculateBMR(weight, height, age, gender, formula = 'mifflin') {
        // Implementar fórmulas BMR modularizadas
        let bmr;
        if (formula === 'mifflin') {
            if (gender === 'male') {
                bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
            } else {
                bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
            }
        } else if (formula === 'harris-benedict') {
            if (gender === 'male') {
                bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
            } else {
                bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
            }
        }
        // ... otras fórmulas
        return bmr;
    }

    static calculateTDEE(bmr, activityLevel, gender) {
        const multipliers = this.getActivityMultipliers(gender);
        return Math.round(bmr * multipliers[activityLevel]);
    }

    static getActivityMultipliers(gender) {
        return gender === 'male' ? 
            { '1.2': 1.2, '1.375': 1.56, '1.55': 1.78, '1.725': 2.1, '1.9': 2.3 } :
            { '1.2': 1.2, '1.375': 1.55, '1.55': 1.64, '1.725': 1.82, '1.9': 2.0 };
    }

    // ... otros métodos de cálculo
}