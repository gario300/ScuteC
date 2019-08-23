<template>
    <div id="contenedor_principal">
    <navbar></navbar>
    <div class="container">
        <div id="contenedor" class="columns">
            <div class="column is-10 is-offset-1">
                <!-- post -->
                <div class="box is-mobile">
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
                                <p>
                                   <nuxt-link id="link" :to="`/user/${postuser.username}`" ><strong>{{postuser.username}}</strong></nuxt-link> <small>{{moment(post.created_at).fromNow()}}</small>
                                    <br>
                                    {{post.post}}
                                    </p>
                                        </div>
                                        <figure class="image">
                                         <img  :src="post.image" v-show="post.image !== null">
                                         </figure> 
                                        <favorite
                                    :post="post"
                                    :replies="replies"
                                    :favorites="favorites"
                                    :user="yo"
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
                    
                    <form @submit.prevent="responder(post.id, yo.id, post.user.id)">
                        <div class="field is-grouped">
                            <figure  class="image is-64x64">
                        <img id="avatar" class="is-rounded" :src="yo.avatar" alt="">
                    </figure>
                            <textarea v-model="reply" placeholder="Responde" class="input is-success is-medium"></textarea>
                        <div class="control">
                            <button class="button is-success is-medium"><i class="fas fa-reply"></i></button>
                        </div>
                        </div>
                    </form>
                </div>
            </div>
        <!-- currentuserbox -->


        <!-- replies -->
            <replies :replies="replies"/>
        <!-- replies -->
    </div>
    </div>
</template>

<script>
import navbar from '@/components/navbar'
import favorite from '@/components/favorite'
import replies from '@/components/replies'

let moment = require ('moment')

    export default {
        middleware: ['auth'],
        components:{
            navbar, favorite, replies
        },
        data(){
            return{              
                moment: moment,
                yo:{},
                postuser:{},
                replies:[],
                post:{},
                reply: '',
                favorites:[],
                
            }
        },
        created(){
            this.me()
            this.getpost()

        },
            methods:{
                
                me(){
                this.$axios.get('/account/me')
                    .then(response => {
                        this.yo = response.data.data;
                        console.log(this.yo)
                    })
                },

                async getpost(){
                   await this.$axios.get(`/posts/${this.$route.params.id}`)
                    .then(response => {
                    this.postuser = response.data.data.user
                    this.replies = response.data.data.replies
                    this.post =response.data.data
                    this.favorites = response.data.data.favorites
                    })
                 },
                 async responder(postid, yoid, postuid){
                     await this.$axios.post(`/posts/reply/${this.post.id}`, {
                         reply : this.reply,
                         post_id : postid,
                         user_id : yoid
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

</style>