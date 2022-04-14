let jwt = localStorage.getItem('token');
let form = window.tag('form');

window.dadosApi('users/getMe', 'GET', undefined, jwt).then(dados => {
    window.tag('p').innerText = dados.firstName + ' ' + dados.lastName;
})

//Listando tarefas criadas
window.dadosApi('tasks','GET',undefined,jwt).then(dados => {
    if(typeof dados === 'object'){
        
        dados.forEach((item) =>{
            
            
            
            window.addTarefa('#skeleton', item.description, item.createdAt, item.id);
        });
        
        
    }
});

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




