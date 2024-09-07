process.env.NODE_ENV = "test";
const request = require("supertest");

const app = require("../app");
let items = require("../fakeDb");


let pickles = { name: "Pickles", price:10 };

beforeEach(function () {
  items.push(pickles);
});

afterEach(function () {
  // make sure this *mutates*, not redefines, `cats`
  items.length = 0;
});

describe("GET /items", () => {
  test("Get all items", async () => {
    const res = await request(app).get("/items");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ items: [pickles] });
  });
});

describe("GET /items/:name", () => {
    test("Get item by name", async () => {
        const res = await request(app).get(`/items/${pickles.name}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ cat: pickles });
    });
    test("Responds with 404 for invalid item", async () => {
        const res = await request(app).get(`/items/icecube`);
        expect(res.statusCode).toBe(404);
    })
})

describe("POST /items", () => {
  test("Creating a item", async () => {
    const res = await request(app).post("/items").send({ name: "Blue" });
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({ item: { name: "Blue" } });
  });
  test("Responds with 400 if name is missing", async () => {
    const res = await request(app).post("/items").send({});
    expect(res.statusCode).toBe(400);
  })
})

describe("/PATCH /items/:name", () => {
  test("Updating an item's name", async () => {
    const res = await request(app)
      .patch(`/items/${pickles.name}`)
      .send({ name: "Hot Dogs" });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ item: { name: "Hot Dogs" } });
  });
  test("Responds with 404 for invalid name", async () => {
    const res = await request(app)
      .patch(`/items/Piggles`)
      .send({ name: "Hot Dogs" });
    expect(res.statusCode).toBe(404);
  });
});


describe("/DELETE /items/:name", () => {
  test("Deleting an item", async () => {
    const res = await request(app).delete(`/items/${pickles.name}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: "Deleted" });
  });
  test("Responds with 404 for deleting invalid item", async () => {
    const res = await request(app).delete(`/items/hamface`);
    expect(res.statusCode).toBe(404);
  });
});
