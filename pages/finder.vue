<template>
    <div id="contenedor_principal">
        <navbar
        :tema="tema"
        :tieneuntema="tieneuntema"
        />
        <div class="container" >
            <div class="columns">
                <div class="column is-12">
                        <div class="field">
                            <p class="control has-icons-left has-icons-right">
                                <input :class="[ tieneuntema ? tema.inputrounded : 'input is-rounded is-success' ]" v-model="find" v-on:keyup="buscar" type="text" placeholder="Buscar...">
                                <span class="icon is-small is-left">
                                <i class="fas fa-search"></i>
                                </span>
                            </p>
                        </div>
                </div>
            </div>
                <h1 v-if="error.busqueda == true && error.error == false" class="title is-4">Busca a un usuario...</h1>
    
            <div class="columns" v-for="usuario in usuarios" >
                <div class="column is-12">
                    
                    <div class="box"
                    v-bind:style="{ 'background-image': 'url(' + tema.postbox + ')' }">
                        <nuxt-link id="link" :to="`/user/${usuario.username}`">
                        <article class="media">
                            <div class="media-left">
                            <figure class="image is-64x64">
                                <img class="is-rounded" :src="usuario.avatar">
                            </figure>
                            </div>
                            <div class="media-content">
                            <div class="content">
                                <p>
                                <strong>{{usuario.username}}</strong>
                                <br>
                                {{usuario.bio}}
                                </p>
                                <p id="inline">
                                <span class="help is-success">Seguidores: {{usuario.followers.length}} </span>
                                <span class="help is-primary"> &nbsp;&nbsp; Siguiendo: {{usuario.following.length}}</span>
                                </p>
                            </div>
                            </div>
                        </article>
                        </nuxt-link>
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
        'currentuser','tema', 'tieneuntema'
        ])
        },
        created(){
            this.$store.dispatch('getusuario')
            this.$store.dispatch('gettema')


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
                })
            }
        }
        
    }
</script>

<style scoped>
.field{
margin-top : 10px;
}

#inline{
    display: flex;
}

figure img{
    max-width: 64px;
    max-height: 64px;
    width: 64px;
    height: 64px;
    min-width: 64px;
    min-height: 64px;
}

#link{
    color: black;
}
#contenedor_principal{
     overflow-x:hidden;
     overflow-y:hidden;
}
</style>