const request = require('supertest');
const {app, users} = require ('../src/1-users/app');

describe('API de usuarios',() =>{
    beforeEach(() => {
        users.length = 0; //limpa o array
    });

    it('deve adicionar um novo usuario com sucesso', async() =>{
        const newUser = {name: 'Augusto lindo', email: 'lindo@gmail.com'};

        const response = await request(app)
        .post('/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /json/);

        expect(response.body).toMatchObject(newUser);
        expect(response.body).toHaveProperty('id', 1);
        expect(users).toHaveLength(1);
    });

    it ('deve retornar erro ao tentar adicionar usuario  sem nome', async() => {
        const newUser = {email: 'lindo@gmail.com'};

        const response = await request(app)
        .post('/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /json/);

        expect(response.body).toEqual({error: 'Name and email are required'});
        expect(users).toHaveLength(0);
    });

    it ('deve listar os usuarios cadastrados', async() => {
        users.push({id: 1, name: 'Augusto Lindo', email: 'lindo@gmail.com'});

        const response = await request(app)
        .get('/users')
        .expect(200)
        .expect('Content-Type', /json/);

        expect(response.body).toHaveLength(1);
        expect(response.body[0]).toMatchObject({name: 'Augusto Lindo', email: 'lindo@gmail.com'});

    })
});