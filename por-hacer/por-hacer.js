const fs = require('fs');

let listadoPorHacer = [];

let guardarDB = () => {

    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile('db/data.json', data, (err) => {
        if (err)
            throw new Error('Se ha producido un error al guardar.', err);
    });
};

let cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (err) {
        console.log("Error al cargar la DB.");
        listadoPorHacer = [];
    };
};

let crear = (descripcion) => {

    cargarDB();

    let tarea = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(tarea);
    guardarDB();
    return tarea;
};

let getListado = () => {
    cargarDB();
    return listadoPorHacer;
};

let actualizar = (descripcion, completado = true) => {
    cargarDB();

    let index = listadoPorHacer.findIndex( tarea => tarea.descripcion === descripcion);

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    }
    else {
        return false;
    }
};

let borrar = (descripcion) => {
    cargarDB();

    let nuevoListado = listadoPorHacer.filter((tarea) => {
        return tarea.descripcion !== descripcion;
    });

    if (listadoPorHacer.length === nuevoListado.length) {
        return false;
    }
    else {
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }
};

module.exports = {
    crear,
    actualizar,
    borrar,
    getListado
};