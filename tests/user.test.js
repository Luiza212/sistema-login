const request = require('supertest');
const app = require('../src/app');
const db = require('../src/database')
beforeEach((done) => {
  db.run("Delete fom users", done);
})
describe('Testes de usuário', () => {
  const user = {
    name: 'Laysa',
    email: 'laysa@email.com',
    password: '123456'
  };

  it('Cadastro com sucesso', async () => {
    const res = await request(app).post('/register').send(user);
    expect(res.statusCode).toBe(201);
  });

  it('Cadastro com email duplicado', async () => {
    const res = await request(app).post('/register').send(user);
    expect(res.statusCode).toBe(400);
  });

  it('Login com sucesso', async () => {
    const res = await request(app).post('/login').send({
      email: user.email,
      password: user.password
    });
    expect(res.statusCode).toBe(200);
  });

  it('Login inválido', async () => {
    const res = await request(app).post('/login').send({
      email: user.email,
      password: 'errado'
    });
    expect(res.statusCode).toBe(400);
  });
});