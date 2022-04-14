function login(retorno){
    if (retorno.status){

        var dados = {
            Session: true,
            Chave: retorno.chave
        }
        setLocalStorage('userUID', dados, 1440);
		
		IrPara("/frontend/pages/index.html");
	} else {
		Notificar(retorno.erro);
	}
}

function setOptions(data){
    
    var empresa = data.vinculo.listaEmpresa;
    jQuery(`#_empresa`).find('option:not(:first)').remove();
    var option =  document.createElement('option');
        option.setAttribute('value', "");
        option.setAttribute('disabled', "");
        option.setAttribute('selected', "");
        option.setAttribute('hidden', "");
        option.appendChild(document.createTextNode("Selecione Empresa"));

    for (let i = 0; i < empresa.length; i++) {
        let dados = empresa[i];

        var option =  document.createElement('option');
            option.setAttribute('value', dados.cod_empresa);
            option.appendChild(document.createTextNode(dados.nom_empresa));

        document.getElementById(`_empresa`).append(option);
    }

    $("#_empresa").change(function(){
        jQuery(`#_estabelecimento`).find('option:not(:first)').remove();
        var estab = data.vinculo.listaEmpresa.filter(x => x.cod_empresa == this.value);

        estab = estab[0].listaEstabelecimento;
        for (let i = 0; i < estab.length; i++) {
            let dados = estab[i];

            var option =  document.createElement('option');
                option.setAttribute('value', dados.cod_estabelecimento);
                option.appendChild(document.createTextNode(dados.nom_estabelecimento));

            document.getElementById(`_estabelecimento`).append(option);
        }
    })
}

$(document).ready(function () {
    $("#_senha").blur(function(){
        
        var senhaForm = $(this).val();
        var loginForm = $("#_login").val();

        fetch("/login/list/selects",{
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({"login":loginForm,"senha":senhaForm})
        }).then(response =>{
            return response.json();
        }).then(data =>{
            setOptions(data);
        })
    });
});