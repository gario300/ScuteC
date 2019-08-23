<template>
    <div id="contenedorprincipal">
    <navbar></navbar>
    <div  class="container" >
        <div class="columns">
            <div class="column is-12">
                
                <div v-for="notification in notifications" v-if="notification.user.id !== currentuser.id"  class="box">
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
                            <p>
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
                    <nuxt-link id="link" :to="`/user/${currentuser.username}`">       
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
                </div>
                
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
        'currentuser'
        ])
    },

    data(){
        return{
            moment:moment,
            notifications: []
        }
    },
    created(){
        this.$store.dispatch('getusuario')
        this.getnoti()   
        this.truenotif()
    },
    mounted(){
        setInterval(() => {
            this.getnoti()
            }, 50000)
    },
    methods: {
        async getnoti(){
            await  this.$axios.get('notif/getnoti')
                .then(response => {
                    this.notifications = response.data.data
                    console.log(this.notifications)
                }).catch (e =>{
                    console.log(e)
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