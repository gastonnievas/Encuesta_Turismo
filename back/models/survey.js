/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Survey extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Survey.init({
    Turista: DataTypes.JSON,
    Difusion: DataTypes.JSON,
    Motivo: DataTypes.JSON,
    Reserva: DataTypes.JSON,
    Tipo_Hospedaje: DataTypes.JSON,
    Calificacion_Hospedaje: DataTypes.JSON,
    Material_Informativo: DataTypes.JSON,
    Oficina: DataTypes.JSON,
    Tipo_Informacion: DataTypes.JSON,
    Medio_Informacion: DataTypes.JSON,
    Tipo_Material: DataTypes.JSON,
    Calificacion_Informacion: DataTypes.JSON,
    Otra_Informacion: DataTypes.JSON,
    Que_Informacion: DataTypes.JSON,
    Calificacion_MC: DataTypes.JSON,
    Recomendaria: DataTypes.JSON,
  }, {
    sequelize,
    modelName: 'Surveys',
  });
  return Survey;
};
