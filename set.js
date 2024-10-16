const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'ANDBAD-BOT;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZU1Ta3hQZDV2MnkwdDhmMWl5aElEVS9HQkVvbWhjRUxROXRFS01RbHQxWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSVdYOHhSblk5Qk12a2hiMEdneWtpeW9kNGRvU3dTZkRVMU1jcy9RRDZFbz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJjS0poc080bGpjbFJtaC9lckt4cHVILzVmR0tJN1FJNXJldExWVm1uSG1RPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzYkZOZTFYdk90N1VjWTNxSzk2Vkp1VlRhS2hHdGxua2ExSDhIVlM2OGlvPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImdHcTZVdnc1aVJTS3Z5WGRYOEZQUGhRVHlwQm44Nmd4YU1qaEJMbnZoblE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im1mQmVleGF3NjA1ZGhwUFpVNHVCb2UxUHhuMitpR291U3FOaTlJNWJpazA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib0VrblN5R2NXQ3VKUTdnaFNBMmJ6Nis3Y3Zxa2RHOFYybkRONXVOT09HOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZjVoK2dlY2ZSTU02MXA1TVVjZlJOem01M09lWjNZNXprR25BOTAveVh6MD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik5sYklmM09JNUhiNUFpZTNjMkQ1NlRPaDVoUlBRUW12UW9uaFRHN3RPTXF6TFNKTWpHL3ZQRjgyVTJOVnoxNW9kNWV4eEg4Z282VlU2emhsV1lLdERBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTc2LCJhZHZTZWNyZXRLZXkiOiJzTzlQWUpHQm91U3FYNVhxZERZQ1ZTM21uSUp0T1UwYXZhTkd5NGpycXBRPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJhVUxZSGpmLVJqR3c5LV9iY2thWHF3IiwicGhvbmVJZCI6ImNkYmYyNDVlLTk1NDYtNDg2Ni1iYWYxLThlZjAwMTQzODZmMyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJwRTJiWm96NDZaM21YNEpYelVYVGZuNWhJeXc9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUEZZdlpwdUVkK0pRNys3NUd0aXZ5LzZMSWlNPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlJaQTRKMko0IiwibWUiOnsiaWQiOiIyMzQ3MDcwMjM5MDA0OjQwQHMud2hhdHNhcHAubmV0IiwibmFtZSI6IitKQVkifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0tXbHA3Y0VFUDJxd0xnR0dBSWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Ik1CcFlMajBsa0VpTlRzbUR5TDVoSGFuRDVYbzZUY2I5cXlUeTV6SndZa0U9IiwiYWNjb3VudFNpZ25hdHVyZSI6InpUNVl1VGtWQTl2S3k5ZGV6bldZeWdoNWhvZ2I4NllwR0RHejd3ekhXSDd0RXk4QkFXZnFBR0ozaFY4RjFLSHg4R2laOHE5bWw1bTZ2azZSbFo4eURnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiI2cDh5NVZ2aWtLUEhiZnRXV0FoU3BrTmZvbi93UVZKMm41eHNNWlZ0bTh0L2R5Yi9lZVBYVXRFMGFQZEpDeVhSUmM0NUNDMjFpRmZyVXpzRG0zNFZEZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDcwNzAyMzkwMDQ6NDBAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCVEFhV0M0OUpaQklqVTdKZzhpK1lSMnB3K1Y2T2szRy9hc2s4dWN5Y0dKQiJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyOTEwNzMzOSwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFNbGQifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "𝐂𝐚𝐬𝐞𝐲𝐫𝐡𝐨𝐝𝐞𝐬",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "2349019406102",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || '𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐌𝐃',
    URL : process.env.BOT_MENU_LINKS || 'https://i.imgur.com/ggIBWn4.jpeg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
