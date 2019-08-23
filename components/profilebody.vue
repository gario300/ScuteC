<template>
    <div>
    <!-- Menu -->

    <div class="columns is-centered is-mobile">
        <div class="column is-12">
            <div id="menu" class="tabs is-centered">
                <ul>
                    <li><nuxt-link :to="`/user/${user.username}`">Posts <br> <strong> {{ posts.length }} </strong> </nuxt-link></li>
                    <li><button class="button is-white is-normal">Albums </button></li>
                    <li><button class="button is-white is-normal">Suscriptores</button></li>
                    <li id="seguidores"><nuxt-link :to="`/user/followers/${user.username}`">Seguidores <br> <strong> {{ ufollowers.length }} </strong> </nuxt-link></li>
                    <li> <nuxt-link :to="`/user/${user.username}`">Siguiendo <br> <strong> {{ ufollowing.length }} </strong> </nuxt-link></li>
                    <li><nuxt-link :to="`/user/${user.username}`">Favoritos <br> <strong>{{ufavorites.length}}</strong> </nuxt-link></li>
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
            }
        
    },
    methods:{
        hola(){
            console.log(this.user)
        }
    }
    }
</script>

<style scoped>
#menu{
    height: auto;
}

</style>