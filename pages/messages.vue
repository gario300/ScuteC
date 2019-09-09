<template>
    <div>
        <navbar></navbar>
        <div class="container">
            <div class="columns is-hidden-desktop is-gapless is-multiline">
                <div class="column is-12">
                        <table class="table table is-fullwidth is-bordered is-striped">
                            <tbody id="menumobile">
                                <tr>
                                    <div class="tabs">
                                        <ul>
                                            <li v-for="conversation in conversations" ><a @click="current(conversation.id)">
                                            <figure class="image is-48x48">
                                                <img v-if="currentuser.id !== conversation.Emisorid" class="is-rounded" :src="conversation.Emisoravatar" alt="Image">
                                                <img v-else class="is-rounded" :src="conversation.Receptoravatar" alt="Image">
                                            </figure>
                                            </a></li>
                                        </ul>
                                    </div>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="column is-12">

                                <div class="field">
                                    <p class="control has-icons-left has-icons-right">
                                        <input class="input is-success" v-model="find" v-on:keyup="buscar" type="text" placeholder="Busca un usuario para conversar">
                                        <span class="icon is-small is-left">
                                        <i class="fas fa-search"></i>
                                        </span>
                                    </p>
                                </div>
                                    <div id="buscador" class="box" v-for="busqueda in busquedas">
                                        <article class="media">
                                            <div class="media-left">
                                                <figure class="image is-64x64">
                                                    <img class="is-rounded" :src="busqueda.avatar" alt="Image">
                                                </figure>
                                            </div>
                                            <div class="media-content">
                                                <div id="busqueda"  class="content">
                                                    <p>
                                                        <strong>
                                                            {{busqueda.username}}
                                                        </strong>
                                                    </p>
                                                </div>
                                                <div class="level is-mobile">
                                                    <button class="button is-outlined is-fullwidth"  @click="newconversation(busqueda.id)">Enviar Mensaje</button>
                                                </div>
                                            </div>
                                        </article>
                                    </div>
                </div>
            </div>
            <div class="columns is-hidden-desktop is-gapless">
                
            </div>
            <div class="columns is-gapless">
                <div class="column is-4 is-hidden-touch">
                    <table class="table is-fullwidth is-bordered is-striped">
                        <thead>
                            <th>
                                Mensajes
                            </th>
                        </thead>
                        <tbody id="mensajes" >
                            <tr>
                                <div class="field">
                                    <p class="control has-icons-left has-icons-right">
                                        <input class="input is-success" v-model="find" v-on:keyup="buscar" type="text" placeholder="Busca un usuario para conversar">
                                        <span class="icon is-small is-left">
                                        <i class="fas fa-search"></i>
                                        </span>
                                    </p>
                                </div>
                                    <div id="buscador" class="box" v-for="busqueda in busquedas">
                                        <article class="media">
                                            <div class="media-left">
                                                <figure class="image is-64x64">
                                                    <img class="is-rounded" :src="busqueda.avatar" alt="Image">
                                                </figure>
                                            </div>
                                            <div class="media-content">
                                                <div id="busqueda"  class="content">
                                                    <p>
                                                        <strong>
                                                            {{busqueda.username}}
                                                        </strong>
                                                    </p>
                                                </div>
                                                <div class="level is-mobile">
                                                    <button class="button is-outlined is-fullwidth"  @click="newconversation(busqueda.id)">Enviar Mensaje</button>
                                                </div>
                                            </div>
                                        </article>
                                    </div>
                            </tr>
                            <tr v-for="conversation in conversations" v-if="conversation.seenders.length !== null ">
                                  <a @click="current(conversation.id)"> <div id="conversaciones" class="box">
                                    <article class="media">
                                        <div class="media-left">
                                            <figure class="image is-64x64">
                                                <img v-if="currentuser.id !== conversation.Emisorid" class="is-rounded" :src="conversation.Emisoravatar" alt="Image">
                                                <img v-else class="is-rounded" :src="conversation.Receptoravatar" alt="Image">
                                            </figure>
                                        </div>
                                        <div class="media-content">
                                            <div class="content">
                                                <p>
                                                    <strong v-if="currentuser.id !== conversation.Emisorid">
                                                        {{conversation.Emisor}}
                                                    </strong>
                                                    <strong v-else>
                                                        {{conversation.Receptor}}
                                                    </strong>
                                                </p>
                                            </div>
                                        </div>
                                    </article>
                                </div></a>
                            </tr>
                        </tbody>
                        <tfoot>
                            <td>
                                
                            </td>
                        </tfoot>
                    </table>
                    </div>
                <div class="column">
                    <table v-for="currentconversation in currentconversations" class="table is-fullwidth is-bordered is-striped">
                        <thead>
                            <th>
                                <span v-if="state.currentconversation == true">
                                    <strong v-if="currentuser.id !== currentconversation.Emisorid"> {{currentconversation.Emisor}}</strong>
                                    <strong v-else >{{currentconversation.Receptor}}</strong>
                                </span>
                            </th>
                        </thead>
                        <tbody id="chatbox">
                            <tr v-for="seender in seenders">
                                <div  v-if="seender.user.id == currentuser.id" class="columns is-mobile">
                                    <div id="barramensajes" class="column is-6 is-offset-6">
                                <div class="box">
                                    <p>{{seender.mensaje}}</p>
                                </div>
                                   <p v-if="seender.regalo !== 0" class="help is-success"> <strong v-if="seender.user.id == currentuser.id" class="help is-success"> Haz enviado un Regalo <i class="fas fa-gift"></i></strong>
                                        <strong v-else class="help is-success"> Te ha Enviado un Regalo <i class="fas fa-gift"></i></strong>
                                        <small><figure class="image is-16x16"> 
                                            <img src="https://res.cloudinary.com/scute/image/upload/v1566231592/logros/monedasandi_msautl.png">
                                        </figure>{{seender.regalo}}
                                        </small>
                                    </p>
                                
                                    </div>
                                </div>
                                <div  v-else class="columns is-mobile">
                                    <div  id="barramensajes" class="column is-6">
                                <div class="box">
                                    <p>{{seender.mensaje}}</p>
                                </div>
                                <p v-if="seender.regalo !== 0" class="help is-success"> <strong v-if="seender.user.id == currentuser.id" class="help is-success"> Haz enviado un Regalo <i class="fas fa-gift"></i></strong>
                                        <strong v-else class="help is-success"> Te ha Enviado un Regalo <i class="fas fa-gift"></i></strong>
                                        <small><figure class="image is-16x16"> 
                                            <img src="https://res.cloudinary.com/scute/image/upload/v1566231592/logros/monedasandi_msautl.png">
                                        </figure>{{seender.regalo}}
                                        </small>
                                </p>
                                    </div>
                                </div>
                            </tr>
                        </tbody>
                        <tfoot>
                            <td>
                                <form v-if="state.currentconversation == false">
                                    <textarea class="textarea  is-success" disabled></textarea>
                                </form>
                                <form @submit.prevent="(newmensaje(currentconversation.id, currentconversation.Emisorid, currentconversation.Receptorid))" v-else>
                                    <textarea v-model="mensaje" class="textarea  is-success"></textarea>
                                    <div v-if="state.enviando == true" class="button is-success is-fullwidth is-loading"></div>
                                    <button v-else class="button is-success is-fullwidth">Enviar</button>
                                    <div id="regaloinp" class="box">
                                        <figure class="image is-24x24">
                                            <img src="https://res.cloudinary.com/scute/image/upload/v1566231592/logros/monedasandi_msautl.png">
                                        </figure> <br>
                                        <div class="select is-success is-small">
                                            <select v-model="regalo">
                                                <option value="0">0</option>
                                                <option value="50">50</option>
                                                <option value="100">100</option>
                                                <option value="300">300</option>
                                                <option value="500">500</option>
                                                <option value="1000">1000</option>
                                            </select>
                                        </div>
                                        </div>
                                </form>
                            </td>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import navbar from '@/components/navbar'
