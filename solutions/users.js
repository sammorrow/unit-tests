var Sequelize = require('sequelize');
var db = require('./db')
var Product = require('./products')
var User = db.define('user', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING
  },
  age: {
    type: Sequelize.INTEGER
  },
  gender: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true,
    }
  },
  isAdult: {
    type: Sequelize.BOOLEAN
  }
}, {
  getterMethods: {
    initials: function(){
      return this.firstName[0] + this.lastName[0]
    }
  }
});

User.prototype.formalize = function(arg){
  if (arg) this.firstName = `Sir ${this.firstName}`
  else if (this.gender === 'male') this.firstName = `Mr. ${this.firstName}`
  else this.firstName = `Mrs. ${this.firstName}`
}

User.findByInitials = function(initialsToFind){
  return User.findAll({})
  .then(usersArr => {
    return usersArr.filter(user => user.initials === initialsToFind)
  })
}

User.hook('beforeValidate', function(userInstance){
  if (userInstance.age > 17) userInstance.isAdult = true;
  else userInstance.isAdult = false;
})

Product.belongsTo(User, {as: 'vendor'})

module.exports = User;
