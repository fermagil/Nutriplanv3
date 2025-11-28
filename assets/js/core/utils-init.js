/**
 * Inicialización de utilidades - Para importar en el main
 */

import { SecurityUtils, DOMUtils, ValidationUtils, LoggingUtils } from './utils.js';

// Exportar al ámbito global para compatibilidad temporal
window.NutriPlanUtils = {
    SecurityUtils,
    DOMUtils,
    ValidationUtils,
    LoggingUtils
};

// Log de inicialización
LoggingUtils.log('Utils', 'info', 'Módulo de utilidades cargado correctamente');

console.log('🔧 NutriPlan Utils - Módulo de seguridad cargado');