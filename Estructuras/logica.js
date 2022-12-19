let objLista = new ListaSimple()
let matriz = new Matriz()
let objP = new Lista()
let arbol = new Arbol()
let retorno_usuario = null
let reference={
    "01": "January",
    "02": "February",
    "03": "March",
    "04": "April",
    "05": "May",
    "06": "June",
    "07": "July",
    "08": "August",
    "09": "September",
    "10": "October",
    "11": "November",
    "12": "December",
}


let container = document.querySelector(".container")
let registro = document.querySelector(".registro")

let form1 = document.querySelector(".container form")
let form2 = document.querySelector(".registro form")

let boton1 = document.getElementById("boton1")
let boton2 = document.getElementById("boton2")

objLista.agregar("1231231", "Raul", "raul", "123", "4229744", true)
objLista.agregar("1231231", "carlos", "carlos", "1234", "4229744", true)


boton1.addEventListener("click", (e) => {
    e.preventDefault()
    container.style.display = "none"
    registro.style.display = "block"

})

boton2.addEventListener("click", (e) => {
    e.preventDefault()
    registro.style.display = "none"
    container.style.display = "block"
})

//-------Detecta si se hizo click sobre el boton ingresar
form1.addEventListener("submit", (e) => {
    e.preventDefault()
    let a = document.getElementById("check")
    let b = document.getElementById("user").value
    let c = document.getElementById("pass").value
    if (a.checked == true) {
        retorno_usuario = objLista.buscar(b, c, true)
        if (retorno_usuario) {
            document.querySelector(".admin").style.display = "block"
            container.style.display = "none"
            form1.reset()

        } else {
            alert("Admin no encontrado")
        }

    } else {
        retorno_usuario = objLista.buscar(b, c)
        if (retorno_usuario) {
            document.querySelector(".usuario").style.display = "block"
            container.style.display = "none"
            if (retorno_usuario.playlist == null) retorno_usuario.playlist = new ListaCircular()
            if (retorno_usuario.pila == null) retorno_usuario.pila = new Pila()
            if (retorno_usuario.cola == null) retorno_usuario.cola = new Cola()

            canciones()
            Musica()
            document.querySelector(".usuarios").innerHTML = objLista.retornar()
            document.querySelector(".cont-p").innerHTML = retorno_usuario.playlist.recorrer()
            form1.reset()
        } else {
            alert("Usuario no encontrado")
            form1.reset()
        }
    }
})


//------Detecta cuando se hizo click sobre el boton registrar
form2.addEventListener("submit", (e) => {
    e.preventDefault()
    let usuario = document.getElementById("usuario").value
    let nombre = document.getElementById("nombre").value
    let dpi = document.getElementById("dpi").value
    let telefono = document.getElementById("telef").value
    let contras = document.getElementById("contrasenia").value
    let ban = objLista.buscar(usuario, contras)
    if (ban == null) {
        objLista.agregar(dpi, nombre, usuario, contras, telefono, false)
        form2.reset()
        alert("Usuario registrado")
    } else {
        alert("El usuario ya está registrado")
    }
})

document.getElementById("btnUser").addEventListener("click", () => {
    document.querySelector(".CargarUs").style.display = "flex"
    document.querySelector(".CargarArt").style.display = "none"
    document.querySelector(".CargarCan").style.display = "none"
    document.querySelector(".MusicP").style.display = "none"
    document.querySelector(".Podc").style.display = "none"
    document.getElementById("graph-users").style.display = "none";

})

document.getElementById("btnArtis").addEventListener("click", () => {
    document.querySelector(".CargarArt").style.display = "block"
    document.querySelector(".CargarUs").style.display = "none"
    document.querySelector(".CargarCan").style.display = "none"
    document.querySelector(".Podc").style.display = "none"
    document.querySelector(".MusicP").style.display = "none"
    document.getElementById("graph-users").style.display = "none";

})

