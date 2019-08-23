<template>
    <div class="container">

        <div class="columns is-centered">
            <div class="column is-half"><h2 class="title is-4">
                ¡Actualiza tu perfil!
            </h2></div>
        </div>

        <div class="columns is-centered">
            <div class="column is-half">
                <form @submit.prevent="subirimagen()" >
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
                
                    <template v-if="cargando == true">
                        <div class="button is-loading">

                        </div>
                    </template>

                    <template  v-else>
                
                    <figure v-if="useravatar == false && mostrarsubir == true " class="image is-256x256">
                        <img class="is-rounded" :src="image"  alt="Image" >
                    </figure>
                
                    <figure v-if="useravatar == true && mostrarsubir == false" class="image is-256x256">
                        <img class="is-rounded" :src="yo.avatar"  alt="Image" >
                    </figure>
                </template>
            </div>
            </div>

            <div class="columns is-centered">
                <div id="imagen" class="column is-12">
                <p v-if="errorsubida == true" class="help is-danger">hola mundo</p>
                </div>
            </div>

            <div class="columns is-centered">
                <div class="column is-half" id="home">
                    <nuxt-link class="button is-light" to="/home">Ir a home sin guardar</nuxt-link> 
                </div>
            </div>
        </template>
        <div class="columns is-centered is-mobile">
            <div id="home" class="column is-half">
                <h3 class="title is-4">Cuentanos algo sobre ti</h3>
            </div>
        </div>
        <div class="columns">
            <div class="column is-12">
                <form @submit.prevent="updateinfo">
                <div class="field">
                    <div class="control"> 
                        <label class="label">País</label>
                        <div class="select is-success is-large">
                            <select v-model="location">
                                <option value=""></option>
                                <option value="Argentina">Argentina</option>
                                <option value="Mexico">Mexico</option>
                                <option value="Bolivia">Bolivia</option>
                                <option value="Brazil">Brazil</option>
                                <option value="Chile">Chile</option>
                                <option value="Colombia">Colombia</option>
                                <option value="Ecuador">Ecuador</option>
                                <option value="Guyana">Guyana</option>
                                <option value="Paraguay">Paraguay</option>
                                <option value="Peru">Peru</option>
                                <option value="Suriname">Suriname</option>
                                <option value="Uruguay">Uruguay</option>
                                <option value="Venezuela">Venezuela</option>
                            </select>
                            </div>
                    </div>
                </div>
                <div class="field">
                    <div class="control">
                        <label class="label">Cumpleaños</label>
                        <input type="date" value="YYYY-MM-DD"  v-model="edad" class="input is-success is-normal">
                        
                    </div>
                </div>
                <div class="field">
                    <div class="control">
                        <label for="" class="label">Describete</label>
                        <textarea v-model="bio" :placeholder="yo.bio" class="textarea is-success is-Normal"></textarea>
                        </div>
                </div>
                <div class="field">
                    <div class="control">
                     <button class="button is-success is-full-width">Actualizar e ir a Home</button>
                     <p class="help is-danger" v-if="error ==true">Ninguno de estos campos <br> puede estar vacio</p>
                    </div>
                </div>
            </form>
            </div>
        </div>

    </div>
</template>

<script>

    export default {
        middleware: ['auth'],
        data(){
            return{
                image:'',
                location:'',
                edad: [] ,
                bio: '',
                imagen: {},
                mostrarsubir: false,
                yo: {},
                file:{},
                useravatar: true,
                cargando: true,
                error : false,
                errorsubida: false
            }
        },
        beforeCreate(){
        },
        created(){
            this.me()
        },
        mounted(){
            setTimeout(() => {
            this.pantalladecarga()
             }, 2000)

        },

        methods:{
            pantalladecarga(){
                this.cargando = false
            },
            //imagen
            onFileChange(e) {
                let files = e.target.files || e.dataTransfer.files;
                if (!files.length)
                return;
                this.createImage(files[0]);
                this.file = files[0];
                this.useravatar = false;
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
            
            async subirimagen(){
                console.log("Uploading imamge");
				await this.$axios.put('/account/updateProfilePic', {
                  avatar: this.image
                })
                .catch (error => {
                     if(error = 413) {
                        console.log(error)
                        this.errorsubida = true
                     } else {
                         this.$router.push('home')
                     }
                })
            },
            
            async updateinfo (){
                if (this.location == null || this.edad == null || this.bio == null) {
                    this.error = true
                }else{
                await this.$axios.put('/account/update_profile', {
                  location: this.location,
                  edad: this.edad,
                  bio:this.bio
                })
                this.$router.push('home')
                }
            },
			//Metodo Me
            me(){
                this.$axios.get('/account/me')
                    .then(response => {
                        this.yo = response.data.data;
                        this.location = response.data.data.location
                        this.edad = response.data.data.edad
                        this.bio = response.data.data.bio

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


#nomostrar{
    display:none;
}
#home{
    text-align: center;
}

</style>