const { DataTypes } = require('sequelize');
const { sequelize } = require('../models');

const Contacto  = require('../models/contacto')(sequelize, DataTypes);

async function createContacto(Name, email, message){
    const contacto = new Contacto()

    contacto.Name = Name;
    contacto.email = email;
    contacto.message = message;

    const contactoCreado = await contacto.save()

    return contactoCreado;
}

module.exports = { createContacto }