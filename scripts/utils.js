/* Endereço da API --------------------------------------------------------------------- */

window.enderecoApi = 'https://ctd-todo-api.herokuapp.com/v1/';

/* Definindo entradas e elementos --------------------------------------------------------------------- */

window.inputs = (elementoId) =>{
    return document.getElementById(elementoId).value;
};

window.tag = (elementoTag) =>{
    return document.querySelector(elementoTag);
};

window.tagClasses = (tagClass) => {
    return document.getElementsByClassName(tagClass);
};

/* Dados do spinner ------------------------------------------------------ */

let loading = window.tag('.spinner-container');

window.spinnerShow = () => {
    loading.classList.add('show');
};

window.spinnerHide = () => {
    loading.classList.remove('show');
};
/* Criando elementos --------------------------------------------------------------------- */

window.criandoElemento = (tag, classe,id) =>{
    let elemento = document.createElement(tag);
    elemento.classList.add(classe);
    if(id!=undefined){
        
        elemento.setAttribute('id',id)
    }
    
    return elemento;
};

/* Tratando dados --------------------------------------------------------------------------- */

window.apagarTarefa = (id) =>{
    let elemento = document.getElementById(id);
    elemento.remove();

};

window.tratarTimeStamp = (timeStamp) => {
    let data1 = timeStamp.split('T');
    let data2 = data1[0].split('-');
    
    return `Criada em: ${data2[2]}/${data2[1]}/${data2[0][2]+data2[0][3]}`

};

/* Comunicação com a API ------------------------------------------------------------------- */

window.dadosApi = (caminho, metodo, corpo, jwt) => {

    const options = {
        method: metodo,
        headers: {
            
            "accept":"application/json",
            "Content-Type":"application/json",
            "authorization":jwt
        },
        body: JSON.stringify(corpo)
        
    };
    
    return fetch(window.enderecoApi+caminho,options).then(response => response.json())
};

/* Criação de Tarefa com seus respectivos eventos ----------------------------------------------- */

window.addTarefa = (identificacaoTag ,descricao, criacao, id) => {
    
    let elemento = window.tag(identificacaoTag);
    let li = window.criandoElemento('li', "tarefa", parseInt(id))
    let div1 = window.criandoElemento('div', "not-done")
    let div2 = window.criandoElemento('div', "descricao")
    let p1 = window.criandoElemento('p', "nome")
    let p2 = window.criandoElemento('p', "timestamp")
    let p3 = window.criandoElemento('p',"hide")
    

    let node1 = document.createTextNode(descricao);
    let node2 = document.createTextNode(window.tratarTimeStamp(criacao));
    let node3 = document.createTextNode(id);

    
    p1.appendChild(node1);
    p2.appendChild(node2);
    p3.appendChild(node3);
    
    li.appendChild(div1);
    li.appendChild(div2);
    div2.appendChild(p1);
    div2.appendChild(p2);
    div2.appendChild(p3);

    // A "li" precisa receber a classe 'preenchido' toda vez que for criada
    // em tarefas-terminadas para que a animação aconteça.
    
    if(identificacaoTag =='.tarefa-terminada'){
        li.classList.toggle('preenchido');
        elemento.appendChild(li);
        
    }
    else{

        elemento.appendChild(li);
    };

    //Criando o "li" com possibilidade de seleção da div, ou seja, em qualquer 
    //elemento que for clicado dentro da div, o caminho será capturado e será
    //feita uma interpolação para comparar com as divs e selecionar a div desejada.
    
    li.addEventListener("click", (evento)=>{
        
        let lista = evento.path;
        let div = window.tagClasses('descricao');
        
        lista.forEach(function(item){
                        
            for(let i=0; i< div.length; i++){
                
                if(item == div[i]){
                    item.classList.toggle("selecao");
                    
                };
            };
        });
        
        
    });
    
    
    
    div1.addEventListener('click', (evento)=>{
        
        
        let divDescricao = evento.target.nextElementSibling; 
        li.classList.toggle('preenchido');
        
        
        setTimeout(function(){tarefaUpdate(divDescricao.firstChild.innerText, divDescricao.lastChild.innerText, evento.path[2])},450);
        setTimeout(window.divSkelVazia,850);
        setTimeout(window.ulTarefasTerminadasVazia,850);
        
    });
    
};

