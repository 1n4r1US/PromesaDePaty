
        const inputContainer = document.getElementById('input-container');
        const heartCanvas = document.getElementById('heart-canvas');
        const finalMessage = document.getElementById('final-message');
        const nameInput = document.getElementById('nameInput');
        const startBtn = document.getElementById('startBtn');

        startBtn.addEventListener('click', () => {
            const name = nameInput.value.trim();
            if (name.length < 2) {
                alert("Por favor, escribe un nombre válido ❤️");
                return;
            }

            inputContainer.style.opacity = '0';
            setTimeout(() => {
                inputContainer.style.display = 'none';
                fillHeart(name);
            }, 1000);
        });

        function fillHeart(name) {
            const points = [];
            const isMobile = window.innerWidth < 600;
            const density = isMobile ? 15 : 25; // Cantidad de nombres
            const scale = isMobile ? 120 : 180; // Tamaño del corazón
            
            // 1. Generar puntos dentro del área del corazón
            // Usamos coordenadas de -1.5 a 1.5 para cubrir el área del corazón matemático
            for (let x = -1.5; x <= 1.5; x += 0.04) {
                for (let y = -1.5; y <= 1.5; y += 0.04) {
                    // Ecuación del corazón: (x^2 + y^2 - 1)^3 - x^2 * y^3 <= 0
                    if (Math.pow(x*x + y*y - 1, 3) - Math.pow(x, 2) * Math.pow(y, 3) <= 0) {
                        points.push({ x, y });
                    }
                }
            }

            // 2. Desordenar los puntos para que se llene de forma orgánica y no lineal
            points.sort(() => Math.random() - 0.5);

            let i = 0;
            const interval = setInterval(() => {
                if (i >= points.length) {
                    clearInterval(interval);
                    showFinalMessage(name);
                    return;
                }

                // Dibujar 5 puntos a la vez para que sea más rápido
                for(let j = 0; j < 4; j++) {
                    if(points[i + j]) {
                        createNameParticle(points[i + j].x, points[i + j].y, name, scale);
                    }
                }
                i += 4;
            }, 5);
        }

        function createNameParticle(x, y, name, scale) {
            const span = document.createElement('span');
            span.className = 'name-particle gradient-text';
            span.innerText = name;

            // Convertir coordenadas matemáticas a píxeles de pantalla
            // Invertimos Y porque en la pantalla el 0 está arriba
            const screenX = window.innerWidth / 2 + (x * scale);
            const screenY = window.innerHeight / 2 - (y * scale);

            span.style.left = `${screenX}px`;
            span.style.top = `${screenY}px`;
            
            // Variación ligera de tamaño para dar textura
            span.style.fontSize = (Math.random() * (14 - 8) + 8) + 'px';

            heartCanvas.appendChild(span);
        }

        function showFinalMessage(name) {
            setTimeout(() => {
                // Opacidad suave para el fondo de nombres
                heartCanvas.style.transition = 'opacity 3s';
                heartCanvas.style.opacity = '0.4';
                
                finalMessage.innerText = `${name}, Igual y si nos damos chance nos vamos gustando... 
                    Tal vez tu insomnio combine con mis desvelos...
                    Y si me quedo y aprendo a insistir sin llegar a ser molesto...
                    Tal vez de esta manera, me vas queriendo despacion, yo tranquilo, no llevo prisa...
                    Igual y le encontramos explicacion a todo lo que nos paso para encontrarnos...
                    Igual y jala...
                    ¿Quieres ser mi novia? ❤️`;
                finalMessage.style.opacity = '1';
            }, 1000);
        }
    