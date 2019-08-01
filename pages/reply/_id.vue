<template>
    <div>
    <navbar></navbar>
    <div class="container">
        <div id="contenedor" class="columns">
            <div class="column is-10 is-offset-1">
                <div class="box is-mobile">
                    <article class="media">
                        <div class="media-left">
                        <figure class="image is-64x64">
                        <img class="is-rounded" :src="postuser.avatar">
                        </figure>
                        </div>
                        <div class="media-content">
                            <div class="content">
                                <p>
                                    <strong>{{postuser.username}}</strong>  <small>{{moment(post.created_at).fromNow()}}</small>
                                    <br>
                                    {{post.post}}
                                    </p>
                                        </div>
                                        <favorite
                                        :post="post"
                                        :replies="post.replies"
                                        :favorites.sync="post.favorites"
                                        :user="yo"
                                        ></favorite> 
                                        </div>
                                    </article>


                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
import navbar from '../../components/navbar'
import favorite from '../../components/favorite'

let moment = require ('moment')

    export default {
        middleware: ['auth'],
        components:{
            navbar, favorite
        },
        data(){
            return{              
                moment: moment,
                yo:{},
                postuser:{},
                replies:[],
                post:{}
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
                    this.post =response.data.data
                    console.log(this.post)
                    })
                    
                    
                }
            }
}
        
    
</script>

<style scoped>
#contenedor{
    margin-top: 10px;
}

</style>