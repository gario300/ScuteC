<template>
    <div>
    <!-- Menu -->

    <div class="columns is-centered is-mobile">
        <div class="column is-12">
            <div id="menu" class="tabs is-centered">
                <ul>
                    <li v-bind:class="{'is-active': click.postss}"> <a @click="postss"> Posts <br> <strong> {{ posts.length }} </strong></a></li>
                    <li><button class="button is-white is-normal">Albums </button></li>
                    <li><button class="button is-white is-normal">Suscriptores</button></li>
                    <li id="seguidores" v-bind:class="{'is-active': click.followers}"> <a @click="followers">Seguidores <br> <strong> {{ ufollowers.length }} </strong> </a> </li>
                    <li id="siguiendo" v-bind:class="{'is-active': click.following}"> <a @click="following" > Siguiendo <br> <strong> {{ ufollowing.length }} </strong>  </a></li>
                    <li v-bind:class="{'is-active': click.favorites}"> <a @click="favorites" > Favoritos <br> <strong>{{ufavorites.length}}</strong></a></li>
                </ul>      
        </div>
    </div>
    </div>
        
    <!-- Menu -->



    </div>
</template>

<script>
    export default {
        name:'profilebody',
        props: {
            posts:{
                type: Object,
                required: true
            },
            user: {
                type:  Object,
                required: true
            },
            ufollowers: {
                type:  Object,
                required: true
            },
            ufollowing: {
                type: Object,
                required: true
            },
            ufavorites: {
                type: Object,
                required:  true
            },
            currentuser: {
                type:   Object,
                required: true
            },
            click: {
                type: Object,
                required: true
            }
        
    },
    methods:{
        postss(){
            this.click.followers = false
            this.click.postss = true
            this.click.following =false
            this.click.favorites = false
        },
        followers(){
            this.click.followers = true
            this.click.postss = false
            this.click.following =false
            this.click.favorites = false
        },
        following(){
            this.click.followers = false
            this.click.postss = false
            this.click.following =true
            this.click.favorites = false
        },
        favorites(){
            this.click.followers = false
            this.click.postss = false
            this.click.following =false
            this.click.favorites = true

        }
    }
    }
</script>

<style scoped>
#menu{
    height: auto;
}

</style>