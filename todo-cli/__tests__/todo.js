
const todoList = require("../todo");
const { all, add, markAsComplete, overdue, dueToday, dueLater } = todoList();

describe("Testing todolist.js", () => {
  beforeAll(() => {
    add({
      title: "Overdue Todo",
      completed: false,
      dueDate: new Date(
        new Date().setDate(new Date().getDate() - 1),
      ).toISOString().slice(0, 10),
    });
    add({
      title: "dueToday Todo",
      completed: false,
      dueDate: new Date().toISOString().slice(0, 10),
    });
    add({
      title: "dueLater Todo",
      completed: false,
      dueDate: new Date(
        new Date().setDate(new Date().getDate() + 1),
      ).toISOString().slice(0, 10),
    });
  });
  test("test to add a new todo", () => {
    const lengthOfall = all.length;
    add({
      title: "Test todo",
      completed: false,
      dueDate: new Date().toISOString().slice(0, 10),
    });

    expect(all.length).toBe(lengthOfall + 1);
  });

  test("test to mark a todo as complete ", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });

  test("test to get overdue todos", () => {
    const noOftodos = overdue();
    expect(noOftodos.length).toBe(1);
    expect(noOftodos[0].title).toBe("Overdue Todo");
  });

  test("test to get dueToday todos", () => {
    const noOftodos = dueToday();
    expect(noOftodos.length).toBe(2);
    expect(noOftodos[0].title).toBe("dueToday Todo");
  });

  test("test to get dueLater todos", () => {
    const noOftodos = dueLater();
    expect(noOftodos.length).toBe(1);
    expect(noOftodos[0].title).toBe("dueLater Todo");
  });
});

