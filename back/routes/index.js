/* eslint-disable linebreak-style */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable consistent-return */
// eslint-disable-next-line import/extensions, import/no-unresolved
/* eslint-disable no-restricted-syntax */
/* eslint-disable quotes */

const fs = require('fs');
const Express = require('express');
const { DataTypes } = require('sequelize');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const mysql = require('mysql2');
const excelJs = require('exceljs');
const format = require('date-fns/format');
// Middlewares:
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const rootPath = require('../middleware/root_path.middleware');
const errors = require('../middleware/error_handler.middleware');
const { sequelize } = require('../models');
const surveyController = require('../controllers/surveyControllers');
const contactoController = require('../controllers/contactoController');

const Survey = require('../models/survey')(sequelize, DataTypes);
const User = require('../models/user')(sequelize, DataTypes);
const Contacto = require('../models/contacto')(sequelize, DataTypes);
const validateToken = require('./validate-token');

const htmlContent = fs.readFileSync('./utils/panfleto-mail.html', 'utf-8');
const app = Express();

// Rutas

// conexion para el csv

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "prueba",
});

// use=
app.get('/getall', validateToken, async (req, res) => {
  try {
    const survey = await Survey.findAll();

    res.json(survey);
  } catch (err) {
    res.json('no funciona de nuevo');
  }
});

app.post('/login', async (req, res) => {
  const { name, password } = req.body;

  const userWname = await User.findOne({ where: { name } }).catch((err) => {
    console.log('Error: ', err);
  });
  if (!userWname) {
    return res.json({ message: 'Usuario o contraseña incorrectas!' });
  }
  if (userWname.password !== password) {
    return res.json({ message: 'Usuario o contraseña incorrectas!' });
  }

  const JwtToken = jwt.sign({ name: userWname.name }, process.env.JWT_SECRET);
  console.log(JwtToken);
  res.json({ token: JwtToken });
});

app.get('/dashboard', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.send('Estas autorizado');
});

app.post('/contacto', contactoController.createContacto);

app.get('/getContacts', validateToken, async (req, res) => {
  try {
    const contacto = await Contacto.findAll();

    res.json(contacto);
  } catch (err) {
    res.json('no funciona de nuevo');
  }
});

app.post('/send', surveyController.createSurvey);

// Newsletter
app.post('/newsletter', async (req, res) => {
  const { email } = req.body;
  const { CLIENT_ID } = process.env;
  const { CLIENT_SECRET } = process.env;
  const { REDIRECT_URI } = process.env;
  const { REFRESH_TOKEN } = process.env;

  const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI,
  );

  oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

  if (!email) {
    return res.status(400).json({ error: 'Ingrese por favor su correo' });
  }

  async function sendMail() {
    try {
      const tokenAcceso = await oAuth2Client.getAccessToken();
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          type: 'OAuth2',
          user: 'minaclaverogob@gmail.com',
          clientId: CLIENT_ID,
          clientSecret: CLIENT_SECRET,
          refreshToken: REFRESH_TOKEN,
          accessToken: tokenAcceso,
        },
      });
      const mailOptions = {
        from: 'minaclaverogob@gmail.com',
        to: email,
        subject: 'Turismo Mina Clavero',
        html: htmlContent,
      };
      const info = await transporter.sendMail(mailOptions);
      console.log('Correo electrónico enviado:', info.response);
      return res.status(200).json({ message: '¡Gracias!' });
    } catch (error) {
      console.error('Error interno del servidor:', error);
      return res.status(500).json({ error: 'Error interno al enviar el correo' });
    }
  }
  sendMail()
    .then(result => res.status(200).send('enviado'))
    .catch((error) => console.log(error.message));
});

