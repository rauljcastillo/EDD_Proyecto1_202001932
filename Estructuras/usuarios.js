
//----------Clase para usuarios
class NodoUser {
    constructor(dpi, name, username, password, phone, admin) {
        this.dpi = dpi
        this.name = name
        this.username = username
        this.password = password
        this.phone = phone
        this.admin = admin
        this.siguiente = null
        this.pila = null
        this.cola = null
        this.playlist = null
    }

}

class ListaSimple {
    constructor() {
        this.primero = null
    }

    agregar(dpi, name, username, password, phone, admin) {
        if (this.primero == null) {
            this.primero = new NodoUser(dpi, name, username, password, phone, admin)
            return
        }
        let actual = this.primero
        while (actual.siguiente != null) {
            actual = actual.siguiente
        }
        actual.siguiente = new NodoUser(dpi, name, username, password, phone, admin)
    }

    buscar(user, contras, admins = false) {
        let actual = this.primero
        while (actual != null) {
            if (actual.username == user && actual.password == contras && actual.admin == admins) {
                return actual
            }
            actual = actual.siguiente
        }
    }

    retornar() {
        let contenedor = ""
        let actual = this.primero
        while (actual != null) {
            if (!actual.admin) {
                contenedor += `
                <div class="agregar-amigo">
                    <p>${actual.name}</p>
                    <button name="agregar">Agregar</button>
                    <button name="bloquear">Bloquear</button>
                </div>
            `;
            }

            actual = actual.siguiente
        }

        return contenedor
    }

    graficar() {
        let actual = this.primero
        let contenido = ""
        let contador = 0
        contenido = 'digraph {\n'
        contenido += 'node [shape=box]\n'
        contenido += 'graph [rankdir=LR]\n'
        while (actual != null) {
            contenido += `N${contador}[label="${actual.name}"]\n`;
            if (actual.siguiente != null) {
                contenido += `N${contador}->N${contador + 1}\n`;
            }
            contador++
            actual = actual.siguiente
        }
        contenido += '}'
        return contenido
    }

    imprimir() {
        var actual = this.primero
        while (actual != null) {
            console.log(actual)
            actual = actual.siguiente
        }
    }
}
