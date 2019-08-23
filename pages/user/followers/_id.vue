<template>
    <div id="contenedor_principal">
        <navbar></navbar>
        <template>
        <userheader
        :currentuser="currentuser"
        :following="following"
        :user="user"
        :posts="posts"
        :followers="followers"
        :ufollowing="ufollowing"
        :actualuser="actualuser"
        :ufavorites="favorites"
        />
        <div  class="columns is-centered is-tablet is-multiline">
            <div id="margin" v-for="follower in followers" class="column is-2">
                <div class="box">
                    <div class="columns is-centered">
                        <div id="cajafollow" class="column is-12">
                            <figure class="image is-96x96">
                                <img class="is-rounded" :src="follower.avatar" alt="">
                            </figure> 
                        </div>
                    </div>
                    <div class="columns is-centered">
                        <div id="cajafollow" class="column is-half">
                            <h4 class="title is-12">{{follower.username}}</h4>
                        </div>
                    </div>
                    <div class="columns">
                        <div class="column">
                            <p class="help is-primary">Siguiendo 
                            <span><strong>{{follower.following.length}}</strong></span></p> 
                            <p class="help is-success">Lo siguen 
                            <span><strong>{{follower.followers.length}}</strong></span></p> 
                        </div>
                    </div>
                    <div class="columns is-centered is-mobile">
                        <div class="column is-half">
                            <nuxt-link :to="`/user/${follower.username}`" class="button is-success is-fullwidth is-outlined">Visitar</nuxt-link>
                   
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </template>
    </div>
</template>

<script>
import {mapState} from 'vuex';
import navbar from '@/components/navbar.vue';
import profilebody from '@/components/profilebody.vue';
import botones from '@/components/botonesseguir.vue';
import userheader from '@/components/userheader.vue'

    export default {
        middleware: ['auth'],
        name: 'follows',
        components:{
            navbar, profilebody,botones, userheader
        },
        data(){
            return{
                followers:[],
                cargandoperfil: true,
                user:{},
                posts:{},
                ufollowing: [],
                favorites: [],
                actualuser: false
            }
        },
        computed: {
        ...mapState([
        'currentuser', 'following'
        ])
        },
        created(){
            this.$store.dispatch('getusuario')
            this.userdata()
        },
        mounted(){

        },
        methods: {
                async userdata() {
                    await this.$axios.get(`account/${this.$route.params.id}`)
                    .then(response => {
                        this.user = response.data.data
                        this.followers = response.data.data.followers
                        this.posts=response.data.data.posts
                        this.ufollowing=response.data.data.following
                        this.favorites = response.data.data.favorites

                        if(this.user.id == this.currentuser.id){
                        this.actualuser =  true
                        }
                    })
                },
                primeracarga(){
                    this.cargandoperfil = false
                }
        }
        
    }
</script>

<style scoped>
#contenedor_principal{
     overflow-x:hidden !important;
     overflow-y:hidden !important;
}

figure img{
    width: 96px;
    height: 96px;
    min-width: 96px;
    max-height: 96px;
}

#cajafollow{
    display:flex;
    justify-content: center;
}
.columns span{
    float: right ;
}

</style>