class NodoEncabezado {
    constructor(dato,num=null) {
        this.dato = dato;
        this.num=num
        this.siguiente = null;
        this.anterior = null;
        this.acceso = null;
    }
}

class NodoInterno {
    constructor(month, fila, day, song, artist) {
        this.month = month;
        this.day = day;
        this.song = song;
        this.fila = fila
        this.artist = artist
        this.arriba = null;
        this.abajo = null;
        this.derecha = null;
        this.izquierda = null;
    }
}

class ListaEncabezado {
    constructor(tipo = null) {
        this.tipo = tipo;
        this.primero = null;
        this.ultimo = null;
    }

    agregar(dato,num=null) {
        if (this.tipo == "FILAS") {
            if (this.primero == null) {
                this.primero = new NodoEncabezado(dato,num)
                this.ultimo = this.primero
                return
            }
            let nodo_n = new NodoEncabezado(dato,num)
            this.ultimo.siguiente = nodo_n
            this.ultimo = nodo_n
            return
        }


        if (this.primero == null) {
            this.primero = new NodoEncabezado(dato)
            this.ultimo = this.primero
            return
        }
        else if (dato > this.ultimo.dato) {
            let nuevo_nodo = new NodoEncabezado(dato)
            this.ultimo.siguiente = nuevo_nodo
            nuevo_nodo.anterior = this.ultimo
            this.ultimo = nuevo_nodo
            return
        }

        else if (dato < this.primero.dato) {
            let aux = this.primero
            this.primero = new NodoEncabezado(dato)
            this.primero.siguiente = aux
            aux.anterior = this.primero
            return
        }
        let actual = this.primero
        while (actual.siguiente != null) {
            if (dato > actual.dato && dato < actual.siguiente.dato) {
                let nuevo_nodo = new NodoEncabezado(dato)
                nuevo_nodo.siguiente = actual.siguiente
                actual.siguiente.anterior = nuevo_nodo
                actual.siguiente = nuevo_nodo
                nuevo_nodo.anterior = actual
                return
            }
            actual = actual.siguiente
        }
    }

    imprimir() {
        let actual = this.primero
        while (actual != null) {
            console.log(actual.dato)
            actual = actual.siguiente
        }
    }

    existe(dato) {
        let actual = this.primero
        while (actual != null) {
            if (actual.dato == dato) return actual
            actual = actual.siguiente
        }

    }
}

class Matriz {
    constructor() {
        this.filas = new ListaEncabezado("FILAS")
        this.filas.agregar("January",1)
        this.filas.agregar("February",2)
        this.filas.agregar("March",3)
        this.filas.agregar("April",4)
        this.filas.agregar("May",5)
        this.filas.agregar("June",6)
        this.filas.agregar("July",7)
        this.filas.agregar("August",8)
        this.filas.agregar("September",9)
        this.filas.agregar("October",10)
        this.filas.agregar("November",11)
        this.filas.agregar("December",12)
        this.columnas = new ListaEncabezado()

        this.verificar = {
            "January": 1,
            "February": 2,
            "March": 3,
            "April": 4,
            "May": 5,
            "June": 6,
            "July": 7,
            "August": 8,
            "September": 9,
            "October": 10,
            "November": 11,
            "December": 12
        }
    }

    insertar(month, day, song, artist) {

        let nuevo_nodo = new NodoInterno(month, this.verificar[month], day, song, artist)
        let nodoCol = this.columnas.existe(day)
        let nodFila = this.filas.existe(month)
        if (nodoCol == null) {
            this.columnas.agregar(day)
            nodoCol = this.columnas.existe(day)
        }

        //Ingresar en fila
        if (nodFila.acceso == null) {
            nodFila.acceso = nuevo_nodo
        } else {
            let aux = nodFila.acceso

            if (day < aux.day) {
                nuevo_nodo.derecha = aux
                aux.izquierda = nuevo_nodo
                nodFila.acceso = nuevo_nodo

            } else {
                while (aux != null) {
                    if (day == aux.day) {
                        let nodito = this.existe(nodFila, this.verificar[month], day)
                        nodito.song = song;
                        nodito.artist = artist;
                        return
                    } else if (aux.derecha == null && day > aux.day) {
                        aux.derecha = nuevo_nodo
                        nuevo_nodo.izquierda = aux
                        break

                    } else if (day < aux.day) {
                        nuevo_nodo.derecha = aux
                        aux.izquierda.derecha = nuevo_nodo
                        nuevo_nodo.izquierda = aux.izquierda
                        aux.izquierda = nuevo_nodo
                        break
                    }
                    aux = aux.derecha;
                }
            }

        }


        //Ingresa en columna
        if (nodoCol.acceso == null) {
            nodoCol.acceso = nuevo_nodo
        } else {
            let aux = nodoCol.acceso

            if (this.verificar[month] < aux.fila) {
                nuevo_nodo.abajo = aux
                aux.arriba = nuevo_nodo
                nodoCol.acceso = nuevo_nodo
            } else {
                while (aux != null) {
                    if (aux.abajo == null && this.verificar[month] > aux.fila) {
                        aux.abajo = nuevo_nodo
                        nuevo_nodo.arriba = aux
                        break

                    } else if (this.verificar[month] < aux.fila) {
                        nuevo_nodo.abajo = aux
                        aux.arriba.abajo = nuevo_nodo
                        nuevo_nodo.arriba = aux.arriba
                        aux.arriba = nuevo_nodo
                        return
                    }
                    aux = aux.abajo;
                }
            }
        }
    }
    //
    existe(nodo, month, day) {
        let aux = nodo.acceso
        while (aux != null) {
            if (aux.fila == month && aux.day == day) {
                return aux
            }
            aux = aux.derecha
        }
    }

    retornar(month, day) {
        let aux = this.filas.primero
        let nodo = null
        while (aux != null) {
            if (aux.num == month) {
                nodo = aux.acceso
                break
            }
            aux = aux.siguiente
        }
        if (nodo != null) {
            while (nodo != null) {
                if (nodo.day == day) {
                    return {song: nodo.song, artist: nodo.artist}
                }
                nodo = nodo.derecha
            }
        }
    }

}