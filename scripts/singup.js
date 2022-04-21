let nome = window.tag('#nome');
let sobrenome = window.tag('#sobrenome');
let email = window.tag('#email');
let senha = window.tag('#senha');
let repetirSenha = window.tag('#repetir');
let entradas = document.querySelectorAll('input');
let form = window.tag('form');

/* Definindo eventos de validação das entradas ----------------------- */

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

/* Apagando erros ------------------------------------------------- */

window.apagandoErros(entradas);

/* Criando o cadastro ------------------------------------------------- */

form.addEventListener('submit',function(evento){
    
    evento.preventDefault();
    window.campoObrigatorio(entradas);
    
    let erros = window.tagClasses('error');
    
    
    if(erros.length === 0){
        window.spinnerShow();
        let objJson = criarObj(nome, sobrenome, email, senha);
            
        window.dadosApi('users', 'POST', objJson).then(dados=>{
            if(typeof dados === 'object'){
                
                localStorage.setItem('token',dados.jwt);
                window.spinnerHide();
                window.location.href = '/index.html';
            }
            else{
                window.spinnerHide();
                alert(`Error: ${dados} `);
            };
        });

    }; 

});

/* Função para criar o objeto --------------------------------------- */

function criarObj(nome, sobrenome, email, senha){

    let cadastro = {
        firstName: nome.value,
        lastName: sobrenome.value,
        email: email.value,
        password: senha.value
    };

    return cadastro;
};


