const Kategoris = require('../models/KategoriModel');

const {
    getPostData
} = require('../utils/ReqData');

async function getKategoris(req, res) {
    try {
        const kategoris = await Kategoris.findAll();

        res.writeHead(200, {
            'Content-Type': 'application/json'
        })
        res.end(JSON.stringify(kategoris))
    } catch (err) {
        console.log(err)
    }
}

async function getKategoriById(req, res, id) {
    try {
        const kategori = await Kategoris.findById(id)
        if (!kategori) {
            res.writeHead(404, {
                'Content-Type': 'application/json'
            })
            res.end(JSON.stringify({
                message: 'kategori Tidak Ditemukan !'
            }))
        } else {
            res.writeHead(200, {
                'Content-Type': 'application/json'
            })
            res.end(JSON.stringify(kategori))
        }
    } catch (error) {
        console.log(err)
    }
}

async function storeKategori(req, res) {
    try {
        const body = await getPostData(req)

        const {
            nama
        } = JSON.parse(body)

        const kategori = {
            nama
        }

        const newKategori = await Kategoris.create(kategori)

        res.writeHead(201, {
            'Content-Type': 'application/json'
        })
        return res.end(JSON.stringify(newKategori))

    } catch (error) {
        console.log(error)
    }
}


async function updateKategori(req, res, id) {
    try {
        const kategori = await Kategoris.findById(id);

        if (!kategori) {
            res.writeHead(404, {
                'Content-Type': 'application/json'
            })
            res.end(JSON.stringify({
                message: 'Kategori Tidak Ditemukan !'
            }))
        } else {
            const body = await getPostData(req);


            const {
                nama
            } = JSON.parse(body)

            const kategori = {
                nama
            }

            const update = await Kategoris.update(id, kategori)

            res.writeHead(200, {
                'Content-Type': 'application/json'
            })
            return res.end(JSON.stringify(update))
        }
    } catch (err) {
        console.log(err);
    }
}

async function deleteKategori(req, res, id) {
    try {
        const kategori = await Kategoris.findById(id)

        if (!kategori) {
            res.writeHead(404, {
                'Content-Type': 'application/json'
            })
            res.end(JSON.stringify({
                message: 'Barang Tidak Ditemukan !'
            }))
        } else {
            await Kategoris.remove(id);
            res.writeHead(200, {
                'Content-Type': 'application/json'
            })
            res.end(JSON.stringify({
                message: `Kategori ${kategori.nama} berhasil dihapus !`
            }))
        }
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    getKategoris,
    getKategoriById,
    storeKategori,
    updateKategori,
    deleteKategori
}