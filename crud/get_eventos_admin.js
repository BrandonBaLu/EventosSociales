function getEventos() {
    
    
    var request = new XMLHttpRequest();
    request.open('GET', "http://127.0.0.1:8000/eventos/");
    request.setRequestHeader("Accept", "application/json");
    request.setRequestHeader("content-type", "application/json");
    
    const  card_body   = document.getElementById("card_event");



    request.onload = () => {
        // Almacena la respuesta en una variable, si es 202 es que se obtuvo correctamente
        const response = request.responseText;
        const json = JSON.parse(response);

        //console.log(json);

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

            for (var key in parseo_json) {
                for (var id in parseo_json[key]) {
                    //console.log(id);
                    var nombre = parseo_json[key][id].Nombre
                    var fecha = parseo_json[key][id].Fecha
                    var hora = parseo_json[key][id].Hora
                    var lugar = parseo_json[key][id].Lugar
                    var costo = parseo_json[key][id].Costo
                    var descripcion = parseo_json[key][id].Descripcion
                    var imagen = parseo_json[key][id].Imagen
                    /*console.log(nombre);
                    console.log(fecha);
                    console.log(hora);
                    console.log(lugar);
                    console.log(costo);
                    console.log(descripcion);
                    console.log(imagen);*/

                    card_body.innerHTML += '<div class="col-sm-4">' +
                    '<div class="card-body jumbotron_color2 card1">' +
                    '<h5 class="card-title">' + nombre + '</h5>' +
                    '<br>' +
                    '<img class="img1" src="' + imagen + '">' +
                    '<p class="card-text">' +
                    '<ul>' +
                    '<li class="parrafos">Fecha: ' + fecha + '</li>' +
                    '<li class="parrafos">Hora: ' + hora + '</li>' +
                    '<li class="parrafos">Lugar: ' + lugar + '</li>' +
                    '<li class="parrafos">Costo: $' + costo + '</li>' +
                    '</ul>' +
                    '</p>' +
                    '<p class="parrafos">' + descripcion + '</p>' +
                    '<a class="btn btn-success btn-sm" href="/admin/ver_evento?' + id + '">Detalles del evento</a>' +
                    '</div>' +
                    '</div>';                
                }
            }

        }
    };
    request.send();
}
