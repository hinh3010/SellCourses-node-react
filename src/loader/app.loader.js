import express from 'express'
import path from 'path'
import cors from 'cors'
const appLoader = (app) => {
    app.use(express.static(path.join(__dirname, '..', 'public'), { maxAge: 31557600000 }))
    app.use(express.json({ limit: '30mb' }));
    app.use(express.urlencoded({ extended: true, limit: '30mb' }));
    app.use(cors());
    app.options('*', cors());
    // app.use(cors({ origin: process.env.ORIGIN_CONNECTED, credentials: true }));
}

export default appLoader