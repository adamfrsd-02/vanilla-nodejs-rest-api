let kategoris = require('../data/kategori');

const {
    writeToFile
} = require('../utils/ReqData');

function findAll() {
    return new Promise((resolve, reject) => {
        resolve(kategoris);
    })
}

function create(kategori) {
    return new Promise((resolve, reject) => {
        const newKategori = {
            id: parseInt(Math.floor(4 + Math.random() * 10)),
            ...kategori
        };
        kategoris.push(newKategori);
        writeToFile('./data/kategori.json', kategoris);
        resolve(newKategori);
    })
}

function findById(id) {
    return new Promise((resolve, reject) => {
        const kategori = kategoris.find((k) => k.id === parseInt(id));
        resolve(kategori);
    })
}

function update(id, kategori) {
    return new Promise((resolve, reject) => {
        const index = kategoris.findIndex((k) => k.id === parseInt(id));
        kategoris[index] = {
            id,
            ...kategori
        };
        writeToFile('./data/kategori.json', kategoris);
        resolve(kategoris[index]);
    })
}

function remove(id) {
    return new Promise((resolve, reject) => {
        kategoris = kategoris.filter((k) => k.id !== parseInt(id));
        writeToFile('./data/kategori.json', kategoris);
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