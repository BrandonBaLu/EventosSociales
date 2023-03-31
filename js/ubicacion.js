function ubicacion_google_maps() {

    var id = window.location.search.substring(1);
    //console.log("id: " + id);

    var request = new XMLHttpRequest();
    request.open('GET', "http://127.0.0.1:8000/eventos/"+ id,true);
    request.setRequestHeader("Accept", "apppcation/json");
    request.setRequestHeader("content-type", "apppcation/json");

    const  card_body   = document.getElementById("content");

    request.onload = () => {
        const response  = request.responseText;
        const json      = JSON.parse(response);

        const status    = request.status;


        if (request.status === 401 || request.status === 403) {
            alert(json.detail);
        }

        else if (request.status == 202){
                
                //console.log("Response: " + response);
                //console.log("JSON: " + json);
                //console.log("Status: " + status);
    
                var nombre      = json.evento.Nombre;
                var address     = json.evento.Lugar;
                var fecha       = json.evento.Fecha;
                var hora        = json.evento.Hora;
                var costo       = json.evento.Costo;
                var descripcion = json.evento.Descripcion;
                var imagen      = json.evento.Imagen;
                 
                //console.log(address);

                var geocoder = new google.maps.Geocoder();

                geocoder.geocode( { 'address': address}, function(results, status) {

                    if (status == google.maps.GeocoderStatus.OK) {
                        var latitude = results[0].geometry.location.lat();
                        var longitude = results[0].geometry.location.lng();
                        
                        var uluru = {lat: latitude, lng: longitude};
                        var map = new google.maps.Map(document.getElementById('map'), {
                            zoom: 50,
                            center: uluru
                        });
                        var marker = new google.maps.Marker({
                            position: uluru,
                            map: map,
                            title: 'Hello World!'
                        });
                    } 
                }); 

               /* console.log("Nombre: " + nombre);
                console.log("Lugar: " + address);
                console.log("Fecha: " + fecha);
                console.log("Hora: " + hora);
                console.log("Costo: " + costo);
                console.log("Descripcion: " + descripcion);
                console.log("Imagen: " + imagen);*/
    
                card_body.innerHTML += '<div class="col-sm-4">' +
                    '<div class="card-body card_color">' +
                    '<h5 class="card-title">' + nombre + '</h5>' +
                    '<br>' +
                    '<img class="img1" src="' + imagen + '">' +
                    '<p class="card-text">' +
                    '<ul>' +
                    '<p class="parrafos">Fecha: ' + fecha + '</p>' +
                    '<p class="parrafos">Hora: ' + hora + '</p>' +
                    '<p class="parrafos">Lugar: ' + address + '</p>' +
                    '<p class="parrafos">Costo: $' + costo + '</p>' +
                    '</ul>' +
                    '</p>' +
                    '<p class="parrafos">Descripcción: ' + descripcion + '</p>' +
                    '</div>' +
                    '</div>';    
            }
    }
    request.send();
}

    