document.getElementById("btnCan").addEventListener("click", () => {
    document.querySelector(".CargarArt").style.display = "none"
    document.querySelector(".CargarUs").style.display = "none"
    document.querySelector(".Podc").style.display = "none"
    document.querySelector(".CargarCan").style.display = "block"
    document.querySelector(".MusicP").style.display = "none"
    document.getElementById("graph-users").style.display = "none";
})

document.getElementById("btnMusic").addEventListener("click", () => {
    document.querySelector(".CargarArt").style.display = "none"
    document.querySelector(".CargarUs").style.display = "none"
    document.querySelector(".CargarCan").style.display = "none"
    document.querySelector(".Podc").style.display = "none"
    document.querySelector(".MusicP").style.display = "block"
    document.getElementById("graph-users").style.display = "none";

})

document.getElementById("btnPod").addEventListener("click", () => {
    document.querySelector(".CargarArt").style.display = "none"
    document.querySelector(".CargarUs").style.display = "none"
    document.querySelector(".CargarCan").style.display = "none"
    document.querySelector(".MusicP").style.display = "none"
    document.querySelector(".Podc").style.display = "block"
    document.getElementById("graph-users").style.display = "none";

})









document.getElementById("salir").addEventListener("click", () => {
    container.style.display = "block"
    document.querySelector(".admin").style.display = "none"
    document.querySelector(".CargarArt").style.display = "none"
    document.querySelector(".CargarUs").style.display = "none"
    document.querySelector(".CargarCan").style.display = "none"
    document.querySelector(".MusicP").style.display = "none"
    document.querySelector(".Podc").style.display = "none"
    document.getElementById("graph-users").style.display = "none";

})



document.getElementById("salir2").addEventListener("click", () => {
    document.querySelector(".usuario").style.display = "none"
    container.style.display = "block"
    document.querySelector(".music-user").style.display = "none"
    document.querySelector(".playlist-user").style.display = "none"
    document.querySelector(".arts-user").style.display = "none"

})


document.querySelector(".CargarUs form").addEventListener("submit", (e) => {
    e.preventDefault()
    let archivo = document.getElementById("Usuarios").files[0];
    let reader = new FileReader()
    reader.onload = function (e) {
        let contenido = e.target.result
        contenido = JSON.parse(contenido)
        contenido.forEach(element => {
            objLista.agregar(element.dpi.toString(), element.name, element.username, element.password, element.phone.toString(), element.admin)
        });

    }
    reader.readAsText(archivo)
    document.querySelector(".CargarUs form").reset()
    alert("Archivo cargado")
})

//--------Detecta el evento del form de los artistas
document.querySelector(".CargarArt form").addEventListener("submit", (e) => {
    e.preventDefault()
    let archivo = document.getElementById("artist").files[0];
    let reader = new FileReader()
    reader.onload = function (e) {
        let contenido = e.target.result
        contenido = JSON.parse(contenido)
        contenido.forEach(element => {
            objP.agregarArtista(element.name, element.age, element.country)
        });

    }
    reader.readAsText(archivo)
    document.querySelector(".CargarArt form").reset()
    alert("Archivo cargado")
})


//-------Detecta el evento del form de la carga de las canciones
document.querySelector(".CargarCan form").addEventListener("submit", (e) => {
    e.preventDefault()
    let archivo = document.getElementById("songs").files[0];
    let reader = new FileReader()
    reader.onload = function (e) {
        let contenido = e.target.result
        contenido = JSON.parse(contenido)
        contenido.forEach(element => {
            objP.agregarCancion(element.artist, element.name, element.duration.toString(), element.gender)
        });

    }
    reader.readAsText(archivo)
    document.querySelector(".CargarCan form").reset()
    alert("Archivo cargado")

})

//-----Detecta el evento del form del podcast
document.querySelector(".Podc form").addEventListener("submit", (e) => {
    e.preventDefault()
    let archivo = document.getElementById("podca").files[0];
    let reader = new FileReader()
    reader.onload = function (e) {
        let contenido = e.target.result
        contenido = JSON.parse(contenido)
        contenido.forEach(element => {
            arbol.agregar(element.name, element.topic, element.guests, element.duration)
        })
    }
    reader.readAsText(archivo)
    document.querySelector(".Podc form").reset()
    alert("Archivo cargado")

})


