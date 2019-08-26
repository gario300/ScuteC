<template>
    <div class="container">
        <div class="columns is-multiline">
            <div class="column is-2" v-for="ufavorite in ufavorites" v-if="ufavorite.post.image !== null">
                <nuxt-link :to="`/reply/${ufavorite.post.id}`"><div id="favoriteimage" 
                v-bind:style="{ 'background-image': 'url(' + ufavorite.post.image + ')' }"
                class="image is-2by3">
                <div class="columns is-centered is-gapless">
                    <div id="column" class="column is-12">
                        <figure class="image is-32x32">
                            <img class="is-rounded" :src="ufavorite.post.user.avatar">
                        </figure>
                        <h2 class="title is-5">{{ufavorite.post.user.username}}</h2>
                    </div>
                </div>
                <div id="columns2" class="columns is-centered is-gapless is-mobile">
                    <div id="column" class="column is-12">
                        <nav class="level is-mobile">
                            <div class="level-left">
                            <a class="level-item" aria-label="reply">
                                <span class="icon is-normal">
                                <i class="fas fa-reply" aria-hidden="true"></i>
                                {{ufavorite.post.replies.length}}
                                </span>
                            </a>
                            <a class="level-item" aria-label="like">
                                <span class="icon is-normal">
                                <i class="fas fa-heart" aria-hidden="true"></i>
                                {{ufavorite.post.favorites.length}}
                                </span>
                            </a>
                            <a id="gift" class="level-item" aria-label="retweet">
                                <span class="icon is-small">
                                <i aria-hidden="true" class="fas fa-gift"></i> 
                                </span>
                            </a>
                            </div>
                        </nav>

                    </div>
                </div>
                </div>
                </nuxt-link>
                
                </div>
            </div>
    </div>
</template>

<script>
    export default {
        name: 'favorites',
        props:{
            ufavorites: {
                type: Array,
                required: true
            },
            currentuser: {
                type: Object,
                required: true
            }
        },
        methods:{
        }
    }
</script>

<style scoped>
#favoriteimage{
    height: 100% !important;
    background-repeat: no-repeat;
    background-color:black;
    background-position: center;
    background-size: 100% auto ;
    opacity: 0.5 !important;
    transition: all 0.2s ease-in-out;
}
#favoriteimage:hover{
    opacity: 1 !important;
    transform: scale(1.1);
}
.columns{
    margin-top: 15px !important;
    margin-bottom: 15px !important;
}
#column{
    display: flex;
    justify-content: center;
}
#columns2{
    margin-bottom: 2px;
}
h2{
    text-shadow: 0 0 1px #fff;
}
a{
    color: #23d160;
}
.animation:hover{
    animation: swing 1s ease;
    animation-iteration-count: 1;
        
}
</style>