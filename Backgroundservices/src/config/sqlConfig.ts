import dotenv from 'dotenv'

dotenv.config()

console.log(process.env.DB_NAME);


export const sqlConfig = {
    user: 'sa',
    password: '09909090Mkk',
    database: 'SHOPSIS',
    server: "DESKTOP-B56002J\KIMWETICHKKORIR",
    pool:{
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options:{
        encrypt: false,
        trustServerCertificate: true
    }
}

console.log(sqlConfig);