window.divSkelVazia = () => {
    let elementoAnterior = divSkeleton.previousElementSibling;

    if(divSkeleton.innerHTML === '') {
        elementoAnterior.classList.remove('hide');
    }
    else{
        if(!elementoAnterior.classList.contains('hide')){
                
            elementoAnterior.classList.add('hide');
        };
    };
};

window.ulTarefasTerminadasVazia = () => {
    let first = ulTarefasTerminadas.firstElementChild;
    let last = ulTarefasTerminadas.lastElementChild;
    if(first == last) {
        first.classList.remove('hide');
    }
    else{
        if(!first.classList.contains('hide')){
                
            first.classList.add('hide');
        };
    };
};

/* Criando evento na window para deletar uma ou várias tarefas na API --------------------------- */

window.addEventListener('keyup', (event)=>{
    let selecionados = window.tagClasses('selecao');
    if((event.key === 'Delete')&&(selecionados.length >0)){  
        
        if(confirm('Quer mesmo apagar esta(s) tarefa(s)?')==true){
            
            let i = selecionados.length;
            while(i>0){
                let elementoId = selecionados[i-1].lastChild.innerText;
                
                window.dadosApi(`tasks/${elementoId}`,'DELETE',undefined,jwt);
                selecionados[i-1].parentElement.remove();
                i--;
            }                        
        };
        window.divSkelVazia();
        window.ulTarefasTerminadasVazia();
        
    };    
});


/* Faz o update da tarefa, definindo-a como completa ou incompleta, e colocando-a no seu respectivo lugar nas tarefas. */


function tarefaUpdate(descricao, id, path){
    
    //Caso uma tarefa tenha sido dada como concluída erroneamente, pode-se trazé-la de volta.
    if(path.classList.contains('tarefas-terminadas')){
        
        let objBody = {
            description:descricao.innerText,
            completed:false
        }
        
        window.dadosApi(`tasks/${id}`,'PUT', objBody,jwt).then(dados => {
            window.apagarTarefa(dados.id);
            window.addTarefa('#skeleton', dados.description, dados.createdAt, dados.id, dados.completed);
        })
    }
    else{
        let objBody = {
            description:descricao.innerText,
            completed:true
        }
        
        window.dadosApi(`tasks/${id}`,'PUT', objBody,jwt).then(dados => {
            window.apagarTarefa(dados.id);
            window.addTarefa('.tarefas-terminadas', dados.description, dados.createdAt, dados.id, dados.completed);
        })
    }

};

/* FUNÇÕES SINGUP E LOGIN --------------------------------------------- */

/* Apagando erros ------------------------------------------------------- */

window.apagandoErro = () => {
    let erro = window.tagClasses('error');
    
    if(erro != []){
        
        while(erro.length>0){
            erro[erro.length-1].previousElementSibling.classList.toggle('borda-vermelha');
            erro[erro.length-1].remove();
        };        
    };
};

/* Apagando um único erro ----------------------------------------------- */

window.apagandoErroCampo = (campo) => {
    campo.classList.toggle('borda-vermelha');
    campo.nextSibling.remove();
};

/* Função para exibir erro --------------------------------------------- */

window.campoErro = (msg, posicao) => {
    let elemento = document.createElement('small');
    let node = document.createTextNode(msg);
    elemento.appendChild(node);
    elemento.classList.add('error');
    posicao.after(elemento);
    elemento.previousElementSibling.classList.toggle('borda-vermelha');
};

/* Requisitos das entradas ------------------------------------------- */

window.campoObrigatorio = (inputs) => {

    window.apagandoErro();
    
    inputs.forEach(function(item){
        if(item.value === ''){
            window.campoErro('Campo obrigatório.',item);
                       
        }
        
    });
};

window.validarEmail = (email) => {
    let count = 0;
    email.value.trim().split('').forEach(function(item){
        if(item === '@'){
            count++
        }
    });
    if(count == 0){
        window.campoErro('O email deve conter o @.', email);
    }
    else if(count > 1){
        window.campoErro('Digite corretamente seu email.', email);
    };
};

window.apagandoErros = (entradas) => {
    entradas.forEach(function(item){
        item.addEventListener('mouseenter',function(evento){
            
            if((item.value === evento.path[0].value) && (evento.path[0].nextSibling.tagName === 'SMALL')){
                
                window.apagandoErroCampo(item);
                            
            };
        });
    });
};