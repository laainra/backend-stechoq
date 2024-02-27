module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      name: {
        type: Sequelize.STRING,
        allowNull: false 
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false, 
        unique: true 
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false 
      }
    });
  
    return User;
  };
  