<template>
    <div>
        
                    <form @submit.prevent="trampao">
                        <input v-model="trampa" type="number">
                        <button>puntos</button>
                    </form>

    </div>
</template>

<script>
    export default {
        data(){
            return{
                trampa: 0
            }
        },
        methods:{
            async trampao(){
                await this.$axios.put('/account/especial', {
                  puntos: this.trampa
                })
            },
        }
        
    }
</script>

<style lang="scss" scoped>

</style>