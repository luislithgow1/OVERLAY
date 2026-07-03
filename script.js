// ============================================================
// SCRIPT PARA BORDE ELÉCTRICO CON CORRIENTE DE IZQUIERDA A DERECHA
// Y GENERACIÓN DE CHISPAS EN CADA SECCIÓN
// ============================================================

(function() {
    'use strict';

    const sections = document.querySelectorAll('section');

    // Colores personalizados por ID
    const sectionColors = {
        'topbar': '#00f0ff',
        'areavideo': '#ff00e6',
        'chatbox': '#00ff88',
        'nuevosubcritor': '#ffaa00',
        'nuevodonador': '#ff4466',
        'nuevoseguidor': '#44ffaa'
    };

    // Aplicar color dinámico a cada sección
    sections.forEach(section => {
        const id = section.id;
        const color = sectionColors[id] || '#00f0ff';

        // Establecer color del borde y sombra
        section.style.borderColor = color;
        section.style.boxShadow = `0 0 30px ${color}33, inset 0 0 30px ${color}11`;
        section.style.color = color;

        // Crear reglas CSS para pseudo-elementos de cada sección
        const styleSheet = document.createElement('style');
        styleSheet.textContent = `
            #${id}::before {
                background: conic-gradient(from 0deg, transparent, ${color}, transparent 30%, transparent 70%, ${color}, transparent) !important;
                animation-duration: 3s !important;
            }
            #${id}::after {
                background: conic-gradient(from 90deg, transparent, ${color}44, transparent 40%, transparent 60%, ${color}44, transparent) !important;
                animation-duration: 4s !important;
            }
            #${id} .current-line {
                background: linear-gradient(90deg, transparent, ${color}, transparent 30%, transparent 70%, ${color}, transparent) !important;
            }
        `;
        document.head.appendChild(styleSheet);

        // === GENERAR CHISPAS ===
        for (let i = 0; i < 3; i++) {
            const spark = document.createElement('div');
            spark.className = 'spark';
            spark.style.color = color;
            spark.style.top = `${10 + Math.random() * 80}%`;
            spark.style.left = `${-5 + Math.random() * 10}%`;
            spark.style.animationDelay = `${i * 1.3 + Math.random() * 0.5}s`;
            spark.style.animationDuration = `${3 + Math.random() * 2}s`;
            const size = 4 + Math.random() * 8;
            spark.style.width = size + 'px';
            spark.style.height = size + 'px';
            section.appendChild(spark);
        }

        // === LÍNEA DE CORRIENTE ADICIONAL ===
        const currentLine = document.createElement('div');
        currentLine.className = 'current-line';
        currentLine.style.animationDuration = `${3 + Math.random() * 2}s`;
        currentLine.style.animationDelay = `${Math.random() * 0.5}s`;
        section.appendChild(currentLine);
    });

})();