//----Detecta el evento del form de la musica programada
document.querySelector(".MusicP form").addEventListener("submit", (e) => {
    e.preventDefault()
    let archivo = document.getElementById("musicP").files[0];
    let reader = new FileReader()
    reader.onload = function (e) {
        let contenido = e.target.result
        contenido = JSON.parse(contenido)
        contenido.forEach(element => {
            matriz.insertar(element.month, element.day, element.song, element.artist)
        })
    }
    reader.readAsText(archivo)
    document.querySelector(".MusicP form").reset()
    alert("Archivo cargado")
})

//------Boton que muestra los artistas
document.getElementById("btnArts").addEventListener("click", () => {
    document.querySelector(".arts-user").style.display = "block";
    document.querySelector(".playlist-user").style.display = "none";
    document.querySelector(".music-user").style.display = "none";
    document.querySelector(".footer").style.display = "none";
    document.querySelector(".podcast-user").style.display = "none";
    document.querySelector(".public-podc").style.display = "none";
    document.querySelector(".amigos").style.display = "none";
    document.querySelector(".bloqueos").style.display = "none";
    document.querySelector(".public-songs").style.display = "none";

})

//----Muestra la musica 
document.getElementById("btnMusicP").addEventListener("click", () => {
    document.querySelector(".footer").style.display = "flex";
    document.querySelector(".music-user").style.display = "flex";
    document.querySelector(".public-podc").style.display = "none";
    document.querySelector(".playlist-user").style.display = "none";
    document.querySelector(".arts-user").style.display = "none";
    document.querySelector(".podcast-user").style.display = "none";
    document.querySelector(".amigos").style.display = "none";
    document.querySelector(".bloqueos").style.display = "none";
    document.querySelector(".public-songs").style.display = "none";
    

})





//Detecta si cambió el input fecha
document.getElementById("date").addEventListener("change", (e) => {
    e.preventDefault()
    let fecha = document.getElementById("date").value.split("-")
    let objeto = matriz.retornar(parseInt(fecha[1], 10), parseInt(fecha[2], 10))
    if (objeto) {
        document.getElementById("temporal").style.backgroundColor = "rgb(255, 195, 0)";
        document.getElementById("temporal").innerHTML = `
        <p>Cancion: ${objeto.song}</p>
        <p>Artista: ${objeto.artist}</p>
        `;

    } else {
        document.getElementById("temporal").innerHTML = ""
        document.getElementById("temporal").style.backgroundColor = "white"
    }

})


//-----Boton que muestra la playList
document.getElementById("btnPlay").addEventListener("click", () => {
    document.querySelector(".playlist-user").style.display = "block";
    document.querySelector(".music-user").style.display = "none";
    document.querySelector(".arts-user").style.display = "none";
    document.querySelector(".footer").style.display = "none";
    document.querySelector(".podcast-user").style.display = "none";
    document.querySelector(".public-podc").style.display = "none";
    document.querySelector(".amigos").style.display = "none";
    document.querySelector(".bloqueos").style.display = "none";
    document.querySelector(".public-songs").style.display = "none";

})

//------Muestra lo que hay en la pestaña amigos
document.getElementById("btnAmig").addEventListener("click", () => {
    document.querySelector(".playlist-user").style.display = "none";
    document.querySelector(".music-user").style.display = "none";
    document.querySelector(".arts-user").style.display = "none";
    document.querySelector(".footer").style.display = "none";
    document.querySelector(".podcast-user").style.display = "none";
    document.querySelector(".public-podc").style.display = "none";
    document.querySelector(".amigos").style.display = "block";
    document.querySelector(".bloqueos").style.display = "none";
    document.querySelector(".public-songs").style.display = "none";
})





