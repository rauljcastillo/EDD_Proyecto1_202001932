class NodoCola {
    constructor(name, username, phone) {
        this.name = name;
        this.username = username;
        this.phone = phone;
        this.siguiente = null;
    }
}


class Cola {
    constructor() {
        this.primero = null
        this.ultimo = null
    }

    encolar(name) {
        if (this.primero == null) {
            this.primero = new NodoCola(name)
            this.ultimo = this.primero
            return
        }
        this.ultimo.siguiente = new NodoCola(name);
        this.ultimo = this.ultimo.siguiente

    }

    desencolar() {
        let actual = this.primero
        if (actual != null) {
            this.primero = actual.siguiente
            actual.siguiente = null
            return actual
        }

    }
    existe(name) {
        let actual = this.primero
        while (actual != null) {
            if (actual.name == name) return true
            actual = actual.siguiente
        }

        return false
    }
    recorrer() {
        let actual = this.primero
        let contenedor = ""
        while (actual != null) {
            contenedor += `
            <div class="amigo-register">
                <p>${actual.name}</p>
            </div>
            `;
            actual = actual.siguiente
        }

        return contenedor
    }
}