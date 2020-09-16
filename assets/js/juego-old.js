/**
 * 2C = Two of Clubs
 * 2D = Two of Diamonds
 * 2H = Two of Hearts
 * 2S = Two of Spades
 */

let mazo = [];
let tipoCarta = ['C', 'D', 'H', 'S'];
let especiales = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0, puntosMaquina = 0;

// Referencias del HTML
const btnNuevo = document.querySelector('#btnNuevo');
const btnSolicitar = document.querySelector('#btnSolicitar');
const btnDetener = document.querySelector('#btnDetener');

const divCartasJugador = document.querySelector('#cartas-jugador');
const divCartasMaquina = document.querySelector('#cartas-maquina');
const puntosHTML = document.querySelectorAll('small');

const crearMazo = () => {

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

    // método para desordenar un arrego con underscore.js
    mazo = _.shuffle(mazo);

    return mazo;
}

crearMazo();

const solicitarCarta = () => {
    // Obtenemos una carta aleatoria de nuestro mazo
    // const carta = mazo[Math.floor(Math.random() * mazo.length)];

    if (mazo.length === 0) throw 'No hay cartas en el mazo';

    // Obtenemos el último elemento del arreglo y lo elimina
    return mazo.pop();
}

const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    return (isNaN(valor))
        ? (valor === 'A') ? 11 : 10 // Igual a 'As'
        : valor * 1; // Multi x 1 para convertir a number
}

// Lógica Máquina
const turnoMaquina = (puntosMinimos) => {
    do {

        const carta = solicitarCarta();

        puntosMaquina = puntosMaquina + valorCarta(carta);
        puntosHTML[1].innerText = puntosMaquina;

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasMaquina.append(imgCarta);

        if (puntosMinimos > 21) break;

    } while ((puntosMaquina < puntosMinimos) && (puntosMinimos <= 21));

    // Provisorio
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
    }, 10);

}

// Eventos
btnSolicitar.addEventListener('click', () => {
    const carta = solicitarCarta();

    puntosJugador = puntosJugador + valorCarta(carta);
    puntosHTML[0].innerText = puntosJugador;

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartasJugador.append(imgCarta);

    if (puntosJugador > 21) {
        console.warn('Has perdido u_U');
        btnSolicitar.disabled = true;
        btnDetener.disabled = true;

        turnoMaquina(puntosJugador);
    } else if (puntosJugador === 21) {
        console.warn('21! Ganaste!');
        btnSolicitar.disabled = true;
        btnDetener.disabled = true;

        turnoMaquina(puntosJugador);
    }
});

btnDetener.addEventListener('click', () => {
    btnSolicitar.disabled = true;
    btnDetener.disabled = true;
    turnoMaquina(puntosJugador);
});

btnNuevo.addEventListener('click', () => {

    console.clear();

    mazo = [];
    mazo = crearMazo();

    puntosJugador = 0;
    puntosMaquina = 0;

    puntosHTML[0].innerText = puntosJugador;
    puntosHTML[1].innerText = puntosMaquina;

    divCartasJugador.innerHTML = '';
    divCartasMaquina.innerHTML = '';

    btnSolicitar.disabled = false;
    btnDetener.disabled = false;
})

/**
 * Apuntes:
 * -JS permite trabajar los strings comos si fuesen arreglos
 * -isNaN => is Not a Number. Evalúa si es un número o no
 *
 * DOM (Document Object Model)
 * -los métodos getElementBy... llaman al método querySelector()
 * -classList => nos permite acceder a las clases CSS de un elemento HTML
 *
 * -Es recomendable guardar las referencias a un elemento dentro de una variable cuando se llamen más de una vez
 *      Ej: var titulo = document.querySelector('.titulo');
 *
 * -createElement() => Crea un elemento HTML en memoria
 *      Ej: var btnNuevo = document.createElement('button');
 *
 * -append() => Inserta un nuevo elemento HTML al documento
 *      Ej: divBotones.append(btnNuevo);
 *
 * - .innnerHTML = "hola!" => Permite insertar texto dentro de las etiquetas HTML
 *
 * - .classList.add('nomClase') => insertamos una clase CSS a un elemento HTML
 */