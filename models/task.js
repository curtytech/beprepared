'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Task.init({
    iduser: DataTypes.INTEGER,
    description: DataTypes.STRING,
    completed: DataTypes.BOOLEAN,
    taskdate: DataTypes.DATE 
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};