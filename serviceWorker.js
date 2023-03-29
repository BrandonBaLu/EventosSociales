const staticBraLy = "BraLy-vitae-v1"
const assets = [
    "/",
    "/index.html",
    "/templates/calendario.html",
    "/templates/eventos.html",
    "/templates/ubicacion.html",
    "/css/style.css",
    "/images/logo.png",
    "/images/left-arrow.png",
    "/images/right-arrow.png",
    "/gallery/01.jpg",
    "/gallery/02.jpg",
    "/gallery/03.jpg",
    "/gallery/04.jpg",
    "/gallery/05.jpg",
    "/gallery/06.jpg",
    "/gallery/07.jpg",
    "/gallery/bandida.jpg",
    "/gallery/pragga.jpg",
    "/gallery/tulancingo.jpg",
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

