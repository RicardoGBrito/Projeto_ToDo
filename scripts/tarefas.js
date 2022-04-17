let jwt = localStorage.getItem('token');
let form = window.tag('form');
let finalizarSessao = window.tag('#closeApp');

/* Somente permite o acesso às tarefas se logado -----------------------------*/
if(jwt == undefined){
    alert('Voce precisa estar logado!');
    window.location.href = '/index.html';
}

/* Carregando o nome ---------------------------------------------------- */

window.dadosApi('users/getMe', 'GET', undefined, jwt).then(dados => {
    window.tag('p').innerText = dados.firstName + ' ' + dados.lastName;
})

/* Lipando a lista de tarefas --------------------------------------------- */

let lis = window.tagClasses('tarefa');

let i = lis.length;
while(i>0){
    
    lis[i-1].remove();
    i--
}

/* Listando tarefas criadas ---------------------------------------- */

window.dadosApi('tasks','GET',undefined,jwt).then(dados => {
    if(typeof dados === 'object'){
        
        dados.forEach((item) =>{
              
            window.addTarefa('#skeleton',item.description, item.createdAt, item.id, item.completed);
        });
        
        
    }
});

/* Adicionando uma tarefa ---------------------------------------------- */

form.addEventListener('submit',(event)=>{

    event.preventDefault();

    if(window.inputs('novaTarefa')!=''){

        let tarefa = {
            description:window.inputs('novaTarefa'),
            completed:false
        };
        //Criando tarefa
        window.dadosApi('tasks','POST', tarefa, jwt).then(dados => {
            window.addTarefa('#skeleton',dados.description, dados.createdAt, dados.id);
        })
    }
    else{
        alert('Digite o nome da tarefa');
    }
});

/* Encerrando a sessão ---------------------------------------------- */

finalizarSessao.addEventListener('click',() => {
    localStorage.clear();
    window.location.href = '/index.html';
});


