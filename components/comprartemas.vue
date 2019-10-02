<template>
    <div id="contenedor_principal">
        <div class="container">
            <div class="columns is-multiline">
                <div class="column" v-for="theme in themes">
                    <div class="box">
                    <theme
                    :currentuser="currentuser"
                    :navbr="theme.estilonavbar"
                    :icons="theme.estiloiconos"
                    :apariencia="theme.estilopagina"
                    :text="theme.colortexto"
                    :image1="theme.background"
                    :image2="theme.userbox"
                    :image3="theme.postbox"
                    />
                   <p>
                       <span class="title is-5">{{theme.nombretema}}</span> <br>
                       <span>by <nuxt-link :to="`/user/${theme.creador}`">{{theme.creador}}</nuxt-link></span> <br>
                       <span>
                            <strong>
                                <img width="16" height="16"
                                src="https://res.cloudinary.com/scute/image/upload/v1566231592/logros/monedasandi_msautl.png" alt="">
                                {{theme.precio}}
                            </strong>
                       </span>
                   </p>
                   <p>
                   </p>
                   
                    <nuxt-link :to="`/theme/${theme.nombretema}`"
                    :class="[ tieneuntema ? tema.buttonfullwidth : 'button is-success is-fullwidth' ]">
                    Ver tema
                    </nuxt-link>
                   </div>
                   </div>
            </div>
            <infinite-loading @infinite="infinitehandler"></infinite-loading>
        </div>

    </div>
</template>

<script>
import theme from '@/components/theme'

    export default {
        name: 'comprartemas'
        
        ,
        components: {
             theme
        },
        props:{
            currentuser:{
                type: Object,
                required: true
            },
            tema: {
                type:Object,
                required: true
            },
            tieneuntema:{
                type:Boolean,
                required: true
            }
        },
        computed:{
        },
        data(){
            return{
                themes:[],
                page: 0,
                cargando: false,          
            }
        },
        methods:{
            async infinitehandler($state){ 
            this.page ++
              await this.$axios.get(`/tienda/temas/${this.page}`)
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
#prueba{
    list-style: none;
    list-style-image:none;
}

</style>