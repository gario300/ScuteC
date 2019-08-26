<template>
    <div>
        <navbar></navbar>
        <div class="columns is-centered">
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
                        <strong id="contadordepuntos">{{yo.puntos}}</strong>
                    </li>
                    <li class="list-item">
                        <strong>Logros</strong>
                    </li>
                    <li class="list-item">
                        <strong>
                            Tienda de Puntos
                        </strong>
                    </li>
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
    export default {
        middleware: ['auth'],
        name:'menu',
        components: {
            navbar,
        },
        data(){
            return {
                yo: {}
            }
        },
        created(){
            this.me()
        },
        methods:{
            async logout(){
            await this.$auth.logout()
            },
            me(){
                this.$axios.get('/account/me')
                    .then(response => {
                        this.yo = response.data.data;
                        console.log(this.yo)
                    })
            }
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

</style>