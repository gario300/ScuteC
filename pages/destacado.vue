<template>
    <div>
        <navbar/>
        <div id="presentación"></div>

    </div>
</template>

<script>
import navbar from '@/components/navbar'
import favorite from '@/components/favorite'
import {mapState} from 'vuex'
let moment = require ('moment')
    export default {
        middleware: ['auth'],
        components: {
            navbar, favorite
        },
        computed:{
        ...mapState([
        'currentuser'
        ])
        },
        data(){
            return{
                destacados: []
            }
        },
        created(){
            this.$store.dispatch('getusuario')
            this.destacado()
        },
        mounted(){

        },
        methods:{
            async destacado(){
              await  this.$axios.get('/destacado')
                .then(response => {
                    this.destacados = response.data.data
                    
                    console.log (destacados)
                }).catch (e =>{
                    console.log(e)
                })
            }
        }
        
    }
</script>

<style scoped>
#presentación{
    width: 100%;
    height: 400px;
    background-color: black;
}
</style>