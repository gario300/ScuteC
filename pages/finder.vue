<template>
    <div>
        <navbar></navbar>
        <div class="container">
            <div class="columns">
                <div class="column is-12">
                        <div class="field">
                            <p class="control has-icons-left has-icons-right">
                                <input class="input is-rounded is-success" v-model="find" v-on:keyup="buscar" type="text" placeholder="Buscar...">
                                <span class="icon is-small is-left">
                                <i class="fas fa-search"></i>
                                </span>
                            </p>
                        </div>
                </div>
            </div>
                <h1 v-if="error.busqueda == true && error.error == false" class="title is-4">Busca a un usuario...</h1>
                <h1 v-if="error.error == true" class="title is-4 is-danger">{{danger}}</h1>
            <div class="columns" v-for="usuario in usuarios">
                <div class="column is-12">
                    
                    <div class="box">
                        <article class="media">
                            <div class="media-left">
                            <figure class="image is-64x64">
                                <img :src="usuario.avatar">
                            </figure>
                            </div>
                            <div class="media-content">
                            <div class="content">
                                <p>
                                <strong>{{usuario.username}}</strong>
                                <br>
                                {{usuario.bio}}
                                </p>
                            </div>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import navbar from '@/components/navbar'
import {mapState} from 'vuex'

    export default {
        middleware: ['auth'],
        components: {
            navbar
        },
        computed:{
        ...mapState([
        'currentuser'
        ])
        },
        created(){
            this.$store.dispatch('getusuario')

        },
        data(){
            return{
                find:'',
                usuarios: [],
                error:{'busqueda': true, 'error':false},
                danger: ''
            }
        },
        methods:{
            async buscar(){
                this.error.busqueda = false
                await this.$axios.get(`account/finder/${this.find}`)
                .then(response => {
                    this.usuarios = (response.data.data)
                    console.log(this.usuarios)
                }).catch (e =>{
                    console.log(e)
                    this.danger = e
                    this.error.error = true
                })
            }
        }
        
    }
</script>

<style scoped>
.field{
margin-top : 10px;
}
</style>