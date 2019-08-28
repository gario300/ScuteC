<template>
    <div class="container">
        <div v-for="post in posts" class="box" >
        <article class="media">
    <div class="media-left">
      <figure class="image is-64x64">
        <img class="is-rounded" :src="post.user.avatar" alt="Image">
      </figure>
    </div>
    <div id="barra" class="media-content">
      <div class="content">
        <p>
          <strong>{{post.user.username}}</strong> <small>{{moment(post.created_at).fromNow()}}</small>
          <br>
          {{post.post}}
        </p>
      </div>
        <div id="postimage" class="image is-4by3" v-show="post.image !== null" v-bind:style="{ 'background-image': 'url(' + post.image + ')' }">

        </div>
        <favorite id="prueba"
        :post="post"
        :replies.sync="post.replies"
        :favorites.sync="post.favorites"
        :user="currentuser"
        /> 

    </div>
  </article>
</div>
    </div>
</template>

<script>
import favorite from '@/components/favorite'
let moment = require ('moment')
    export default {
        name:'usertimeline',
        components:{
            favorite
        },
        data(){
            return{
                moment: moment,
            }
        },
        props:{
            currentuser: {
                type: Object,
                required: true
            },
            posts:{
                type: Array,
                required: true
            }
        },
        methods: { 
            
        }
        
    }
</script>

<style scoped>
#postimage{
    height: 100% !important;
    background-repeat: no-repeat;
    background-color:black;
    background-position: center;
    background-size: 100% auto ;
}
#barra{
    height: auto !important;
    overflow-y: hidden !important;
}

figure img{
  width: 64px;
  height: 64px;
  min-width: 64px;
  max-width: 64px;
  min-height: 64px;
  max-heigth: 64px;
}

</style>