//----Detecta si se hizo click sobre el boton agregar a la playlist
document.querySelector(".arts-user").addEventListener("click", (e) => {
    e.preventDefault()
    if (e.target.name == "boton") {
        let elemento = e.target.parentElement.getElementsByTagName("p")
        let a = elemento[0].textContent.replace("Nombre: ", "")
        let b = elemento[1].textContent.replace("Duración: ", "")
        let c = elemento[2].textContent.replace("Género: ", "")
        retorno_usuario.playlist.agregar(a, b, c)
        document.querySelector(".cont-p").innerHTML = retorno_usuario.playlist.recorrer()
        alert("Cancion agregada a la Playlist")
    }
})

//Detecta si se hace click sobre el boton mostrar podcast

document.getElementById("btnPodC").addEventListener("click", (e) => {
    document.querySelector(".podcast-user").style.display = "flex";
    document.querySelector(".public-podc").style.display = "block";
    document.querySelector(".playlist-user").style.display = "none";
    document.querySelector(".music-user").style.display = "none";
    document.querySelector(".arts-user").style.display = "none";
    document.querySelector(".footer").style.display = "none";
    document.querySelector(".bloqueos").style.display = "none";
    document.querySelector(".amigos").style.display = "none";
    document.querySelector(".public-songs").style.display = "none";
    document.querySelector(".podcast-user").innerHTML = arbol.Preorder()
})


document.getElementById("btnBloq").addEventListener("click", () => {
    document.querySelector(".bloqueos").style.display = "block";
    document.querySelector(".podcast-user").style.display = "none";
    document.querySelector(".public-podc").style.display = "none";
    document.querySelector(".playlist-user").style.display = "none";
    document.querySelector(".music-user").style.display = "none";
    document.querySelector(".arts-user").style.display = "none";
    document.querySelector(".footer").style.display = "none";
    document.querySelector(".amigos").style.display = "none";
    document.querySelector(".public-songs").style.display = "none";
})


//Detecta si se hizo submit al formulario del podcast
document.querySelector(".public-podc form").addEventListener("submit", (e) => {
    e.preventDefault()
    let name = document.getElementById("nameP").value
    let tema = document.getElementById("temaP").value
    let invitado = document.getElementById("invitP").value.replaceAll(" ", "").split(",")
    let duracion = document.getElementById("duracP").value
    arbol.agregar(name, tema, invitado, duracion)
    document.querySelector(".podcast-user").innerHTML = arbol.Preorder()
    document.querySelector(".public-podc form").reset()
    alert("Podcast agregado con éxito")
})


//Detecta si se hizo click sobre el boton agregar a la playlist de la vista de canciones
document.querySelector(".music-user").addEventListener("click", (e) => {
    e.preventDefault()
    if (e.target.name == "boton") {
        let elemento = e.target.parentElement.getElementsByTagName("p")
        let a = elemento[0].textContent.replace("Nombre: ", "")
        let b = elemento[1].textContent.replace("Duración: ", "")
        let c = elemento[2].textContent.replace("Género: ", "")
        retorno_usuario.playlist.agregar(a, b, c)
        document.querySelector(".cont-p").innerHTML = retorno_usuario.playlist.recorrer()
        alert("Cancion agregada a la Playlist")
    }
})

//----Detecta si se realizo click sobre agregar amigo o bloquear-----
document.querySelector(".usuarios").addEventListener("click", (e) => {
    if (e.target.name == "agregar") {
        let a = e.target.parentElement.getElementsByTagName("p")[0].textContent
        if (!retorno_usuario.pila.existe(a) && !retorno_usuario.cola.existe(a)) {
            retorno_usuario.pila.push(a)
            document.querySelector(".amigo").innerHTML = retorno_usuario.pila.recorrer()
            return
        }
        alert("No es posible agregar a este usuario")

    } else if (e.target.name == "bloquear") {
        let a = e.target.parentElement.getElementsByTagName("p")[0].textContent
        if (!retorno_usuario.cola.existe(a)) {
            retorno_usuario.cola.encolar(a)
            document.querySelector(".user-bloq").innerHTML = retorno_usuario.cola.recorrer()
            alert("Usuario bloqueado")
            return
        }
        alert("El usuario ya está bloqueado")
    }
})

