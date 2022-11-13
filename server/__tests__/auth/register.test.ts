import request from "supertest";
import app from "../../src";
import {afterAll, beforeAll, expect} from "@jest/globals";
import { faker } from '@faker-js/faker';
import {RegisterUserDTO} from "../../src/interfaces/auth/RegisterUserDTO";
import {createUser, deleteUser, getJwt, loginUser} from "../utils";
import {LoginUserDTO} from "../../src/interfaces/auth/LoginUserDTO";

const registerApiRoute = '/api/auth/register'

const createUserObject = (email: string, displayName: string, password: string): RegisterUserDTO => {
    return {email, displayName, password};
}

let user: LoginUserDTO | RegisterUserDTO;
let jwt: string;

describe("/auth/register - Register API endpoint", () => {
    beforeAll(async () => {
        user = await createUser(true)
        jwt = getJwt(await loginUser(user));
    });
    it("Successful API Request", async () => {
        const result = await request(app).post(registerApiRoute).send(createUserObject(faker.internet.email(), faker.datatype.string(7), faker.datatype.string(7)));
        expect(result.body.msg).toEqual("Registered User");
        expect(result.statusCode).toEqual(201);
    });

    it("Invalid Email API Request", async () => {
        const tempDisplayName = faker.datatype.string(7);
        const tempPassword = faker.datatype.string(7);

        let result = await request(app).post(registerApiRoute).send(createUserObject(user.email, tempDisplayName, tempPassword));
        expect(result.body.msg).toEqual("Email Already In Use");
        expect(result.statusCode).toEqual(409);

        result = await request(app).post(registerApiRoute).send(createUserObject('test1234567', tempDisplayName, tempPassword));
        expect(result.body.msg).toEqual("Invalid Email");
        expect(result.statusCode).toEqual(400);

        result = await request(app).post(registerApiRoute).send(createUserObject('test12345679123456789123456789@gmail.com', tempDisplayName, tempPassword));
        expect(result.body.msg).toEqual("Invalid Email");
        expect(result.statusCode).toEqual(400);
    });

    it("Invalid Display Name API Requests", async () => {
        const tempEmail = faker.internet.email();
        const tempPassword = faker.datatype.string(7);

        let result = await request(app).post(registerApiRoute).send(createUserObject(tempEmail, faker.datatype.string(2), tempPassword));
        expect(result.body.msg).toEqual("Invalid Display Name Length");
        expect(result.statusCode).toEqual(400);

        result = await request(app).post(registerApiRoute).send(createUserObject(tempEmail, faker.datatype.string(33), tempPassword));
        expect(result.body.msg).toEqual("Invalid Display Name Length");
        expect(result.statusCode).toEqual(400);

        if ("displayName" in user) {
            result = await request(app).post(registerApiRoute).send(createUserObject(tempEmail, user.displayName, tempPassword));
        }
        expect(result.body.msg).toEqual("Display Name Already In Use");
        expect(result.statusCode).toEqual(409);
    });

    it("Invalid Password API Requests", async () => {
        const tempEmail = faker.internet.email();
        const tempDisplayName = faker.internet.email();

        let result = await request(app).post(registerApiRoute).send(createUserObject(tempEmail, tempDisplayName, faker.datatype.string(6)));
        expect(result.body.msg).toEqual("Invalid Display Name Length");
        expect(result.statusCode).toEqual(400);

        result = await request(app).post(registerApiRoute).send(createUserObject(tempEmail, tempDisplayName, faker.datatype.string(33)));
        expect(result.body.msg).toEqual("Invalid Display Name Length");
        expect(result.statusCode).toEqual(400);
    });
    afterAll(async () => {
        await deleteUser(jwt)
    });
});
