const http = require('http');

const {
    getBarangs,
    getBarangById,
    storeBarang,
    updateBarang,
    deleteBarang
} = require('./controllers/BarangController');

const {
    getKategoris,
    getKategoriById,
    storeKategori,
    updateKategori,
    deleteKategori
} = require('./controllers/KategoriController')


const PORT = process.env.PORT || 8000;

//routes defining
const server = http.createServer(async (req, res) => {

    //barang's routes
    if (req.url === '/api/barangs' && req.method === 'GET') {
        getBarangs(req, res);
    } else if (req.url.match(/\/api\/barangs\/\w+/) && req.method === 'GET') {
        const id = req.url.split('/')[3];
        getBarangById(req, res, id);
    } else if (req.url === '/api/barangs' && req.method === 'POST') {
        storeBarang(req, res);
    } else if (req.url.match(/\/api\/barangs\/\w+/) && req.method === 'PUT') {
        const id = req.url.split('/')[3];
        updateBarang(req, res, id);
    } else if (req.url.match(/\/api\/barangs\/\w+/) && req.method === 'DELETE') {
        const id = req.url.split('/')[3];
        deleteBarang(req, res, id);
    }

    //kategori's routes
    if (req.url === '/api/kategoris' && req.method === 'GET') {
        getKategoris(req, res);
    } else if (req.url.match(/\/api\/kategoris\/\w+/) && req.method === 'GET') {
        const id = req.url.split('/')[3];
        getKategoriById(req, res, id);
    } else if (req.url === '/api/kategoris' && req.method === 'POST') {
        storeKategori(req, res);
    } else if (req.url.match(/\/api\/kategoris\/\w+/) && req.method === 'PUT') {
        const id = req.url.split('/')[3];
        updateKategori(req, res, id);
    } else if (req.url.match(/\/api\/kategoris\/\w+/) && req.method === 'DELETE') {
        const id = req.url.split('/')[3];
        deleteKategori(req, res, id);
    }

})


server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});