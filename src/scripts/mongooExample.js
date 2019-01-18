const mongoose = require('mongoose');

mongoose.connect('mongodb://gadsden:250433@localhost/herois?authSource=admin&w=1',
 { useNewUrlParser: true }, function (error) {
     if(!error) return;
     console.log('Falha na conexão', error);
 });

 const connection = mongoose.connection
 connection.once('open', () => console.log('Database MONGODB CONECTADO'))

 const heroiSchema = new mongoose.Schema ({
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

 const model = Mongoose.model('herois', heroiSchema);

