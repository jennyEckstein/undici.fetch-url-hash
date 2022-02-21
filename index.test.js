test("this is test - the retry attempt hashes URI queries", async () => {
  mockPool
    .intercept({ method: "GET", path: "/test?foo=bar" })
    .reply(504, { body: "foo", status: 504 })
    .times(6);
  const httpClient = getHttpClient();
  await expect(
    httpClient.get("/test?foo=bar", { useRetryPattern: false })
  ).rejects.toMatchObject({
    _data: { status: 504 },
  });
  assertRetryLogs({ method: "get", path: "/test?foo=bar" });
  assertRequestLogs({ statusCode: 504 });
});

test.only("fragment this is test - the retry attempt hashes URI queries", async () => {
  mockPool
    .intercept({ method: "GET", path: "/test?foo=bar#page=1" })
    .reply(504, { body: "foo", status: 504 })
    .times(6);
  const httpClient = getHttpClient();
  await expect(
    httpClient.get("/test?foo=bar#page=1", { useRetryPattern: false })
  ).rejects.toMatchObject({
    _data: { status: 504 },
  });
  assertRetryLogs({ method: "get", path: "/test?foo=bar#page=1" });
  assertRequestLogs({ statusCode: 504 });
});
