const staticBraLy = "BraLy-vitae-v1"
const assets = [
    "/",
    "/admin/templates/crear_evento.html",
    "/admin/templates/delete_evento.html",
    "/admin/templates/eventos.html",
    "/admin/templates/login.html",
    "/admin/templates/registro.html",
    "/admin/templates/update_evento.html",
    "/admin/templates/ver_evento.html",
    "/admin/index.html",
    "/crud/delete_evento.js",
    "/crud/get_evento.js",
    "/crud/get_eventos.js",
    "/crud/get_eventos_admin.js",
    "/crud/post_evento.js",
    "/crud/update_evento.js",
    "/css/style.css",
    "/css/font-awesome.min.css",    
    "/css/font-awesome.css",
    "/css/sweetalert2.min.css",
    "/js/carrusel.js",
    "/js/evento_por_mes.js",
    "/js/login.js",
    "/js/registro.js",
    "/js/sweetalert2.all.min.js",
    "/js/ubicacion.js",
    "/pages/fallback.html",
    "/templates/calendario.html",
    "/templates/eventos.html",
    "/templates/inicio.html",
    "/templates/login.html",
    "/templates/registro.html",
    "/templates/ubicacion.html",
    "/api/main.py",
    "/images/logo.png",
    "/images/left-arrow.png",
    "/images/right-arrow.png",
    
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

