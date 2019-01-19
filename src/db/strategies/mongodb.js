const ICrud = require("./interfaces/interfaceCrud");
const mongoose = require("mongoose");
const STATUS = {
  0: "Disconectado",
  1: "Conectado",
  2: "Conectando",
  3: "Disconectado"
};

class MongoDB extends ICrud {
  constructor() {
    super();
    this._herois = null;
    this._driver = null;
  }

  async isConnected() {
    const state = STATUS[this._driver.readyState];
    if (state === "Conectado") return state;

    if (state !== "Conectando") return state;

    await new Promise(resolve => setTimeout(resolve, 1000));

    return STATUS[this._driver.readyState];
  }

  defineModel() {
    heroiSchema = new mongoose.Schema({
      nome: {
        type: String,
        required: true
      },
      poder: {
        type: String,
        required: true
      },
      insertedAt: {
        type: Date,
        default: new Date()
      }
    });

    this._herois = mongoose.model("herois", heroiSchema);
  }

  connect() {
    mongoose.connect(
      "mongodb://gadsden:250433@localhost/herois?authSource=admin&w=1",
      { useNewUrlParser: true },
      function(error) {
        if (!error) return;
        console.log("Falha na conexão", error);
      }
    );

    const connection = mongoose.connection;
    this._driver = connection;
    connection.once("open", () => console.log("Database MONGODB CONECTADO"));
  }

  async create(item) {
    const resultCadastrar = await model.create({
      nome: "Batman",
      poder: "Dinheiro"
    });
    console.log("resultCadastrar", resultCadastrar);
  }
}

module.exports = MongoDB;
