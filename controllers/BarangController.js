const Barangs = require('../models/BarangModel');

const {
    getPostData
} = require('../utils/ReqData');


async function getBarangs(req, res) {
    try {
        const barangs = await Barangs.findAll();

        res.writeHead(200, {
            'Content-Type': 'application/json'
        })
        res.end(JSON.stringify(barangs))
    } catch (err) {
        console.log(err)
    }
}

async function getBarangById(req, res, id) {
    try {
        const barang = await Barangs.findById(id)
        if (!barang) {
            res.writeHead(404, {
                'Content-Type': 'application/json'
            })
            res.end(JSON.stringify({
                message: 'Barang Tidak Ditemukan !'
            }))
        } else {
            res.writeHead(200, {
                'Content-Type': 'application/json'
            })
            res.end(JSON.stringify(barang))
        }
    } catch (error) {
        console.log(err)
    }
}

async function storeBarang(req, res) {
    try {
        const body = await getPostData(req)

        const {
            nama,
            stok,
            harga
        } = JSON.parse(body)

        const barang = {
            nama,
            stok,
            harga
        }

        const newBarang = await Barangs.create(barang)

        res.writeHead(201, {
            'Content-Type': 'application/json'
        })
        return res.end(JSON.stringify(newBarang))

    } catch (error) {
        console.log(error)
    }
}

async function updateBarang(req, res, id) {
    try {
        const barang = await Barangs.findById(id);

        if (!barang) {
            res.writeHead(404, {
                'Content-Type': 'application/json'
            })
            res.end(JSON.stringify({
                message: 'Barang Tidak Ditemukan !'
            }))
        } else {
            const body = await getPostData(req);


            const {
                nama,
                stok,
                harga
            } = JSON.parse(body)

            const barang = {
                nama,
                stok,
                harga
            }

            const update = await Barangs.update(id, barang)

            res.writeHead(200, {
                'Content-Type': 'application/json'
            })
            return res.end(JSON.stringify(update))
        }
    } catch (err) {
        console.log(err);
    }
}

async function deleteBarang(req, res, id) {
    try {
        const barang = await Barangs.findById(id)

        if (!barang) {
            res.writeHead(404, {
                'Content-Type': 'application/json'
            })
            res.end(JSON.stringify({
                message: 'Barang Tidak Ditemukan !'
            }))
        } else {
            await Barangs.remove(id);
            res.writeHead(200, {
                'Content-Type': 'application/json'
            })
            res.end(JSON.stringify({
                message: `Barang ${barang.nama} berhasil dihapus !`
            }))
        }
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    getBarangs,
    getBarangById,
    storeBarang,
    updateBarang,
    deleteBarang
}