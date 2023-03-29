const staticBraLy = "BraLy-vitae-v1"
const assets = [
    "/",
    "/index.html",
    "/templates/calendario.html",
    "/templates/crear_evento.html",
    "/templates/eventos.html",
    "/templates/ubicacion.html",
    "/css/style.css",
    "/css/font-awesome.min.css",
    "/css/font-awesome.css",
    "/css/sweetalert2.min.css",
    "/js/carrusel.js",
    "/js/sweetalert2.all.min.js",
    "/js/ubicacion.js",
    "/crud/post_eventos.js",
    "/crud/get_eventos.js",
    "/api/main.py",
    "/images/logo.png",
    "/images/left-arrow.png",
    "/images/right-arrow.png",
    "/pages/fallback.html",

    
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

