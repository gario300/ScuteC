<template>
    <div id="contenedor_principal" 
    v-bind:style="{ 'background-image': 'url(' + tema.background + ')' }">
    <navbar
    :tema="tema"
    :tieneuntema="tieneuntema"
    />
    <div class="container">
        <div id="contenedor" class="columns">
            <div class="column is-10 is-offset-1">
                <!-- post -->
                <div class="box is-mobile"
                v-bind:style="{ 'background-image': 'url(' + tema.postbox + ')' }">
                    <article class="media">
                        <div class="media-left">
                        <figure class="image is-64x64">
                        <nuxt-link :to="`/user/${postuser.username}`" >
                        <img class="is-rounded" id="avatar" :src="postuser.avatar">
                        </nuxt-link> 
                        </figure>
                        </div>
                        <div class="media-content">
                            <div class="content">
                                <p :class="[ tieneuntema ? tema.estilotexto : 'has-text-black' ]">
                                   <nuxt-link id="link" :to="`/user/${postuser.username}`" ><strong>{{postuser.username}}</strong></nuxt-link> <small>{{moment(post.created_at).fromNow()}}</small>
                                    <br>
                                    {{post.post}}
                                    </p>
                                        </div>
                                        <div v-if="post.image !== null"
                                        class="image is-5by3"
                                        id="imagenpost"
                                        v-bind:style="{ 'background-image': 'url(' + post.image + ')' }">
                                        </div>
                                        <favorite
                                        :post="post"
                                        :replies="replies"
                                        :favorites.sync="favorites"
                                        :user="currentuser"
                                        /> 
                                    <button class="button is-text" @click="regresar">Regresar</button>
                                        </div>
                    </article>
                </div>
            </div>
        </div>
        <!-- post -->


        <!-- currentuserbox -->
            <div class="columns is-mobile is-centered is-multiline">
                <div class="column is-narrow">
                    
                </div>
                <br>
                <div class="column ">
                    
                    <form @submit.prevent="responder(post.id, post.user.id)">
                        <div class="field is-grouped">
                            <figure  class="image is-64x64">
                        <img id="avatar" class="is-rounded" :src="currentuser.avatar" alt="">
                    </figure>
                            <textarea v-model="reply" placeholder="Responde" 
                            :class="[ tieneuntema ? tema.inputreply : 'input is-success is-medium' ]">
                            </textarea>
                        <div class="control">
                            <button :class="[ tieneuntema ? tema.buttonreply : 'button is-success is-medium' ]"><i class="fas fa-reply"></i></button>
                        </div>
                        </div>
                    </form>
                </div>
            </div>
        <!-- currentuserbox -->


        <!-- replies -->
            <replies :replies="replies"
            :tema="tema"
            :tieneuntema="tieneuntema"/>
        <!-- replies -->
    </div>
    </div>
</template>

<script>
import navbar from '@/components/navbar'
import favorite from '@/components/favorite'
import replies from '@/components/replies'
import {mapState} from 'vuex'

let moment = require ('moment')

    export default {
        middleware: ['auth'],
        components:{
            navbar, favorite, replies
        },
        computed: {
        ...mapState([
        'currentuser', 'tieneuntema', 'tema'
        ])
        },
        data(){
            return{              
                moment: moment,
                postuser:{},
                replies:[],
                post:{},
                reply: '',
                favorites:[],
                
            }
        },
        created(){
            this.$store.dispatch('getusuario')
            this.getpost()
            this.$store.dispatch('gettema')

        },
        mounted(){

        },
            methods:{

                async getpost(){
                   await this.$axios.get(`/posts/${this.$route.params.id}`)
                    .then(response => {
                    this.postuser = response.data.data.user
                    this.favorites = response.data.data.favorites
                    this.replies = response.data.data.replies.reverse()
                    this.post =response.data.data
                    })
                 },
                 async responder(postid, yoid, postuid){
                     await this.$axios.post(`/posts/reply/${this.post.id}`, {
                         reply : this.reply,
                         post_id : postid,
                         user_id : this.currentuser.id
                     }).then(response => {
                        this.reply = ''
                    })
                    let respuesta = 'Respondió a tu publicación'
                    await this.$axios.post(`/notif/newnoti/${this.post.id}`,{
                        
                        notification_type : respuesta
                    })
                     this.getpost()
                 },
                 regresar (){
                     this.$router.go(-1)
                 }
    }

}
        
    
</script>

<style scoped>
#contenedor{
    margin-top: 10px;
}
#contenedor_principal{
     overflow-x:hidden;
     overflow-y:hidden;
     width: auto;
}
#avatar{
    height:64px;
    width:64px;
    min-width: 64px;
    max-width: 64px;
    max-width: 64px;
    max-height: 66px;
}
#link{
  color: black
}

.box{
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100% ;
}
textarea{
    max-height: 45px;
}
#imagenpost{
    background-repeat: no-repeat;
    background-position: center;
    background-size: auto 100% ;

}

</style>