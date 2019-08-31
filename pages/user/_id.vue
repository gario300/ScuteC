<template>
    <div id="contenedor_principal">
        <navbar></navbar>
        <userheader
        :currentuser="currentuser"
        :yofollowing="following"
        :user="user"
        :posts="posts"
        :followers="ufollowers"
        :ufollowing="ufollowings"
        :actualuser="actualuser"
        :ufavorites="favorites"
        :click="click"
        />
        <template v-if="currentuser.id == user.id && click.postss == true">
        <div id="textbox" class="container">
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
                        <form @submit.prevent="post(currentuser.id)">
                            <div class="field has-addons">
                                <div class="control">
                                    <input class="input is-large is-success" type="text" v-on:keyup="countdown" v-model="textbox" placeholder="Escribe algo rapido...">                                   
                                </div>
                                <div class="field">
                                    <div class="file is-right is-success is-large" v-if="cargandopost == false">
                                        <label class="file-label">
                                            <input class="file-input" type="file" name="postimage" accept="image/png, image/jpeg" @change="onFileChange2">
                                            <span class="file-cta">
                                                <span class="file-icon">
                                                    <i class="fas fa-images"></i>
                                                </span>
                                            </span>
                                        </label>
                                    </div>   

                                    <div class="file is-right is-success is-large" v-else>
                                        <label class="file-label">
                                            <span class="file-cta">
                                                <span class="file-icon">
                                                    <i class="fas fa-images"></i>
                                                </span>
                                            </span>
                                        </label>
                                    </div>

                                </div>
                            </div>
                            <button v-if="cargandopost == false" class="button is-success is-fullwidth">Postear</button>
                            <div v-else class="button is-success is-fullwidth is-loading"></div>
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

        <posts v-if="click.postss == true 
        && click.followers == false 
        && click.following == false
        && click.favorites == false"
        :currentuser="currentuser"
        :posts="posts"
        :actualuser="actualuser"
        />
        <followers v-if="click.followers == true 
        && click.postss == false 
        && click.following == false
        && click.favorites == false"
        :followers="ufollowers"
        :currentuser="currentuser"
        />
        <following v-if="click.following == true 
        && click.postss == false 
        && click.followers == false
        && click.favorites == false"
        :ufollowings="ufollowings"
        :currentuser="currentuser"
        />
        <favorites v-if="click.favorites == true 
        && click.postss == false 
        && click.followers == false
        && click.following == false"
        :ufavorites="favorites"
        :currentuser="currentuser"
        />
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
        'currentuser', 'following'
        ])
        },
        data(){
            return{
                user: {},
                ufollowers: [],
                ufollowings: [],
                favorites: [],
                posts: [],
                actualuser: false,
                //posteo
                postimage: '' ,
                postfile: {} ,
                textbox:'',
                postpreview: false,
                cargandopost: false,
                //contador
                maxCount: 300,
                remainingCount: 300,
                hasError: false,
                //menu
                click:{
                postss:true, 
                followers: false, 
                following: false, 
                favorites: false}
            }
        },
        created(){
            this.$store.dispatch('getusuario')
            this.userdata()
        },
        methods:{
                countdown: function() {
                    this.remainingCount = this.maxCount - this.textbox.length;
                    this.hasError = this.remainingCount < 0;
                    },
                async userdata() {
                    await this.$axios.get(`account/${this.$route.params.id}`)
                    .then(response => {
                        this.user = response.data.data
                        this.ufollowers = response.data.data.followers
                        this.posts=response.data.data.posts.reverse()
                        this.ufollowings=response.data.data.following
                        this.favorites = response.data.data.favorites.reverse()

                        if(this.user.id == this.currentuser.id){
                        this.actualuser =  true
                        }
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
                    this.userdata()
                }).catch (e =>{
                    console.log(e)
                })
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


</style>