app.get('/export', (req, res, next) => {
  connection.query('SELECT * FROM surveys', (err, data) => {
    if (err) {
      console.error('Error al ejecutar la consulta SQL:', err);
      return res.status(500).json({ error: 'Error en el servidor' });
    }

    const mysqlData = JSON.parse(JSON.stringify(data));

    try {
      const workbook = new excelJs.Workbook();
      const sheet = workbook.addWorksheet('data');

      // Define las cabeceras de las columnas
      const fileHeader = [

        { header: 'ID', key: 'id', width: 10 },
        { header: 'Edad', key: 'Turista.edad', width: 10 },
        { header: 'Sexo', key: 'Turista.sexo', width: 15 },
        { header: 'Procedencia', key: 'Turista.procedencia', width: 30 },
        { header: 'Acompañantes', key: 'Turista.acompaniantes', width: 30 },
        { header: 'Fecha de Ingreso', key: 'Turista.ingreso', width: 30 },
        { header: 'Fecha de Salida', key: 'Turista.salida', width: 30 },
        // Otras columnas aquí
        { header: 'Difusion', key: 'Difusion', width: 30 }, // Columna Difusion para opciones marcadas como true
        { header: 'Motivo', key: 'Motivo', width: 30 },
        { header: 'Reserva', key: 'Reserva.reserva', width: 30 },
        { header: 'Tipo de Hospedaje', key: 'Tipo_Hospedaje.tipo_hospedaje', width: 30 },
        { header: 'Calificacion del Hospedaje', key: 'Calificacion_Hospedaje.calificacion_hospedaje', width: 30 },
        { header: 'Material Informativo', key: 'Material_Informativo.recibioMaterial', width: 30 },
        { header: 'Oficina', key: 'Oficina.oficinaOption', width: 30 },
        { header: 'Tipo de Informacion', key: 'Tipo_Informacion', width: 40 },
        { header: 'Medio de Informacion', key: 'Medio_Informacion', width: 40 },
        { header: 'Tipo de Material', key: 'Tipo_Material', width: 30 },
        { header: 'Calificacion de Informacion', key: 'Calificacion_Informacion.calificacion', width: 30 },
        { header: 'Otra Informacion', key: 'Otra_Informacion.informacion', width: 25 },
        { header: 'Que otra Informacion', key: 'Que_Informacion', width: 50 },
        { header: 'Calificacion a Mina Clavero', key: 'Calificacion_MC.calificacion_MC', width: 30 },
        { header: 'Recomendaria', key: 'Recomendaria.recomendaria', width: 20 },
        { header: 'createdAt', key: 'createdAt', width: 25 },
        { header: 'updatedAt', key: 'updatedAt', width: 25 },
      ];

      sheet.columns = fileHeader;

      // Llena las filas con los datos
      mysqlData.forEach((row) => {
        const rowData = {
          id: row.id,
          'Turista.edad': row.Turista.edad,
          'Turista.sexo': row.Turista.sexo,
          'Turista.procedencia': row.Turista.procedencia,
          'Turista.acompaniantes': row.Turista.acompaniantes,
          'Turista.ingreso': row.Turista.ingreso ? format(new Date(row.Turista.ingreso), 'dd-MM-yyyy HH:mm:ss') : '',
          'Turista.salida': row.Turista.salida ? format(new Date(row.Turista.salida), 'dd-MM-yyyy HH:mm:ss') : '',
          'Reserva.reserva': row.Reserva.reserva,
          'Tipo_Hospedaje.tipo_hospedaje': row.Tipo_Hospedaje.tipo_hospedaje,
          'Calificacion_Hospedaje.calificacion_hospedaje': row.Calificacion_Hospedaje.calificacion_hospedaje,
          'Material_Informativo.recibioMaterial': row.Material_Informativo.recibioMaterial,
          'Oficina.oficinaOption': row.Oficina.oficinaOption,
          'Calificacion_Informacion.calificacion': row.Calificacion_Informacion.calificacion,
          'Otra_Informacion.informacion': row.Otra_Informacion.informacion,
          'Calificacion_MC.calificacion_MC': row.Calificacion_MC.calificacion_MC,
          'Recomendaria.recomendaria': row.Recomendaria.recomendaria,
          createdAt: row.createdAt ? format(new Date(row.createdAt), 'dd-MM-yyyy HH:mm:ss') : '',
          updatedAt: row.updatedAt ? format(new Date(row.updatedAt), 'dd-MM-yyyy HH:mm:ss') : '',
          Difusion: '',
          Motivo: '',
          Tipo_Informacion: '',
          Medio_Informacion: '',
          Tipo_Material: '',
          Que_Informacion: '',
        };

        // Difusion
        const difusionOptions = row.Difusion;
        const DOptions = [];
        for (const option in difusionOptions) {
          if (difusionOptions[option]) {
            DOptions.push(option);
          }
        }
        rowData.Difusion = DOptions.join(', ');

        // Motivo
        const motivoOptions = row.Motivo;
        const MOptions = [];
        for (const option in motivoOptions) {
          if (motivoOptions[option]) {
            MOptions.push(option);
          }
        }
        rowData.Motivo = MOptions.join(', ');

        // Tipo Informacion
        const tipoInformacionOptions = row.Tipo_Informacion;
        const TIOptions = [];
        for (const option in tipoInformacionOptions) {
          if (tipoInformacionOptions[option]) {
            TIOptions.push(option);
          }
        }
        rowData.Tipo_Informacion = TIOptions.join(', ');

        // Medio Informacion
        const medioInformacionOptions = row.Medio_Informacion;
        const MIOptions = [];
        for (const option in medioInformacionOptions) {
          if (medioInformacionOptions[option]) {
            MIOptions.push(option);
          }
        }
        rowData.Medio_Informacion = MIOptions.join(', ');

        // Tipo Material
        const tipoMaterialOptions = row.Tipo_Material;
        const TMOptions = [];
        for (const option in tipoMaterialOptions) {
          if (tipoMaterialOptions[option]) {
            TMOptions.push(option);
          }
        }
        rowData.Tipo_Material = TMOptions.join(', ');

        // Que Informacion
        const queInformacionOptions = row.Que_Informacion;
        const QIOptions = [];
        for (const option in queInformacionOptions) {
          if (queInformacionOptions[option]) {
            QIOptions.push(option);
          }
        }
        rowData.Que_Informacion = QIOptions.join(', ');

        sheet.addRow(rowData);
      });

      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      );
      res.setHeader(
        'Content-Disposition',
        'attachment; filename=data.xlsx',
      );

      workbook.xlsx.write(res)
        .then(() => {
          res.end();
        });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  });
});

app.use('/ping', (req, res) => {
  res.json({
    response: 'pong!',
  });
});
app.use('/', rootPath.handler);
app.use(rootPath.setHeaders);
app.use(errors.handler);

module.exports = app;
