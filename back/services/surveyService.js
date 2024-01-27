/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
/* eslint-disable semi */
/* eslint-disable space-before-blocks */
/* eslint-disable max-len */

const { DataTypes } = require('sequelize');
const { sequelize } = require('../models');

const Survey = require('../models/survey')(sequelize, DataTypes);

async function createSurvey(data1, data2, data3, data4, data5, data6, data7, data8, data9, data10, data11, data12, data13, data14, data15, data16){
    const survey = new Survey()

    survey.Turista = data1;
    survey.Difusion = data2;
    survey.Motivo = data3;
    survey.Reserva = data4;
    survey.Tipo_Hospedaje = data5;
    survey.Calificacion_Hospedaje = data6;
    survey.Material_Informativo = data7;
    survey.Oficina = data8;
    survey.Tipo_Informacion = data9;
    survey.Medio_Informacion = data10;
    survey.Tipo_Material = data11;
    survey.Calificacion_Informacion = data12;
    survey.Otra_Informacion = data13;
    survey.Que_Informacion = data14;
    survey.Calificacion_MC = data15;
    survey.Recomendaria = data16;

    const surveyCreated = await survey.save();
    console.log(surveyCreated)
    return surveyCreated;
}

module.exports = { createSurvey }
