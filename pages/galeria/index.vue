<template>
    <div class="contenedor_principal" v-bind:style="{ 'background-image': 'url(' + tema.background + ')' }">
        <navbar
        :tieneuntema="tieneuntema"
        :tema="tema"
        />
        <!-- Userbox -->
       
    <div class="container">
       <div id="columnbox" class="columns is-centered ">
                <div class="column is-half">                    
                    <div id="usuariof" class="box" v-bind:style="{ 'background-image': 'url(' + tema.userbox + ')' }">
                        <article id="media" class="media">
                        <div class="media-left">
                                <figure class="image is-256x256">
                                    <nuxt-link :to="`/user/${currentuser.username}`"><img id="avatar" class="is-rounded" :src="`${currentuser.avatar}`"></nuxt-link>
                                 </figure>
                        </div>
                        <div class="mediacontent">
                            <div class="content">
                                <form @submit.prevent="post">
                                    <div class="columns is-centered is-mobile">
                                        <div class="column is-9">
                                            <textarea v-model="textinbox" v-on:keyup="countdown" 
                                            id="textarea" 
                                            :class="[ tieneuntema ? tema.estilotextarea : 'textarea is-success is-large' ]"
                                            :placeholder="placeholder"  @postinbox="vimodel = $event"></textarea>
                                            <span id="contador" :class="[ tieneuntema ? tema.estilohelp : 'help is-success' ]"> 
                                                {{remainingCount}}
                                            </span>

                                        </div>
                                        <div class="column" >
                                            
                                            <div id="file" :class="[ tieneuntema ? tema.estilofileindex : 'file is-success is-fullwidth' ]">
                                                <label class="file-label">
                                                    <input class="file-input" :disabled="cargandopost" type="file" name="image" accept="image/png, image/jpeg" @change="onFileChange">
                                                    <span class="file-cta">
                                                        <i class="far fa-images fa-lg"></i>
                                                    </span>
                                                </label>
                                            </div>
                                           
                                            <button id="post" 
                                            :class="[ tieneuntema ? tema.estilobuttonindex : 'button is-success is-normal' ]"
                                            :disabled="cargandopost">Post</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        </article>
                        
                        <template v-if="imagepreview == true" >
                            <div class="columns is-centered is-mobile">
                                <div class="column is-half">
                                    <div id="cajaimagen" class="box">
                                        <button id="quitar" class="button is-danger is-fullwidth" @click="removeImage">Quitar</button>
                                        <figure class="image is-4by3">
                                            <img id="imagensubir"  alt="Image" :src="image">
                                        </figure>
                                    </div>
                                </div>
                            </div>
                        </template>
                    
                    </div>
                </div>
            </div>

   
        
        <!-- Userbox -->



        <!-- Post-box -->
        <div id="scrollinfinite"  class="colums"
        v-for="(post, id) in posts" :key="id" :posts.sync="posts"
        :user="currentuser">
                <div id="columna" class="column is-8 is-offset-2">
                 <div id="postf" class="box" v-bind:style="{ 'background-image': 'url(' + tema.postbox + ')' }">
                    <article  class="media">
                        <div  class="media-left">
                        <figure  class="image is-64x64">
                            <nuxt-link :to="`/user/${post.user.username}`"><img id="postuserimage" class="is-rounded" :src="post.user.avatar"></nuxt-link>
                        </figure>
                        <small v-if="post.user.Partner == true"  id="partner" class="button is-small is-rounded is-outlined"> <span>Partner</span></small>
                        </div>
                        <div id="barra" class="media-content">
                        <div class="content">     
                            <p :class="tema.estilotexto">
                            <nuxt-link :class="tema.estilotexto" id="link" :to="`/user/${post.user.username}`"><strong>{{post.user.username}}</strong></nuxt-link>  <small id="contador2">{{moment(post.created_at).fromNow()}}</small>  <small>
                                <button v-if="post.user_id == currentuser.id" @click="eliminarpost(post.id)" class="button is-small is-rounded is-text" id="menupost">Eliminar</button>
                                <span id="seguir"><i class="fas fa-star"></i></span>
                            </small>
                            <br>
                            {{post.post}} 
                            </p>
                            
                        </div>
                        <div id="imagebox"
                        v-show="post.image 
                        !== null">
                        
                        <div id="postimage" 
                        class="image is-4by3" 
                        v-bind:style="{ 'background-image': 'url(' + post.image + ')' }">
                        </div>
                        
                        <div
                        id="containerimage"
                         v-bind:style="{ 'background-image': 'url(' + post.image + ')'  }">
                        </div> 


                        </div>   
                            <favorite
                        :post="post"
                        :replies.sync="post.replies"
                        :favorites.sync="post.favorites"
                        :user="currentuser"
                        /> 
                        </div>
            </article>
        
            </div>
    
        </div> 
   

    </div>
    <infinite-loading @infinite="infinitehandler"></infinite-loading>
        <!-- Post-box -->
         </div>
        
    </div>
