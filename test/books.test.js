const request = require('supertest')
const {app, books} = require('../src/1-users/indexBooks');

describe('POST /books', () =>{
    beforeEach(() => {
        books.length = 0;  // Limpa o array books antes de cada teste
    });
    
    it('deve adicionar um novo livro com sucesso', async () => {
        const newBook = { title: 'O Senhor dos Anéis', author: 'J.R.R Tolkien' };
    
        const response = await request(app)
            .post('/books')   // Corrigido para /books
            .send(newBook)
            .expect(201)
            .expect('Content-Type', /json/);
    
        expect(response.body).toMatchObject(newBook);
        expect(response.body).toHaveProperty('id');
    });
    
    it('deve retornar erro ao tentar adicionar livro sem titulo', async () => {
        const newBook = { author: 'J.K Rowling' };
    
        const response = await request(app)
            .post('/books')  // Corrigido para /books
            .send(newBook)
            .expect(400);
    
        expect(response.body).toEqual({ error: 'Title and author are required' });
    });
    
    it('deve listar todos os livros', async () => {
        books.push({ id: 1, title: '1984', author: 'George Orwell', available: true });
    
        const response = await request(app)
            .get('/books')   // Corrigido para /books
            .expect(200);
    
        expect(response.body).toHaveLength(1);
        expect(response.body[0]).toMatchObject({ title: '1984', author: 'George Orwell' });
    });
    
});