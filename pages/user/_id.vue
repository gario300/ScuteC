<template>
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
        <div class="container">
            <div class="columns">
                <div class="column">

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import navbar from '../../components/navbar'
import favorite from '../../components/favorite'
let moment = require ('moment')

    export default {
        middleware: ['auth'],
        components:{
            navbar, favorite
        },
        data(){
            return{
                yo:{},
                user:{},
                posts:{},
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
}

</style>