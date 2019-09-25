<template>
    <div>
      <template v-if="block == true">
        <nav id="posticons" class="level is-mobile">
        <div class="level-left">
          <nuxt-link :to="`/reply/${post.id}`" id="nolike" class="level-item" aria-label="reply">
            <span  class="icon is-small">
              <i class="fas fa-reply" aria-hidden="true"></i>
              {{ replies.length }}
            </span>
          </nuxt-link>
          <a id="like" v-if="isFavoritedByUser " class="level-item" aria-label="like">
            <span class="icon is-small">
              <i class="fas fa-heart" aria-hidden="true"></i>
              {{ favorites.length }}
            </span>
          </a>
          <a id="nolike" v-else class="level-item" aria-label="like">
            <span class="icon is-small">
              <i class="fas fa-heart" aria-hidden="true"></i>
              {{ favorites.length }}
            </span>
          </a>
          <a id="gift" class="level-item" aria-label="retweet">
            <span class="icon is-small">
              <i aria-hidden="true" class="fas fa-gift"></i> 
            </span>
          </a>
        </div>
      </nav>      
        </template>
        <template v-else>
        <nav id="posticons" class="level is-mobile">
        <div class="level-left">
          <nuxt-link :to="`/reply/${post.id}`" id="nolike" class="level-item" aria-label="reply">
            <span  class="icon is-small">
              <i class="fas fa-reply" aria-hidden="true"></i>
              {{ replies.length }}
            </span>
          </nuxt-link>
          <a id="like" v-if="isFavoritedByUser || block == true" @click="quitarfavorito()" class="level-item" aria-label="like">
            <span class="icon is-small">
              <i class="fas fa-heart" aria-hidden="true"></i>
              {{ favorites.length }}
            </span>
          </a>
          <a id="nolike" v-else @click="favorite(post.id)" class="level-item" aria-label="like">
            <span class="icon is-small">
              <i class="fas fa-heart" aria-hidden="true"></i>
              {{ favorites.length }}
            </span>
          </a>
          <a id="gift" class="level-item" aria-label="retweet">
            <span class="icon is-small">
              <i aria-hidden="true" class="fas fa-gift"></i> 
            </span>
          </a>
        </div>
      </nav>
      </template>

    </div>
</template>

<script>
    export default {
        name: 'favorite',
         props: {
            post: {
                type: Object,
                required: true
            },
            replies: {
                type: Array,
                required: true
            },
            favorites: {
                type: Array,
                required: true
            },
            user: {
                type:   Object,
                required: true
            }
        },
        data(){
          return{
            block: false
          }
        },
        created(){

        },

        computed:{
            isFavoritedByUser () {
                for (const favorite of this.favorites) {
                    if (favorite.user_id === this.user.id) {
                        return true
                    }
                }

                return false
            }
        },
        methods:{
            async favorite(id){
              this.block = true
                await this.$axios.post('/favorites/create', 
                   
                   { post_id: this.post.id },
                                                        
                ).then(response => {
                     this.favorites.push(response.data.data)
                    })
                    let respuesta = 'Añadió un ♥ a tu publicación '
                    await this.$axios.post(`/notif/newnoti`,{
                        postid : id,
                        notification_type : respuesta,
                    })
                    this.block = false
                
            }, 
            async quitarfavorito () {
              this.block = true
                await this.$axios.delete(`/favorites/destroy/${this.post.id}`)
                    
                    .then(response => {
                        const filteredFavorites = this.favorites.filter(favorite => {
                            return favorite.user_id !== this.user.id
                        })
                       this.$emit('update:favorites', filteredFavorites)
                      this.block = false
                    })
            }
        }
    }
</script>

<style scoped>

#posticons{
  margin-top: 10px;
}
#like{
    color:red !important;

}
#nolike{
 color: green !important;
}
#posticons{
  position:relative !important;
  margin-left:10px;
}
#posticons, a{
    margin-right:20px !important;
}

#gift{
  color: plum
}

</style>