</template>

<script>
import navbar from '@/components/navbar'
import favorite from '@/components/favorite'
import {mapState} from 'vuex'
let moment = require ('moment')
    
    export default {
        middleware: ['auth'],
        components:{
            navbar, favorite
        },
        computed: {
        ...mapState([
        'currentuser', 'tieneuntema', 'tema',
        ])
        },
        data(){
            return{
                textinbox: '',
                image:'',
                file:{},
                imagepreview : false,
                vimodel: '',
                posts:[],
                page: 0,
                moment : moment,
                prueba: [],
                busy : false,
                results: [],
                placeholder: 'Publica algo',
                //contador
                maxCount: 300,
                remainingCount: 300,
                hasError: false,
                //bloqueodebotones
                cargandopost: false,
                segundacarga: true
            }
        },
        created(){
            this.cargaruno()
        },
        mounted(){
            this.$store.dispatch('gettema')
        },
        methods:{
            async infinitehandler($state){
            this.page ++
              await this.$axios.get(`users/timeline/${this.page}`)
                .then(response => {
                    let lista = response.data.data.data
                    console.log(response.data.data)
                    if(lista.length){
                        this.posts = this.posts.concat(lista)
                        $state.loaded()
                    }else {
                        $state.complete()
                    }
                })

            },

            
            
            countdown: function() {
            this.remainingCount = this.maxCount - this.textinbox.length;
            this.hasError = this.remainingCount < 0;
            },
            //Funciones de usuario y posteo   
            //imagen
            onFileChange(e) {
                let files = e.target.files || e.dataTransfer.files;
                if (!files.length)
                return;
                this.createImage(files[0]);
                this.file = files[0];
                this.imagepreview = true
                },
            createImage(file) {
                let image = new Image();
                let reader = new FileReader();
                let vm = this;

                reader.onload = (e) => {
                    vm.image = e.target.result;
                };
                reader.readAsDataURL(file);
                },
                removeImage: function (e) {
                this.image = '';
                this.imagepreview = false;
                },
                //postear
            post (){
                this.cargandopost = true
                if(this.textinbox.length == 0){
                    this.placeholder = 'No puede estar vacio'
                    this.cargandopost = false
                } else {
                this.$axios.post('/post', {
                    post: this.textinbox,
                    image : this.image

                })
                .then(userresponse => {
                    console.log('Listo');
                    this.image = '';
                    this.textinbox = '';
                    this.imagepreview = false;
                    this.remainingCount = 300
                    this.cargandopost = false
                    this.page = 0
                    this.posts = []
                    this.infinitehandler()
                }).catch (e =>{
                    console.log(e)
                })
                }
            },
            eliminarpost(id){
                this.$axios.delete('posts/destroy/'+id)
                .then(data =>{   
                    this.page = 0
                    this.posts = []
                    this.infinitehandler()
                })
            },
             
            async cargaruno(){
            await this.$store.dispatch('getusuario')
            this.primeracarga = false
            }
            
    }
}
</script>

<style scoped>


#avatar{
    max-height: 80px !important;
    max-width: 80px !important;
    width: 80px !important;
    height: 80px !important;
}
#post{
    margin-top: 20px !important;
}
#menupost{
    float: right ;
}

#cajaimagen{
    margin-top: 10px;
}
#quitar{
    margin-bottom: 10px;
}
#media{
    display:flex;
    justify-content: center;
}
#columnbox{
    margin-top: 25px;
}

textarea{
    max-height: 120px !important;
}


#togglepost{
    display:inline-block;
}
#postuserimage{
    max-height: 64px !important;
    max-width: 64px !important;
    width: 64px !important;
    height: 64px !important;
}
#barra{
    height: auto !important;
    overflow-y: hidden !important;
}
#partner{
    color:rgb(124, 28, 133) !important;
    border-color:rgb(124, 28, 133) !important;
}
.contenedor_principal{
     overflow-x:hidden;
     overflow-y:hidden;
    -webkit-user-drag: none;
}

#postimage{
    position: relative;
    height: 100%;
    z-index: 30;
    padding: 0px !important;
    background-repeat: no-repeat;
    background-color: transparent;
    background-position: center;
    background-size: auto 100% ;
}
#containerimage{
    filter: blur(3px);
    position: absolute;
    padding: 0px !important;
    bottom: 0px;
    border-radius: 8px;
    z-index: 0;
    height: 100%;
    background-repeat: repeat;
    background-size: auto 100%;
    background-color: transparent; 
    width: 100%;
}

#imagebox{
    background-position: left;
    position:relative;
    height: 70vh !important;
    width: 100%;
}

#link{
    color:black
}
#contador {
    float: right !important;
}

#scrollinfinite{
    -webkit-user-drag: none;
}

#scrollinfinite:last-child{
    margin-bottom: 0px;
}

#columna:last-child{
    margin-bottom: 0px;
}

.box{
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100% ;
}


</style>