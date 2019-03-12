import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const contadorModule = {
    namespaced: true,
    state: {
        contador: 0
    },
    getters: {
        contadorAtual: state => state.contador
    }
}

const tarefasModule = {
    namespaced: true,
    state: {
        //estado central
        tarefas: []
    },
    getters: {
        //(state loca,. getter local. state raiz, getter raiz)
        tarefasConcluidas: (state, getters, rootState, rootGetters) => {
            console.log('Getters: state: ', state, rootState)
            return state.tarefas.filter( t => t.concluido)
        },
        tarefasAFazer: state => state.tarefas.filter(t => !t.concluido),
        totalDeTarefasConcluidas: (state, getters) => getters.tarefasConcluidas.length,
        buscarTarefaPorId: state => id => state.tarefas.find(t => t.id === id),
        boasVindas: (state, getters, rootState, rootGetters) => {
            // state local -> state.tarefas
            // state global -> state.tarefas.tarefas
            // getter local -> getters.tarefasAFazer
            // getter global ->  'tarefasMod/tarefasAFazer'
            console.log('State Global: ', rootState.usuario)
            console.log('Getter Global: ', rootGetters.mensagemBoasVindas)
            return rootGetters.mensagemBoasVindas
        }
    },
    mutations: {
        // (state local, payload)
        listarTarefas: (state, { tarefas }) => {
            state.tarefas = tarefas
        }
    },
    actions: {
        buscarTarefas: (context, payload) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([
                        { id: 1, titulo: 'Aprender Vue', concluido: true },
                        { id: 2, titulo: 'Aprender Vue Router', concluido: true },
                        { id: 3, titulo: 'Aprender Vuex', concluido: false }
                    ])
                }, 2000)
            })
        },
        listarTarefas: async ({ commit, dispatch, state, rootState, getters, rootGetters}, payload) => {
            console.log('Action: listarTarefas')
            const tarefas = await dispatch('buscarTarefas')
            console.log('Mutation: listarTarefas')
            commit('listarTarefas', { tarefas })
            console.log('Actions: state:', state, rootState)
        }
    }
}
const store = new Vuex.Store({
    state: {
        usuario: 'Vinícius'
    },
    getters: {
        mensagemBoasVindas: state => `Olá ${state.usuario}`
    },
    modules: {
        contadorMod: contadorModule,
        tarefasMod: tarefasModule
    }    
})

console.log('Store', store)

export default store