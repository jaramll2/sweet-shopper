const Sequelize = require('sequelize')
const db = require('../db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const axios = require('axios');
const Cart = require('./Cart');
const LineItem = require('./LineItem');
const Candy = require('./Candy');
const { STRING } = require('sequelize');
const SALT_ROUNDS = 5;

const User = db.define('user', {
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate:{
      notEmpty: true
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: true,
    validate:{
      notEmpty: true
    }
  },
  admin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  firstName: {
    type: STRING
  },
  lastName: {
    type: STRING
  },
  email:{
    type: STRING
  },
  address: {
    type: STRING
  },
  city: {
    type: STRING
  },
  usState: {
    type: STRING
  },
  zipcode: {
    type: STRING
  },
})

module.exports = User

/**
 * instanceMethods
 */
User.prototype.correctPassword = function(candidatePwd) {
  //we need to compare the plain version to an encrypted version of the password
  return bcrypt.compare(candidatePwd, this.password);
}

User.prototype.generateToken = function() {
  return jwt.sign({id: this.id}, process.env.JWT)
}

/**
 * classMethods
 */

//URLs for github oauth
 const GITHUB_TOKEN_URL = 'https://github.com/login/oauth/access_token';
 const GITHUB_USER_URL = 'https://api.github.com/user';
 

User.authenticate = async function({ username, password, code }){
  //if we're logging in through github ouath
  if(code){
    let response = await axios.post(GITHUB_TOKEN_URL, {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code
    },{
      headers:{
        accept: 'application/json'
      }
    })

    const { data } = response;
    if(data.error){
      const error = new Error(data.error_description);
      error.status = 401;
      throw error;
    }
    const { access_token } = data;
    response = await axios.get(GITHUB_USER_URL, {
      headers: {
        Authorization: `token ${access_token}`
      }
    })
    const gitHubInfo = response.data;
    let user = await User.findOne({
      where: {username: gitHubInfo.login}
    })
    if(!user){
      user = await User.create({ username: gitHubInfo.login, /*password: 'GH',*/  firstName: 'First Name', lastName: 'Last Name', email: 'Email' });
      await Cart.create({ userId: user.id });
    }

    return user.generateToken();
  }
  //if we're logging in without github oauth
  else{
    const user = await this.findOne({where: { username }})
    if (!user || !(await user.correctPassword(password))) {
      const error = Error('Incorrect username/password');
      error.status = 401;
      throw error;
    }
    return user.generateToken();
  }

};

User.findByToken = async function(token) {
  try {
    const {id} = await jwt.verify(token, process.env.JWT)
    const user = await User.findOne({
      where: {
        id: id
      },
      include:[{
        model: Cart, include: [{
          model: LineItem, 
          include: [Candy]}]
      }]
    })
    if (!user) {
      throw 'nooo'
    }
    return user
  } 
  catch (ex) {
    const error = Error('bad token')
    error.status = 401
    throw error
  }
}

/**
 * hooks
 */
const hashPassword = async(user) => {
  //in case the password has been changed, we want to encrypt it with bcrypt
  if (user.changed('password')) {
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  }
}

User.beforeCreate(hashPassword)
User.beforeUpdate(hashPassword)
User.beforeBulkCreate(users => Promise.all(users.map(hashPassword)))
