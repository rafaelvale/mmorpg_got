function UsuariosDAO(connection) {
    this._connection = connection;
}
UsuariosDAO.prototype.inserirUsuario = function (usuario) {
    var dados = {
        operacao: "inserir",
        usuario: usuario,
        collection: "usuarios",
        callback: function (err, result) {
          
        }
    };
    this._connection(dados);
    
};

UsuariosDAO.prototype.autenticar = function (usuario,req, res) {
    var dados = {
        operacao: "procurar",
        usuario: usuario,
        collection: "usuarios",
        callback: function (err, result) {
       
            result.toArray(function (errArray, resultArray) {

                if (resultArray[0] != undefined) {
                     req.session.autorizado = true;
                     req.session.usuario = resultArray[0].usuario;
                     req.session.casa = resultArray[0].casa;
                }

                if (req.session.autorizado) {
                    res.redirect("jogo");
                }
                else {
                    

                    res.render("index", {
                        validacao: [
                            { msg: 'Usuario nao encontrado' }
                        ]
                    });
                }
            });
        }
    };
    this._connection(dados,req);

}

module.exports = function () {
    return UsuariosDAO;
};