/* eslint-disable linebreak-style */
/* eslint-disable no-trailing-spaces */
/* eslint-disable eol-last */
/* eslint-disable no-unused-vars */
/* eslint-disable semi */
/* eslint-disable padded-blocks */
/* eslint-disable object-curly-newline */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable max-len */
/* eslint-disable indent */
/* eslint-disable no-extra-semi */
/* eslint-disable brace-style */
/* eslint-disable camelcase */

const surveyService = require('../services/surveyService');

async function createSurvey(req, res) {
    
    const { turista, difusion, motivo, reserva, tipo_hospedaje, calificacion_hospedaje, material_informativo, oficina, tipo_informacion, medio_informacion, tipo_material, calificacion_informacion, otra_informacion, que_informacion, calificacion_MC, recomendaria } = req.body
    console.log(req.body)
    try {
        const survey = await surveyService.createSurvey(turista, difusion, motivo, reserva, tipo_hospedaje, calificacion_hospedaje, material_informativo, oficina, tipo_informacion, medio_informacion, tipo_material, calificacion_informacion, otra_informacion, que_informacion, calificacion_MC, recomendaria)
        console.log(survey)
        res.status(201).send(survey)
        }
    catch (error) {
        res.status(400).json('Hubo un error')
    }
};

module.exports = { createSurvey }