'use strict';

import fs from 'fs'
import path from 'path'
const env = process.env.NODE_ENV || 'development';
import { Sequelize, DataTypes } from 'sequelize';

const config = require(__dirname + '/../config/config.js')[env];
const sequelize: any = new Sequelize(config.database, config.username, config.password, config);

// current file basename
const basename = path.basename(__filename)

// our db object
const db: any = {}
  // create an array of model files' basenames
  const filenames = fs.readdirSync(__dirname).filter((file: string) => {
    return (
      // filter out the current `index.ts` file
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.ts'
    )
  })

  filenames.map((file: any) => {
    // use `require` to load our models
    const model = require(path.join(__dirname, file))(
      sequelize,
      DataTypes
    )
    db[model.name] = model
  })

  // run `.associate` if applicable
  Object.keys(db).map((model) => {
    if (db[model].associate) {
      db[model].associate(db)
    }
  })
  
  // attach both our instance and Sequelize to our db object
  db.sequelize = sequelize
  db.Sequelize = Sequelize

export default db;
