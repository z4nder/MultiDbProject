const assert = require('assert');
const mongoDb = require('../db/strategies/mongodb');
const Context = require('../db/strategies/base/contextStrategy');

const MOCK_HEROI_CADASTRAR = {
    nome: 'Mulher Maravilha',
    poder: 'Laço'
};
const MOCK_HEROI_DEFAULT = {
    nome: `Homen Aranha-${Date.now()}`,
    poder: 'Sentido Aranha'
};
const MOCK_HEROI_ATUALIZAR = {
    nome: `Patolino-${Date.now()}`,
    poder: 'Velocidade'
};
let MOCK_HEROI_ID = '';

const context = new Context (new mongoDb())
describe('MongoDB Suite de Testes', function (){
    this.beforeAll(async () => {
        await context.connect();
        await context.create(MOCK_HEROI_DEFAULT);
        const result = await context.create(MOCK_HEROI_ATUALIZAR);
        MOCK_HEROI_ID = result._id;
    })
    it('Verificar conexão', async () => {
        const result = await context.isConnected();
        console.log('Result', result)
        const expected = 'Conectado';

        assert.deepEqual(result, expected)
    });
    it('Cadastrar', async () =>  {
        const { nome, poder } = await context.create(MOCK_HEROI_CADASTRAR);//Se chegar uma promisse precisa do await
        assert.deepEqual({ nome, poder}, MOCK_HEROI_CADASTRAR);
    });
    it('Listar', async () => {
        const [{nome, poder}] = await context.read({ nome: MOCK_HEROI_DEFAULT.nome});
        const result = {
            nome, poder
        }
        assert.deepEqual(result, MOCK_HEROI_DEFAULT)
    });
    it ('Atualizar', async () => {
        const result = await context.update(MOCK_HEROI_ID, {
            nome: 'Pernalonga'
        });
        assert.deepEqual(result.nModified, 1)
    });
    it('Remover', async () => {
        const result = await context.delete(MOCK_HEROI_ID);//DELETE BY ID
        assert.deepEqual(result.n, 1);
    })
})