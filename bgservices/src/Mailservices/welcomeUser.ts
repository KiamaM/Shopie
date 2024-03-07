import mssql from 'mssql'
import dotenv from 'dotenv'
import { sqlConfig1 } from '../config/sqlconfig'
import ejs from 'ejs'
import { sendMail } from '../Helpers/emailHelpers'
dotenv.config()

export const welcomeUser = async()=>{
    const pool = await mssql.connect(sqlConfig1)

    const users = (await pool.request().query('SELECT * FROM Users WHERE welcomed = 0')).recordset

    console.log(users);
   
for (let user of users) {
    ejs.renderFile('Template/welcomeUser.ejs', { firstName: user.firstName }, async (error, data) => {
        if (error) {
            console.log(error);
            return;
        }

        let mailOptions = {
            from: "wangaripauline303@gmail.com",
            to: user.email,
            subject: "Welcome to Shopie Cafe",
            html: data
        };

        try {
            await sendMail(mailOptions);
            await pool.request().query(`UPDATE Users SET welcomed = 1 WHERE userID = ${user.userId}`);
            console.log(`Email sent to ${user.firstName}`);
        } catch (error) {
            console.log(error);
        }
    });
}}
