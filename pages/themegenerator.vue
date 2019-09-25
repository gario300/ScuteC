<template>
    <div id="contenedor_principal" v-bind:style="{ 'background-image': 'url(' + tema.background + ')' }">
        <navbar
        :tema="tema"
        :tieneuntema="tieneuntema"
        />
        <div class="container">
            <div class="columns">
                <div class="column is-3">
                   <theme
                   :currentuser="currentuser"
                   :navbr="navbr"
                   :icons="icons"
                   :apariencia="apariencia"
                   :text="text"
                   :image1="image1"
                   :image2="image2"
                   :image3="image3"
                   />
                   <form @submit.prevent="newtheme">
                       <button
                        :disabled="cargando"
                        :class="[ tieneuntema ? tema.buttons : 'button is-success' ]">Subir tema</button>
                   </form>
                </div>
                <div class="column is-3 is-offset-2">
                    <div class="columns">
                        <div class="column">
                            <h5 class="title is-7"
                            :class="[ tieneuntema ? tema.estilotexto : 'has-text-black' ]">
                                Escoge la apariencia de tu navbar</h5>
                            <div 
                            :class="[ tieneuntema ? tema.select : 'select is-rounded is-success' ]">
                            <select v-model="navbr">
                                <option>NavS</option>
                                <option>NavP</option>
                                <option>NavV</option>
                                <option>NavB</option>
                                <option>NavD</option>
                                <option>NavW</option>
                            </select>
                            </div>
                            <h5 class="title is-7"
                            :class="[ tieneuntema ? tema.estilotexto : 'has-text-black' ]">
                                Escoge la apariencia de la pagina</h5>
                            <div
                            :class="[ tieneuntema ? tema.select : 'select is-rounded is-success' ]">
                            <select v-model="apariencia">
                                <option>success</option>
                                <option>primary</option>
                                <option>black</option>
                                <option>danger</option>
                                <option>warning</option>
                            </select>
                            </div>
                            <h5 class="title is-7"
                            :class="[ tieneuntema ? tema.estilotexto : 'has-text-black' ]">
                                Sube la imagen de fondo</h5>
                            <div class="field">
                                <div :class="[ tieneuntema ? tema.file : 'file is-success' ]">
                                    <label class="file-label">
                                    <input class="file-input" type="file" name="resume" accept="image/png, image/jpeg" @change="onfilechange1">
                                    <span class="file-cta">
                                        <span class="file-icon">
                                        <i class="fas fa-upload"></i>
                                        </span>
                                        <span class="file-label">
                                        Fondo
                                        </span>
                                    </span>
                                    </label>
                                </div>
                            </div>
                            <h5 class="title is-7"
                            :class="[ tieneuntema ? tema.estilotexto : 'has-text-black' ]">
                                El fondo de la caja de post</h5>
                            <div class="field">
                                <div :class="[ tieneuntema ? tema.file : 'file is-success' ]">
                                    <label class="file-label">
                                    <input class="file-input" type="file" name="resume" accept="image/png, image/jpeg" @change="onfilechange3">
                                    <span class="file-cta">
                                        <span class="file-icon">
                                        <i class="fas fa-upload"></i>
                                        </span>
                                        <span class="file-label">
                                        Post
                                        </span>
                                    </span>
                                    </label>
                                </div>
                            </div>
                            <h5 class="title is-7"
                            :class="[ tieneuntema ? tema.estilotexto : 'has-text-black' ]">
                                ¿Quieres cobrar en puntos o dinero real?</h5>
                            <div 
                            :class="[ tieneuntema ? tema.select : 'select is-rounded is-success' ]">
                            <select v-model="pago">
                                <option>Puntos</option>
                            </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="column is-3">
                    <h5 class="title is-7"
                    :class="[ tieneuntema ? tema.estilotexto : 'has-text-black' ]">
                        Escoge el color de los iconos</h5>
                    <div 
                    :class="[ tieneuntema ? tema.select : 'select is-rounded is-success' ]">
                        <select v-model="icons">
                            <option>white</option>
                            <option>green</option>
                            <option>gray</option>
                            <option>black</option>
                        </select>
                    </div>
                    <h5 class="title is-7"
                    :class="[ tieneuntema ? tema.estilotexto : 'has-text-black' ]">
                        Escoge el color del texto</h5>
                    <div 
                    :class="[ tieneuntema ? tema.select : 'select is-rounded is-success' ]">
                        <select v-model="text">
                            <option>white</option>
                            <option>black</option>
                            <option>danger</option>
                            <option>success</option>
                            <option>dark</option>
                        </select>
                    </div>
                    <h5 class="title is-7"
                    :class="[ tieneuntema ? tema.estilotexto : 'has-text-black' ]">
                        El fondo de la caja de texto</h5>
                    <div class="field">
                        <div :class="[ tieneuntema ? tema.file : 'file is-success' ]">
                            <label class="file-label">
                                <input class="file-input" type="file" name="resume" accept="image/png, image/jpeg"  @change="onfilechange2">
                                <span class="file-cta">
                                    <span class="file-icon">
                                        <i class="fas fa-upload"></i>
                                    </span>
                                    <span class="file-label">
                                        Caja de texto
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>
                    <h5 class="title is-7">¡Dale un nombre a tu tema!</h5>
                    <div class="field">
                        <input type="text" v-model="name" :class="[ tieneuntema ? tema.inputfullwidth : 'input is-success is-fullwidth' ]">
                    </div>
                    <h5 class="title is-7">¿Cuanto quieres cobrar? </h5>
                            <div 
                            :class="[ tieneuntema ? tema.select : 'select is-rounded is-success' ]">
                            <select v-model="precio">
                                <option>100</option>
                                <option>300</option>
                                <option>500</option>
                            </select>
                            </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import navbar from '@/components/navbar'
