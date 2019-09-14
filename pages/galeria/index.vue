<template>
    <div id="contenedor_principal">
        <navbar/>
        <!-- Userbox -->
    <div class="container">
       <div id="columnbox" class="columns is-centered ">
                <div class="column is-half">                    
                    <div class="box">
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
                                            <textarea v-model="textinbox" v-on:keyup="countdown" class="textarea is-success is-large" :placeholder="placeholder"  @postinbox="vimodel = $event"></textarea>
                                            <span id="contador" class="help is-success" v-bind:class="{'help is-danger': hasError }">
                                                {{remainingCount}}
                                            </span>

                                        </div>
                                        <div class="column" >
                                            
                                            <div v-if="cargandopost == false" class="file is-success  is-fullwidth">
                                                <label class="file-label">
                                                    <input class="file-input" type="file" name="image" accept="image/png, image/jpeg" @change="onFileChange">
                                                    <span class="file-cta">
                                                        <i class="far fa-images fa-lg"></i>
                                                    </span>
                                                </label>
                                            </div>
                                            <div v-else class="file is-success is-fullwidth">
                                               <label class="file-label">
                                                    <span class="file-cta">
                                                        <i class="far fa-images fa-lg"></i>
                                                    </span>
                                                </label> 
                                            </div>
                                           
                                            <button v-if="cargandopost == false" id="post" class="button  is-normal is-success">Post</button>
                                            <div v-else id="post" class="button is-normal is-success is-loading">Post</div>
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
        <div id="scrollinfinite" class="colums" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="limit">
                <div class="column is-8 is-offset-2">
            <div  v-for="(post, id) in posts" :key="id" :posts.sync="posts"
                :user="currentuser" class="box">
                    <article  class="media">
                        <div  class="media-left">
                        <figure  class="image is-64x64">
                            <nuxt-link :to="`/user/${post.user.username}`"><img id="postuserimage" class="is-rounded" :src="post.user.avatar"></nuxt-link>
                        </figure>
                        <small v-if="post.user.Partner == true"  id="partner" class="button is-small is-rounded is-outlined"> <span>Partner</span></small>
                        </div>
                        <div id="barra" class="media-content">
                        <div class="content">     
                            <p>
                            <nuxt-link id="link" :to="`/user/${post.user.username}`"><strong>{{post.user.username}}</strong></nuxt-link>  <small>{{moment(post.created_at).fromNow()}}</small>  <small>
                                <button v-if="post.user_id == currentuser.id" @click="eliminarpost(post.id)" class="button is-small is-rounded is-text" id="menupost">Eliminar</button>
                                <span id="seguir"><i class="fas fa-star"></i></span>
                            </small>
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
                        :user="currentuser"
                        /> 
                        </div>
            </article>
        
            </div>
    
        </div> 
   

    </div>
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
        'currentuser'
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
                moment : moment,
                prueba: [],
                busy : false,
                limit: 8,
                results: [],
                placeholder: 'Publica algo',
                //contador
                maxCount: 300,
                remainingCount: 300,
                hasError: false,
                //bloqueodebotones
                cargandopost: false
            }
        },
        created(){
            this.$store.dispatch('getusuario')
            this.loadMore()
            
        },
        methods:{
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
                    this.loadMore()
                }).catch (e =>{
                    console.log(e)
                })
                }
            },
            
            async timeline(){
                this.posts = ['']
              await  this.$axios.get('users/timeline')
                .then(response => {
                    this.posts = (response.data.data)
                }).catch (e =>{
                    console.log(e)
                })
            },
            loadMore() {
                this.busy = true;   
                this.$axios.get("users/timeline").then(response => {
                    const append = response.data.data.slice (this.posts.length,this.posts.length + this.limit )
                    this.posts = this.posts.concat(append);
                    
                this.busy = false;
                }).catch( (err) => {
                    console.log(err)
                    this.busy = false;
                })
            },
            eliminarpost(id){
                this.$axios.delete('posts/destroy/'+id)
                .then(data =>{   

                })
            },
            
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
#contenedor_principal{
     overflow-x:hidden;
     overflow-y:hidden;
     -webkit-user-drag: none;
}

#postimage{
    height: 100% !important;
    background-repeat: no-repeat;
    background-color:black;
    background-position: center;
    background-size: auto 100% ;
}

#link{
    color:black
}
#contador {
    float: right !important;
}



</style>