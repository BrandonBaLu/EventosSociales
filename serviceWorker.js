const staticBraLy = "BraLy-vitae-v1"
const assets = [
    "/",
    "/EventosSociales.github.io/admin/templates/crear_evento.html",
    "/EventosSociales.github.io/admin/templates/delete_evento.html",
    "/EventosSociales.github.io/admin/templates/eventos.html",
    "/EventosSociales.github.io/admin/templates/login.html",
    "/EventosSociales.github.io/admin/templates/registro.html",
    "/EventosSociales.github.io/admin/templates/update_evento.html",
    "/EventosSociales.github.io/admin/templates/ver_evento.html",
    "/EventosSociales.github.io/admin/index.html",
    "/EventosSociales.github.io/crud/delete_evento.js",
    "/EventosSociales.github.io/crud/get_evento.js",
    "/EventosSociales.github.io/crud/get_eventos.js",
    "/EventosSociales.github.io/crud/get_eventos_admin.js",
    "/EventosSociales.github.io/crud/post_evento.js",
    "/EventosSociales.github.io/crud/update_evento.js",
    "/EventosSociales.github.io/css/style.css",
    "/EventosSociales.github.io/css/font-awesome.min.css",    
    "/EventosSociales.github.io/css/font-awesome.css",
    "/EventosSociales.github.io/css/sweetalert2.min.css",
    "/EventosSociales.github.io/js/carrusel.js",
    "/EventosSociales.github.io/js/evento_por_mes.js",
    "/EventosSociales.github.io/js/login.js",
    "/EventosSociales.github.io/js/registro.js",
    "/EventosSociales.github.io/js/sweetalert2.all.min.js",
    "/EventosSociales.github.io/js/ubicacion.js",
    "/EventosSociales.github.io/pages/fallback.html",
    "/EventosSociales.github.io/templates/calendario.html",
    "/EventosSociales.github.io/templates/eventos.html",
    "/EventosSociales.github.io/templates/inicio.html",
    "/EventosSociales.github.io/templates/login.html",
    "/EventosSociales.github.io/templates/registro.html",
    "/EventosSociales.github.io/templates/ubicacion.html",
    "/EventosSociales.github.io/api/main.py",
    "/EventosSociales.github.io/images/logo.png",
    "/EventosSociales.github.io/images/left-arrow.png",
    "/EventosSociales.github.io/images/right-arrow.png",
    
]

self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
        caches.open(staticBraLy).then(cache => {
            cache.addAll(assets)
        })
    )
})


self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(res => {
            return res || fetch(fetchEvent.request);
        }).catch(() => caches.match("/pages/fallback.html"))
    );
});

self.addEventListener("activate", activateEvent => {
    activateEvent.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys
                .filter(key => key !== staticBraLy)
                .map(key => caches.delete(key))
            )
        })
    )
})

