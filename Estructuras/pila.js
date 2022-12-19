class NodoPila {
    constructor(name) {
        this.name = name
        this.siguiente = null
    }
}

class Pila {
    constructor() {
        this.primero = null
    }

    push(name) {
        if (this.primero == null) {
            this.primero = new NodoPila(name)
            return
        }
        let aux = this.primero
        this.primero = new NodoPila(name)
        this.primero.siguiente = aux
    }

    pop() {
        let actual = this.primero
        if (actual) {
            this.primero = actual.siguiente
            actual.siguiente = null
            return actual
        }

    }

    recorrer() {
        let actual = this.primero
        let contenido = ""
        while (actual != null) {
            contenido += `
            <div class="amigo-register">
                <p>${actual.name}</p>
            </div>
            `;
            actual = actual.siguiente
        }

        return contenido
    }

    existe(name) {
        let actual = this.primero
        while (actual != null) {
            if (actual.name == name) return true
            actual = actual.siguiente
        }

        return false
    }
}