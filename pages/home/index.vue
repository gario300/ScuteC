<template>
    <div>
        <navbar></navbar>

    </div>
</template>

<script>
import navbar from '../../components/navbar'
    
    export default {
        middleware: ['auth'],
        components:{
            navbar
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

<style lang="scss" scoped>

</style>