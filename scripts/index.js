let email = document.getElementById('inputEmail');
let password = document.getElementById('inputPassword');

let btn = document.querySelector('button');

let form = document.querySelector('form');



form.addEventListener('submit', (evento)=>{

    evento.preventDefault();

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
    /* enviarDados(); */


});
   
/* function enviarDados(){

    console.log(email.value);
    
    const uri = 'https://ctd-todo-api.herokuapp.com/v1/users/login';
    
    const options = {
        method: 'POST',
        headers: {
            "accept":"application/json",
            "Content-Type":"application/json"
        },
        body: JSON.stringify(usuario(email, password))
        
    };
    
    const promessa = fetch(uri,options);
    
    console.log(password.value);
    
    promessa.then(response => {
        return response.json()
    })
    
    .then(data=>{
        console.log(data);
        localStorage.setItem('token', data.jwt);
    })
}; */

function usuario(email, password){
    let userObj = {
        email: email.value,
        password: password.value
    }
    return userObj;
};