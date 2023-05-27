import { Sequelize } from "sequelize";
import env from "dotenv";

import User from "./models/user.js";
import properties from "./models/properties.js";
import pictures from "./models/pictures.js";
import categories from "./models/categories.js";
import likedProperty from "./models/likedProperty.js";
import ratings from "./models/ratings.js";
import serviceType from "./models/serviceType.js";

env.config()

  // create connection to database
const sequelize = new Sequelize(process.env.DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.MYSQL_PORT,
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = User(sequelize, Sequelize);
db.properties = properties(sequelize, Sequelize)
db.pictures = pictures(sequelize, Sequelize)
db.categories = categories(sequelize, Sequelize)
db.likedProperty = likedProperty(sequelize, Sequelize)
db.ratings = ratings(sequelize, Sequelize)
db.serviceType = serviceType(sequelize, Sequelize)

// relation between user and properties
db.User.hasMany(db.properties, {
    foreignKey: 'userId',
})
db.properties.belongsTo(db.User, {
    foreignKey: 'userId',
})

// relation between pictures and properties
db.properties.hasMany(db.pictures, {
    foreignKey: 'propertyId'
})
db.pictures.belongsTo(db.properties, {
    foreignKey: 'propertyId'
})

// relation between properties and category
db.categories.hasMany(db.properties, {
    foreignKey: 'categoryId'
})
db.properties.belongsTo(db.categories, {
    foreignKey: 'categoryId'
})

// relation between properties and service type
db.serviceType.hasMany(db.properties, {
    foreignKey: 'serviceId'
})
// db.properties.belongsTo(db.serviceType, {
//     foreignKey: 'serviceId'
// })

// relation between user and like
db.User.hasMany(db.likedProperty, {
    foreignKey: 'userId'
})
db.likedProperty.belongsTo(db.User, {
    foreignKey: 'userId'
})

// relation between like and property
db.properties.hasMany(db.likedProperty, {
    foreignKey: 'propertyId'
})
db.likedProperty.belongsTo(db.properties, {
    foreignKey: 'propertyId'
})

// relation between user and ratings
db.User.hasMany(db.ratings, {
    foreignKey: 'userId'
})
db.ratings.belongsTo(db.User, {
    foreignKey: 'userId'
})

// relation between ratings and property
db.properties.hasMany(db.ratings, {
    foreignKey: 'propertyId'
})
db.likedProperty.belongsTo(db.properties, {
    foreignKey: 'propertyId'
})

export default db

  