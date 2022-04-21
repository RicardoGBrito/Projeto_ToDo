# Projeto_ToDo - Checkpoint II

## O que o aplicativo é capaz de fazer?

Sua função principal é organizar e manter sua lista de tarefas.

### Recursos atuais:

- Cadastrar uma nova conta.
- Entrar em uma conta.
- Sair de uma sessão.
- Visualizar tarefas (realizadas e não realizadas).
- Adicionar uma nova tarefa.
- Marcar uma tarefa como realizada.
- Desmarcar uma tarefa realizada.
- Remover uma ou várias tarefas (realizadas ou não).
- Registrar data de criação das tarefas.

## MVP Checklist:

- Login (index.html)

  - [ X ] Campos devem ser obrigatórios
  - [ X ] Obter os dados preenchidos e realizar a chamada (fetch) de login
  - [ X ] Em caso de sucesso: Salvar o JWT em local ou session storage
  - [ X ] Em caso de sucesso: Redirecionar para tarefas.html
  - [ X ] Em caso de erro: Informar (ex. com alert) o usuário que ocorreu um erro

- Signup (signup.html)

  - [ X ] Campos devem ser obrigatórios
  - [ X ] Necessário validar igualdade dos campos senha e confirmar senha
  - [ X ] Obter os dados preenchidos e realizar a chamada (fetch) de cadastro
  - [ X ] Em caso de sucesso: Salvar o JWT em local ou session storage
  - [ X ] Em caso de sucesso: Redirecionar para login.html
  - [ X ] Em caso de erro: Informar (ex. com alert) o usuário que ocorreu um erro

- Tarefas (tarefas.html)

  - [ X ] Header: Obter dados do usuário para apresentar seu nome completo
  - [ X ] Header: Botão Finalizar Sessão remove o JWT do storage e redireciona para index.html (quando for clicado)
  - [ X ] Ao carregar a página, buscar as tarefas (get para /tasks) e exibir na lista
  - [ X ] Form Nova Tarefa: Ao enviar uma nova tarefa, deve realizar um post para API (/tasks)
  - [ X ] Quando uma tarefa for adicionada, a lista de tarefas deve ser atualizada
  - [ X ] Quando uma tarefa for completada, deve realizar um put para API (tasks/ID_DA_TASK) alterando a chave completed para true

Melhorias implementadas:

- Identificar campos invalidos com CSS (ex. borda vermelha).
- Implementação de animações nas tarefas.
- Implementação da animação no carregamento de uma página para outra.
- Comando para selecionar as tarefas através do click.
- Exclusão de uma ou mais tarefas simultâneamente (seleção + tecla delete).
- Preenchimento dos campos das tarefas, com frases determinadas, quando estas estiverem sem tarefas. 

Melhorias a serem implementadas:

- Animações mais bem elaboradas.
- Alarmes para notificar das tarefas pendentes.
- Subdivisão das tarefas.
- Criacáo de planejamentos para elaboração das tarefas.
- Melhoria na organização do código (refatoração).
- Tratamento dos erros.
- Edição de tarefas.

## Estrutura do Projeto

O projeto foi organizado da seguinte forma:

Cada página adiciona, ao fim, o script de dependência e o script de inicialização (especifico da página).
Os scripts de dependência contem as funções e classes que serão utilizadas para montar as lógicas da página.

### Arquivos do projeto

- ├── .vscode
- │ ├── settings.json
- ├── assets
- ├── scripts
- │ ├── index.js
- │ ├── signup.js
- │ └── tasks.js
- │ └── utils.js
- ├── styles
- │ ├── acesso.css
- │ ├── commmon.css
- │ ├── tarefas.css
- ├── index.html
- └── README.md
- ├── signup.html
- ├── tasks.html

### Páginas:

- **/index.html** : Página de entrada, onde será solicitado seu e-mail e senha para acesso as tarefas.
- **/signup.html**: Página de cadastro, onde será solicitado seus dados e um e-mail e senha para um um novo acesso.
- **/tasks.html**: Página de tarefas, onde você poderá visualizar, adicionar e remover suas tarefas (usuário logado na sessão).

