$(document).ready(function(){
    
    $("#btnLogin").click(function(){
        var dados = {
            login : $("#_login").val(),
            senha : $("#_senha").val(),
            empresa : $("#_empresa").val(),
            estabelecimento : $("#_estabelecimento").val()
        }

        fetch("/login",{
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(dados)
        }).then(response =>{
            return response.json();
        }).then(data =>{
            debugger
            console.log(data);
            if (!data.status) {
                (data.status_sessao) ? 
                    confirm(null, solicEncerraSessoes, "Login ACX", data.erro, this)
                :
                    Notificar(retorno.erro)
            }
        })
    });
});