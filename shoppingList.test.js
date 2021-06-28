process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("./app");
const items = require("./fakeDb")

let item = { name: "Apple", price: 2.69};

beforeEach(function() {
    items.push(item);
});

afterEach(function() {    
    items.length = 0;
});

// GET /items- return {shoppinglist: [{name: apple, price: 2.69}]}
describe("GET /items", function() {
    test("Gets a item of shopping lists", async function() {
        const resp = await request(app).get(`/items`);
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({items: [item]})
    });
});

// GET /items/:name
describe("Get /items/:name", function() {
    test("Gets a single item", async function() {
        const resp = await request(app).get(`/items/${item.name}`);
        
        expect(resp.statusCode).toBe(200);
        expect(resp.body.shoppingList).toEqual({name: "Apple", price: 2.69});
    });
    test("Responds with 404 if can't find item", async function() {
        const resp = await request(app).get(`/items/0`);
        expect(resp.statusCode).toBe(500);
    });
});

//POST /items
describe("Post /items", function() {
    test("Create a new item", async function() {
        const resp = await request(app)
        .post(`/items`)
        .send({
            name: "lettuce",
            price: 1.3
        });
        expect(resp.statusCode).toBe(201);
        expect(resp.body).toEqual({
            shoppingList: {name:"lettuce", price: 1.3}
        });
    });    
});

//PATCH /items/:name
describe("Patch /items/:name", function() {
    test("Updates a single item", async function(){
        const resp = await request(app)
        .patch(`/items/${item.name}`)
        .send({
            name: "pear",
            price: 2.4          
        });
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({
            shoppingList:{ name: "pear", price: 2.4}
        });
    });

    test("Respond with 404 if id invalid", async function() {
        const resp = await request(app).patch(`/items/0`);
        expect(resp.statusCode).toBe(500);
    });
});

//DELETE /items/:name
describe("Delete /items/:name", function() {
    test("Deletes a single item", async function() {
        const resp = await request(app).delete(`/items/${item.name}`);
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({ message: "Deleted" })
    });
});

