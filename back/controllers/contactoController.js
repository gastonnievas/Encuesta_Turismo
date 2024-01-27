const contactoService = require('../services/contactoService');

async function createContacto(req, res){
    const { Name, email, message } = req.body;
        try{
            const contacto = await contactoService.createContacto(Name, email, message)
            res.status(201).send(contacto)
        }     
        catch(error){
           res.status(400).json("Hubo un error en los datos")
       }

}

module.exports = { createContacto }