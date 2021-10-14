function global() {
    const novaTarefa = document.querySelector('.novaTarefa');
    const addTarefa = document.querySelector('.addTarefa');
    const tarefas = document.querySelector('.listaTarefa');

    function criaLi() {
        const li = document.createElement('li');
        li.setAttribute('class', 'list-group-item list-group-item-action')
        return li
    }

    function limparInput() {
        novaTarefa.value = '';
        novaTarefa.focus()
    }

    function criarBotaoApagra(li) {
        li.innerText += ' ';
        const botaoApagar = document.createElement('button');
        botaoApagar.innerText = 'Apagar';
        botaoApagar.setAttribute('class', 'apagar btn btn-danger float-right')
        botaoApagar.setAttribute('title', 'Apagra tarefa')
        li.appendChild(botaoApagar)
    }

    function criaTarefa(tarefa) {
        const li = criaLi();
        li.innerHTML = tarefa;
        tarefas.appendChild(li)
        criarBotaoApagra(li)
        salvarTarefa()
        limparInput()
    }

    function salvarTarefa() {
        const liTarefas = tarefas.querySelectorAll('li');
        const listaDeTarefas = [];

        for (let tarefa of liTarefas) {
            let tarefaTexto = tarefa.innerText;
            tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
            listaDeTarefas.push(tarefaTexto)
        }

        const tarefasJSON = JSON.stringify(listaDeTarefas);
        localStorage.setItem('tarefas', tarefasJSON)
    }

    function adicionarTarefasSalvas() {
        const tarefas = localStorage.getItem('tarefas');
        const listaDeTarefas =JSON.parse(tarefas)

        for(let tarefas of listaDeTarefas){
            criaTarefa(tarefas)
        }
    }

    novaTarefa.addEventListener('keypress', function (e) {
        if (e.keyCode === 13) {
            if (!novaTarefa.value) return
            criaTarefa(novaTarefa.value)
        }
    })

    addTarefa.addEventListener('click', function () {
        if (!novaTarefa.value) return
        criaTarefa(novaTarefa.value)
    })

    document.addEventListener('click', function (e) {
        const el = e.target;
        if (el.classList.contains('apagar')) {
            el.parentElement.remove();
            salvarTarefa()
        }
    })
    
    adicionarTarefasSalvas()
}
global()