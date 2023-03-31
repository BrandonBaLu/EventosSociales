if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
        navigator.serviceWorker
            .register("/serviceWorker.js")
            .then(res => console.log("service worker registered"))
            .catch(err => console.log("service worker not registered", err))
    })
}


const notification = new Notification("Bienvenido a Braly", {
    body: "BraLy es una aplicación que te permite crear y compartir tus eventos sociales",
    icon: "/images/icons/icon-96x96.png",
    timeout: 1500000,
    vibrate: [100, 100, 100],
    onClick: function(){
        window.location = "/templates/eventos.html";
        console.log(this);
    }
});


// Ask the user for permission to send push notifications.
navigator.serviceWorker.ready
    .then(function (registration) {         
        // Check if the user has an existing subscription
        return registration.pushManager.getSubscription()
            .then(function (subscription) {
                if (subscription) {
                    return subscription;
                }

                const vapidPublicKey = "BPQ7VVJQP22ymUqcp2kZLSCTuedajn6v_lgNWOHus6_GL23yvaITknWPkfGdFhxrun4WHtiMz8AMA12C5tsz9aE";
                return registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: urlBase64ToUint8Array(vapidPublicKey)
                });
        });
    }
);

// Utility function for browser interoperability
function urlBase64ToUint8Array(base64String) {
    var padding = '='.repeat((4 - base64String.length % 4) % 4);
    var base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    var rawData = window.atob(base64);
    var outputArray = new Uint8Array(rawData.length);

    for (var i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}


// Respond to a server push with a user notification.
self.addEventListener('push', function (event) {
    if (Notification.permission === "granted") {
        const notificationText = event.data.text();
        const showNotification = self.registration.showNotification('BraLy notificaciones', {
            body: notificationText,
            icon: '/images/icons/icon-96x96.png'
        });
        // Make sure the toast notification is displayed.
        event.waitUntil(showNotification);
    }
});

// Respond to the user selecting the toast notification.
self.addEventListener('notificationclick', function (event) {
    console.log('On notification click: ', event.notification.tag);
    event.notification.close();

    // Display the current notification if it is already open, and then put focus on it.
    event.waitUntil(clients.matchAll({
        type: 'window'
    }).then(function (clientList) {
        for (var i = 0; i < clientList.length; i++) {
            var client = clientList[i];
            if (client.url == 'http://127.0.0.1:8080/' && 'focus' in client)
                return client.focus();
        }
        if (clients.openWindow)
            return clients.openWindow('/');
    }));
});


function imagenes_carrucel(){
    var request = new XMLHttpRequest();
    request.open('GET', "http://127.0.0.1:8000/eventos/");
    request.setRequestHeader("Accept", "application/json");
    request.setRequestHeader("content-type", "application/json");

    const  carru   = document.getElementById("carru");

    request.onload = () => {
        // Almacena la respuesta en una variable, si es 202 es que se obtuvo correctamente
        const response = request.responseText;
        const json = JSON.parse(response);

        console.log(json);

        if (request.status === 401 || request.status === 403) {
            alert(json.detail);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Algo salió mal!'
            })
        }
        
        else if (request.status == 202){
            const response = request.responseText;
            const parseo_json = JSON.parse(response);
            //console.log(parseo_json);
            var nombre = "";
            var costo = "";
            var imagen = "";
            var id_product = "product_"
            var cont = 0;
            var concat = "";            

            for (var key in parseo_json) {
                for (var id in parseo_json[key]) {
                    ///cuenta cuantos id hay en el json
                    ids = Object.keys(parseo_json[key]).length;
                    //console.log(ids);
                    nombre = parseo_json[key][id].Nombre
                    costo = parseo_json[key][id].Costo
                    imagen = parseo_json[key][id].Imagen
                    
                    if (cont < ids) {
                        cont = cont + 1;
                        concat = id_product.concat(cont-1);    
                        //console.log(concat);
                        carru.innerHTML += '<div class="product" id="'+concat+'">'+
                        '<img src="'+imagen+'" width="195" height="100"/>'+
                        '<h5>'+nombre+'</h5>'+
                        '<p>$'+costo+'</p>'+
                        '</div>';    
                    }                 
                }
            }
        }
    };
    request.send();
}


/*funcion para buscar un evento en la pagina principal*/
function buscar_evento(){
    var request = new XMLHttpRequest();
    request.open('GET', "http://127.0.0.1:8000/eventos/");
    request.setRequestHeader("Accept", "application/json");
    request.setRequestHeader("content-type", "application/json");

    var busqueda = document.getElementById("busqueda").value;
    const  carru   = document.getElementById("carru");

    console.log(busqueda);

}
