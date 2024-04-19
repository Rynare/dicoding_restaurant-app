// Method add() membuat request dikirimkan ke server dan menyimpan response
// ke dalam cache.Jika request gagal, atau response tidak menghasilkan kode 200,
// maka tidak ada yang disimpan pada cache, dan promise yang dikembalikan oleh
// method ini berstatus rejected.
// * Request base
cache.add(new Request('/data.json'));
// * atau URL base
cache.add('/data.json');

// ! ==============================================================================

// Cara kerjanya sama seperti add(), namun sesuai namanya ia dapat memasukkan
// banyak Request atau URL String sekaligus.Jika salah satu request gagal, maka
// tak ada satupun resource yang akan disimpan.Dan Promise yang dikembalikan oleh
// method ini berstatus rejected.
const urls = ['/weather/today.json', '/weather/tomorrow.json'];
cache.addAll(urls);

// ! ==============================================================================

// Mengambil Resource dari Cache
cache.match(request)
    .then((response) => {
        // do something with response
    });

// Pada method ini, kita dapat menerapkan options di parameter kedua. Options 
// digunakan bila kita ingin pencarian cache terhadap request tidak memperdulikan
// beberapa query, parameter, atau attribution lainnya pada request.

const options = {
    ignoreSearch: true,
    ignoreMethod: true,
    ignoreVary: true,
};

cache.match(request, options)
    .then((response) => {
        // do something with response
    });


// ! ==============================================================================

// Mencari Cache
caches.keys()
    .then((cacheNames) => {
        cacheNames.forEach((cacheName) => {
            if (cacheName !== 'my-cache') {
                // do something
            }
        });
    });

// ! ==============================================================================

// Menghapus cache
caches.keys()
    .then((cacheNames) => {
        cacheNames.forEach((cacheName) => {
            if (cacheName !== 'my-cache') {
                caches.delete(cacheName);
            }
        });
    });

// ! ==============================================================================
