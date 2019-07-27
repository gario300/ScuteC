<template>
    <div>
        <navbar></navbar>
        <div class="container">
            <div class="columns is-centered">
                <div class="column is-half">
                    
                    <div class="box">
                        <article class="media">
                        <div class="media-left">
                                <figure class="image is-256x256">
                                    <img id="avatar" class="is-rounded" :src="`${yo.avatar}`">
                                 </figure>
                        </div>
                        <div class="mediacontent">
                            <div class="content">
                                <form>
                                    <div class="columns is-mobile">
                                        <div class="column is-9">
                                            <textarea class="textarea is-success is-large" placeholder="Publica algo..."></textarea>
                                        </div>
                                        <div class="column">
                                            <button class="button is-success is-large"><p><i class="far fa-images"></i></p></button>
                                            <button id="post" class="button is-normal is-success">Post!</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        </article>
                    </div>
                </div>
            </div>
        </div>
        

    </div>
</template>

<script>
import navbar from '../../components/navbar'
import userbox from '../../components/userbox'
    
    export default {
        middleware: ['auth'],
        components:{
            navbar, userbox
        },
        data(){
            return{
                yo:{}
            }
        },
        created(){
            this.me()
        },
        methods:{
            me(){
                this.$axios.get('/account/me')
                    .then(response => {
                        this.yo = response.data.data;
                        console.log(this.yo)
                    })
            }
        }
    }
</script>

<style scoped>
#avatar{
    max-height: 80px !important;
    max-width: 80px !important;
    width: 80px !important;
    height: 80px !important;
}
#post{
    margin-top: 20px !important;
}


</style>