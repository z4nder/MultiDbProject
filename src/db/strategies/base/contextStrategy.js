const ICrud = require('./../interfaces/interfaceCrud');

class ContextStrategy extends ICrud {//Classe abstrata
    constructor(strategy){
        super();
        this._database = strategy;
    };

    create(item) {
        return this._database.create(item);
    };
    read(item) {
        return this._database.read(item);
    };
    update(id, item) {
        return this._database.update(id, item);
    };
    delete(id) {
        return this._database.delete(id);
    }
    isConnected() {
        throw new NotImplementedException();
    };
};

module.exports = ContextStrategy;