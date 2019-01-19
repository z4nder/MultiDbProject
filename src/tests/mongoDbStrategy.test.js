const assert = require('assert');
const mongoDb = require('../db/strategies/mongodb');
const Context = require('../db/strategies/base/contextStrategy');

const context = new Context (new mongoDb())
describe('MongoDB Suite de Testes', function (){
    this.beforeAll(async () => {
        await context.connect();
    })
    it('Verificar conexão', async () => {
        const result = await context.isConnected();
        console.log('Result', result)
        const expected = 'Conectado';

        assert.deepEqual(result, expected)
    })
})