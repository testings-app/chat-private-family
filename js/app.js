// ======================>   <====================== 
const buttons = document.getElementById('botones')
const main = document.getElementById('main')
const btnUser = document.getElementById('btn-user')
const usuert = document.getElementById('usuert')
const app = document.getElementById('app')

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        buttons.innerHTML = `<button id="salir" class="btn btn-danger">Cerrar Sesion</button>        `
        var uid = user.uid;
        main.innerHTML = /*html*/ ` \
          <div class="app" id="app">
              <div class="nombre-de-friend"></div>
                <div class="chat-global" id="chat-gobal"></div>
              <form class="input" id="form">
                  <div class="content-enviar">
                      <input type="text" class="btn btn-light" id="chat" placeholder="Que cuentas hoy!">
                      <button type="submit"><img src="https://scontent.whatsapp.net/v/t39.8562-34/107393908_272718037153960_2990478628384634711_n.png?ccb=1-3&_nc_sid=8a74b9&_nc_ohc=THj-XS5sM04AX8RdUPO&_nc_ht=scontent.whatsapp.net&oh=1ed60c39f3a1197ebc2833777cffe73e&oe=607FE654" alt=""></button>
                    </div>
                </form>
            </div>`




        function recorrer() {
            fire.collection('Mensseger').orderBy('fecha').onSnapshot((obtenerMensseger) => {
                let chatGolbal = document.getElementById('chat-gobal')
                chatGolbal.innerHTML = ""
                obtenerMensseger.forEach(doc => {
                    // console.log(doc.data().Mensaje);
                    if (doc.data().uid === user.uid) {
                        chatGolbal.innerHTML += `<br><img class="img-chat-user" src="${user.photoURL}" alt=""> <p class="messege badge bg-light text-dark">${doc.data().Mensaje}</p>`;
                    } else {
                        chatGolbal.innerHTML += `<div class="gas"><br><p class="gas messege badge bg-primary text-light">${displayName} ${doc.data().Mensaje}</p><div>`;

                    }
                });
            });
        }





        const fire = firebase.firestore()

        function chat() {
            let form = document.getElementById('form')
            form.addEventListener('submit', (e) => {
                const chatInput = document.getElementById('chat').value
                e.preventDefault()
                console.log(chatInput)

                // ======================> Creacion de el mensaje  <====================== 
                fire.collection('Mensseger').doc().set({
                    Mensaje: `${chatInput}`,
                    fecha: Date.now(),
                    uid: user.uid
                }).then(() => {
                    let chatInputs = document.getElementById('chat').value = ""
                    console.log('exito')
                }).catch((error) => {
                    console.log(error)
                })



            });
        }




        recorrer()
        chat()
        let photoURL = user.photoURL;
        let displayName = user.displayName;
        btnUser.innerHTML += `<div class="usuert"><img id="image-user" src="${photoURL}" width="30" alt=""><p class="name">${displayName}</p></div>`
        cerrarSesion();
        // chat()
        btnUser.classList.remove('reinit')
    } else {
        btnUser.classList.add('reinit')
        buttons.innerHTML = `<button id="btn__google" class="btn btn-light"><img src="https://www.flaticon.com/svg/vstatic/svg/2702/2702602.svg?token=exp=1616708011~hmac=e81a648543728c0cb62bb0e9aefe2a34" alt=""> Google</button>      `
        googgle();
    }
});



function googgle() {
    const btn__google = document.getElementById('btn__google')
    btn__google.addEventListener('click', () => {
        console.log('Exito')
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
    });
}

function cerrarSesion() {
    let salir = document.getElementById('salir')
    salir.addEventListener('click', () => {
        firebase.auth().signOut().then(() => {
            buttons.innerHTML = `<button id="btn__google" class="btn btn-light"><img src="./img/google.png" alt=""> Google</button>`
            window.location.reload();
        }).catch((error) => {
            console.log(error)
        })
    });
}


// let chatGolbalClass = document.querySelector('.chat-global')
