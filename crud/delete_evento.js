function delete_evento() {
    var id = window.location.search.substring(1);
    //Manda un swal alert, diciendo que si esta seguro de eliminar el evento, 
    

    //Manda un swal alert, diciendo que si esta seguro de eliminar el evento y si lo esta, lo elimina

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
            request.setRequestHeader("Accept", "application/json");
            request.setRequestHeader("content-type", "application/json");
            request.onload = () => {
                const response = request.responseText;
                const json = JSON.parse(response);
                const status = request.status;

                if (request.status === 401 || request.status === 403) {
                    alert(json.detail);
                }

                else if (request.status == 202) {
                    Swal.fire({
                        title: json.message,
                        type: "success",
                        confirmButtonText: "Aceptar"
                    }).then(result => {
                        if (result.value) {
                            window.location.href = "/admin/eventos.html";
                        }
                    });
                }
            };
            request.send();
        }
    });
}
