const todoList = () => {
    all = []
    const today = new Date().toISOString().split("T")[0];

    const dateToday = new Date();
    
    const yesterday = new Date(new Date().setDate(dateToday.getDate() - 1)).toISOString().split("T")[0];
        
      
    const tomorrow = new Date(new Date().setDate(dateToday.getDate() + 1)).toISOString().split("T")[0];

    const add = (todoItem) => {
      all.push(todoItem)
    }
    const markAsComplete = (index) => {
      all[index].completed = true
    }
  
    const overdue = () => {
      // Write the date check condition here and return the array
      // of overdue items accordingly.

      const yesterdayDue = all.filter((item) => {
        return item.dueDate === yesterday;
      })

      return yesterdayDue;
    }
  
    const dueToday = () => {
      // Write the date check condition here and return the array
      // of todo items that are due today accordingly.

        const todayDue = all.filter((item) => {
            return item.dueDate === today;
        })


        return todayDue;
    }
  
    const dueLater = () => {
      // Write the date check condition here and return the array
      // of todo items that are due later accordingly.

      const tomorrowDue = all.filter((item) => {
        return item.dueDate === tomorrow;
      })

      return tomorrowDue;
    }
  
    const toDisplayableList = (list) => {
      // Format the To-Do list here, and return the output string
      // as per the format given above.
      let result = "";
      list.map((item) => {

            if(item.dueDate === today)

                if(item.completed === true)
                {
                    result += `[x] ${item.title}\n`;
                }
                else
                    result += `[ ] ${item.title}\n`;
            else

                if(item.completed === true)
                {
                    result += `[x] ${item.title} ${item.dueDate}\n`;
                }
                else
                    result += `[ ] ${item.title} ${item.dueDate}\n`;
      });

      return result.slice(0,-1);
    }
  
    return {
      all,
      add,
      markAsComplete,
      overdue,
      dueToday,
      dueLater,
      toDisplayableList
    };
  };
  
  // ####################################### #
  // DO NOT CHANGE ANYTHING BELOW THIS LINE. #
  // ####################################### #
  
  const todos = todoList();
  
  const formattedDate = d => {
    return d.toISOString().split("T")[0]
  }
  
  var dateToday = new Date()
  const today = formattedDate(dateToday)
  const yesterday = formattedDate(
    new Date(new Date().setDate(dateToday.getDate() - 1))
  )
  const tomorrow = formattedDate(
    new Date(new Date().setDate(dateToday.getDate() + 1))
  )
  
  todos.add({ title: 'Submit assignment', dueDate: yesterday, completed: false })
  todos.add({ title: 'Pay rent', dueDate: today, completed: true })
  todos.add({ title: 'Service Vehicle', dueDate: today, completed: false })
  todos.add({ title: 'File taxes', dueDate: tomorrow, completed: false })
  todos.add({ title: 'Pay electric bill', dueDate: tomorrow, completed: false })
  
  console.log("My Todo-list\n")
  
  console.log("Overdue")
  var overdues = todos.overdue()
  var formattedOverdues = todos.toDisplayableList(overdues)
  console.log(formattedOverdues)
  console.log("\n")
  
  console.log("Due Today")
  let itemsDueToday = todos.dueToday()
  let formattedItemsDueToday = todos.toDisplayableList(itemsDueToday)
  console.log(formattedItemsDueToday)
  console.log("\n")
  
  console.log("Due Later")
  let itemsDueLater = todos.dueLater()
  let formattedItemsDueLater = todos.toDisplayableList(itemsDueLater)
  console.log(formattedItemsDueLater)
  console.log("\n\n")

  module.exports = todoList;