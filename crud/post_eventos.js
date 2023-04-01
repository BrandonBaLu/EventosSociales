function Post_eventos() {

    let nombre = document.getElementById("nombre");
    let fecha  = document.getElementById("fecha");
    let hora   = document.getElementById("hora");
    let lugar  = document.getElementById("lugar");
    let descripcion = document.getElementById("descripcion");
    let precio = document.getElementById("precio");

    const img = document.getElementById("blah");
 
    //const file = document.getElementById("imagen").files[0];
    //const nombreImage = file.name;
    
    //const imag_nombre = file.name.split(".")[0];

    //const imag_fecha = new Date().toISOString().slice(0, 19).replace('T', ' ');

    //const destino = "/images/eventos/";
    //const renomb_imag = imag_nombre +"-" + imag_fecha + ".jpg" ;
    //console.log(renomb_imag);
    //const ruta = destino + nombreImage;
    //console.log(ruta);
    //console.log(renomb_imag);

    /*const storage = multer.diskStorage({
        destination: destino,
        filename: renomb_imag
    });*/


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


    console.log(payload);

    var request = new XMLHttpRequest(); 
    request.open('POST', "http://127.0.0.1:8000/eventos/",true);
    request.setRequestHeader("accept", "application/json");
    request.setRequestHeader("Content-Type", "application/json");

    request.onload = () => {
        
        const response  = request.responseText;
        const json      = JSON.parse(response); 
        
        const status    = request.status;
        console.log("Status: " + status);

        if (request.status === 401 || request.status === 403) {
            alert(json.detail);
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
                window.location = "/templates/eventos.html";
            });
        }
    };
    request.send(JSON.stringify(payload));
}