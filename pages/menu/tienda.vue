<template>
    <div>
        <navbar
        :tema="tema"
        :tieneuntema="tieneuntema"
        />
        <menuinventario/>

        <comprartemas
        :currentuser="currentuser"
        :tema="tema"
        :tieneuntema="tieneuntema"
        />

    </div>
</template>

<script>
import navbar from '@/components/navbar'
import comprartemas from '@/components/comprartemas'
import menuinventario from '@/components/menuinventario'
import {mapState} from 'vuex'
    export default {
        components:{
            navbar, menuinventario, comprartemas
        },
        computed: {
        ...mapState([
        'currentuser', 'tema', 'tieneuntema'
        ])
        },
        data(){
            return{

            }
        },
        created(){
            this.$store.dispatch('getusuario')
            this.$store.dispatch('gettema')
        }

    }
</script>

<style lang="scss" scoped>

</style>