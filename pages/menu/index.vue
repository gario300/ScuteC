<template>
    <div>
        <navbar></navbar>
        <div class="columns is-centered">
            <div class="column">
                <ul>
                    <li class="title is-5">
                        General
                    </li>
                    <li> <nuxt-link :to="`/menu/logros/${yo.id}`"> Logros</nuxt-link> </li>
                </ul>
            </div>
        </div>

    </div>
</template>

<script>

import navbar from '@/components/navbar'
    export default {
        middleware: ['auth'],
        name:'menu',
        components: {
            navbar,
        },
        data(){
            return {
                yo: {}
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

<style lang="scss" scoped>

</style>