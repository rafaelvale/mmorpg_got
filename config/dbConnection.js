var mongo = require("mongodb").MongoClient;
var assert = require("assert");
const url = "mongodb://localhost:27017";
const dbName = "got";
var connMongoDB = function (dados) {
    mongo.connect(url, function (err, client) {
        assert.equal(null, err);
        console.log("Servidor Conectado com sucesso!");
        const db = client.db(dbName);
        query(db, dados);
        client.close();
    });
};

function query(db, dados) {
    var collection = db.collection(dados.collection);
    switch (dados.operacao) {
        case "inserirUsuario":
        collection.insertOne(dados.usuario, dados.callback);
        break;
        case "inserirJogo":
            collection.insertOne(dados.habilidades, dados.callback);
        break;
        case "procurarUsuario":
        collection.find(dados.usuario, dados.callback);
        break;    
        case "IniciaJogo":
            collection.find(dados.usuario, dados.callback);
            break; 
        case "inserirAcao":
            collection.insertOne(dados.acao, dados.callback);
            break;
        case "verificaAcoes":
            collection.find(dados.usuario, dados.callback);
            break;
        default:
            break;
    }
}


module.exports = function () {
    return connMongoDB;
};