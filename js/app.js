// ======================>   <====================== 
const buttons = document.getElementById('botones')
const main = document.getElementById('main')
const btnUser = document.getElementById('btn-user')
const usuert = document.getElementById('usuert')
const app = document.getElementById('app')

function bodyScroll() {
    let bodyScroll = document.querySelector('body');
    bodyScroll.scrollTop = bodyScroll.scrollHeight
}

function appscroll() {
    const apps = document.getElementById('app')
    apps.scrollTop = apps.scrollHeight
}
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        buttons.innerHTML = `<button id="salir" class="btn btn-danger">Cerrar Sesion</button>        `
        var uid = user.uid;
        main.innerHTML = /*html*/ ` \
          <div class="app" id="app">
              <div class="nombre-de-friend">
                  <h1>Nombre de el grupo</h1>
              </div>
                <div class="chat-global" id="chat-gobal"></div>
              <form class="input" id="form">
                  <div class="content-enviar">
                      <input autocomplete="off" type="text" class="btn btn-light" id="chat" placeholder="Que cuentas hoy!">
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
                        chatGolbal.innerHTML += `<div class="ambos"><img title="Tu" class="img-chat-user" src="${user.photoURL}" alt=""> <p class="messege">${doc.data().Mensaje}</p></div>`;
                    } else {
                        chatGolbal.innerHTML += `<div class="ambos fire"><br> <img title="${doc.data().name}" class="img-chat-user img-chat-f-f" onclick="imgChatFf('${doc.data().name}','${doc.data().email}')" src="${doc.data().image}" alt=""> <p class="p-f">${doc.data().Mensaje}</p></div>`;
                    }

                    function imgF() {
                        imgChatFf = function(name, email) {
                            Swal.fire({
                                html: `<div class="alert-div"> <p class="alert-name">Nombre: <b>${name}</b></p> <br> <p class="alert-gmail">Gmail: <b>${email}</b></p></div>`,
                                showConfirmButton: false,
                                background: "#080808",
                                showCloseButton: true
                            });
                        }
                    }
                    imgF()
                    bodyScroll()
                    appscroll()
                });
            });
        }
        const fire = firebase.firestore()

        function chat() {
            let form = document.getElementById('form')
            form.addEventListener('submit', (e) => {
                const chatInput = document.getElementById('chat').value
                e.preventDefault()
                    // ======================> Creacion de el mensaje  <====================== 
                if (chatInput == 0) {} else {
                    fire.collection('Mensseger').doc().set({
                        Mensaje: `${chatInput}`,
                        fecha: Date.now(),
                        uid: user.uid,
                        name: user.displayName,
                        image: user.photoURL,
                        email: user.email
                    }).then(() => {
                        let chatInputs = document.getElementById('chat').value = ""
                        console.log('exito')
                    }).catch((error) => {
                        console.log(error)
                    })

                }
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
        buttons.innerHTML = `<button id="btn__google" class="btn btn-light"><img src="./img/google.png" alt=""> Google</button>  <button id="btn__facebook" class="btn btn-light"><img src="./img/facebook.png" width="20" alt=""> Facebook</button>`
        googgle();
        facebook()
    }
});

function googgle() {
    const btn__google = document.getElementById('btn__google')
    btn__google.addEventListener('click', () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
    });
}



function facebook() {
    const btn__facebook = document.getElementById('btn__facebook')
    btn__facebook.addEventListener('click', () => {
        var provider = new firebase.auth.FacebookAuthProvider();
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
