<template>
    <div id="contenedor_principal" v-bind:style="{ 'background-image': 'url(' + tema.background + ')' }">
        <navbar
        :tema="tema"
        :tieneuntema="tieneuntema"
        />
        <div v-if="destamenu.dibujo == true && destamenu.comicbook == false" id="slider">
            <h1 class="title is-3">Popular</h1>
            <ul>
                <li v-for="destacado in destacados">
                    <div id="image" v-bind:style="{ 'background-image': 'url(' + destacado.image + ')' }">
                       <favorite id="prueba"
                        :post="destacado"
                        :replies.sync="destacado.replies"
                        :favorites.sync="destacado.favorites"
                        :user="currentuser"
                        /> 
                       <nuxt-link id="contenedor" :to="`/user/${destacado.user.username}`"> <div id="datos">
                            <figure class="image is-32x32">
                                <img class="is-rounded" :src="destacado.user.avatar">
                            </figure>
                            <h2 class="title is-4">{{destacado.user.username}}</h2>
                        </div> </nuxt-link>
                    </div>
                </li>
            </ul>
        </div>
        <div class="tabs">
            <ul>
                <li v-bind:class="{'is-active': destamenu.dibujo}"><a>Dibujo</a></li>
                <li><a v-bind:class="tema.estilotexto">Comic-book</a></li>
            </ul>
        </div>

        <div class="container">
            <div class="columns is-centered">
                <div id="column" class="column is-12">
                    <div class="buttons has-addons">
                        <button @click="seguidores" v-bind:class="{'button is-success': usermenu.seguidores,'button is-success is-outlined': !usermenu.seguidores }">Siguiendo</button>
                        <button @click="battle" v-bind:class="{'button is-primary': usermenu.batle,'button is-primary is-outlined': !usermenu.batle }">Battle Royale</button>
                        <button id="suscripciones" class="button is-success is-outlined">Suscripciones</button>
                    </div>
                </div>
            </div>
            <div  class="columns is-centered is-mobile">
                <div class="column is-12">
                    <div class="contenedor">
                    <usertimeline v-if="usermenu.seguidores == true && usermenu.batle == false"
                    :currentuser="currentuser"
                    :tema="tema"
                    :tieneuntema="tieneuntema"
                    />
                    </div>
                    <royal v-if="usermenu.batle == true && usermenu.seguidores == false"
                    :positions="positions"
                    />
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import navbar from '@/components/navbar'
import favorite from '@/components/favorite'
import usertimeline from '@/components/usertimeline'
import royal from '@/components/royal'
import {mapState} from 'vuex'
import { async } from 'q';
let moment = require ('moment')
    export default {
        middleware: ['auth'],
        components: {
            navbar, favorite,usertimeline,royal
        },
        computed:{
        ...mapState([
        'currentuser', 'tema', 'tieneuntema'
        ])
        },
        data(){
            return{
                destacados: [],
                //scroll
                limit: 10,
                positions: [],
                //menus
                busysobrebusy : false,
                destamenu: {dibujo: true, comicbook:false},
                usermenu: {seguidores: true, batle:false, suscripciones: false},
            }
        },
        created(){
            this.$store.dispatch('getusuario')
            this.destacado()
        },
        mounted(){
        this.$store.dispatch('gettema')
        },
        methods:{
            async destacado(){
              await  this.$axios.get('/destacado')
                .then(response => {
                    this.destacados = response.data.data
                    
                }).catch (e =>{
                    console.log(e)
                })
            },
        
                async battle(){
                    this.busysobrebusy = true
                    this.page = 0
                    this.usermenu.seguidores = false
                    this.usermenu.batle = true
                        await this.$axios.get('/royal')
                        .then(response => {
                            this.positions = response.data.data
                        })
                },

                 seguidores(){
                    this.busysobrebusy = false
                    this.usermenu.seguidores = true
                    this.usermenu.batle = false
                }

    }
}
        
    
</script>

<style scoped>
#contenedor_principal{
     overflow-x:hidden;
     overflow-y:hidden;
}
#slider{
    width: 100%;
    height: 400px;
    background-color: black;
    overflow: hidden;
}
h1{
    position:absolute;
    z-index: 3 !important;

}
#slider ul{
    display: flex !important;
    width: 700%;
    animation: cambio 40s infinite;
    animation-direction: alternate;
    z-index: 1 !important;
}
#slider li{
    width: 100%;
    list-style: none !important;
    z-index: 1 !important;
}

#image{
    width: 100%;
    height: 400px !important;
    background-repeat: no-repeat;
    background-color:black;
    background-position: center;
    background-size: auto 100% ;
    z-index: 1 !important;
}
h2{
    color:white;
    margin-right: 10px;
    margin-left: 10px;
}

#image figure{
    margin-left: 10px;
}

#image figure img{
    width: 32px;
    height: 32px;
}

#datos, #contenedor{
    display: flex;
    position:relative;
    top: 91.7%;
    background-color: black;
    opacity: .4;
    transition: all 0.2s ease-in-out;
}
#datos,#contenedor:hover{
    opacity: 1 !important;
}

#prueba{
    float: right ;
}

@keyframes cambio{
    0% {margin-left: 0}
    7% {margin-left: 0}

    14% {margin-left: -100%}
    21% {margin-left: -100%}

    28% {margin-left: -200%}
    35% {margin-left: -200%}

    42% {margin-left: -300%}
    50% {margin-left: -300%}

    59% {margin-left: -400%}
    67% {margin-left: -400%}

    75% {margin-left: -500%}
    83% {margin-left: -500%}

    91% {margin-left: -600%}
    100% {margin-left: -600%}
    
}

#suscripciones{
    background-color: transparent;
    border-color: #8a2be2;
    color: #8a2be2;
}
#suscripciones:hover{
    background-color: #8a2be2;
    border-color: #8a2be2;
    color: white;
}
#column{
    display:flex;
    justify-content: center;
}
</style>