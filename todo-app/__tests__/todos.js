/* eslint-disable no-undef */
const request = require("supertest");
const db = require("../models");
const app = require("../app");
let server, agent;
// eslint-disable-next-line no-undef
describe("Todo test suite", () => {
  // eslint-disable-next-line no-undef
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
    server = app.listen(3000, () => {});
    agent = request.agent(server);
  });

  // eslint-disable-next-line no-undef
  afterAll(async () => {
    await db.sequelize.close();
    server.close();
  });

  // eslint-disable-next-line no-undef
  test("response with json at /todos", async () => {
    const responseItem = await agent.post("/todos").send({
      title: "Buy milk",
      dueDate: new Date().toISOString(),
      completed: false,
    });
    console.log("Full response:", responseItem);
    // eslint-disable-next-line no-undef
    expect(responseItem.statusCode).toBe(200);
    // eslint-disable-next-line no-undef
    expect(responseItem.header["content-type"]).toBe(
      "application/json; charset=utf-8",
    );
    const parsed = JSON.parse(responseItem.text);
    // eslint-disable-next-line no-undef
    expect(parsed.id).toBeDefined();
  });

  // eslint-disable-next-line no-undef
  test("Marking a todo as complete", async () => {
    const responseItem = await agent.post("/todos").send({
      title: "Buy milk",
      dueDate: new Date().toISOString(),
      completed: false,
    });

    const parsed = JSON.parse(responseItem.text);
    const todoID = parsed.id;

    // eslint-disable-next-line no-undef
    expect(parsed.completed).toBe(false);

    const markComplete = await agent
      .put(`/todos/${todoID}/markAsCompleted`)
      .send();

    const parsedUpdate = JSON.parse(markComplete.text);
    // eslint-disable-next-line no-undef
    expect(parsedUpdate.completed).toBe(true);
  }, 10000);

  test("Deletion of todo by id", async () => {
    // Create a todo to be deleted
    const ResponseCreation = await agent.post("/todos").send({
      title: "Test Todo",
      dueDate: new Date().toISOString(),
      completed: false,
    });

    const todoCreation = JSON.parse(ResponseCreation.text);

    // Perform the delete request
    const deleted = await agent
      .delete(`/todos/${todoCreation.id}`)
      .send();

    // Check the response
    expect(deleted.statusCode).toBe(200);
    expect(deleted.header["content-type"]).toBe(
      "application/json; charset=utf-8",
    );

    const parsedDelete = JSON.parse(deleted.text);

    // Check if the deletion was successful
    expect(parsedDelete).toBe(true);
  });
});
