function Post_eventos() {


    const token = sessionStorage.getItem('token');
    console.log(token);

    let nombre = document.getElementById("nombre");
    let fecha  = document.getElementById("fecha");
    let hora   = document.getElementById("hora");
    let lugar  = document.getElementById("lugar");
    let descripcion = document.getElementById("descripcion");
    let precio = document.getElementById("precio");

    const img = document.getElementById("blah");


    var ruta = img.src;
    
    let payload = {
        "Nombre": nombre.value,
        "Fecha": fecha.value,
        "Hora": hora.value,
        "Lugar": lugar.value,
        "Descripcion": descripcion.value,
        "Costo": precio.value,
        "Imagen": ruta

    }


    //console.log(payload);

    
    var request = new XMLHttpRequest(); 
    request.open('POST', "http://127.0.0.1:8000/eventos/",true);
    request.setRequestHeader("accept", "application/json");
    request.setRequestHeader("Authorization", "Bearer " +token);
    request.setRequestHeader("Content-Type", "application/json");

    request.onload = () => {
        
        const response  = request.responseText;
        const json      = JSON.parse(response); 
        
        const status    = request.status;
        console.log("Status: " + status);

        if (request.status === 401 || request.status === 403) {
            Swal.fire({
                title: "Error",
                text: json.detail,
                type: "error"
            }).then(function() {
                window.location = "/admin/templates/login.html";
            }
            );
        }

        else if (request.status == 202){

            console.log("Response: " + response);
            console.log("JSON: " + json);
            console.log("Status: " + status);
            
            Swal.fire({
                title: json.message,
                text: "Redireccionando...",
                type: "success"
            }).then(function() {
                window.location = "admin/templates/eventos.html";
            });
        }
    };
    request.send(JSON.stringify(payload));
}