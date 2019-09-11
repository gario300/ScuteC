<template>
    <div id="container">

        <div class="columns">
            <div class="column is-4 is-offset-8">
                <div id="notificacion" v-for="goal in goals" class="box">
                        <article class="media">
                            <div class="media-left">
                                <figure class="image is-64x64">
                                    <img :src="goal.goal.placa">
                                </figure>
                            </div>
                            <div class="media-content">
                                <div class="content">
                                    <p>¡Logro desbloqueado! <br> <strong>{{goal.goal.title}}</strong>
                                    {{goal.goal.description}}</p>
                                </div>
                            </div>
                            <div class="media-rigth">
                                <button @click="view(goal.goal.id)" class="delete"></button>
                            </div>
                        </article>
                    </div>
                </div>
        </div>
        

    </div>
</template>

<script>
    export default {
        name: 'goals',
        props:{
            goals:{
                type: Array,
                required: true
            }

        },
        methods:{
            async view(id){
                await this.$axios.put(`/account/readgoal/${id}`)
                this.$parent.getgoal();
            }
        }
        
    }
</script>

<style scoped>


#notificacion{
    background-color: black !important;
    opacity: .90;
    position: fixed;
    z-index: 10;

}


</style>