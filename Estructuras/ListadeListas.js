class NodoArtista {
    constructor(name, age, country) {
        this.name = name
        this.age = age
        this.country = country
        this.abajo = null
        this.derecha = null
        this.arriba=null
    }
}

class NodoCancion {
    constructor(artist, name, duration, gender) {
        this.artist = artist
        this.name = name
        this.duration = duration
        this.gender = gender
        this.siguiente = null
        this.anterior = null
    }
}

class Lista {
    constructor() {
        this.primero = null
    }

    agregarArtista(name, age, country) {
        if (this.primero == null) {
            this.primero = new NodoArtista(name, age, country)
            return
        }
        let actual = this.primero
        while (actual.abajo != null) {
            actual = actual.abajo
        }
        actual.abajo = new NodoArtista(name, age, country)
        actual.abajo.arriba=actual

    }

    agregarCancion(artist, name, duration, gender) {
        let actual = this.primero
        while (actual != null) {
            if (artist == actual.name) {
                break
            }
            actual = actual.abajo

        }
        if (actual != null) {
            if (actual.derecha == null) {
                actual.derecha = new NodoCancion(artist, name, duration, gender);
                return
            }

            let actual1 = actual.derecha
            while (actual1.siguiente != null) {
                actual1 = actual1.siguiente
            }
            actual1.siguiente = new NodoCancion(artist, name, duration, gender)
            actual1.siguiente.anterior = actual1
        }

    }

    ordenAscendente() {
        let actual = this.primero
        let cambio = false
        let nombre, edad, pais
        let listaAcceso = null
        while (actual != null) {
            let aux1 = this.primero
            while (aux1.abajo != null) {
                if (aux1.name > aux1.abajo.name) {
                    nombre = aux1.abajo.name
                    edad = aux1.abajo.age
                    pais = aux1.abajo.country
                    listaAcceso = aux1.abajo.derecha
                    aux1.abajo.name = aux1.name
                    aux1.abajo.age = aux1.age
                    aux1.abajo.country = aux1.country
                    aux1.abajo.derecha = aux1.derecha
                    aux1.name = nombre
                    aux1.age = edad
                    aux1.country = pais
                    aux1.derecha = listaAcceso
                    cambio = true
                }
                aux1 = aux1.abajo
            }
            if (!cambio) return
            cambio = false
            actual = actual.abajo
        }

    }

    partition(inicio, final) {
        let peque = inicio
        let pivote_name = final.name
        let pivote_age = final.age
        let pivote_country = final.country
        let pivote_derecha = final.derecha
        let anterior = null

        while (inicio != final) {
            if (inicio.name > pivote_name) {
                let nombre = inicio.name
                let edad = inicio.age
                let pais = inicio.country
                let lista = inicio.derecha

                inicio.name = peque.name
                inicio.age = peque.age
                inicio.country = peque.country
                inicio.derecha = peque.derecha

                peque.name = nombre
                peque.age = edad
                peque.country = pais
                peque.derecha = lista

                anterior = peque

                peque = peque.abajo
            }
            inicio = inicio.abajo
        }
        final.name = peque.name
        final.age = peque.age
        final.country = peque.country
        final.derecha = peque.derecha

        peque.name = pivote_name
        peque.age = pivote_age
        peque.country = pivote_country
        peque.derecha = pivote_derecha

        return anterior
    }

    quicksort(inicio, fin) {
        if (inicio == fin || fin == null || inicio == null) {
            return
        }

        let final = this.partition(inicio, fin)
        this.quicksort(inicio, final)

        if (fin.abajo == null && final) {
            this.quicksort(final.abajo.abajo, fin)
        } else if (final == null) {
            this.quicksort(inicio.abajo, fin)
        }
    }


    ordenar() {
        let actual = this.primero
        while (actual.abajo != null) {
            actual = actual.abajo
        }

        return this.quicksort(this.primero, actual)
    }

    retornar() {
        return this.primero;
    }
}