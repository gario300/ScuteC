<template>
    <div class="container">
        <div class="columns is-centered">
            <div class="column is-half"><h2 class="title is-4">
            ¿Eres nuevo? ¡Sube una imagen para tu perfil!
            </h2></div>
        </div>

        <div class="columns is-centered">
            <div class="column is-half">
                <form @submit.prevent="subirimagen(yo.id)" >
                    <div class="field">
                        <div class="file is-success is-fullwidth has-name is-boxed">
                            <label class="file-label">
                                <input class="file-input" type="file" name="resume" accept="image/png, image/jpeg" @change="onFileChange"> 
                                <span class="file-cta">
                                <span class="file-icon">
                                    <i class="fas fa-cloud-upload-alt"></i>
                                </span>
                                <span class="file-label">
                                    Selecciona una imagen
                                </span>
                                </span>
                            </label>
                         </div>
                    </div>
                    <div class="field">
                        <button v-show="mostrarsubir == true" class="button is-success">Subir e ir a Home!</button>
                    </div>
                </form>
            </div>
        </div>
        
        <template>
        <div class="columns is-centered">
            <div id="imagen" class="column is-half ">
                <figure v-show="mostrarsubir == true" class="image is-256x256">
                    <img class="is-rounded" :src="image"  alt="Image" >
                </figure>
            </div>
            </div>
            <div class="colums is-centered">
                <div class="column is-half">
                    <a href="#">Quizá después!</a>
                </div>
            </div>
        </template>

    </div>
</template>

<script>

    export default {
        middleware: ['auth'],
        data(){
            return{
                image:'',
                imagen: {},
                mostrarsubir: false,
                yo: {},
				file:{}
            }
        },
        created(){
            this.me()
        },

        methods:{
            //imagen
            onFileChange(e) {
                let files = e.target.files || e.dataTransfer.files;
                if (!files.length)
                return;
                this.createImage(files[0]);
				this.file = files[0];
                this.mostrarsubir = true;
            },
            createImage(file) {
                let image = new Image();
                let reader = new FileReader();
                let vm = this;
                reader.onload = (e) => {
					vm.image = e.target.result;
					vm.imagen = e.target.result;
                };
                reader.readAsDataURL(file);
            },
            
            async subirimagen(userId){
                console.log("Uploading imamge");
				await this.$axios.post('/account/updateProfilePic', {
				  avatar: this.image,
				  id: userId
                })
				this.$router.push('home')
			},
			//Metodo Me
            me(){
                this.$axios.get('/account/me')
                    .then(response => {
                        this.yo = response.data.data;
                    })
            },

        //metodo put
    }
}
</script>

<style scoped>
.file-label{
    text-align: center !important;
}
.image img{
    width: 256px !important;
    height: 256px !important;
    max-width: 256px !important;
    max-height: 256px !important;
}

#imagen{
    display:flex !important;
    justify-content: center !important;
}

h2{
    text-align: center;
}


.field{
    display:flex !important;
    justify-content: center !important;
}





</style>