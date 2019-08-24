<template>
    <div>
        <div v-if="user.portada == null || portadapreview == true" id="portada" v-bind:style="{ 'background-image': 'url(' + portada + ')' }">
            <div id="contenedorportada" v-if="actualuser == true">
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
            <div id="contenedorportada" v-if="actualuser == true">
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
        <template v-if="actualuser == false">
            <div class="container">
                <div class="columns is-centered">
                    <div class="column is-12">     
                        <botones 
                        :user="user"
                        :usuarioactual="currentuser"
                        :yofollowing="yofollowing"
                        />
                    </div>
                </div>
            </div>
        </template>
            <profilebody
            :user="user"
            :posts="posts"
            :ufollowers="followers"
            :ufollowing="ufollowing"
            :ufavorites="ufavorites"
            :currentuser="currentuser"
            />
    </div>
</template>

<script>
import botones from '@/components/botonesseguir.vue';
import profilebody from '@/components/profilebody.vue';

    export default {
        name: 'userheader', 
        components : {
            botones, profilebody
        },
        props: {
            currentuser:{
                type: Object,
                required: true
            },
            user:{
                type: Object,
                required:true
            },
            yofollowing:{
                type: Array,
                required:true
            },
            followers:{
                type: Array,
                required:true
            },
            posts: {
                type: Object,
                required:true
            },
            ufollowing: {
                type: Array,
                required: true
            },
            actualuser: {
                type: Boolean,
                required: true
            },
            ufavorites: {
                type: Object,
                required:  true
            }
        },
        data(){
            return{
                file: {},
                portadapreview: false,
                portada: '',
                cargandoperfil: true
            }
        },
        created(){
            
        },
        mounted(){
            
        },
        methods: {
            onFileChange(e) {
                let files = e.target.files || e.dataTransfer.files;
                if (!files.length)
                return;
                this.createImage(files[0]);
                this.file = files[0];
                this.portadapreview = true;
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
                this.infousuario()
                this.portadapreview = false
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
figure img{
    width: 128px !important;
    height: 128px !important;
    min-width: 128px !important;
    min-height: 128px!important;
    max-width: 128px !important;
    max-height: 128px !important;
}

</style>