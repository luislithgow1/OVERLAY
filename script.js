
            // ============================================================
            // SCRIPT PARA BORDE ELÉCTRICO CON CORRIENTE DE IZQUIERDA A DERECHA
            // ============================================================

            (function() {
                'use strict';

                // Seleccionar todas las secciones
                const sections = document.querySelectorAll('section');

                // Configuración del efecto
                const config = {
                    intensity: 1.2,        // Intensidad del brillo
                    speed: 3,              // Velocidad base de la animación (segundos)
                    colors: [
                        '#00f0ff',  // Cian
                        '#ff00e6',  // Magenta
                        '#00ff88',  // Verde neón
                        '#ffaa00',  // Naranja
                        '#ff4466',  // Rojo
                        '#44ffaa'   // Verde menta
                    ]
                };

                // Asignar colores personalizados a cada sección
                const sectionColors = {
                    '#topbar': '#00f0ff',
                    '#areavideo': '#ff00e6',
                    '#chatbox': '#00ff88',
                    '#nuevosubcritor': '#ffaa00',
                    '#nuevodonador': '#ff4466',
                    '#nuevoseguidor': '#44ffaa'
                };

                // Aplicar colores y estilos personalizados
                sections.forEach(section => {
                    const id = section.id;
                    const color = sectionColors[`#${id}`] || config.colors[0];

                    // Establecer el color del borde
                    section.style.borderColor = color;
                    section.style.boxShadow = `0 0 30px ${color}33, inset 0 0 30px ${color}11`;

                    // Crear un gradiente personalizado para el pseudo-elemento ::before
                    // Usamos una regla CSS dinámica
                    const styleSheet = document.createElement('style');
                    styleSheet.textContent = `
                        #${id}::before {
                            background: conic-gradient(
                                from 0deg,
                                transparent,
                                ${color},
                                transparent 30%,
                                transparent 70%,
                                ${color},
                                transparent
                            ) !important;
                            animation-duration: ${config.speed}s !important;
                        }
                        #${id}::after {
                            background: conic-gradient(
                                from 90deg,
                                transparent,
                                ${color}44,
                                transparent 40%,
                                transparent 60%,
                                ${color}44,
                                transparent
                            ) !important;
                            animation-duration: ${config.speed + 1}s !important;
                        }
                    `;
                    document.head.appendChild(styleSheet);
                });

                // ===== EFECTO DE "CORRIENTE" CON SCROLL DE FONDO =====
                // Agregar una animación adicional que simule corriente moviéndose

                // Crear un keyframe dinámico para el movimiento de la corriente
                const dynamicStyle = document.createElement('style');
                dynamicStyle.textContent = `
                    @keyframes electricFlow {
                        0% {
                            background-position: -200% 50%;
                            opacity: 0.8;
                        }
                        50% {
                            background-position: 200% 50%;
                            opacity: 1;
                        }
                        100% {
                            background-position: -200% 50%;
                            opacity: 0.8;
                        }
                    }

                    /* Aplicar a todas las secciones con un pseudo-elemento extra para el efecto de corriente */
                    section .current-line {
                        display: none;
                    }

                    /* Mejorar el efecto con destellos aleatorios */
                    @keyframes sparkle {
                        0%, 100% { opacity: 0.3; }
                        50% { opacity: 1; }
                    }

                    /* Añadir un efecto de "chispa" que viaja */
                    section .spark {
                        position: absolute;
                        width: 8px;
                        height: 8px;
                        background: white;
                        border-radius: 50%;
                        box-shadow: 0 0 20px currentColor, 0 0 40px currentColor;
                        pointer-events: none;
                        z-index: 2;
                        opacity: 0;
                        animation: sparkTravel 4s linear infinite;
                    }

                    @keyframes sparkTravel {
                        0% {
                            opacity: 0;
                            transform: translate(0, 0) scale(0);
                        }
                        10% {
                            opacity: 1;
                            transform: translate(10%, 0) scale(1.5);
                        }
                        90% {
                            opacity: 1;
                            transform: translate(90%, 0) scale(1.5);
                        }
                        100% {
                            opacity: 0;
                            transform: translate(100%, 0) scale(0);
                        }
                    }
                `;
                document.head.appendChild(dynamicStyle);

                // ===== GENERAR CHISPAS EN CADA SECCIÓN =====
                sections.forEach((section, index) => {
                    // Crear varias chispas para cada sección
                    for (let i = 0; i < 3; i++) {
                        const spark = document.createElement('div');
                        spark.className = 'spark';
                        const color = sectionColors[`#${section.id}`] || '#00f0ff';
                        spark.style.color = color;
                        spark.style.top = `${10 + Math.random() * 80}%`;
                        spark.style.left = `${-5 + Math.random() * 10}%`;
                        spark.style.animationDelay = `${i * 1.3 + Math.random() * 0.5}s`;
                        spark.style.animationDuration = `${3 + Math.random() * 2}s`;
                        spark.style.width = `${4 + Math.random() * 8}px`;
                        spark.style.height = spark.style.width;
                        section.appendChild(spark);
                    }

                    // Añadir una línea de corriente adicional
                    const currentLine = document.createElement('div');
                    currentLine.style.cssText = `
                        position: absolute;
                        inset: 0;
                        border-radius: 20px;
                        pointer-events: none;
                        z-index: 0;
                        background: linear-gradient(
                            90deg,
                            transparent,
                            ${sectionColors[`#${section.id}`] || '#00f0ff'}22,
                            transparent 30%,
                            transparent 70%,
                            ${sectionColors[`#${section.id}`] || '#00f0ff'}22,
                            transparent
                        );
                        background-size: 200% 100%;
                        animation: electricFlow ${3 + Math.random() * 2}s linear infinite;
                        animation-delay: ${Math.random() * 0.5}s;
                    `;
                    section.appendChild(currentLine);
                });

               
            })();
    