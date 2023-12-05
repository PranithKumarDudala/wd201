/* eslint-disable no-undef */
/*
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
});*/

/* eslint-disable no-undef */

const todoList = require("../todo");
const { all, add, markAsComplete, overdue, dueToday, dueLater } = todoList();

describe("Todolist Test Suite", () => {
  beforeAll(() => {
    add({
      title: "Overdue Todo",
      completed: false,
      dueDate: new Date(
        new Date().setDate(new Date().getDate() - 1),
      ).toLocaleDateString("en-CA"),
    });
    add({
      title: "dueToday Todo",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });
    add({
      title: "dueLater Todo",
      completed: false,
      dueDate: new Date(
        new Date().setDate(new Date().getDate() + 1),
      ).toLocaleDateString("en-CA"),
    });
  });
  test("should add new todo", () => {
    const todoItemsCount = all.length;
    add({
      title: "Test todo",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });

    expect(all.length).toBe(todoItemsCount + 1);
  });

  test("should mark a todo as complete ", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });

  test("should retrieve overdue todos", () => {
    const overdueTodos = overdue();
    expect(overdueTodos.length).toBe(1);
    expect(overdueTodos[0].title).toBe("Overdue Todo");
  });

  test("should retrieve dueToday todos", () => {
    const overdueTodos = dueToday();
    expect(overdueTodos.length).toBe(2);
    expect(overdueTodos[0].title).toBe("dueToday Todo");
  });

  test("should retrieve  dueLater todos", () => {
    const overdueTodos = dueLater();
    expect(overdueTodos.length).toBe(1);
    expect(overdueTodos[0].title).toBe("dueLater Todo");
  });
});
