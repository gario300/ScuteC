<template>
    <div class="container" v-bind:style="{ 'background-image': 'url(' + tema.background + ')' }">
        <div class="columns is-centered is-tablet is-multiline">
                <div v-for="ufollowing in ufollowings" class="column is-2">
                    <div class="box" v-bind:style="{ 'background-image': 'url(' + tema.postbox + ')' }"> 
                        <div class="columns is-centered">
                            <div id="cajafollow" class="column is-12">
                            <figure class="image is-96x96">
                                <img class="is-rounded" :src="ufollowing.avatar" alt="">
                            </figure>
                            </div>
                        </div>
                        <div class="columns is-centered">
                            <div id="cajafollow" class="column is-full">
                                <h4 class="title is-5">{{ufollowing.username}}</h4>
                            </div>
                        </div>
                        <div class="columns">
                            <div class="column">
                                <p class="help is-primary">Siguiendo 
                                <span><strong>{{ufollowing.following.length}}</strong></span></p> 
                                <p class="help is-success">Lo siguen 
                                <span><strong>{{ufollowing.followers.length}}</strong></span></p> 
                            </div>
                        </div>
                        <div class="columns is-centered is-mobile">
                            <div class="column is-half">
                                <nuxt-link :to="`/user/${ufollowing.username}`" class="button is-primary is-fullwidth is-outlined">Visitar</nuxt-link>
                    
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>
</template>

<script>
    export default {
        name: 'following',
        props:{
            ufollowings:{
                type: Array,
                required: true
            },
            currentuser:{
                type: Object,
                required: true
            },
            tema:{
                type: Object,
                required: true
            },
            
            tieneuntema:{
                type: Boolean,
                required: true
            }
        }
    }
</script>

<style scoped>
.container{
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