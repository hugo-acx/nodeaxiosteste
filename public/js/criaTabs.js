var array;
function criaTab(idTab) {
    let content =  `<header class="toolbar" >
    <div class="btn-group">
        <select id="query_selector_${idTab}" class="btn btn-primary"></select>
    </div>
    <button id="btnEditaConsulta_${idTab}" class="btn btn-sm btn-primary">Editar consultas</button>
    <button id="btnConsultar_${idTab}" class="btn btn-sm btn-primary">Consultar <i class="fa fa-search"></i></button>
    <!-- <div class="btn-group">
        <button type="button" class="btn btn-sm btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Funções
        </button>
        <div class="dropdown-menu">
            <a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#editorModal">Editar</a>
            <a onclick="salvar()" class="dropdown-item" href="#">Salvar</a>
            <a class="dropdown-item" href="#">Salvar como</a>
            <a class="dropdown-item" href="#">Filtro</a>
            <a class="dropdown-item" href="#">Excluir</a>
        </div>
    </div> -->
    <div class="btn-group">
        <button type="button" class="btn btn-sm btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Exportar
        </button>
        <div class="dropdown-menu">
            <a id="copy_btn_${idTab}" class="dropdown-item" href="#">Copiar</a>
            <a id="excel_btn_${idTab}" class="dropdown-item" href="#">Excel</a>
            <a id="csv_btn_${idTab}" class="dropdown-item" href="#">CSV</a>
            <a id="pdf_btn_${idTab}" class="dropdown-item" href="#">PDF</a>
        </div>
    </div>
    <!-- <button class="btm-sm btn-primary">Preview <i class="fa fa-eye"></i></button> -->
    <button id="print_btn_${idTab}" class="btn-sm btn-primary">Imprimir <i class="fa fa-print"></i></button>

    </header>
    <ul class="nav nav-pills mb-3 justify-content-end" id="pills-tab-${idTab}" role="tablist">
        <li class="nav-item" role="presentation">
        <button class="nav-link btn-sm active" id="pills-grid-tab-${idTab}" data-bs-toggle="pill" data-bs-target="#pills-grid-${idTab}" type="button" role="tab" aria-controls="pills-grid" aria-selected="true">Grid</button>
        </li>
        <li class="nav-item" role="presentation">
        <button class="nav-link btn-sm" onclick="initDataRocks('${idTab}')" id="pills-cubo-tab-${idTab}" data-bs-toggle="pill" data-bs-target="#pills-cubo-${idTab}" type="button" role="tab" aria-controls="pills-cubo" aria-selected="false">Cubo</button>
        </li>
    </ul>
    <div class="tab-content-pills" id="pills-tabContent-${idTab}">
        <div class="tab-pane fade active show" id="pills-grid-${idTab}" role="tabpanel" aria-labelledby="pills-grid-tab-${idTab}">        
            <!-- <table id="tableGrid" class="table table-sm table-striped table-bordered"></table> -->
            <div id="divTableGrid_${idTab}"></div>
        </div>
        <div class="tab-pane fade" id="pills-cubo-${idTab}" role="tabpanel" aria-labelledby="pills-cubo-tab-${idTab}">
            <div id="wdr-component_${idTab}"></div>
            <div id="googlechart-container_${idTab}" style="height:550px;"></div>
        </div>
    </div>`

    return content;
}

async function setOptionQuery(idTab){
    $(`#query_selector_${idTab}`).empty();
    // $(`#query_selector_${idTab}`).val(null).trigger('change');
    const retorno = await fetch("/consultas/list",{
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
    }).then(response =>{
        // console.log('aqui');
        // console.log(response);
        return response.json();
    }).then(data =>{
        console.log(data);
        return data;
    })
    if (retorno.status == true) {

        array = retorno.listaConsulta;
        jQuery(`#query_selector_${idTab}`).find('option:not(:first)').remove();

        for (let i = 0; i < array.length; i++) 
        {
            var dados = array[i];

            var option =  document.createElement('option');
                option.setAttribute('value', dados.cod_consulta);
                option.appendChild(document.createTextNode(dados.apelido_consulta));

            document.getElementById(`query_selector_${idTab}`).append(option);
        }

        // $(`#query_selector_${id}`).select2();
        // $(`#query_selector_${id}`).on("change", function () {
        //   console.log(this.value); 
        // });

    } else {
        NotificarAlerta(retorno.erro, 'notice');
    }
}