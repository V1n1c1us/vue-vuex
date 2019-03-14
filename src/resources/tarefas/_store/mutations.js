import { LISTAR_TAREFAS } from './mutation-types'
import { CRIAR_TAREFA } from './mutation-types'
import { DELETAR_TAREFA } from './mutation-types'
import { EDITAR_TAREFA } from './mutation-types'
import { SELECIONAR_TAREFA } from './mutation-types'
import { SETAR_ERRO } from './mutation-types'

export default {
    [LISTAR_TAREFAS]: (state, { tarefas }) => {
        state.tarefas = tarefas
    },
    [CRIAR_TAREFA]: (state, { tarefa }) => {
        state.tarefas.push(tarefa)
    },
    [EDITAR_TAREFA]: (state, { tarefa }) => {
        const indice = state.tarefas.findIndex( t => { t.id === tarefa.id})
        state.tarefas.splice(indice, 1, tarefa)
    },
    [DELETAR_TAREFA]: (state, { tarefa }) => {
        const indice = state.tarefas.findIndex( t => { t.id === tarefa.id})
        state.tarefas.splice(indice, 1)
    },
    [SELECIONAR_TAREFA]: (state, { tarefa }) => {
        state.tarefaSelecionada = tarefa
    },
    [SETAR_ERRO]: (state, { erro }) => {
        state.erro = erro
    }
    

}