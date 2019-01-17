const ICrud = require('./interfaces/interfaceCrud');
const Sequelize = require('sequelize');



class Postgres extends ICrud {
    constructor() {
        super();
        this.driver = null;
        this._herois = null;        
    };
    async isConnected() {
        try{
            await this._driver.authenticate();
            return true;
        }
        catch(error) {
            console.log('fail!!!', error);
            return false;
        }
    };
    create(item) {
        return this._herois.create(item)
    };

    async connect() {
        this._driver = new Sequelize(
            'heroes',
            'gadsden',
            '250433',
            {
                 host: 'localhost',
                 dialect: 'postgres',
                 quoteIdentifiers: false,
                 operatosAliases: false
            }
        );
        await this.defineModel();//Criar o modelo
    };

    async defineModel() {
        this._herois = this._driver.define('herois', {
            id: {
                type: Sequelize.INTEGER,
                required: true,
                primaryKey: true,
                autoIncrement: true
            },
            nome: {
                type: Sequelize.STRING,
                required: true
            },
            poder: {
                type: Sequelize.STRING,
                required: true
            }
        },{
            tableName: 'TB_HEROIS',
            freezeTabName: false,
            timestamps: false
        });
        await this._herois.sync();
    }
};

module.exports = Postgres;