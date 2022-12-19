class NodoPlay {
    constructor(nombre, duracion, genero) {
        this.nombre = nombre;
        this.duracion = duracion;
        this.genero = genero;
        this.siguiente = null
        this.anterior = null
    }
}

class ListaCircular {
    constructor() {
        this.primero = null
        this.size = 0
    }

    agregar(nombre, duracion, genero) {
        if (this.primero == null) {
            this.primero = new NodoPlay(nombre, duracion, genero)
            this.primero.siguiente = this.primero
            this.size++
            return
        }
        let actual = this.primero
        while (actual.siguiente != this.primero) {
            actual = actual.siguiente
        }
        let nuevo_nodo = new NodoPlay(nombre, duracion, genero)
        actual.siguiente = nuevo_nodo
        nuevo_nodo.anterior = actual
        nuevo_nodo.siguiente = this.primero
        this.size++

    }
    recorrer() {
        let contador = 1
        let actual = this.primero
        let contenedor = ""
        while (contador <= this.size) {
            contenedor += `
            <div class="tarjeta">
                <p>Nombre: ${actual.nombre}</p>
                <p>Duración: ${actual.duracion}</p>
                <p>Género: ${actual.genero}</p>
            </div>
            `;
            actual = actual.siguiente
            contador++
        }

        return contenedor
    }

    
}
