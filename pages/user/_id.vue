<template>
    <!-- Portada -->
    <div id="contenedor_principal">
        <navbar></navbar>
        <template v-if="cargandoperfil == true">
            <div class="button is-loading is-white is-fullwidth"></div>
        </template>
        <template v-else>
        <div v-if="user.portada == null || portadapreview == true" id="portada" v-bind:style="{ 'background-image': 'url(' + portada + ')' }">
            <div id="contenedorportada" v-if="currentuser == true">
            <form @submit.prevent="subirportada">
                <div class="field">
                    <div class="file is-success">
                        <label class="file-label">
                            <input class="file-input" type="file" name="resume" @change="onFileChange">
                            <button v-show="portadapreview == true" class="button is-success">Subir</button> 
                                <span class="file-cta">
                                    <i class="fas fa-camera"></i>                        
                                </span>
                        </label>
                    </div>
                </div>
            </form>
            </div>
            <div id="caja">
                <figure class="image is-128x128">
                    <img id="avatar" class="is-rounded" :src="user.avatar" alt="">
                </figure>
                </div>  
        </div>
        <div v-else id="portada" v-bind:style="{ 'background-image': 'url(' + user.portada + ')' }">
            <div id="contenedorportada" v-if="currentuser == true">
            <form @submit.prevent="subirportada">
                <div class="field">
                    <div class="file is-success">
                        <label class="file-label">
                            <input v-show="portadapreview == false" class="file-input" type="file" accept="image/png, image/jpeg" name="resume" @change="onFileChange">
                            <button v-show="portadapreview == true" class="button is-success">Subir</button>    
                                <span class="file-cta">
                                    <i class="fas fa-camera"></i>                        
                                </span>
                        </label>
                    </div>
                </div>
            </form>
            </div>
                <div id="caja">
                <figure class="image is-128x128">
                    <img id="avatar" class="is-rounded" :src="user.avatar" alt="">
                </figure>
                </div>               
        </div>
        <div id="caja2">
            <h2 class="title is-3">{{user.username}}</h2>
        </div>

        <!-- Portada -->

        <!-- textbox -->
        <template v-if="currentuser == true">
        <div class="container">
            <div class="columns is-centered is-mobile">
                <div class="column is-narrow">
                    <div class="box">
                        <div id="asd" class="columns is-gapless is-mobile">
                            <div class="column is-12">
                                <span id="contador" class="help is-success" v-bind:class="{'help is-danger': hasError }">
                                    {{remainingCount}}
                                 </span>
                            </div>
                        </div>
                        <form @submit.prevent="post(yo.id)">
                            <div class="field has-addons">
                                <div class="control">
                                    <input class="input is-large is-success" type="text" v-on:keyup="countdown" v-model="textbox" placeholder="Escribe algo rapido...">                                   
                                </div>
                                <div class="field">
                                    <div class="file is-right is-success is-large">
                                        
                                        <label class="file-label">
                                            <input class="file-input" type="file" name="resume" @change="onFileChange2">
                                            <span class="file-cta">
                                                <span class="file-icon">
                                                    <i class="fas fa-images"></i>
                                                </span>
                                            </span>
                                        </label>
                                    </div>                                    
                                </div>
                            </div>
                            <button class="button is-success is-fullwidth">Postear</button>
                        </form>
                            <template v-if="postpreview == true" >
                            <div class="columns is-centered is-mobile">
                                <div class="column is-half">
                                    <div id="cajaimagen" class="box">
                                        <figure class="image is-4by3">
                                            <img id="imagensubir"  alt="Image" :src="postimage">
                                        </figure>
                                        <button id="quitar" class="button is-danger is-fullwidth" @click="removeImage" >Quitar</button>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </div>
        </template>
        <template v-else>
      <div>
            <botones
            :usuarioactual="currentuser"
            :yofollowing="following"
            :user="user"
            />
    </div> 
        </template>
    <!-- textbox -->
    
    <!-- Body -menu -->
    <div class="container">
        <profilebody
        :user="user"
        :posts="posts"
        :ufollowers="ufollowers"
        :ufollowing="ufollowing"
        :ufavorites="ufavorites"
        :currentuser="yo"
        />
    
<h1 class="title is-1"></h1>
    <!-- Body -->   
    
        <div class="columns is-centered is-mobile">
            <div class="column is-12">
                <div v-for="post in posts" class="box">
  <article class="media">
    <div class="media-left">
      <figure  class="image is-64x64">
        <img id="avatarpost" class="is-rounded" :src="post.user.avatar" alt="Image">
      </figure>
    </div>
    <div id="barra" class="media-content">
      <div class="content">
        <p>
          <strong>{{post.user.username}}</strong> <small>{{moment(post.created_at).fromNow()}}</small>
          <small id="eliminar"><button v-if="currentuser == true" @click="eliminarpost(post.id)" class="button is-small is-rounded is-text" id="menupost">Eliminar</button></small>
          <br>
          {{post.post}}
        </p>
      </div>
      <div id="postimage" class="image is-4by3" v-show="post.image !== null" v-bind:style="{ 'background-image': 'url(' + post.image + ')' }">

        </div>
      <favorite
    :post="post"
    :replies.sync="post.replies"
    :favorites.sync="post.favorites"
    :user="yo"
    /> 
    </div>
  </article>
