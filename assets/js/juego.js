const miModulo = (() => {
    'use strict';

    let mazo = [], tipoCarta = ['C', 'D', 'H', 'S'], especiales = ['A', 'J', 'Q', 'K'];

    let puntosJugadores = [];
    // let puntosJugador = 0, puntosMaquina = 0;

    // Referencias del HTML
    const btnSolicitar = document.querySelector('#btnSolicitar'),
        btnDetener = document.querySelector('#btnDetener');

    const divCartasJugadores = document.querySelectorAll('.divCartas'),
        puntosHTML = document.querySelectorAll('small');

    const inicializarJuego = (numJugadores = 2) => {
        mazo = crearMazo();
        puntosJugadores = [];

        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);
        }

        puntosHTML.forEach(elem => elem.innerText = 0);
        divCartasJugadores.forEach(elem => elem.innerHTML = '');

        desBotones();
    }

    const crearMazo = () => {

        mazo = [];

        for (let i = 2; i <= 10; i++) {
            for (let tipo of tipoCarta) {
                mazo.push(i + tipo);
            }
        }

        for (let tipo of tipoCarta) {
            for (const esp of especiales) {
                mazo.push(esp + tipo);
            }
        }

        return _.shuffle(mazo);
    }

    const solicitarCarta = () => {
        if (mazo.length === 0) throw 'No hay cartas en el mazo';
        return mazo.pop();
    }

    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1);
        return (isNaN(valor))
            ? (valor === 'A') ? 11 : 10 // Igual a 'As'
            : valor * 1; // Multi x 1 para convertir a number
    }

    // turno: 0 = primer jugador y el último será la máquina
    const acumularPuntos = (carta, turno) => {
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    const crearCarta = (carta, turno) => {
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append(imgCarta);
    }

    const determinarGanador = () => {

        const [puntosMinimos, puntosMaquina] = puntosJugadores;

        setTimeout(() => {
            if (puntosMaquina === puntosMinimos) {
                alert('Nadie ganó :(');
            } else if (puntosMinimos > 21) {
                alert('!La máquina gana!');
            } else if (puntosMaquina > 21) {
                alert('!El jugador gana!');
            } else {
                alert('!La máquina gana!');
            }
        }, 100);
    }

    const desBotones = () => {
        btnSolicitar.disabled = false;
        btnDetener.disabled = false;
    }

    const actBotones = () => {
        btnSolicitar.disabled = true;
        btnDetener.disabled = true;
    }

    // Lógica Máquina
    const turnoMaquina = (puntosMinimos) => {
        let puntosMaquina = 0;

        do {
            const carta = solicitarCarta();
            puntosMaquina = acumularPuntos(carta, puntosJugadores.length - 1);
            crearCarta(carta, puntosJugadores.length - 1);
        } while ((puntosMaquina < puntosMinimos) && (puntosMinimos <= 21));

        determinarGanador();
    }

    // Eventos
    btnSolicitar.addEventListener('click', () => {
        const carta = solicitarCarta();
        const puntosJugador = acumularPuntos(carta, 0);
        crearCarta(carta, 0);

        if (puntosJugador > 21) {
            console.warn('Has perdido u_U');
            actBotones();
            turnoMaquina(puntosJugador);
        } else if (puntosJugador === 21) {
            console.warn('21! Ganaste!');
            actBotones();
            turnoMaquina(puntosJugador);
        }
    });

    btnDetener.addEventListener('click', () => {
        actBotones();
        turnoMaquina(puntosJugadores[0]);
    });

    // btnNuevo.addEventListener('click', () => {
    //     inicializarJuego();
    // });

    return {
        nuevoJuego: inicializarJuego
    };
})();


/**
 * Apuntes:
 *
 * -Funciones Anónimas:
 * Son funciones invisibles para el cliente, ya que están creadas en algún lugar de memoria pero sin un
 * identificador único para acceder a sus variables o contenido
 *
 * EJ: Fn anónimas autoinvocadas
 * (() => {})();
 * (function(){})();
 *
 * -'use strict' => le dice a JS que sea estricto al momento de evaluar el código
 *
 * -----------------------------------------------------------------------------------------------------
 * Patrón Módulo:
 * -Es el patrón más común
 * -Es compatible con el ECMAScript 5
 * -Nos permite la encapsulación (contenedor privado) de nuestro código
 */