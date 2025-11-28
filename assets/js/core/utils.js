/**
 * NUTRIplan v2 - Utilities Core Module
 * Módulo crítico de seguridad y utilidades compartidas
 * Prioridad: ALTA - Prevención de vulnerabilidades XSS
 */

// =============================================
// CLASE PRINCIPAL: SecurityUtils
// =============================================
export class SecurityUtils {
    
    /**
     * Sanitiza texto para prevenir XSS en innerHTML
     * @param {string} str - Texto a sanitizar
     * @returns {string} - Texto seguro para HTML
     */
    static sanitizeHTML(str) {
        if (str === null || str === undefined) return '';
        
        const div = document.createElement('div');
        div.textContent = String(str);
        return div.innerHTML;
    }

    /**
     * Escapa caracteres peligrosos para HTML
     * @param {string} input - Input del usuario
     * @returns {string} - Texto escapado
     */
    static escapeUserInput(input) {
        if (typeof input !== 'string') return input;
        
        const escapeMap = {
            '&': '&amp;',
            '<': '&lt;', 
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;',
            '/': '&#x2F;',
            '`': '&#x60;',
            '=': '&#x3D;'
        };
        
        return input.replace(/[&<>"'`=/]/g, char => escapeMap[char] || char);
    }

    /**
     * Valida número con rangos seguros
     * @param {*} input - Valor a validar
     * @param {number} min - Valor mínimo
     * @param {number} max - Valor máximo  
     * @param {string} fieldName - Nombre del campo para errores
     * @returns {Object} - {isValid: boolean, value: number, error: string}
     */
    static validateNumber(input, min = 0, max = 500, fieldName = 'Campo') {
        const num = parseFloat(input);
        
        if (isNaN(num)) {
            return {
                isValid: false,
                value: null,
                error: `${fieldName} debe ser un número válido`
            };
        }
        
        if (num < min || num > max) {
            return {
                isValid: false,
                value: null,
                error: `${fieldName} debe estar entre ${min} y ${max}`
            };
        }
        
        return {
            isValid: true,
            value: num,
            error: null
        };
    }

    /**
     * Valida porcentajes sumen 100%
     * @param {number} protein - % Proteínas
     * @param {number} carbs - % Carbohidratos  
     * @param {number} fats - % Grasas
     * @returns {Object} - {isValid: boolean, total: number, error: string}
     */
    static validatePercentages(protein, carbs, fats) {
        const total = protein + carbs + fats;
        
        if (Math.abs(total - 100) > 0.1) { // Tolerancia pequeña para decimales
            return {
                isValid: false,
                total: total,
                error: `Los porcentajes deben sumar 100%. Actual: ${total.toFixed(1)}%`
            };
        }
        
        return {
            isValid: true,
            total: total,
            error: null
        };
    }

    /**
     * Sanitiza objeto completo de datos de usuario
     * @param {Object} userData - Datos del usuario
     * @returns {Object} - Datos sanitizados
     */
    static sanitizeUserData(userData) {
        const sanitized = {};
        
        for (const [key, value] of Object.entries(userData)) {
            if (typeof value === 'string') {
                sanitized[key] = this.escapeUserInput(value.trim());
            } else {
                sanitized[key] = value;
            }
        }
        
        return sanitized;
    }
}

// =============================================
// CLASE: DOMUtils - Manipulación segura del DOM
// =============================================
export class DOMUtils {
    
    /**
     * Muestra error de forma segura
     * @param {HTMLElement} container - Contenedor donde mostrar
     * @param {string} message - Mensaje de error
     */
    static displayError(container, message) {
        if (!container) {
            console.error('Error container not found for message:', SecurityUtils.escapeUserInput(message));
            return;
        }
        
        const safeMessage = SecurityUtils.sanitizeHTML(message);
        container.innerHTML = `<p class="error-message">${safeMessage}</p>`;
        this.animateElement(container);
    }

    /**
     * Muestra info de forma segura  
     * @param {HTMLElement} container - Contenedor donde mostrar
     * @param {string} message - Mensaje informativo
     */
    static displayInfo(container, message) {
        if (!container) {
            console.error('Info container not found for message:', SecurityUtils.escapeUserInput(message));
            return;
        }
        
        const safeMessage = SecurityUtils.sanitizeHTML(message);
        container.innerHTML = `<p class="info-message">${safeMessage}</p>`;
        this.animateElement(container);
    }

    /**
     * Limpia contenedor de forma segura
     * @param {HTMLElement} container - Contenedor a limpiar
     */
    static clearContainer(container) {
        if (container) {
            container.innerHTML = '';
        }
    }

    /**
     * Animación fade-in para elementos
     * @param {HTMLElement} element - Elemento a animar
     */
    static animateElement(element) {
        if (!element) return;
        
        element.style.opacity = '0';
        element.style.display = 'block';
        
        setTimeout(() => {
            element.style.transition = 'opacity 0.4s ease';
            element.style.opacity = '1';
        }, 100);
    }

    /**
     * Crea elemento HTML de forma segura
     * @param {string} tag - Tag HTML
     * @param {Object} attributes - Atributos
     * @param {string} text - Texto contenido
     * @returns {HTMLElement} - Elemento creado
     */
    static createSafeElement(tag, attributes = {}, text = '') {
        const element = document.createElement(tag);
        
        // Set attributes sanitizados
        for (const [key, value] of Object.entries(attributes)) {
            if (key.startsWith('on')) { // Bloquear atributos de evento
                console.warn(`Atributo de evento bloqueado: ${key}`);
                continue;
            }
            element.setAttribute(key, SecurityUtils.escapeUserInput(String(value)));
        }
        
        // Set text content sanitizado
        if (text) {
            element.textContent = SecurityUtils.escapeUserInput(text);
        }
        
        return element;
    }

    /**
     * Actualiza porcentajes con validación
     * @param {HTMLElement} totalDiv - Elemento que muestra total
     * @param {number} protein - % Proteínas
     * @param {number} carbs - % Carbohidratos
     * @param {number} fats - % Grasas
     */
    static updatePercentageDisplay(totalDiv, protein, carbs, fats) {
        if (!totalDiv) return;
        
        const validation = SecurityUtils.validatePercentages(protein, carbs, fats);
        const total = protein + carbs + fats;
        
        if (validation.isValid) {
            totalDiv.innerHTML = SecurityUtils.sanitizeHTML(`Total: ${total}% ✓`);
            totalDiv.style.color = '#388E3C';
        } else {
            totalDiv.innerHTML = SecurityUtils.sanitizeHTML(`Total: ${total}% ✗`);
            totalDiv.style.color = '#c62828';
        }
    }
}

// =============================================
// CLASE: ValidationUtils - Validaciones de formularios
// =============================================
export class ValidationUtils {
    
    /**
     * Valida inputs de formulario básicos
     * @param {Array} inputs - Array de elementos input
     * @returns {Object} - {isValid: boolean, errors: Array}
     */
    static validateFormInputs(inputs) {
        const errors = [];
        let isValid = true;
        
        for (const input of inputs) {
            const value = parseFloat(input.value);
            const fieldName = input.getAttribute('data-fieldname') || input.name;
            
            if (isNaN(value) || value <= 0) {
                isValid = false;
                errors.push(`${fieldName} debe ser un número positivo`);
                input.classList.add('error-field');
            } else {
                input.classList.remove('error-field');
            }
        }
        
        return { isValid, errors };
    }

    /**
     * Valida rango de porcentaje de grasa corporal
     * @param {number} fatPercentage - % Grasa
     * @param {string} gender - Género
     * @returns {Object} - {isValid: boolean, error: string}
     */
    static validateBodyFatPercentage(fatPercentage, gender) {
        const validation = SecurityUtils.validateNumber(fatPercentage, 3, 60, 'Porcentaje de grasa corporal');
        
        if (!validation.isValid) {
            return validation;
        }
        
        // Rangos saludables por género
        const healthyRanges = {
            male: { min: 8, max: 25 },
            female: { min: 18, max: 32 }
        };
        
        const range = healthyRanges[gender];
        if (fatPercentage < range.min || fatPercentage > range.max) {
            return {
                isValid: false,
                value: fatPercentage,
                error: `Porcentaje de grasa fuera del rango saludable para ${gender === 'male' ? 'hombres' : 'mujeres'} (${range.min}-${range.max}%)`
            };
        }
        
        return { isValid: true, value: fatPercentage, error: null };
    }

    /**
     * Valida objetivo de peso realista
     * @param {number} currentWeight - Peso actual
     * @param {number} targetWeight - Peso objetivo  
     * @param {string} goalType - Tipo de objetivo
     * @returns {Object} - {isValid: boolean, error: string}
     */
    static validateWeightGoal(currentWeight, targetWeight, goalType) {
        const weightChange = targetWeight - currentWeight;
        const maxChange = currentWeight * 0.5; // Máximo 50% cambio
        
        if (Math.abs(weightChange) > maxChange) {
            return {
                isValid: false,
                error: `Cambio de peso demasiado extremo (${weightChange.toFixed(1)} kg). Máximo recomendado: ${maxChange.toFixed(1)} kg`
            };
        }
        
        if (goalType === 'loss' && targetWeight >= currentWeight) {
            return {
                isValid: false,
                error: 'Para pérdida de peso, el objetivo debe ser menor al peso actual'
            };
        }
        
        if (goalType === 'gain' && targetWeight <= currentWeight) {
            return {
                isValid: false,
                error: 'Para ganancia de peso, el objetivo debe ser mayor al peso actual'
            };
        }
        
        return { isValid: true, error: null };
    }
}

// =============================================
// CLASE: LoggingUtils - Logging y debugging
// =============================================
export class LoggingUtils {
    
    /**
     * Logger estructurado para desarrollo
     * @param {string} module - Módulo origen
     * @param {string} level - Nivel de log
     * @param {string} message - Mensaje
     * @param {*} data - Datos adicionales
     */
    static log(module, level, message, data = null) {
        if (process.env.NODE_ENV === 'production' && level === 'debug') return;
        
        const timestamp = new Date().toISOString();
        const safeMessage = SecurityUtils.escapeUserInput(message);
        
        const logEntry = {
            timestamp,
            module: SecurityUtils.escapeUserInput(module),
            level,
            message: safeMessage,
            data: data ? SecurityUtils.sanitizeUserData(data) : null
        };
        
        // Console con colores en desarrollo
        if (process.env.NODE_ENV !== 'production') {
            const colors = {
                error: 'red',
                warn: 'orange', 
                info: 'blue',
                debug: 'gray'
            };
            
            console.log(
                `%c[${module}] ${message}`,
                `color: ${colors[level] || 'black'}; font-weight: bold`,
                data || ''
            );
        } else {
            // En producción, solo errores y warnings
            if (level === 'error' || level === 'warn') {
                console[level](`[${module}] ${message}`, data || '');
            }
        }
        
        // Aquí podríamos enviar a servicio de logging en producción
        this.trackAnalytics(module, level, message);
    }
    
    /**
     * Track de analytics seguro
     * @private
     */
    static trackAnalytics(module, level, message) {
        // Implementar tracking seguro aquí
        // Ej: Google Analytics, Firebase Analytics, etc.
    }
}

// =============================================
// EXPORTACIÓN POR DEFECTO
// =============================================
export default {
    SecurityUtils,
    DOMUtils, 
    ValidationUtils,
    LoggingUtils
};