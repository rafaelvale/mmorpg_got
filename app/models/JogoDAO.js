function JogoDAO(connection) {
    this._connection = connection;
}

JogoDAO.prototype.gerarParametros = function (usuario) {
    var habilidades = {
        usuario: usuario,
        moeda: 15,
        suditos: 10,
        temor:Math.floor(Math.random() * 1000),
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
JogoDAO.prototype.iniciaJogo = function (res, usuario,casa, req, comando_invalido) {
    var dados = {
        operacao: "IniciaJogo",
        usuario: usuario,
        collection: "jogo",
        
        callback: function (err, result) {
       
            result.toArray(function (errArray, resultArray) {
               
                res.render('jogo', {img_casa: casa, jogo: resultArray[0], comando_invalido: comando_invalido});
             
            });
        }
    };
    this._connection(dados, req);



}
module.exports = function () {
    return JogoDAO;
};