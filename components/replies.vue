<template>
    <div>
        <div class="columns is-centered">
            <div class="column is-12">
                <div class="box" v-for="reply in replies"
                v-bind:style="{ 'background-image': 'url(' + tema.postbox + ')' }"
                >
  <article class="media">
    <div class="media-left">
      <nuxt-link :to="`/user/${reply.user.username}`">
        <figure class="image is-64x64">
          <img id="avatar" class="is-rounded" :src="reply.user.avatar" alt="Image">
        </figure>
      </nuxt-link>
    </div>
    <div class="media-content">
      <div class="content">
        <p :class="[ tieneuntema ? tema.estilotexto : 'has-text-black' ]">
          <nuxt-link id="link" :to="`/user/${reply.user.username}`">
            <strong>{{reply.user.username}}</strong> 
          </nuxt-link> <small>{{moment(reply.created_at).fromNow()}}</small>
          <br>
          {{reply.reply}}
        </p>
      </div>
    </div>
  </article>
</div>
            </div>
        </div>

    </div>
</template>

<script>
let moment = require('moment')
    export default {
        name: 'replies',
        props: {
            replies: {
                type: Array,
                required: true
            },
            tema: {
                type: Object,
                required: true
            },
            tieneuntema: {
                type: Boolean,
                required: true
            }
        },
        data(){
            return{
                moment: moment
            }
        }
        
    }
</script>

<style scoped>
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

</style>