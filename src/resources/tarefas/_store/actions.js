import * as types_mutations from './mutation-types'
import TarefasService from './../_services//TarefasServices'
import { async } from 'q';

export default {
    concluirTarefa: async ({ dispatch }, payload) => {
        const tarefa = Object.assign({}, payload.tarefa)
        tarefa.concluido = !tarefa.concluido
        dispatch('editarTarefa', { tarefa })
    },
    criarTarefa: ({ commit }, { tarefa }) => {
        return TarefasService.postTarefa(tarefa)
            .then(response => {
                commit(types_mutations.CRIAR_TAREFA, { tarefa: response.data })})
            .catch(erro => commit(types_mutations.SETAR_ERRO, { erro }))
    },
    editarTarefa: async ({ commit }, { tarefa }) => {
        try {
            const response = await TarefasService.putTarefa(tarefa)
            commit(types_mutations.EDITAR_TAREFA, { tarefa: response.data })    
        } catch (erro) {
            commit(types_mutations.SETAR_ERRO, { erro })
        }
    },
    deletarTarefa: async ({ commit }, { tarefa }) => {
        try {
            const response = await TarefasService.deleteTarafa(tarefa.id)
            commit(types_mutations.DELETAR_TAREFA, { tarefa })
        } catch (erro) {
            commit(types_mutations.SETAR_ERRO, { erro })
        }
    },
    listarTarefas: async ({ commit }, payload) => {
        try {
            const response = await TarefasService.getTarefas()
            commit(types_mutations.LISTAR_TAREFAS, { tarefas: response.data })
        } catch(erro) {
            commit(types_mutations.SETAR_ERRO, { erro })
        }
    },
    selecionarTarefa: ({ commit }, payload) => {
        commit(types_mutations.SELECIONAR_TAREFA, payload)
    },
    resetarTarefaSelecionada: ({ commit }) => {
        commit(types_mutations.SELECIONAR_TAREFA, { tarefa: undefined})
    }
}