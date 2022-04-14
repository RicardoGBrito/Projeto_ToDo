window.enderecoApi = 'https://ctd-todo-api.herokuapp.com/v1/';

window.inputs = (elementoId) =>{
    return document.getElementById(elementoId).value;
};

window.tag = (elementoTag) =>{
    return document.querySelector(elementoTag);
}

window.tagClasses = (tagClass) => {
    return document.getElementsByClassName(tagClass);
}

window.criandoElemento = (tag, classe,id) =>{
    let elemento = document.createElement(tag);
    elemento.classList.add(classe);
    elemento.setAttribute('id',id)
    
    return elemento;
}

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
}

window.addTarefa = (identificadorTag, descricao, criacao,id) => {
    let div = window.tag(identificadorTag);
    let li = window.criandoElemento('li', "tarefa", parseInt(id))
    let div1 = window.criandoElemento('div', "not-done")
    let div2 = window.criandoElemento('div', "descricao")
    let p1 = window.criandoElemento('p', "nome")
    let p2 = window.criandoElemento('p', "timestamp")
    let p3 = window.criandoElemento('p',"hide")
    

    let node1 = document.createTextNode(descricao);
    let node2 = document.createTextNode(window.tratarTimeStamp(criacao));
    let node3 = document.createTextNode(id);

    console.log(node1)
    p1.appendChild(node1);
    p2.appendChild(node2);
    p3.appendChild(node3);
    console.log(p2)
    console.log(p3)
    li.appendChild(div1);
    li.appendChild(div2);
    div2.appendChild(p1);
    div2.appendChild(p2);
    div2.appendChild(p3);
    
    div.appendChild(li);
    
    div1.addEventListener('click', (evento)=>{
        
        let divDescricao = evento.target.nextElementSibling;

        tarefaUpdate(divDescricao.firstChild.innerText, divDescricao.lastChild.innerText);
    })
    
}

window.apagarTarefa = (id) =>{
    let elemento = document.getElementById(id);
    elemento.remove();

};

window.tratarTimeStamp = (timeStamp) => {
    let data1 = timeStamp.split('T');
    let data2 = data1[0].split('-');
    
    return `Criada em: ${data2[2]}/${data2[1]}/${data2[0][2]+data2[0][3]}`

};


function tarefaUpdate(descricao, id){
    let objBody = {
        description:descricao.innerText,
        completed:true
    }

    window.dadosApi(`tasks/${id}`,'PUT', objBody,jwt).then(dados => {
        window.addTarefa('.tarefas-terminadas', dados.description, dados.createdAt, dados.id)
        window.apagarTarefa(dados.id);
    })
};