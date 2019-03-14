<template>
    <div>

        <div class="row">
            <div class="col-sm-10">
                <h1 class="font-weight-light">Lista de Tarefas</h1>
            </div>
            <div class="col-sm-2">
                <button 
                    class="btn btn-primary float-right" 
                    @click="exibirFormularioCriarTarefa">
                        <i class="fa fa-plus mr-2"></i>
                        <span>Criar</span>
                </button>
            </div>
        </div>
        
        <h3 class="font-weight-light">A Fazer ({{ tarefasAFazer.length }})</h3>
        
        <ul class="list-group" v-if="tarefasAFazer.length > 0">
            <TarefasListaIten
                v-for="tarefa in tarefasAFazer"
                :key="tarefa.id"
                :tarefa="tarefa"
                @editar="selecionarTarefaParaEdicao" 
                @concluir="concluirTarefa({ tarefa: $event })"
                @deletar="confirmaraRemocaoTarefa"/>
        </ul>

        <p v-else>Nenhuma tarefa a fazer.</p>

        <h3 class="font-weight-light">Concluídas ({{ totalDeTarefasConcluidas }})</h3>
        
        <ul class="list-group" v-if="tarefasConcluidas.length > 0">
            <TarefasListaIten
                v-for="tarefa in tarefasConcluidas"
                :key="tarefa.id"
                :tarefa="tarefa"
                @editar="selecionarTarefaParaEdicao" 
                @concluir="concluirTarefa({ tarefa: $event })"
                @deletar="confirmaraRemocaoTarefa"/>
        </ul>

        <p v-else>Nenhuma tarefa foi concluída.</p>

        <TarefaSalvar
            v-if="exibirFormulario"
            @salvar="salvarTarefa" />

        <div class="alert alert-danger" v-if="erro">{{ erro.message }}</div>

    </div>
</template>

<script>

import TarefaSalvar from './TarefaSalvar.vue'
import TarefasListaIten from './TarefasListaIten.vue'
import { createNamespacedHelpers } from 'vuex';

import register from './../_store/register'

const { mapActions, mapGetters, mapState } = createNamespacedHelpers('tarefas')

export default {
    components: {
        TarefaSalvar,
        TarefasListaIten
    },
    data() {
        //estado local
        return {
            exibirFormulario: false
        }
    },
    computed: {
        ...mapState([
            'tarefaSelecionada',
            'erro'
        ]),
        ...mapGetters([
            'tarefasConcluidas',
            'tarefasAFazer',
            'totalDeTarefasConcluidas',
            'boasVindas'
        ]),
    },
    created() {
        register(this.$store)
        this.listarTarefas()
    },
    methods: {
        ...mapActions([
            'concluirTarefa',
            'criarTarefa',
            'editarTarefa',
            'deletarTarefa',
            'listarTarefas',
            'selecionarTarefa',
            'resetarTarefaSelecionada'
        ]),
        confirmaraRemocaoTarefa(tarefa) {
            const confirmar = window.confirm(`Deseja Deletar a tarefa com o título "${tarefa.titulo}"?`)
            if (confirmar) {
                this.deletarTarefa({ tarefa })
            }
        },
        exibirFormularioCriarTarefa(event) {
            if (this.tarefaSelecionada) {
                this.resetarTarefaSelecionada()
                return
            }
            this.exibirFormulario = !this.exibirFormulario
        },
        async salvarTarefa(event) {
            switch(event.operacao) {
                case 'criar':
                    await this.criarTarefa({ tarefa: event.tarefa })
                    break
                case 'editar':
                    await this.editarTarefa({ tarefa: event.tarefa })
            }
            this.resetar()
        },
        selecionarTarefaParaEdicao(tarefa) {
            this.exibirFormulario = true
            this.selecionarTarefa({ tarefa })
        },
        resetar() {
            this.exibirFormulario = false
            this.resetarTarefaSelecionada()
        }
    }
}
</script>
