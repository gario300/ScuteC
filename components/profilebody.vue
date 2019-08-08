<template>
    <div>
    <!-- Menu -->

    <div class="columns is-centered is-mobile">
        <div class="column is-12">
            <div class="tabs is-centered">
                <ul>
                    <li><nuxt-link :to="`/user/${user.username}`">Posts <br> <strong> {{ posts.length }} </strong> </nuxt-link></li>
                    <li><button class="button is-white is-normal">Albums </button></li>
                    <li><button class="button is-white is-normal">Suscriptores</button></li>
                    <li><nuxt-link :to="`/user/${user.username}/following`">Seguidores <br> <strong> {{ ufollowers.length }} </strong> </nuxt-link></li>
                    <li><button class="button is-white is-normal">Siguiendo</button></li>
                    <li><nuxt-link :to="`/user/${user.username}`">Favoritos</nuxt-link></li>
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

<style lang="scss" scoped>

</style>