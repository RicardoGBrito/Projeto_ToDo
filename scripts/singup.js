let nomeCompleto = document.getElementById('nome');
let sobrenome = document.getElementById('sobrenome');
let email = document.getElementById('email');
let senha = document.getElementById('senha');
let repetirSenha = document.getElementById('repetir');
let entradas = document.querySelectorAll('input');

let listaComCadastrados = [];
let listaCadastrosJson = '';

let form = document.querySelector('form');

nomeCompleto.addEventListener('blur',function(){
    /* let nomesobrenome = nomeCompleto.value.trim().split(' '); */

    /* if(nomeCompleto.value.trim().split(' ').length < 2){
        campoErro('Digite seu nome e sobrenome', nomeCompleto)
    }; */

});

email.addEventListener('blur',function(){
    let count = 0;
    email.value.trim().split('').forEach(function(item){
        if(item === '@'){
            count++
        }
    });
    if(count == 0){
        campoErro('O email deve conter o @.', email);
    }
    else if(count > 1){
        campoErro('Digite corretamente seu email.', email);
    };
});

senha.addEventListener('blur',function(){
    if(senha.value.length < 8){
        campoErro('A senha deve conter mais de 8 caracteres.', senha);
    };
});

repetirSenha.addEventListener('blur',function(){

    if(senha.value != repetirSenha.value){
        campoErro('As senhas devem ser iguais.', repetirSenha)
    };
});

entradas.forEach(function(item){
    item.addEventListener('mouseenter',function(evento){
        
        if((item.value === evento.path[0].value) && (evento.path[0].nextSibling.tagName === 'SMALL')){
            console.log(item.value)
            apagandoErroCampo(item);
            

            
        };
    });
});


form.addEventListener('submit',function(evento){
    
    evento.preventDefault();
    
    campoObrigatorio(entradas);

    /* listaDeCadastros(criarObj(nomeCompleto, sobrenome, email,senha)); */

    

    /* listaCadastrosJson = JSON.stringify(listaComCadastrados); */

    let objJson = JSON.stringify(criarObj(nomeCompleto, sobrenome, email,senha));

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json',
            
        },
        body: objJson
    };

    fetch('https://ctd-todo-api.herokuapp.com/v1/users', options)
        .then(response => {
            return response.json()
        })
        .then(dados=>{
            console.log(dados);
            localStorage.setItem('token',dados.jwt);
        })
        
        .catch(err => console.log(err))

    /* console.log(document.localStorage.getItem('token')); */

});

function campoObrigatorio(entradas){
    
    apagandoErro();
    
    entradas.forEach(function(item){
        if(item.value === ''){
            campoErro('Campo obrigatório.',item);
           
            
        };
        
    });
    


};

function apagandoErro(){
    let erro = document.getElementsByClassName('error');
    console.log(erro);
    if(erro != []){
        
        while(erro.length>0){
            console.log(erro);
            erro[erro.length-1].remove();
        }
        
    };
};

function apagandoErroCampo(campo){
    campo.nextSibling.remove();
};

function campoErro(msg, posicao){
    let elemento = document.createElement('small');
    let node = document.createTextNode(msg);
    elemento.appendChild(node);
    elemento.classList.add('error');
    posicao.after(elemento);

    
};

function criarObj(nome, sobrenome, email, senha){

    let cadastro = {
        firstName: nome.value,
        lastName: sobrenome.value,
        email: email.value,
        password: senha.value
    };

    return cadastro;
};

function listaDeCadastros(cadastro){
    listaComCadastrados.push(cadastro);
    
};

function storage(dados){
    let dadosObj = JSON.parse(dados);
    document.localStorage.setItem('token',dadosObj.jwt)
};

