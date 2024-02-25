const request = require('supertest');
const app = require('../app.js');
const User = require('../models/user.js');
const Profile = require('../models/profile.js');

describe('POST /auth/login', () => {
        it('logs in with correct credentials', async () => {

            const userData = {
            username: 'testuser',
            password: 'testpassword'
            };

            const response = await request(app)
            .post('/auth/login')
            .send(userData);

            expect(response.status).toBe(200);

        });

        it('does not log in with incorrect username and incorrect password', async () => {

            const userData = {
                username: 'testuser2',
                password: 'testtesttest'
            };

            const response = await request(app)
            .post('/auth/login')
            .send(userData);

            expect(response.status).toBe(400);
        })

        it('does not log in with correct username and incorrect password', async () => {

            const userData = {
                username: 'testuser',
                password: 'testtesttest'
            };

            const response = await request(app)
            .post('/auth/login')
            .send(userData);
            expect(response.status).toBe(400);
        })

        it('does not log in with incorrect username and correct password', async () => {

            const userData = {
                username: 'testuse',
                password: 'testpassword'
            };

            const response = await request(app)
            .post('/auth/login')
            .send(userData);
            expect(response.status).toBe(400);
        })
    });