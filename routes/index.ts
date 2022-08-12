import { Application } from "express";
import api from './api';

const {Router} = require('express');

export default class Routes {
    static configure(app: Application) {
        app.use('/api', api(Router()));
    }
}