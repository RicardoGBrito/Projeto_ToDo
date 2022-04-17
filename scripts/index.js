let email = window.tag('#inputEmail');
let password = window.tag('#inputPassword');
let btn = window.tag('button');
let form = window.tag('form');
let entradas = document.querySelectorAll('input');

/* Verificando campos ---------------------------------------------- */

email.addEventListener('blur',function(){
    
    window.validarEmail(email);
});

window.apagandoErros(entradas);

/* Submetendo login e senha ------------------------------------------- */

form.addEventListener('submit', (evento)=>{

    evento.preventDefault();
    window.campoObrigatorio(entradas);

    let erros = window.tagClasses('error');
    
    
    if(erros.length === 0){

        let user = usuario(email, password);

        window.dadosApi('users/login', 'POST', user).then(data=>{
            console.log(data);
            if(data.jwt){

                //Posso salvar em string ou json no localStorage
                localStorage.setItem('token', data.jwt);
            }
            else{
                alert('Error:'+ data);
            }
        });

        window.location.href='/tarefas.html';
    }
});

/* Criando o objeto ----------------------------------------------------- */

function usuario(email, password){
    let userObj = {
        email: email.value,
        password: password.value
    }
    return userObj;
};