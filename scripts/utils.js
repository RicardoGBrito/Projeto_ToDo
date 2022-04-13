window.enderecoApi = 'https://ctd-todo-api.herokuapp.com/v1/';

window.inputs = (elementoId) =>{
    return document.getElementById(elementoId).value;
};

window.tag = (elementoTag) =>{
    return document.querySelector(elementoTag);
}

window.criandoElemento = (tag, classe) =>{
    let elemento = document.createElement(tag);
    elemento.classList.add(classe);
    
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

window.addTarefa = (descricao, criacao) => {
    let div = window.inputs('skeleton');
    let li = window.criandoElemento('li', "tarefa")
    let div1 = window.criandoElemento('div', "not-done")
    let div2 = window.criandoElemento('div', "descricao")
    let p1 = window.criandoElemento('p', "nome")
    let p2 = window.criandoElemento('p', "timestamp")

    let node1 = document.createTextNode(descricao);
    let node2 = document.createTextNode(criacao);

    p1.appendChild(node1);
    p2.appendChild(node2);

    li.appendChild(div1);
    li.appendChild(div2);
    div2.appendChild(p1);
    div2.appendChild(p2);

    div.appendChild(li);
    
}