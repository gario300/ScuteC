<template>
    <div id="contenedor_principal">
        <navbar
        :tema="tema"
        :tieneuntema="tieneuntema"
        />
        <menuinventario/>
        <div class="container">
            <div class="columns is-multiline">
                <div class="column" v-for="theme in themes">
                    <div class="box">
                    <theme
                    :currentuser="currentuser"
                    :navbr="theme.theme.estilonavbar"
                    :icons="theme.theme.estiloiconos"
                    :apariencia="theme.theme.estilopagina"
                    :text="theme.theme.colortexto"
                    :image1="theme.theme.background"
                    :image2="theme.theme.userbox"
                    :image3="theme.theme.postbox"
                    />
                   <p>
                       <span class="title is-5">{{theme.theme.nombretema}}</span> <br>
                       <span>by <nuxt-link :to="`/user/${theme.theme.creador}`">{{theme.theme.creador}}</nuxt-link></span>
                   </p>
                   <form v-if="tema.temanombre == theme.theme.nombretema" @submit.prevent="quitartema(tema.temaid)">
                        <button class="button is-warning is-fullwidth">
                            Quitar tema
                        </button>
                   </form>
                   <form v-else @submit.prevent="changetheme(theme.theme.id, tieneuntema)">
                        <button class="button is-success is-fullwidth">
                            Usar este tema
                        </button>
                   </form>
                   </div>
                   </div>
            </div>
            <infinite-loading @infinite="infinitehandler"></infinite-loading>
        </div>

    </div>
</template>

<script>
import navbar from '@/components/navbar'
import theme from '@/components/theme'
import menuinventario from '@/components/menuinventario'
import {mapState} from 'vuex'
import { async } from 'q'

    export default {
        middleware: ['auth'],
        components: {
            navbar, theme, menuinventario
        },
        computed: {
        ...mapState([
        'currentuser', 'tema', 'tieneuntema'
        ])
        },
        data(){
            return{
                themes:[],
                page: 0,
                cargando: false
            }
        },
        created(){
            this.$store.dispatch('getusuario')
            this.$store.dispatch('gettema')
        },
        methods:{
            async infinitehandler($state){
            this.page ++
              await this.$axios.get(`/theme/get/${this.page}`)
                .then(response => {
                    let lista = response.data.data.data
                    console.log(response.data.data.data)
                    if(lista.length){
                        this.themes = this.themes.concat(lista)
                        $state.loaded()
                    }else {
                        $state.complete()
                    }
                })

            },
            async changetheme(id, tieneuntema){
                if(tieneuntema == true){
                    this.$axios.put('/theme/cambiartema',{
                        temaid: id
                    })
                this.$router.go('/galeria')
                }
                await this.$axios.post('/theme/change', {
                temaid: id
                }).then(userresponse => {
                    console.log('Listo');
                    }).catch (e =>{
                    console.log(e)
                    })
                this.$router.go('/galeria')
            },
            async quitartema(id){
                this.$axios.delete('theme/quitar/'+id)
                .then(data =>{   
                this.$router.go('/galeria')
                })
            }
        }
    }
</script>

<style scoped>
.container{
    margin-top: 20px;
}
.column{
    display: flex;
    justify-content: center;
}

#contenedor_principal{
     overflow-x:hidden !important;
     overflow-y:hidden !important;
}

</style>