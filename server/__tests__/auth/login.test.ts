import request from 'supertest';
import app from '../../src';
import {afterAll, beforeAll, expect} from '@jest/globals';
import { faker } from '@faker-js/faker';
import {LoginUserDTO} from '../../src/interfaces/auth/LoginUserDTO';
import {createUser, deleteUser, getJwt} from '../utils';
import {RegisterUserDTO} from '../../src/interfaces/auth/RegisterUserDTO';

const loginApiRoute = '/api/auth/login';

let user: LoginUserDTO | RegisterUserDTO;
let jwt: string;

describe('/auth/login - Login API endpoint', () => {
    beforeAll(async () => {
        user = await createUser(false);
    });
    it('Successful API Request', async () => {
        const result = await request(app).post(loginApiRoute).send(user);
        expect(result.body.msg).toEqual('Signed In');
        expect(result.statusCode).toEqual(202);
        expect(result.headers['set-cookie'][0]).toContain('accessToken=');
        jwt = getJwt(result);
    });
    it('Incorrect Email API Request', async () => {
        const result = await request(app).post(loginApiRoute).send({email: faker.datatype.string(7), password: user.password});
        expect(result.body.msg).toEqual('Incorrect Email/Password');
        expect(result.statusCode).toEqual(403);
    });
    it('Incorrect Password API Request', async () => {
        const result = await request(app).post(loginApiRoute).send({email: user.email, password: faker.datatype.string(7)});
        expect(result.body.msg).toEqual('Incorrect Email/Password');
        expect(result.statusCode).toEqual(403);
    });
    afterAll(async () => {
        await deleteUser(jwt);
    });
});
