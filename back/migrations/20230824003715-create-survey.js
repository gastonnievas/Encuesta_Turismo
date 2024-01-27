'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Surveys', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Turista:  {
        type: Sequelize.JSON
      },
      Difusion: {
        type: Sequelize.JSON
      },
      Motivo: {
        type: Sequelize.JSON
      },
      Reserva: {
        type: Sequelize.JSON
      },
      Tipo_Hospedaje: {
        type: Sequelize.JSON
      },
      Calificacion_Hospedaje: {
        type: Sequelize.JSON
      },
      Material_Informativo: {
        type: Sequelize.JSON
      },
      Oficina: {
        type: Sequelize.JSON
      },
      Tipo_Informacion: {
        type: Sequelize.JSON
      },
      Medio_Informacion: {
        type: Sequelize.JSON
      },
      Tipo_Material: {
        type: Sequelize.JSON
      },
      Calificacion_Informacion: {
        type: Sequelize.JSON
      },
      Otra_Informacion: {
        type: Sequelize.JSON
      },
      Que_Informacion: {
        type: Sequelize.JSON
      },
      Calificacion_MC: {
        type: Sequelize.JSON
      },
      Recomendaria: {
        type: Sequelize.JSON
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Surveys');
  }
};