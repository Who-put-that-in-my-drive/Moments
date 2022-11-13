import app from "../../src/index";
import request from "supertest";
import {expect} from "@jest/globals";

describe("/auth/logout - Logout API endpoint", () => {
    it("Logout API Request", async () => {
        const result = await request(app).get("/api/auth/logout");
        expect(result.body.msg).toEqual("Signed Out");
        expect(result.statusCode).toEqual(200);
        expect(result.headers['set-cookie'][0]).toContain('accessToken=;');
    });
});
