<template>
    <div>
        
                    <form @submit.prevent="trampao">
                        <input v-model="trampanombre" type="text">
                        <input v-model="trampa" type="number">
                        <button>puntos</button>
                    </form>

    </div>
</template>

<script>
    export default {
        data(){
            return{
                trampanombre:'',
                trampa: 0
            }
        },
        methods:{
            async trampao(){
                await this.$axios.put('/account/especial', {
                user: this.trampanombre,
                  puntos: this.trampa
                })
            },
        }
        
    }
</script>

<style lang="scss" scoped>

</style>