### Scripts

- **utilsjs**: O script principal da aplicação que contem a classe. Nela, é mantido todos os métodos e valores em comum a aplicação como utilidades, configurações e api.
- **{page}.js**: O script que vai inicializar os eventos e demais execuções para instânciar e atualizar os componentes.

#### Utils: Métodos

- **window.inputs**, **window.tag** e **window.tagClasses**: Métodos para a captura de elementos no DOM.
- **window.spinnerShow** e **window.spinnerHide**: Métodos relacionados ao carregamento da animação do spinner.
- **window.criandoElemento**: Cria o elementorequisitado com classe e/ou id.
- **window.apagarTarefa**: Apaga uma tarefa.
- **window.tratarTimeStamp**: Trata a formato da estampa de tempo recebida pela API.
- **window.dadosApi**: Recebe caminho, método, corpo e jwt. Esse metodo se comunica com a API.
- **window.addTarefa**: Esse método recebe a identificação da tag (classe ou id), a descrição (corpo da resposta da API), criação (estampa de tempo da resposta API) e id (id da resposta da API) e gera uma nova lista ("li") alocada em tarefas pendentes ou tarefas terminadas. Tem-se dois eventos nesse método: um de *click* criado no "li" e outro de *click* criado na div do botão. O primeiro serve para a função de selecionar a tarefa e o segundo, para definir a tarefa como concluída ou não, atualizando seu status.
- **window.divSkelVazia** e **window.ulTarefasTerminadasVazia**: São os métodos responsáveis por fazer aparecer ou esconder a frase pré-determinada quando os campos de tarefas pendentes ou finalizadas se encontram vazios.
- **tarefaUpdate**: Atualiza o estado da tarefa (completa ou incompleta).
- **window.apagandoErro**: Apaga todos os erros abaixo dos campos.
- **window.apagandoErroCampo**: Apaga erro de um único campo.
- **window.campoErro**: Recebe a mensagem de erro e o elemento, posicionando o erro abaixo dele.
- **window.campoObrigatorio**: Exibe o erro de campo obrigatório caso ele esteja vazio.
- **window.validarEmail**: Valida o campo de e-mail.
- **window.apagandoErros**: Função com evento de entrada do mouse, ou seja, quando o mouse acessa uma entrada que esteja com erro, o erro some.

#### Utils: Eventos

- **li.addEventListener("click", (evento)=>{})**: Evento relacionado à seleção das tarefas.

- **div1.addEventListener('click', (evento)=>{})**: Evento relacionado com a atulização das tarefas, juntamente com suas animações e a exibição da frase quando os campos de tarefas estão vazios.

- **window.addEventListener('keyup', (event)=>{})**: Evento relacionado com a deletação de tarefas selecionadas.

- **item.addEventListener('mouseenter',function(evento){})**: Evento relacionado a apagar o erro quando o mouse acessa um entrada.

#### Index: Métodos

- **usuario**: Cria o objeto usuário.

#### Index: Eventos

- **email.addEventListener('blur',function(){})**: Evento relacionado à validação do e-mail.

- **form.addEventListener('submit', (evento)=>{})**: Evento relacionado com a submissão dos dados e checagem dos erros.

#### Singup: Métodos

- **criarObj**: Cria o objeto de cadastro.

#### Singup: Eventos

- **email.addEventListener('blur',function(){})**, **senha.addEventListener('blur',function(){})** e **repetirSenha.addEventListener('blur',function(evento){})**: São eventos de validação.

- **form.addEventListener('submit',function(evento){})**: Evento de submissão e checagem dos erros.

#### Tarefas: Métodos

- **window.dadosApi('tasks','GET',undefined,jwt)**: Método relacionado à requisição na API.

#### Tarefas: Eventos

- **form.addEventListener('submit',(event)=>{})**: Evento de criação de tarefas.
- **finalizarSessao.addEventListener('click',() => {})**: Evento relacionado ao botão de finalizar sessão.

# COLABORADORES:

## Kauna Rodrigues
## Larissa Mayumi Odani
## Ismael Lourenço
## Ricardo GOmes Brito
---

