<template>
    <div>
        <nav id="posticons" class="level is-mobile">
        <div class="level-left">
          <nuxt-link :to="`/reply/${post.id}`" id="nolike" class="level-item" aria-label="reply">
            <span  class="icon is-small">
              <i class="fas fa-reply" aria-hidden="true"></i>
            </span>
          </nuxt-link>
          <a id="nolike" class="level-item" aria-label="retweet">
            <span class="icon is-small">
              <i class="fas fa-retweet" aria-hidden="true"></i>
            </span>
          </a>
          <a id="like" v-if="isFavoritedByUser" @click="quitarfavorito" class="level-item" aria-label="like">
            <span class="icon is-small">
              <i class="fas fa-heart" aria-hidden="true"></i>
              {{ favorites.length }}
            </span>
          </a>
          <a id="nolike" v-else @click="favorite" class="level-item" aria-label="like">
            <span class="icon is-small">
              <i class="fas fa-heart" aria-hidden="true"></i>
              {{ favorites.length }}
            </span>
          </a>
        </div>
      </nav>

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
        created(){

        },

        computed:{
            isFavoritedByUser () {
                for (const favorite of this.favorites) {
                    if (favorite.user_id == this.user.id) {
                        return true
                    }
                }

                return false
            }
        },
        methods:{
            favorite(){
                this.$axios.post('/favorites/create', 
                   
                   { post_id: this.post.id },
                                                        
                ).then(response => {
                        this.favorites.push(response.data.data)
                    })
                
            }, 
            quitarfavorito () {

                this.$axios.delete(`/favorites/destroy/${this.post.id}`, {
                    })
                    .then(response => {
                        const filteredFavorites = this.favorites.filter(favorite => {
                            return favorite.user_id !== this.user.id
                        })

                        this.$emit('update:favorites', filteredFavorites)
                    })
            }
        }
    }
</script>

<style scoped>

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

</style>