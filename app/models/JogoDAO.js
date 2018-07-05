var ObjectId = require('mongodb').ObjectID;
function JogoDAO(connection) {
    this._connection = connection;
}

JogoDAO.prototype.gerarParametros = function (usuario) {
    var habilidades = {
        usuario: usuario,
        moeda: 15,
        suditos: 10,
        temor: Math.floor(Math.random() * 1000),
        sabedoria: Math.floor(Math.random() * 1000),
        comercio: Math.floor(Math.random() * 1000),
        magia: Math.floor(Math.random() * 1000),
    }
    var dados = {
        operacao: "inserirJogo",
        collection: "jogo",
        hablidades: habilidades,
        callback: function (err, result) {

        }
    };
    this._connection(dados);
}

JogoDAO.prototype.iniciaJogo = function (res, usuario, casa, req, msg) {
    var usuarioObject = new Object();
    usuarioObject.usuario = usuario

    console.log(usuario);
    var dados = {
        operacao: "IniciaJogo",
        usuario: usuarioObject,
        collection: "jogo",

        callback: function (err, result) {

            result.toArray(function (errArray, resultArray) {

                res.render('jogo', { img_casa: casa, jogo: resultArray[0], msg: msg });
            });
        }
    };

    this._connection(dados, req);



}

JogoDAO.prototype.acao = function (acao) {
    var date = new Date();
    var tempo = null;
    switch (acao.acao) {
        case '1':
            tempo = 1 * 60 * 600000;
            break;
        case '2':
            tempo = 2 * 60 * 600000;
            break;
        case '3':
            tempo = 5 * 60 * 600000;
            break;
        case '4':
            tempo = 5 * 60 * 600000;
            break;
        default:
            break;
    }
    acao.acao_termina_em = date.getTime() + tempo;

    var dados = {
        operacao: "inserirAcao",
        collection: "acao",
        acao: acao,
      
    };
    this._connection(dados);

    var moedas = null;
    switch (acao.acao) {
        case '1':
            moedas = -2 * acao.quantidade;
            break;
        case '2':
            moedas = -3 * acao.quantidade;
            break;
        case '3':
            moedas = -1 * acao.quantidade;
            break;
        case '4':
            moedas = -1 * acao.quantidade;
            break;
        default:
            break;
    }

    var queryDb = { 
        usuario: { '$eq': acao.usuario },
        
        };
        var updateContent = {
        $inc : {
        "moeda": moedas
        }
    }

    var updateDados = {
        operacao: 'updateAcao',
        collection:'jogo',
        queryDb: queryDb,
        updateContent: updateContent,
        callback: function (err, result) {

        }

    };
    this._connection(updateDados);
}

JogoDAO.prototype.getAcoes = function (usuario, res) {
  
    var usuarioObject = new Object();
    var date = new Date();

    var acaoTerminaObj = new Object();
    acaoTerminaObj.$gt = date.getTime();

    

    usuarioObject.usuario = usuario
    usuarioObject.acao_termina_em = acaoTerminaObj


    var dados = {
        operacao: "verificaAcoes",
        usuario: usuarioObject,
        collection: "acao",

        callback: function (err, result) {

            result.toArray(function (errArray, resultArray) {

                res.render('pergaminhos', { acoes: resultArray });
               
            });
        }
    };

    this._connection(dados);
}

JogoDAO.prototype.revogarAcao = function (_id, res) {
    
    var dados = {
        operacao: "RemoveAcao",
        id: _id,
        collection: "acao",

        callback: function (err, result) {

                res.redirect("jogo?msg=D")
         
        }
    };
    this._connection(dados);
}

module.exports = function () {
    return JogoDAO;
};