let barangs = require('../data/barang')

const {
    writeToFile
} = require('../utils/ReqData');

function findAll() {
    return new Promise((resolve, reject) => {
        resolve(barangs);
    })
}

function findById(id) {
    return new Promise((resolve, reject) => {
        const barang = barangs.find((b) => b.id === parseInt(id));
        resolve(barang);
    })
}

function create(barang) {
    return new Promise((resolve, reject) => {
        const newBarang = {
            id: parseInt(Math.floor(4 + Math.random() * 10)),
            ...barang
        };
        barangs.push(newBarang);
        writeToFile('./data/barang.json', barangs);
        resolve(newBarang);
    })
}

function update(id, barang) {
    return new Promise((resolve, reject) => {
        const index = barangs.findIndex((b) => b.id === parseInt(id));
        barangs[index] = {
            id,
            ...barang
        };
        writeToFile('./data/barang.json', barangs);
        resolve(barangs[index]);
    })
}

function remove(id) {
    return new Promise((resolve, reject) => {
        barangs = barangs.filter((b) => b.id !== parseInt(id));
        writeToFile('./data/barang.json', barangs);
        resolve();
    })
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
}