</div>
            </div>
        </div>
    </div>
</template>
    

    </div>
</template>

<script>
import navbar from '@/components/navbar.vue';
import favorite from '@/components/favorite.vue';
import profilebody from '@/components/profilebody.vue';
import botones from '@/components/botonesseguir.vue';
import {mapState} from 'vuex';
let moment = require ('moment')

    export default {
        middleware: ['auth'],
        name: 'userheader',
        components:{
            navbar, favorite, profilebody,botones
        },
        computed: {
        ...mapState([
        'currentuser', 'following'
        ])
        },
        data(){
            return{
                yo:{},
                user:{},
                posts:{},
                ufollowers:{},
                ufollowing: {},
                ufavorites:{},
                currentuserid:{},
                userid: {},
                moment:moment,
                portada:'',
                portadapreview:false,
                file:{},
                postimage:'',
                postfile:{},
                textbox:'',
                postpreview: false,
                currentuser: false,
                cargandoperfil:true,
                //contador
                maxCount: 300,
                remainingCount: 300,
                hasError: false
            }
        },
        created(){
            this.$store.dispatch('getusuario')
            this.data()
        },
        mounted(){
            setTimeout(() => {
            this.primeracarga()
             }, 2000)
        },
        methods:{
            countdown: function() {
            this.remainingCount = this.maxCount - this.textbox.length;
            this.hasError = this.remainingCount < 0;
            },
            async data(username){
                await this.$axios.get('/account/me')
                    .then(response => {
                        this.yo = response.data.data;
                        this.following = response.data.data.following
                        this.currentuserid = response.data.data.id
                    })
                await this.$axios.get(`account/${this.$route.params.id}`)
                    .then(response => {
                    this.user = response.data.data
                    this.posts = response.data.data.posts.reverse()
                    this.userid = response.data.data.id
                    this.ufollowers = response.data.data.followers
                    this.ufollowing = response.data.data.following
                    this.ufavorites = response.data.data.favorites
                    if(this.user.id == this.yo.id){
                     this.currentuser =  true
                    }

                    })
                    
                    
                                    
            },
            onFileChange(e) {
                let files = e.target.files || e.dataTransfer.files;
                if (!files.length)
                return;
                this.createImage(files[0]);
                this.file = files[0];
                this.portadapreview = true
                },
            createImage(file) {
                let image = new Image();
                let reader = new FileReader();
                let vm = this;

                reader.onload = (e) => {
                    vm.portada = e.target.result;
                };
                reader.readAsDataURL(file);
                },
                async subirportada(userId){
                console.log("Uploading imamge");
				await this.$axios.put('/account/updateportada', {
                  portada: this.portada
                })
                this.portadapreview = false
                this.data()
                },
                onFileChange2(e) {
                let files = e.target.files || e.dataTransfer.files;
                if (!files.length)
                return;
                this.createImage2(files[0]);
                this.postfile = files[0];
                this.postpreview = true
                },
            createImage2(file) {
                let image = new Image();
                let reader = new FileReader();
                let vm = this;

                reader.onload = (e) => {
                    vm.postimage = e.target.result;
                };
                reader.readAsDataURL(file);
                },
                removeImage: function (e) {
                this.postimage = '';
                this.postpreview = false;
                },
                post (id){
                this.$axios.post('/post', {
                    post: this.textbox,
                    image : this.postimage

                })
                .then(userresponse => {
                    console.log('Listo');
                    this.postimage = '';
                    this.textbox = '';
                    this.postpreview = false;
                    this.remainingCount= 300
                    this.data()
                }).catch (e =>{
                    console.log(e)
                })
            },
            eliminarpost(id){
                this.$axios.delete('posts/destroy/'+id)
                .then(data =>{                    
                this.data();
                })
            },
            primeracarga(){
                this.cargandoperfil = false
            }
    }  
}
</script>

<style scoped>
#portada{
    width:100%;
    height:300px;
    background-color: white;
}
    #contenedorportada{
        display: flex;
        justify-content: center;
    height: 0px;
    opacity: .50;
    z-index: 1;
    
}
#caja{
    display: flex;
    justify-content: center;
    position: relative;
    width: 100;
    height: auto;
    top: 180px; 
    z-index: 3;
    
}
#caja2{
    display: flex;
    justify-content: center;
    position: relative;
    top: 10px;
    margin-bottom: 15px;
}

#contenedor_principal{
     overflow-x:hidden !important;
     overflow-y:hidden !important;
}
#barra{
     overflow-y:hidden;
     height: auto;
}
#eliminar{
    float: right ;
}
#avatar{
    min-width: 128px;
    min-height: 128px;
    height:128px;
    width:128px;
    max-width: 128px;
    max-height: 128px;
}
#avatarpost{
    height:64px;
    width:64px;
    min-width: 64px;
    max-width: 64px;
    max-width: 64px;
    max-height: 66px;
}

#postimage{
    height: 100% !important;
    background-repeat: no-repeat;
    background-color:black;
    background-position: center;
    background-size: 100% auto ;
}
#contador {
    float:right;
}
#asd{
    margin: 0px !important
}


</style>