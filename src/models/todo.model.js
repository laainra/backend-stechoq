// todo.model.js
module.exports = (sequelize, Sequelize) => {
    const Todo = sequelize.define("todos", {
      title: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.BOOLEAN,
      },
      
      username: {
        type: Sequelize.STRING,
        references: {
          model: 'users',
          key: 'username', 
        },
        onUpdate: 'CASCADE', 
        onDelete: 'CASCADE', 
      }
    });
  
    return Todo;
};
