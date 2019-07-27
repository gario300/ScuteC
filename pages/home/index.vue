<template>
    <div>
        <navbar></navbar>


        <!-- Userbox -->
        <div class="container">
            <div class="columns is-centered ">
                <div class="column is-half">                    
                    <div class="box">
                        <article class="media">
                        <div class="media-left">
                                <figure class="image is-256x256">
                                    <img id="avatar" class="is-rounded" :src="`${yo.avatar}`">
                                 </figure>
                        </div>
                        <div class="mediacontent">
                            <div class="content">
                                <form>
                                    <div class="columns is-centered is-mobile">
                                        <div class="column is-9">
                                            <textarea class="textarea is-success is-large" placeholder="Publica algo..."></textarea>
                                        </div>
                                        <div class="column is-3">
                                            
                                            <div class="file is-success is-medium">
                                                <label class="file-label">
                                                    <input class="file-input" type="file" name="image" accept="image/png, image/jpeg" @change="onFileChange">
                                                    <span class="file-cta">
                                                        <i class="far fa-images"></i>
                                                    </span>
                                                </label>
                                            </div>
                                           
                                            <button id="post" class="button is-normal is-success">Post!</button>
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
                                        <figure class="image">
                                            <img id="imagensubir" src="#"  alt="Image" :src="image">
                                        </figure>
                                    </div>
                                </div>
                            </div>
                        </template>
                    
                    </div>
                </div>
            </div>
            
        </div>
        <!-- Userbox -->
        

    </div>
</template>

<script>
import navbar from '../../components/navbar'
import userbox from '../../components/userbox'
    
    export default {
        middleware: ['auth'],
        components:{
            navbar, userbox
        },
        data(){
            return{
                yo:{},
                image:'',
                imagepreview : false
            }
        },
        created(){
            this.me()
        },
        methods:{
            me(){
                this.$axios.get('/account/me')
                    .then(response => {
                        this.yo = response.data.data;
                        console.log(this.yo)
                    })
            },
            //imagen
            onFileChange(e) {
                let files = e.target.files || e.dataTransfer.files;
                if (!files.length)
                return;
                this.createImage(files[0]);
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

#cajaimagen{
    margin-top: 10px;
}
#quitar{
    margin-bottom: 10px;
}


</style>