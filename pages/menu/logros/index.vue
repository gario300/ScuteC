<template>
    <div>
        <navbar></navbar>
        <div class="container">
            <div class="columns">
                <div class="column is-12">
                    <table class="table is-bordered is-striped is-hoverable is-fullwidth">
                        <tbody>
                            <tr v-for="goal in goals">
                                <td class="has-text-centered"><img class="image is-48x48" :src="goal.placa"></td>
                                <td><p class="has-text-centered"><strong>{{goal.title}}</strong></p></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import navbar from '@/components/navbar'
import {mapState} from 'vuex'

    export default {
        components:{
            navbar
        },
        computed:{
            ...mapState([
        'currentuser', 'goals'
        ])
        },
        created(){
            this.$store.dispatch('getusuario')
        }
        
    }
</script>

<style scoped>

.container{
     overflow-x:hidden !important;
     overflow-y:hidden !important;
}

td{
    display: flex;
    justify-content: center
}


</style>