const request = require('supertest');
const app = require('./app');

describe('Testes de Integração da API', () => {
    it('GET /pedidos deve retornar uma lista de pedidos', async () => {
        const res = await request(app).get('/pedidos');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });

    it('POST /pedidos deve criar um novo pedido', async () => {
        const novoPedido = {
            endereco: { latitude: -23.5555, longitude: -46.5555 },
            latitude: -23.5555,
            longitude: -46.5555,
            produto: 'Produto Teste',
            quantidade: 1
        };
        const res = await request(app).post('/pedidos').send(novoPedido);
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
    });

    it('GET /rotas deve retornar uma lista de rotas', async () => {
        const res = await request(app).get('/rotas');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });

    it('POST /rotas deve criar uma nova rota', async () => {
        const novaRota = { latitude: -23.5555, longitude: -46.5555 };
        const res = await request(app).post('/rotas').send(novaRota);
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
    });

    it('GET /melhor-rota/:id deve retornar a melhor rota de entrega', async () => {
        const novaRota = { latitude: -23.5555, longitude: -46.5555 };
        const rotaRes = await request(app).post('/rotas').send(novaRota);
        const res = await request(app).get(`/melhor-rota/${rotaRes.body.id}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });
});
