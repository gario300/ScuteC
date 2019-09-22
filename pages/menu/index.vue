<template>
    <div id="contenedorprincipal">
        <navbar
        :tema="tema"
        :mitema="mitema"/>
        <div id="menu" class="columns is-centered">
            <div class="column is-12">
                <div class="list is-hoverable">
                    <ul>
                    <a id="Comunidad" class="list-item is-active">
                        Comunidad
                    </a>
                    <li class="list-item">
                        <Strong>Puntos Sandía</Strong>
                        <figure class="image is-24x24">
                            <img src="https://res.cloudinary.com/scute/image/upload/v1566231592/logros/monedasandi_msautl.png">
                        </figure>
                        <strong id="contadordepuntos">{{currentuser.puntos}}</strong>
                    </li>
                    <nuxt-link to="/user/inventario" class="list-item">
                        <strong>Mi inventario</strong>
                    </nuxt-link>
                    <li class="list-item">
                        <strong>
                            Tienda
                        </strong>
                    </li>
                    <nuxt-link to="/themegenerator" class="list-item">
                        <strong>Creador de Temas</strong>
                    </nuxt-link>
                    <a id="Ayuda" class="list-item is-active">
                        Ayuda
                    </a>
                    <li class="list-item">
                        <strong>
                            Terminos y Condiciones
                        </strong>
                    </li>
                    <li class="list-item">
                        <strong>
                            Errores y Sugerencias
                        </strong>
                    </li>
                    <a id="Configuracion" class="list-item is-active">
                        Configuración
                    </a>
                    <li class="list-item">
                        <strong>
                            Usuarios Bloqueados
                        </strong>
                    </li>
                    <nuxt-link to="putuser" class="list-item">
                        <strong>
                        Configuración de cuenta
                        </strong>
                    </nuxt-link>
                    <li class="list-item">
                        <strong>
                            Configuración de Pago
                        </strong>
                    </li>
                    <li class="list-item">
                        <strong>
                            Cambio de contraseña
                        </strong>
                    </li>
                    <li class="list-item">
                        <strong>
                           <a @click="logout">Salir de la cuenta</a> 
                        </strong>
                    </li>
                    </ul>

                </div>
                
            </div>
        </div>

    </div>
</template>

<script>

import navbar from '@/components/navbar'
import {mapState} from 'vuex'
    export default {
        middleware: ['auth'],
        name:'menu',
        components: {
            navbar,
        },
        computed:{
        ...mapState([
        'currentuser', 'tema', 'tieneuntema'
        ])
        },
        created(){
            this.$store.dispatch('getusuario')
            this.$store.dispatch('gettema')
        },
        data(){
            return {
                yo: {}
            }
        },
        methods:{
            async logout(){
            await this.$auth.logout()
            },
        }
        
    }
</script>

<style scoped>
#Comunidad {
    background-color: #973ea3 !important; 
}
li figure, #contadordepuntos {
    float: right;
}
#Configuracion{
    background-color: #e6ef2d !important;
}
#contenedorprincipal{
     overflow-x:hidden !important;
     overflow-y:hidden !important;
}

#menu{
    position:relative;
    margin-top: 0px;
    bottom: 13px;
}

</style>