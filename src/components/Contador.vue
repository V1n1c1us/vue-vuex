<template>
    <div>

        <h2 class="font-weight-light">Contador: {{ contador }}</h2>
        <h4 class="font-weight-light">Contador Alias: {{ contadorAlias }}</h4>
        <h4 class="font-weight-light">Contador Multiplicado: {{ contadorMultiplicado }}</h4>
        <button class="btn btn-lg btn-danger mr-1" @click="decrementar">-</button>
        <button class="btn btn-lg btn-success" @click="incrementar">+</button>

    </div>
</template>

<script>

import { mapState, mapGetters } from 'vuex'

export default {
    data() {
        return {
            contadorLocal: 2
        }
    },
    // computed: mapState(['contador']),
    computed: {
        ...mapState({
            contador: state => state.contadorMod.contador,
            //contador: 'contador',
            contadorAlias: state => state.contadorMod.contador,
            contadorMultiplicado(state) {
                return state.contadorMod.contador * this.contadorLocal
            }
        }),
        ...mapGetters(['exibeContador'])
        // outras computed properties
    },
    methods: {
        decrementar() {
            this.$store.state.contadorMod.contador--
        },
        incrementar() {
            this.$store.state.contadorMod.contador++
        }
    }
}
</script>

