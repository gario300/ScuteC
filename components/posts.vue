<template>
    <div id="contenedor_principal">
        <div class="container">
            <div class="columns is-centered is-mobile">
                <div class="column is-12">
                    <div v-for="post in posts" class="box">
                        <article class="media">
                            <div class="media-left">
                                <figure  class="image is-64x64">
                                    <img id="avatarpost" class="is-rounded" :src="post.user.avatar" alt="Image">
                                </figure>
                            </div>
                            <div id="barra" class="media-content">
                                <div class="content">
                                    <p>
                                        <strong>{{post.user.username}}</strong> <small>{{moment(post.created_at).fromNow()}}</small>
                                            <small id="eliminar">
                                                <button v-if="actualuser == true" @click="eliminarpost(post.id)" class="button is-small is-rounded is-text" id="menupost">Eliminar</button>
                                            </small>
                                            <br>
                                            {{post.post}}
                                    </p>
                                </div>
                                <div id="postimage" class="image is-4by3" v-show="post.image !== null" v-bind:style="{ 'background-image': 'url(' + post.image + ')' }">

                                </div>
                                    <favorite
                                    :post="post"
                                    :replies.sync="post.replies"
                                    :favorites.sync="post.favorites"
                                    :user="currentuser"
                                    /> 
                                    </div>
                                </article>
                                </div>
                                            </div>
                                        </div>
                                        </div>

    </div>
</template>

<script>
import favorite from '@/components/favorite.vue';
let moment = require('moment')

    export default {
        name: 'posts',
        components:{
            favorite
        },
        data(){
            return{
                moment: moment
            }
        },
        props:{
            posts: {
                type: Array,
                required: true
            },
            currentuser:{
                type:Object,
                required: true
            },
            actualuser:{
                type: Boolean,
                required: true
            }
        },
        methods:{
            someMethod(){
            this.$parent.userdata();
            },
            eliminarpost(id){
                this.$axios.delete('posts/destroy/'+id)
                .then(data =>{                    
                this.someMethod();
                })
        }
    }
}   
</script>

<style scoped>
#eliminar{
    float: right ;
}
#avatarpost{
    height:64px;
    width:64px;
    min-width: 64px;
    max-width: 64px;
    max-width: 64px;
    max-height: 66px;
}
#postimage{
    height: 100% !important;
    background-repeat: no-repeat;
    background-color:black;
    background-position: center;
    background-size: 100% auto ;
}
#barra{
     overflow-y:hidden;
     height: auto;
}
#contenedor_principal{
     overflow-x:hidden !important;
     overflow-y:hidden !important;
}

</style>