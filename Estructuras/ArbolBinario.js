class NodoArbol {
    constructor(name, topic, guests, duration) {
        this.name = name
        this.topic = topic
        this.guests = guests;
        this.duration = duration
        this.izquierda = null
        this.derecha = null

    }
}

class Arbol {
    constructor() {
        this.raiz = null
    }


    #agregarNodos(nodo, name, topic, guests, duration) {
        if (nodo == null) {
            return new NodoArbol(name, topic, guests, duration)
        }

        if (name < nodo.name) {
            nodo.izquierda = this.#agregarNodos(nodo.izquierda, name, topic, guests, duration)
        } else {
            nodo.derecha = this.#agregarNodos(nodo.derecha, name, topic, guests, duration)
        }
        return nodo
    }

    #Preorder(nodo, temp = "") {
        if (nodo != null) {
            temp += `
            <div class="card-podcast">
                <p>Nombre: ${nodo.name}</p>
                <p>Tema: ${nodo.topic}</p>
                <p>Invitados: ${nodo.guests.join(", ")}</p>
                <p>Duración: ${nodo.duration}</p>
            </div>
            `;
            temp = this.#Preorder(nodo.izquierda, temp)
            temp = this.#Preorder(nodo.derecha, temp)
        }
        return temp

    }

    Preorder() {
        return this.#Preorder(this.raiz)
    }

    agregar(name, topic, guests, duration) {
        this.raiz = this.#agregarNodos(this.raiz, name, topic, guests, duration)
    }
}