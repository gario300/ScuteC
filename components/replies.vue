<template>
    <div class="container">
        <div class="columns is-centered">
            <div class="column is-12">
                <div class="box" v-for="reply in replies">
  <article class="media">
    <div class="media-left">
      <figure class="image is-64x64">
        <img id="avatar" class="is-rounded" :src="reply.user.avatar" alt="Image">
      </figure>
    </div>
    <div class="media-content">
      <div class="content">
        <p>
          <strong>{{reply.user.username}}</strong> <small>{{moment(reply.created_at).fromNow()}}</small>
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

</style>