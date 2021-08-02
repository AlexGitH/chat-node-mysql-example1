const { Sequelize, DataTypes, Model } = require( 'sequelize' );

const {
  MYSQL_HOST,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE
} = process.env

const sequelize = new Sequelize( MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD, {
  host    : MYSQL_HOST,
  dialect : 'mysql' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
} );

// TEST CONNECTION
// ( async() => {
//   try {
//     await sequelize.authenticate();
//     console.log( 'Connection has been established successfully.' );
//   } catch ( error ) {
//     console.error( 'Unable to connect to the database:', error );
//   }
// } )()

class Message extends Model {}

Message.init( {
  // Model attributes are defined here
  id : {
    type          : DataTypes.INTEGER,
    primaryKey    : true,
    autoIncrement : true
  },
  author : {
    type      : DataTypes.STRING,
    allowNull : false
  },
  createdAt : DataTypes.DATE, //Sequelize.DATE, //timestamp

  index : {
    type      : DataTypes.INTEGER,
    unique    : true,
    allowNull : false
  },
  nick : {
    type      : DataTypes.STRING,
    allowNull : false
  },
  message : {
    type : DataTypes.TEXT
    // allowNull defaults to true
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  updatedAt  : false, //Sequelize.DATE, //timestamp
  timestamps : true,
  modelName  : 'Message', // We need to choose the model name
  tableName  : 'message'  // this is a table name actually
} );

// CREATE TABLE IF NOT EXISTS
( async() => {
  await sequelize.sync();
  // await sequelize.sync( { force: true } );
  // Code here
} )();

module.exports = Message