import theme from '@/components/theme'
import {mapState} from 'vuex'
    export default {
        middleware: ['auth'],
        components: {
            navbar, theme
        },
        computed: {
        ...mapState([
        'currentuser', 'tema', 'tieneuntema'
        ])
        },
        created(){
            this.$store.dispatch('getusuario')
            this.$store.dispatch('gettema')
        },
        data(){
            return{
                name:'',
                navbr:'NavS',
                icons:'green',
                apariencia: 'success',
                text:'black',
                pago:'',
                precio:0,
                image1:'',
                file1:{},
                image2:'',
                file2:{},
                image3:'',
                file3:{},
                cargando :false

            }
        },
        created(){
            this.$store.dispatch('getusuario')
            this.$store.dispatch('gettema')
            
        },
        methods:{
            onfilechange1(e){
                let files = e.target.files || e.dataTransfer.files;
                if (!files.length)
                return;
                this.createImage1(files[0]);
                this.file1 = files[0];
            },
            
            createImage1(file1) {
                let image = new Image();
                let reader = new FileReader();
                let vm = this;

                reader.onload = (e) => {
                    vm.image1 = e.target.result;
                };
                reader.readAsDataURL(file1);
                },
                
            onfilechange2(e){
                    let files = e.target.files || e.dataTransfer.files;
                    if (!files.length)
                    return;
                    this.createImage2(files[0]);
                    this.file2 = files[0];
                },
                
                createImage2(file2) {
                    let image = new Image();
                    let reader = new FileReader();
                    let vm = this;

                    reader.onload = (e) => {
                        vm.image2 = e.target.result;
                    };
                    reader.readAsDataURL(file2);
                    },
                    onfilechange3(e){
                    let files = e.target.files || e.dataTransfer.files;
                    if (!files.length)
                    return;
                    this.createImage3(files[0]);
                    this.file3 = files[0];
                },
                
                createImage3(file3) {
                    let image = new Image();
                    let reader = new FileReader();
                    let vm = this;

                    reader.onload = (e) => {
                        vm.image3 = e.target.result;
                    };
                    reader.readAsDataURL(file3);
                    },
                
                async newtheme(){
                    this.cargando = true
                    await this.$axios.post('/theme/new', {
                        nombretema: this.name,
                        estilonavbar: this.navbr,
                        estiloiconos: this.icons,
                        estilopagina: this.apariencia,
                        colortexto: this.text,
                        background: this.image1,
                        userbox: this.image2,
                        postbox: this.image3,
                        moneda: this.pago,
                        precio: this.precio
                    }).then(userresponse => {
                        console.log('Listo');
                        this.$router.push('/user/inventario')
                        }).catch (e =>{
                            console.log(e)
                        })
                }

        }
    }

        
        
</script>

<style scoped>






h5{
    margin-top: 10px;
}
#contenedor_principal{
     overflow-x:hidden !important;
     overflow-y:hidden !important;
     height: 100%;
}
@media (min-width: 720px) {
  #contenedor_principal{
      height: 100vh ;
  }
}


</style>