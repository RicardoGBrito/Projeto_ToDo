let nome = window.tag('#nome');
let sobrenome = window.tag('#sobrenome');
let email = window.tag('#email');
let senha = window.tag('#senha');
let repetirSenha = window.tag('#repetir');
let entradas = document.querySelectorAll('input');
let form = window.tag('form');

nome.addEventListener('blur',function(){
    /* let nomesobrenome = nome.value.trim().split(' '); */

    /* if(nome.value.trim().split(' ').length < 2){
        window.campoErro('Digite seu nome e sobrenome', nome)
    }; */

});

email.addEventListener('blur',function(){
    
    window.validarEmail(email);
});

senha.addEventListener('blur',function(){
    if(senha.value.length < 8){
        window.campoErro('A senha deve conter mais de 8 caracteres.', senha);
    };
});

repetirSenha.addEventListener('blur',function(evento){
    
    if(senha.value != repetirSenha.value){
        window.campoErro('As senhas devem ser iguais.', repetirSenha)
    };
});

window.apagandoErros(entradas);


form.addEventListener('submit',function(evento){
    
    evento.preventDefault();
    window.campoObrigatorio(entradas);
    
    let erros = window.tagClasses('error');
    
    
    if(erros.length === 0){
        let objJson = criarObj(nome, sobrenome, email, senha);
            
        window.dadosApi('users', 'POST', objJson).then(dados=>{
            if(typeof dados === 'object'){
                console.log(dados);
                localStorage.setItem('token',dados.jwt);
                window.location.href = '/index.html';
            }
            else{
                alert(`Error: ${dados} `);
            };
        });

    }; 

});



function criarObj(nome, sobrenome, email, senha){

    let cadastro = {
        firstName: nome.value,
        lastName: sobrenome.value,
        email: email.value,
        password: senha.value
    };

    return cadastro;
};


