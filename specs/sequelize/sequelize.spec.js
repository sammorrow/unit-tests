var Promise = require('bluebird');
var expect = require('chai').expect;
var { db, User, Product } = require('../../src/sequelize/');

describe('The `User` model', function() {
    beforeEach(function() {
        return db.sync({ force: true });
    });

    var user, femaleUser;
    beforeEach(function() {
        user = User.build({
            firstName: 'Danny',
            lastName: 'Boy',
            age: 22,
            gender: 'male',
            email: 'dannyboy@gmail.com'
        });
    });

    describe('attributes definition', function() {
        it('includes `firstName`, `lastName`, `age`, `gender`, and `email` fields', function() {
            return user.save()
                .then(function(createdUser) {
                    expect(createdUser.firstName).to.equal('Danny');
                    expect(createdUser.lastName).to.equal('Boy');
                    expect(createdUser.age).to.equal(22);
                    expect(createdUser.gender).to.equal('male');
                    expect(createdUser.email).to.equal('dannyboy@gmail.com');
                });

        });

        it('requires firstName to have a value', function() {
            user.firstName = null;

            return user.validate()
                .then(function(success){
                    expect(success).to.be.undefined; // eslint-disable-line no-unused-expressions
                }, function(error){
                    expect(error).to.be.an.instanceOf(Error);
                });

        });

        it('requires email to be a valid email', function() {
            user.email = 'haha';

            return user.validate()
            .then(
                function(success){
                    expect(success).to.be.undefined; // eslint-disable-line no-unused-expressions
                }, function(error){
                    expect(error).to.be.an.instanceOf(Error);
                });


        });

    });

    describe('virtuals, hooks, and class and instance methods', function() {

        describe('getters', function() {

            it("contains an `initials` getter which gives the user's initials", function() {
                expect(user.initials).to.equal('DB');
                user.lastName = 'Mann';
                expect(user.initials).to.equal('DM');
            });

        });

        describe('hooks (`isAdult` field)', function() {

          beforeEach(function() {
            return User.create({
                firstName: 'Jason',
                lastName: 'Bourne',
                age: 35,
                email: 'jesuschristthats@jb.com'
            });
          });

          it('is created, even if not explicitly set', function() {

              return User.findOne({ where: { email: 'jesuschristthats@jb.com' } })
                  .then(function(jasonBourne) {
                      expect(jasonBourne.isAdult).to.equal(true);
                  });

          });

          it('is reset whenever the user is updated', function() {

              return User.findOne({ where: { email: 'jesuschristthats@jb.com' } })
                  .then(function(jasonBourne) {
                      expect(jasonBourne.isAdult).to.equal(true);
                      return jasonBourne.update({
                          age: 5
                      });
                  })
                  .then(function(babyBourne) {
                      expect(babyBourne.isAdult).to.equal(false);
                      return babyBourne.update({
                          age: 35
                      });
                  })
                  .then(function(newBourne) {
                      expect(newBourne.isAdult).to.equal(true);
                  });
          });
        });

        describe('instance methods (`formalize`)', function() {

            beforeEach(function() {
              femaleUser = User.build({
                firstName: 'Daniela',
                lastName: 'Girl',
                age: 22,
                gender: 'female',
                email: 'dannygal@gmail.com'
            });
        });

          it('prepends a "Mr. " or "Mrs. " to `firstName`', function() {

                expect(user.firstName).to.equal('Danny');
                user.formalize();
                expect(user.firstName).to.equal('Mr. Danny');

            });

          it('formalizes by gender', function() {
                expect(femaleUser.firstName).to.equal('Daniela');
                femaleUser.formalize();
                expect(femaleUser.firstName).to.equal('Mrs. Daniela');
          });

            it('makes the name super formal if you pass in an argument', function() {
                expect(user.firstName).to.equal('Danny');

                user.formalize('extra-fancy please');
                expect(user.firstName).to.equal('Sir Danny');
            });

        });

        describe('`findByInitials` class method', function() {
            beforeEach(function() {
                var usersData = [
                  {firstName: 'Danny',
                   lastName: 'Boy',
                   email: 'db@gmail.com'},
                  {firstName: 'Donny',
                   lastName: 'Boy',
                   email: 'db@gmail.com'},
                  {firstName: 'Johnny',
                   lastName: 'Boy',
                   email: 'jb@gmail.com'}
                  ];

                  return Promise.map(usersData, function (newUser) {
                    return User.create(newUser)
                })
            });

            it('finds an array of users based on `initials`', function() {

                return User.findByInitials('DB')
                    .then(function(usersArr) {
                        expect(usersArr).to.have.length(2)
                    });

            });


        });
    });

    describe('associations', function() {
        it("owns a product, stored in products model as product's 'vendor'`", function() {

            var newUser = User.create({
                firstName: 'Danny',
                lastName: 'Boy',
                email: 'db@gmail.com'
            });
            var newProduct = Product.create({
                name: 'Cow'
              });

            return Promise.all([newUser, newProduct])
                .spread(function(createdUser, createdProduct) {
                    return createdProduct.setVendor(createdUser);
                })
                .then(function() {
                    return Product.findOne({
                        where: { name: 'Cow' },
                        include: { model: User, as: 'vendor' }
                    });
                })
                .then(function(returnedProduct) {
                    expect(returnedProduct.vendor).to.exist; // eslint-disable-line no-unused-expressions
                    expect(returnedProduct.vendor.firstName).to.equal('Danny');
                });
        });
    });
});
