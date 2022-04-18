$(document).ready(function(){
    
    // $('.acesso').on({
    //     blur: function(){
    //         var usuario = $("#_login").val().trim();
    //         var senha = $("#_senha").val().trim();
    //         if(usuario.length > 0 && senha.length > 0){
    //             setOptions();
    //         }
    //     }
    // });
    
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
            console.log(data);
            if (!data.status) {
                Notificar(data.erro);
            }
        })
    });
});