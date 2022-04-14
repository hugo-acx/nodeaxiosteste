var editor;
function initTableConsultas(idTab) {
    $("#divConsultasTable").html("");

    let tabela = document.createElement('table')
    tabela.setAttribute('id',`consultasTable_${idTab}`)
    tabela.setAttribute('class','table table-striped table-bordered table-sm nowrap dt-responsive')
    tabela.setAttribute('cellspacing','0')
    tabela.setAttribute('width','100%')
    
    let thead = document.createElement('thead')
    let tr = document.createElement('tr')
    
    let th = document.createElement('th')
    th.textContent = 'Nome'
    tr.append(th)

    th = document.createElement('th')
    th.textContent = 'Consulta'
    tr.append(th)

    th = document.createElement('th')
    let button = document.createElement('button');
    button.setAttribute('id','newQuery');
    button.setAttribute('class', 'float-end btn btn-primary');
    button.textContent = '+'
    th.append(button);
    tr.append(th);
    
    thead.append(tr)
    let tbody = document.createElement('tbody')
    tbody.setAttribute('id','tablebody')
    
    tabela.append(thead)
    tabela.append(tbody)
    
    document.getElementById("divConsultasTable").appendChild(tabela);

    $("#newQuery").on('click', function () {
        debugger;
        $("#editorModal").modal("show"); 
        $("#queryName").val('');
        
        if(editor != undefined){
            editor.getModel().setValue('');
        }else{
            require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.26.1/min/vs' }});
            require(["vs/editor/editor.main"], () => {
                editor = monaco.editor.create(document.getElementById('editorQuery'), {
                value: '',
                language: 'sql',
                theme: 'vs-dark',
                });
            });
        }
    });

    $("#salvaQuery").on("click", function () {
        debugger;
        var dados = {
            apelido: $("#queryName").val(),
            query: editor.getValue()
        }
        fetch("/consultas/insert",{
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(dados)
        }).then(response =>{
            return response.json();
        }).then(data =>{
            $("#editorModal").modal("hide");
            $("#consultasModal").modal("hide");
            NotificarAlerta(data.msg, 'success');
        }).catch(error =>{
            NotificarAlerta(error, 'notice');
        })
        
    });

    fetch("/consultas/list",{
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
        carregaTableConsultas(data, idTab);
        // setOptions(data);
    })
}

function carregaTableConsultas(retorno, idTab) {
    if (retorno.status) {
        var array = retorno.listaConsulta;
        let table = jQuery(`#consultasTable_${idTab}`).DataTable({
            "columns": [
                { "data": "apelido_consulta" },
                { "data": "consulta" },
                {
                    "className": "add-query",
                    "defaultContent": `<button onclick="modificaQuery(this, ${idTab})" class="btn btn-primary btn-sm" type="button">Modificar consulta</button>
                                       <button onclick="deleteQuery(this, ${idTab})" class="btn btn-danger btn-sm" type="button">Excluir consulta</button>`,
                    "data": null,
                    "orderable": false
                },
            ],
            "data": array,
            "keys": false,
            "responsive": true,
            "lengthMenu": [[5, 7, 10, 30, 50, 100], [5, 7, 10, 30, 50, 100]],
        });
        $("#consultasModal").modal("show");
    }else{
        NotificarAlerta(retorno.erro, 'notice');
    }
}

function modificaQuery(btn, idTab) {
    let data = jQuery(`#consultasTable_${idTab.id}`).DataTable().row( btn.parentNode.parentNode ).data();
    $("#editorModal").modal("show"); 
    $("#queryName").val(data.apelido_consulta);

    if (editor != undefined) {
        editor.getModel().setValue(data.consulta);
    }else{
        require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.26.1/min/vs' }});
        require(["vs/editor/editor.main"], () => {
            editor = monaco.editor.create(document.getElementById('editorQuery'), {
            value: data.consulta,
            language: 'sql',
            theme: 'vs-dark',
            });
        });
    }
    
    $("#salvaQuery").on("click", function () {
        var dados = {
            cod: data.cod_consulta,
            apelido: $("#queryName").val(),
            query: editor.getValue()
        }

        fetch("/consultas/update",{
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(dados)
        }).then(response =>{
            return response.json();
        }).then(data =>{
            $("#editorModal").modal("hide");
            $("#consultasModal").modal("hide");
            NotificarAlerta(data.msg, 'success');
        }).catch(error =>{
            NotificarAlerta(error, 'notice');
        })
    });
}

function deleteQuery(btn, idTab) {
    let data = jQuery(`#consultasTable_${idTab.id}`).DataTable().row( btn.parentNode.parentNode ).data();
    
    var dados = {
        cod: data.cod_consulta,
        apelido: data.apelido_consulta,
        query: data.consulta
    }

    fetch("/consultas/delete",{
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
    }).then(response =>{
        return response.json();
    }).then(data =>{
        $("#consultasModal").modal("hide");
        NotificarAlerta(data.msg, 'success');
    }).catch(error =>{
        NotificarAlerta(error, 'notice');
    })
}