/**
 * NUTRIplan v2 - Utilities Core Module (Modo Global)
 * Módulo crítico de seguridad y utilidades compartidas
 * Versión modificada para funcionar sin módulos ES6
 */

// =============================================
// CLASE PRINCIPAL: SecurityUtils
// =============================================
class SecurityUtils {
    
    static sanitizeHTML(str) {
        if (str === null || str === undefined) return '';
        const div = document.createElement('div');
        div.textContent = String(str);
        return div.innerHTML;
    }

    static escapeUserInput(input) {
        if (typeof input !== 'string') return input;
        const escapeMap = {
            '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;',
            "'": '&#39;', '/': '&#x2F;', '`': '&#x60;', '=': '&#x3D;'
        };
        return input.replace(/[&<>"'`=/]/g, char => escapeMap[char] || char);
    }

    static validateNumber(input, min = 0, max = 500, fieldName = 'Campo') {
        const num = parseFloat(input);
        if (isNaN(num)) {
            return { isValid: false, value: null, error: `${fieldName} debe ser un número válido` };
        }
        if (num < min || num > max) {
            return { isValid: false, value: null, error: `${fieldName} debe estar entre ${min} y ${max}` };
        }
        return { isValid: true, value: num, error: null };
    }

    static validatePercentages(protein, carbs, fats) {
        const total = protein + carbs + fats;
        if (Math.abs(total - 100) > 0.1) {
            return {
                isValid: false,
                total: total,
                error: `Los porcentajes deben sumar 100%. Actual: ${total.toFixed(1)}%`
            };
        }
        return { isValid: true, total: total, error: null };
    }
}

// =============================================
// CLASE: DOMUtils - Manipulación segura del DOM
// =============================================
class DOMUtils {
    
    static displayError(container, message) {
        if (!container) {
            console.error('Error container not found for message:', SecurityUtils.escapeUserInput(message));
            return;
        }
        const safeMessage = SecurityUtils.sanitizeHTML(message);
        container.innerHTML = `<p class="error-message">${safeMessage}</p>`;
        this.animateElement(container);
    }

    static displayInfo(container, message) {
        if (!container) {
            console.error('Info container not found for message:', SecurityUtils.escapeUserInput(message));
            return;
        }
        const safeMessage = SecurityUtils.sanitizeHTML(message);
        container.innerHTML = `<p class="info-message">${safeMessage}</p>`;
        this.animateElement(container);
    }

    static clearContainer(container) {
        if (container) container.innerHTML = '';
    }

    static animateElement(element) {
        if (!element) return;
        element.style.opacity = '0';
        element.style.display = 'block';
        setTimeout(() => {
            element.style.transition = 'opacity 0.4s ease';
            element.style.opacity = '1';
        }, 100);
    }
}

// =============================================
// HACER DISPONIBLES GLOBALMENTE
// =============================================
window.SecurityUtils = SecurityUtils;
window.DOMUtils = DOMUtils;

console.log('🛡️ Módulo de seguridad utils.js cargado (modo global)');
