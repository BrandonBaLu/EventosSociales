function delete_evento() {
    const token = sessionStorage.getItem('token');
    //console.log(token);
    var id = window.location.search.substring(1);


    Swal.fire({
        title: "¿Estás seguro de eliminar el evento?",
        text: "No podrás revertir esta acción",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar"
    }).then(result => {
        if (result.value) {
            var request = new XMLHttpRequest();
            request.open("DELETE", "http://127.0.0.1:8000/eventos/" + id, true);
            request.setRequestHeader("accept", "application/json");
            request.setRequestHeader("Authorization", "Bearer " +token);
            request.setRequestHeader("Content-Type", "application/json");
        
            request.onload = () => {
                const response = request.responseText;
                const json = JSON.parse(response);
                const status = request.status;

                if (request.status === 401 || request.status === 403) {
                    Swal.fire({
                        title: "Error",
                        text: json.detail,
                        type: "error"
                    }).then(function() {
                        window.location = "/admin/templates/login.html";
                    });
                }

                if (token == "" || token == null    || token == undefined) {
                    Swal.fire({
                        title: "Error",
                        text: "No se ha iniciado sesión",
                        type: "error"
                    }).then(function() {
                        window.location = "/admin/templates/login.html";
                    });
                }

                else if (request.status == 202) {
                    Swal.fire({
                        title: json.message,
                        type: "success",
                        confirmButtonText: "Aceptar"
                    }).then(result => {
                        if (result.value) {
                            window.location.href = "/admin/templates/eventos.html";
                        }
                    });
                }
            };
            request.send();
        }
    });
}