import {mapState} from 'vuex'
import { async } from 'q';

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
        data(){
            return{
                find: '',
                busquedas: [],
                conversations: [],
                currentconversations:{},
                seenders: {},
                state:{currentconversation: false, enviando: false, nopuntos: false },
                //formulario
                regalo: 0,
                mensaje: '',

                

            }
        },
        created(){
            this.$store.dispatch('getusuario')
            this.getconversations()

        },
        methods:{
            async buscar(){
                await this.$axios.get(`account/finder/${this.find}`)
                .then(response => {
                    this.busquedas = (response.data.data)
                    console.log(this.usuarios)
                }).catch (e =>{
                    console.log(e)
                })
            },
            async getconversations (){
                await this.$axios.get ('/mensajeria/conversations')
                .then(response => {
                    this.conversations = (response.data.data)
                    console.log(this.conversations)
                })
            },
            async newconversation(receptor){
                this.enviando = true
                await this.$axios.post('/mensajeria/sendmensage', {
                    to_user_id :receptor,
                })
                this.enviando = false
                this.find =''
                this.busquedas = []
            },
            async current (id){
                await this.$axios.get (`/mensajeria/${id}`)
                .then(response => {
                    this.currentconversations = (response.data.data)
                    this.seenders = (response.data.seenders)
                    console.log(this.seenders)
                    this.state.currentconversation = true
                    
                })
                await this.scroll()
            },
            async newmensaje (converid, user1, user2){
                this.state.enviando = true
                if(this.currentuser.puntos >= this.regalo){
                let receptor = 0

                if(this.currentuser.id == user1){
                    receptor = user2
                } else {
                    receptor = user1
                }
                
                await this.$axios.post('/mensajeria/newsend', {
                    conversation_id: converid,
                    receptor_id : receptor,
                    mensaje: this.mensaje,
                    regalo : this.regalo
                    
                })
                .then(userresponse => {
                    this.mensaje=''
                    this.regalo = 0
                    this.state.enviando = false
                    this.current(converid)
                }).catch (e =>{
                    console.log(e)
                })
                } else{

                }
            },
        scroll() {
            let container = document.querySelector("#chatbox");
            container.scrollTop = container.scrollHeight;
            }
             
        }
        
        }
</script>

<style scoped>
#buscador{
    position: absolute;
    z-index: 3 !important;
    margin-top: 0px;
}
#busqueda{
    text-align: center;
}

.media-right{
    float: right !important ;
}


a{
    color:black;
}
tbody{
    height:330px;
    overflow-y: scroll;
    overflow-x: hidden;
    width: 100%;
    }
#menumobile{
    height: auto;
    overflow-y: hidden;
    overflow-x: hidden;
    width: 100%;
}   
#mensajes{
    height:540px;
    overflow-y: scroll;
    width: 100%;
    }
tbody::-webkit-scrollbar {
  width: 5px;
}

 
tbody::-webkit-scrollbar-track {
  background: #ddd;
}
 
tbody::-webkit-scrollbar-thumb {
  background: #666; 
}


  thead,tbody,tr,td,th{
    display:block;
  }

ul{
    display: flex;
}
ul li{
    text-align: center;
    margin-left: 15px;
}
#regalo{
    background-color:#8a2be2;
    color: white;
}
#regaloinp{
    display: flex;
    justify-content: center;
}
small{
    display: flex;
}
</style>