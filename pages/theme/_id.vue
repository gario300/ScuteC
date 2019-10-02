<template>
    <div>
        <navbar
        :tema="tema"
        :tieneuntema="tieneuntema"
        />
        <div class="columns">
            <div id="center" class="column is-12">
                <theme id="prueba"
                :currentuser="currentuser"
                :navbr="theme.estilonavbar"
                :icons="theme.estiloiconos"
                :apariencia="theme.estilopagina"
                :text="theme.estilotexto"
                :image1="theme.background"
                :image2="theme.userbox"
                :image3="theme.postbox"
                />
            </div>
        </div>
        <div class="columns">
            <div class="column is-12" id="center">
                <p>
                    <span class="title is-4">{{theme.nombretema}}</span> <br>
                    <span>by <nuxt-link :to="`/user/${theme.creador}`">{{theme.creador}}</nuxt-link></span>
                    <span>
                        <strong>
                            <img width="16" height="16"
                            src="https://res.cloudinary.com/scute/image/upload/v1566231592/logros/monedasandi_msautl.png" alt="">
                            {{theme.precio}} &nbsp; &nbsp;
                        </strong>
                    </span> <br>
                    <form v-if="!ismytheme" @submit.prevent="comprartemapuntos(theme.nombretema, theme.creador, theme.id)">
                    
                    <button :disabled="buy"
                     :class="[ tieneuntema ? tema.buttonfullwidth : 'button is-success is-large' ]">Comprar</button>
            
                    </form>
                    <span 
                    :class="[ tieneuntema ? tema.estilohelp : 'help is-success' ]"
                    v-else>
                        Tu ya tienes este tema
                    </span> 
                </p>
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
        asyncData ({ store }) {
            store.dispatch('getusuario')
            store.dispatch('gettema')
            store.dispatch('temas')
        },
        components: {
            navbar, theme
        },
        computed: {
        ...mapState([
            'currentuser', 'tema', 'tieneuntema', 'userthemes'
        ]),
        ismytheme() {
            for (const mitema of this.users) {
                (console.log)
                if (mitema.id == this.currentuser.id) {
                    return true
                }
            } 
            return false  
        }
        },
        data(){
            return{
                theme: {},
                users:[],
                buy: true

            }
        },
        created(){
            this.gettema()
        },
        methods:{
            async gettema(){
                this.$axios.get(`/tienda/singletheme/${this.$route.params.id}`)
                .then(response =>{
                    this.theme = response.data.data
                    this.users = response.data.data.users
                this.buy = false
                })

        },
        async comprartemapuntos(temanombre, usercreador, temaid){
                    this.$axios.post('/tienda/comprartemapuntos',{
                        nombretema: temanombre,
                        nombrecreador : usercreador
                    })
                    let respuesta = 'Acaba de comprar uno de tus temas'
                    await this.$axios.post(`/notif/newnoti`,{
                        creadorname: usercreador,
                        themeid : temaid,
                        notification_type : respuesta
                    })
                }
        
    }
}
</script>

<style scoped>
#center{
   display: flex;
   justify-content:center;
}

</style>