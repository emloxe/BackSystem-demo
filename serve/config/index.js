const path = require('path');
const fs = require('fs');

const importConfig = (filePath, name) => {
  const url = path.join(filePath, name);
  try {
    fs.accessSync(url, fs.constants.R_OK);
    return require(url);
  } catch (err) {
    return {};
  }
};

const {
  dbUser = 'root',
  dbPassword = '123456',
  databaseName = 'backsystem_demo',
  dbHost = '127.0.0.1',
  dbPort = 3306, 
  logging = false,

  serverPort = 3001,
} = importConfig(__dirname, './overWrite.js');

module.exports = {
  port: serverPort,
  api: '/api/v1',
  db_config: {
    username: dbUser,
    password: dbPassword,
    database: databaseName,
    host: dbHost,
    port: dbPort,
    timezone: '+08:00',
    logging,
  }
};