/* eslint-disable linebreak-style */
/* eslint-disable function-paren-newline */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
/* eslint-disable object-curly-newline */
/* eslint-disable comma-style */
/* eslint-disable arrow-body-style */
/* eslint-disable arrow-spacing */
/* eslint-disable comma-dangle */
/* eslint-disable indent */
/* eslint-disable semi */
const passport = require('passport');
const passportJwt = require('passport-jwt');
const { DataTypes } = require('sequelize');
const { sequelize } = require('../models');
const User = require('../models/user')(sequelize, DataTypes)

const ExtractJwt = passportJwt.ExtractJwt;
const StrategyJwt = passportJwt.Strategy;

passport.use(new StrategyJwt({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET, }
    , (jwtPayload, done) => {
        return User.findOne({ where: { id: jwtPayload.id } }).then((user)=> {
            return done(null, user)
        }).catch((err) => {
            return done(err)
        })
    })
);
