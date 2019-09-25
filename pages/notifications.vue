<template>
    <div id="contenedorprincipal" v-bind:style="{ 'background-image': 'url(' + tema.background + ')' }">
    <navbar
    :tema="tema"
    :tieneuntema="tieneuntema"
    />
    <div  class="container" >
        <div class="columns">
            <div class="column is-12">
                
                <div v-for="notification in notifications" v-if="notification.user.id !== currentuser.id"  
                v-bind:style="{ 'background-image': 'url(' + tema.postbox+ ')' }"
                class="box">
                        <template v-if="notification.post !== null">
                        <nuxt-link id="link" :to="`/reply/${notification.post.id}`">
                        <article  class="media">
                        <div class="media-left">
                        <figure class="image is-48x48">
                            <img id="remitente" class="is-rounded" :src="notification.user.avatar">
                        </figure>
                        </div>
                        <div class="media-content">
                        <div class="content">
                            <p :class="[ tieneuntema ? tema.estilotexto : 'has-text-black' ]">
                            <strong>{{notification.user.username}}</strong> <small>{{moment(notification.created_at).fromNow()}}</small>
                            <br>
                            {{notification.notification_type}}
                            </p>
                        </div>
                        </div>
                        <div v-if="notification.post.image !== null" class="media-right">
                        <figure class="image is-64x64">
                            <img class="is-rounded " id="destinatario" :src="notification.post.image">
                        </figure>
                        </div>
                    </article>
                </nuxt-link>    
                </template>

                <template v-else> 
                    <nuxt-link id="link" :to="`/user/${notification.user.username}`">       
                    <article class="media">
                        <div class="media-left">
                        <figure class="image is-48x48">
                            <img id="remitente" class="is-rounded" :src="notification.user.avatar">
                        </figure>
                        </div>
                        <div class="media-content">
                        <div class="content">
                            <p>
                            <strong>{{notification.user.username}}</strong> <small>{{moment(notification.created_at).fromNow()}}</small>
                            <br>
                            {{notification.notification_type}}
                            </p>
                        </div>
                        </div>
                        <div class="media-right">
                        <figure class="image is-64x64">
                            <img id="destinatario" class="is-rounded " :src="currentuser.avatar">
                        </figure>
                        </div>
                    </article>
                </nuxt-link>
                </template>
                <template v-if="notification.theme !== null"> 
                    <nuxt-link id="link" :to="`/user/${notification.user.username}`">       
                    <article class="media">
                        <div class="media-left">
                        <figure class="image is-48x48">
                            <img id="remitente" class="is-rounded" :src="notification.user.avatar">
                        </figure>
                        </div>
                        <div class="media-content">
                        <div class="content">
                            <p>
                            <strong>{{notification.user.username}}</strong> <small>{{moment(notification.created_at).fromNow()}}</small>
                            <br>
                            {{notification.notification_type}}
                            <strong class="has-text-success">{{notification.theme.nombretema}}</strong>
                            </p>
                        </div>
                        </div>
                        <div class="media-right">
                        <figure class="image is-64x64">
                            <img id="destinatario" class="is-rounded " :src="currentuser.avatar">
                        </figure>
                        </div>
                    </article>
                </nuxt-link>
                </template>
                </div>
                <infinite-loading @infinite="infinitehandler"></infinite-loading>
            </div>
        </div>
    </div>

    </div>
</template>

<script>
import navbar from '@/components/navbar.vue';
let moment = require('moment')
import {mapState} from 'vuex'

    export default {
    middleware: ['auth'],

    components:{navbar},

    computed:{
        ...mapState([
        'currentuser' , 'tema', 'tieneuntema'
        ])
    },

    data(){
        return{
            moment:moment,
            notifications: [],
            page: 0
        }
    },
    created(){
        this.$store.dispatch('getusuario')
        this.truenotif()
        this.$store.dispatch('gettema')
    },
    beforeMount(){
        
    },
    mounted(){
        setInterval(() => {
            this.truenotif()
            }, 30000)

    },
    methods: {
            async infinitehandler($state){
            this.page ++
              await this.$axios.get(`notif/getnoti`, {
                  params: {
                        foo: this.page
                    }
              })
                .then(response => {
                    let lista = response.data.data.data
                    console.log(response.data.data.data)
                    if(lista.length){
                        this.notifications = this.notifications.concat(lista)
                        $state.loaded()
                    }else {
                        $state.complete()
                    }
                })

            },
    async truenotif(){
        await this.$axios.put('notif/notiview')
    }
    }

        
}
</script>

<style scoped>

#remitente{
    width: 48px;
    height: 48px;
    max-width: 48px;
    max-height: 48px;
}
#destinatario {
    width: 64px;
    height: 64px;
    max-width: 64px;
    max-height: 64px;
}
#contenedorprincipal{
     overflow-x:hidden !important;
     overflow-y:hidden !important;
}
#link{
    color: black;
}

</style>