<template>
    <!-- Portada -->
    <div>
        <navbar></navbar>
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
            <div id="caja">
                <figure class="image is-128x128">
                    <img class="is-rounded" :src="user.avatar" alt="">
                </figure>
                </div>  
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
                    <img class="is-rounded" :src="user.avatar" alt="">
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
                        <form>
                            <div class="field has-addons">
                                <div class="control">
                                    <input class="input is-large is-success" type="text" placeholder="Escribe algo rapido...">
                                </div>
                                <div class="field">
                                    <div class="file is-right is-success is-large">
                                        <label class="file-label">
                                            <input class="file-input" type="file" name="resume">
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
                    </div>
                </div>
            </div>
        </div>
        </template>
    <!-- textbox -->
    
    <!-- Body -->
    <profilebody
    :posts="posts"
    :user="user"
    :currentuser="yo"
    /> 

    </div>
</template>

<script>
import navbar from '@/components/navbar'
import favorite from '@/components/favorite'
import profilebody from '@/components/profilebody'
let moment = require ('moment')

    export default {
        middleware: ['auth'],
        name: 'userheader',
        components:{
            navbar, favorite, profilebody
        },
        data(){
            return{
                yo:{},
                user:{},
                posts:[],
                moment:moment,
                portada:'',
                portadapreview:false,
                file:{},
                currentuser: false
            }
        },
        created(){
            this.data()
        },
        methods:{
            async data(username){
                await this.$axios.get('/account/me')
                    .then(response => {
                        this.yo = response.data.data;
                    })
                await this.$axios.get(`account/${this.$route.params.id}`)
                    .then(response => {
                    this.user = response.data.data
                    this.posts = response.data.data.posts.reverse()
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
    margin: 0px;
    height: 0px;
    top:10px;
    opacity: .50;
}
#caja{
    display: flex;
    justify-content: center;
    position: relative;
    top: 180px; 
}
#caja2{
    display: flex;
    justify-content: center;
    position: relative;
    top: 10px;
    margin-bottom: 15px;
}

</style>