document.querySelector(".public-songs").addEventListener("click",(e)=>{
    if(e.target.name=="pub"){
        let valor=document.getElementById("pub-song").value
        let durac=document.getElementById("pub-durat").value
        let gener=document.getElementById("pub-gener").value.replaceAll(" ", "").split(",")
        objP.agregarArtista(retorno_usuario.name,"","")
        objP.agregarCancion(retorno_usuario.name,valor,durac,gener)
        canciones()
        Musica()
        alert("Cancion publicada")
        document.querySelector(".public-songs").style.display="none"
        document.querySelector(".music-user").style.display="flex"

    }else if(e.target.name=="prog"){
        let valor=document.getElementById("pub-song").value
        let fecha=document.getElementById("pub-date").value.split("-")
        matriz.insertar(reference[fecha[1]],parseInt(fecha[2],10),valor,retorno_usuario.name)
        alert("Cancion programada ")
        document.querySelector(".public-songs").style.display="none"
        document.querySelector(".music-user").style.display="flex"
    }
})


function canciones() {
    let aux = objP.retornar()
    let lista = null
    document.querySelector(".conten-arts").innerHTML = ""
    while (aux != null) {
        lista = document.createElement("div")
        lista.className = "lista"
        lista.innerHTML += `
            <div class="artista">
                <p>Nombre: ${aux.name}</p>
                <p>Edad: ${aux.age}</p>
                <p>País: ${aux.country}</p>
            </div>
        `;
        if (aux.derecha != null) {
            let aux1 = aux.derecha
            while (aux1 != null) {
                lista.innerHTML += `
                    <div class="songs">
                        <button name="boton">+</button>
                        <p>Nombre: ${aux1.name}</p>
                        <p>Duración: ${aux1.duration}</p>
                        <p>Género: ${aux1.gender.join(", ")}</p>
                    </div>
                `;
                aux1 = aux1.siguiente
            }
        }
        document.querySelector(".conten-arts").appendChild(lista)
        aux = aux.abajo

    }
}


//Funcion que crea las tarjetas de la musica
function Musica() {
    let obj = objP.retornar()
    let aux = null
    document.querySelector(".music-user").innerHTML = ""
    while (obj != null) {
        if (obj.derecha != null) {
            aux = obj.derecha
            while (aux != null) {
                document.querySelector(".music-user").innerHTML += `
                <div class="Ctarjeta">
                    <button name="boton">+</button>
                    <p>Nombre: ${aux.name}</p>
                    <p>Duración: ${aux.duration}</p>
                    <p>Género: ${aux.gender.join(", ")}</p>
                </div>
                `;
                aux = aux.siguiente
            }
        }
        obj = obj.abajo
    }
}

function ordenAsc() {
    objP.ordenAscendente()
    canciones()
}

function ordenDesc(){
    objP.ordenar()
    canciones()
}

function eliminardePila() {
    retorno_usuario.pila.pop()
    document.querySelector(".amigo").innerHTML = retorno_usuario.pila.recorrer()
}

function eliminardeCola() {
    retorno_usuario.cola.desencolar()
    document.querySelector(".user-bloq").innerHTML = retorno_usuario.cola.recorrer()
    alert("Usuario desbloqueado")

}

function mostrarPublic(){
    document.querySelector(".public-songs").style.display="block"
    document.querySelector(".music-user").style.display="none"

}

function graficaUsers(){
    document.getElementById("graph-users").style.display = "flex";
    document.querySelector(".CargarArt").style.display = "none";
    document.querySelector(".CargarUs").style.display = "none";
    document.querySelector(".CargarCan").style.display = "none";
    document.querySelector(".MusicP").style.display = "none";
    document.querySelector(".Podc").style.display = "none";
    let contenido=objLista.graficar()
    d3.select("#graph-users").graphviz()
        .renderDot(contenido)    
}