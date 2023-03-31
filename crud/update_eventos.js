function update_eventos() {

    var id = window.location.search.substring(1);
    
   
    let nombre = document.getElementById("nombre");
    let fecha  = document.getElementById("fecha");
    let hora   = document.getElementById("hora");
    let lugar  = document.getElementById("lugar");
    let descripcion = document.getElementById("descripcion");
    let precio = document.getElementById("precio");

    const img = document.getElementById("blah");
    console.log(img);

    //const file = document.getElementById("blah").files[0];


    //const nombreImage = file.name;
    
    


    //const destino = "/images/eventos/";
    //const ruta = destino + nombreImage;
    const ruta = img.src;

    var payload = {
        "id_evento": id,
        "Nombre": nombre.value,
        "Fecha": fecha.value,
        "Hora": hora.value,
        "Lugar": lugar.value,
        "Descripcion": descripcion.value,
        "Costo": precio.value,
        "Imagen": ruta
    }
    
    var request = new XMLHttpRequest();
    request.open('PUT', "http://127.0.0.1:8000/eventos/",true);
    request.setRequestHeader("Accept", "application/json");
    request.setRequestHeader("content-type", "application/json");
    
    request.onload = () => {
        
        const response  = request.responseText;
        const json      = JSON.parse(response);     
        const status    = request.status;
        console.log(json);

        if (request.status === 401 || request.status === 403) {
            alert(json.detail);
        }

        else if (request.status == 202){

            console.log("Response: " + response);
            console.log("JSON: " + json);
            console.log("Status: " + status);

            Swal.fire({
                title: json.message,
                text: "",
                type: "info"
            }).then(function() {
                window.location = "/admin/ver_evento.html?" + id;
            });
        }
    };
    request.send(JSON.stringify(payload));


    
}



