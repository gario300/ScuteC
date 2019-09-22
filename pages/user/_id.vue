<template>
    <div id="contenedor_principal" v-bind:style="{ 'background-image': 'url(' + tema.background + ')' }">
        <navbar
        :tieneuntema="tieneuntema"
        :tema="tema"
        />
        <template v-if="cargando == true">
            <div class="container">
                <div class="columns">
                    <div class="column is-12">
                        <div class="button is-white is-fullwidth is-loading">
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <template  v-if="cargando == false">
        <userheader ref="portada"
        :currentuser="currentuser"
        :yofollowing="following"
        :user="user"
        :posts="pests"
        :followers="ufollowers"
        :ufollowing="ufollowings"
        :actualuser="actualuser"
        :ufavorites="favorites"
        :click="click"
        :tema="tema"
        :tieneuntema="tieneuntema"
        />
        <template v-if="currentuser.id == user.id && click.postss == true">
        <div id="textbox" class="container">
            <div class="columns is-centered is-mobile">
                <div class="column is-narrow">
                    <div class="box" v-bind:style="{ 'background-image': 'url(' + tema.userbox + ')' }">
                        <div id="asd" class="columns is-gapless is-mobile">
                            <div class="column is-12">
                                <span id="contador" :class="[ tieneuntema ? tema.estilohelp : 'help is-success' ]">
                                    {{remainingCount}}
                                 </span>
                            </div>
                        </div>
                        <form @submit.prevent="post(currentuser.id)">
                            <div class="field has-addons">
                                <div class="control">
                                    <textarea :class="[ tieneuntema ? tema.estilotextarea : 'textarea is-large is-success' ]" type="text" v-on:keyup="countdown" v-model="textbox" :placeholder="placeholder">                                   
                                    </textarea>
                                </div>
                                <div class="field">
                                    <div id="prueba" :class="[ tieneuntema ? tema.filesmall : 'file is-success is-small' ]">
                                        <label class="file-label">
                                            <input :disabled="cargandopost" class="file-input" type="file" name="postimage" accept="image/png, image/jpeg" @change="onFileChange2">
                                            <span class="file-cta">
                                                <span class="file-icon">
                                                    <i class="fas fa-images"></i>
                                                </span>
                                            </span>
                                        </label>
                                        </div> 
                                        
                                </div>
                            </div>
                            <button :disabled="cargandopost" :class="[ tieneuntema ? tema.buttonfullwidth : 'button is-success is-fullwidth' ]">Post</button>
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

        <posts ref="load" v-if="click.postss == true 
        && click.followers == false 
        && click.following == false
        && click.favorites == false"
        :id="id"
        :currentuser="currentuser"
        :actualuser="actualuser"
        :tema="tema"
        :tieneuntema="tieneuntema"
        />
        <followers v-if="click.followers == true 
        && click.postss == false 
        && click.following == false
        && click.favorites == false"
        :followers="ufollowers"
        :currentuser="currentuser"
        :tema="tema"
        :tieneuntema="tema"
        />
        <following v-if="click.following == true 
        && click.postss == false 
        && click.followers == false
        && click.favorites == false"
        :ufollowings="ufollowings"
        :currentuser="currentuser"
        :tema="tema"
        :tieneuntema="tema"
        />
        <favorites v-if="click.favorites == true 
        && click.postss == false 
        && click.followers == false
        && click.following == false"
        :ufavorites="favorites"
        :currentuser="currentuser"
        :tema="tema"
        :tieneuntema="tieneuntema"
        />
    </template>
    </div>
</template>

<script>
import {mapState} from 'vuex';
import navbar from '@/components/navbar.vue';
import userheader from '@/components/userheader.vue'
import posts from '@/components/posts.vue'
import followers from '@/components/followers.vue'
import following from '@/components/following.vue'
import favorites from '@/components/favorites.vue'

    export default {
        components: {
            navbar, userheader,posts, followers,following, favorites
        },
        computed : {
            ...mapState([
        'currentuser', 'following', 'tema', 'tieneuntema'
        ])
        },
        data(){
            return{
                user: {},
                ufollowers: [],
                ufollowings: [],
                favorites: [],
                pests: [],
                actualuser: false,
                //posteo
                postimage: '' ,
                postfile: {} ,
                textbox:'',
                postpreview: false,
                cargandopost: false,
                placeholder: 'Escribe algo rapido',
                //contador
                maxCount: 300,
                remainingCount: 300,
                hasError: false,
                //menu
                click:{
                postss:true, 
                followers: false, 
                following: false, 
                favorites: false},
                cargando: true,
                id: 0,
            }
        },
        created(){

                this.$store.dispatch('getusuario')
                this.userdata();
        },
        mounted(){
            this.$store.dispatch('gettema')

        },
        methods:{
                countdown: function() {
                    this.remainingCount = this.maxCount - this.textbox.length;
                    this.hasError = this.remainingCount < 0;
                    },
                async userdata() {
                    await this.$axios.get(`account/${this.$route.params.id}`)
                    .then(response => {
                        this.pests = response.data.data.posts
                        this.id =response.data.data.id
                        this.user = response.data.data
                        this.ufollowers = response.data.data.followers
                        this.ufollowings=response.data.data.following
                        this.favorites = response.data.data.favorites.reverse()

                        if(this.user.id == this.currentuser.id){
                        this.actualuser =  true
                        }
                        this.cargando = false
                    })
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
                
                post (){
                this.cargandopost = true
                if(this.textbox.length == 0){
                    this.placeholder = 'No puede estar vacio'
                    this.cargandopost = false
                } else {
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
                    this.cargandopost = false
                    this.$refs.load.page = 0;
                    this.$refs.load.posts= [];
                    this.$refs.load.infinitehandler();
                }).catch (e =>{
                    console.log(e)
                })
                }
            }
            
        
    }
}
</script>

<style scoped>
#contador {
    float:right;
}
#asd{
    margin: 0px !important
}
#textbox{
    margin-bottom: 15px;
}
#contenedor_principal{
     overflow-x:hidden !important;
     overflow-y:hidden !important;
}

    
figure img {
    position: relative;
    z-index: 2;
}

textarea{
    max-height: 120px !important;
}


</style>