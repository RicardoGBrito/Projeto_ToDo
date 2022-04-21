let jwt = localStorage.getItem('token');
let form = window.tag('form');
let finalizarSessao = window.tag('#closeApp');
let divSkeleton = window.tag('#skeleton');
let ulTarefasTerminadas = window.tag('.tarefas-terminadas');

/* Somente permite o acesso às tarefas se logado -----------------------------*/
if(jwt == undefined){
    alert('Voce precisa estar logado!');
    window.location.href = '/index.html';
};

/* Mostrando o spinner ----------------------------------------------------- */

//window.spinnerShow();

/* Carregando o nome ---------------------------------------------------- */

window.dadosApi('users/getMe', 'GET', undefined, jwt).then(dados => {
    window.tag('p').innerText = dados.firstName + ' ' + dados.lastName;
});

/* Lipando a lista de tarefas --------------------------------------------- */

divSkeleton.innerHTML = '';

/* Caso algum campo não tenha tarefa, a msg será exibida-------------- */

window.divSkelVazia();
window.ulTarefasTerminadasVazia();

/* Listando tarefas criadas ---------------------------------------- */

window.dadosApi('tasks','GET',undefined,jwt).then(dados => {
    if(typeof dados === 'object'){

        //Escondendo o spinner e mostrando as tarefas
        /* window.spinnerHide(); */
        dados.forEach((item) =>{
            if(item.completed === true){

                window.addTarefa('.tarefas-terminadas',item.description, item.createdAt, item.id, item.completed);
                window.ulTarefasTerminadasVazia();
            }
            else{
                
                window.addTarefa('#skeleton',item.description, item.createdAt, item.id, item.completed);
                window.divSkelVazia();                
            }; 
        });        
    };
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
            window.divSkelVazia();
            
        })
    }
    else{
        alert('Digite o nome da tarefa');
    }
});

/* Encerrando a sessão ---------------------------------------------- */

finalizarSessao.addEventListener('click',() => {
    window.spinnerShow();
    localStorage.clear();
    window.location.href = '/index.html';
});



