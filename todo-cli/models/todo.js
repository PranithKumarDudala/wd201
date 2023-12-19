'use strict';
const {
  Model, where
} = require('sequelize');
'use strict';

module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static async addTask(params) {
      return await Todo.create(params);
    }
    static async showList() {
      console.log("My Todo list \n");
      console.log("Overdue");
      const overdueTasks = await Todo.overdue(); // Assuming 'this' refers to the class containing the overdue function
      if (overdueTasks.length === 0) {
        console.log("No Overdue tasks.");
      } else {
        overdueTasks.forEach((task) => {
          console.log(task.displayableString());
        });
      }
      console.log("\n");

      console.log("Due Today");
      const todaydueTasks = await Todo.dueToday(); // Assuming 'this' refers to the class containing the overdue function
      if (todaydueTasks.length === 0) {
        console.log("No dueToday tasks.");
      } else {
        todaydueTasks.forEach((task) => {
          console.log(task.displayableString());
        });
      }
      console.log("\n");

      console.log("Due Later");
      const laterdueTasks = await Todo.dueLater(); // Assuming 'this' refers to the class containing the overdue function
      if (laterdueTasks.length === 0) {
        console.log("No duelater tasks.");
      } else {
        laterdueTasks.forEach((task) => {
          console.log(task.displayableString());
        });
      }
      console.log("\n");
    }
    

    static async overdue() {
      let allDues=await Todo.findAll();
      let resultDues = [];
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      for (let i = 0; i < allDues.length; i++) {
      let due=new Date(allDues[i].dueDate);
      due.setHours(0, 0, 0, 0);
      if (due.getTime() < today.getTime()) {
        resultDues.push(allDues[i]);
      }
    }
    return resultDues;
    }

    static async dueToday() {
      let allDues=await Todo.findAll();
      let resultDues = [];
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      for (let i = 0; i < allDues.length; i++) {
      let due=new Date(allDues[i].dueDate);
      due.setHours(0, 0, 0, 0);
      if (due.getTime() === today.getTime()) {
        resultDues.push(allDues[i]);
      }
    }
    return resultDues;
    }

    static async dueLater() {
      let allDues=await Todo.findAll();
      let resultDues = [];
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      for (let i = 0; i < allDues.length; i++) {
      let due=new Date(allDues[i].dueDate);
      due.setHours(0, 0, 0, 0);
      if (due.getTime() > today.getTime()) {
        resultDues.push(allDues[i]);
      }
    }
    return resultDues;
    }

    static async markAsComplete(id) {
      await Todo.update({ completed: true }, {
        where: { id: id }
      });
    }

    displayableString() {
      let checkbox = this.completed ? "[x]" : "[ ]";
      const dueDateInstance = new Date(this.dueDate);

      if (!isNaN(dueDateInstance.getTime())) {
        const today = new Date();
        if (
          dueDateInstance.getFullYear() === today.getFullYear() &&
          dueDateInstance.getMonth() === today.getMonth() &&
          dueDateInstance.getDate() === today.getDate()
        ) {
          return `${this.id}. ${checkbox} ${this.title}`;
        }
      }
      return `${this.id}. ${checkbox} ${this.title} ${this.dueDate}`;
    }
  }
  Todo.init({
    title: DataTypes.STRING,
    dueDate: DataTypes.DATEONLY,
    completed: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};
