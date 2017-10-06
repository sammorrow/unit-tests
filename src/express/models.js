var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/expresstests', {
    logging: false
});

var Item = db.define('item', {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    urlTitle: {
      type: Sequelize.STRING,
      allowNull: false
    },
    content: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.STRING,
        allowNull: false
    },
    tags: {
      type: Sequelize.ARRAY(Sequelize.TEXT),
      set: function (value) {
          var arrayOfTags;
          if (typeof value === 'string') {
              arrayOfTags = value.split(',').map(function (s) {
                  return s.trim();
              });
              this.setDataValue('tags', arrayOfTags);
          } else {
              this.setDataValue('tags', value);
          }
      }
  }
}, {
    hooks: {
        beforeValidate: function (item) {
            if (item.name) {
                item.urlTitle = item.name.replace(/\s+/g, '_').replace(/\W/g, '').toLowerCase();
            }
        }
    },
});

Item.prototype.findSimilar = function(){
  return Item.findAll({
      where: {
          tags: {
              $overlap: this.tags
          },
          id: {
              $ne: this.id
          }
      }
  })
}

var User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    }
});

module.exports = {
    Item, User
};
