import { describe, expect, test } from "vitest";
import { IncomingHttpHeaders } from "http";
import { getAPIKey } from "../api/auth.js";

const testApiKey = "1234567890"

const emptyHeader: IncomingHttpHeaders = {}

const headerWithInvalidCredentials: IncomingHttpHeaders = {
  authorization: "Bearer myToken"
}

const headerWithAPIKey: IncomingHttpHeaders = {
  authorization: `ApiKey ${testApiKey}`
};

describe("auth", () => {
  test("get API Key With Empty Header", () => {
    const apiKey = getAPIKey(emptyHeader)
    expect(apiKey).toBeNull()
  });

  test("get API Key with Invalid Credentials", () => {
    const apiKey = getAPIKey(headerWithInvalidCredentials)
    expect(apiKey).toBeNull()
  });

  test("get API Key with Valid Credentials", () => {
    const apiKey = getAPIKey(headerWithAPIKey)
    expect(apiKey).toEqual(testApiKey)
  });
});
