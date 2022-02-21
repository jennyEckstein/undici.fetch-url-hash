"use strict";

const { MockAgent, fetch, setGlobalDispatcher } = require("undici");

const mockAgent = new MockAgent();
setGlobalDispatcher(mockAgent);

const port = Math.round(Math.random() * 5000 + 1000);
const endpoint = `http://localhost:${port}`;

const mockPool = mockAgent.get(endpoint);

async function start() {
  mockPool
    .intercept({ method: "GET", path: "/test?foo=bar#page=1" })
    .reply(200, { body: "foo" });

  try {
    const res = await fetch(`${endpoint}/test?foo=bar#page=1`);
    console.warn("res:", res);
  } catch (err) {
    console.warn("err:", err);
  }
}

start();
