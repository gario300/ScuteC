<template>
    <div>
        <div class="container">
                <div class="columns is-centered is-mobile">
                    <div class="column is-narrow">
                        <button  :class="[ tieneuntema ? tema.buttons : 'button is-success' ]" :disabled="deshabilitar" v-if="isFollowing" @click="unFollow(user.id)">No Seguir</button>
                        <button :class="[ tieneuntema ? tema.buttons : 'button is-success' ]" :disabled="deshabilitar" v-else @click="seguir(user.id)">Seguir</button>
                    </div>
                    <div class="column is-narrow">
                        <button id="suscribe" class="button is-success">Suscribirse</button>
                    </div>
                </div>
            </div>
    </div>
</template>

<script>
    export default {
        name:'botonesseguir',
        props:{
            user: {
                type: Object,
                required: true
            },
            usuarioactual: {
                type: Array,
                required: true
            },
            yofollowing:{
                type: Array,
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
        },
        data(){
            return{
                deshabilitar: false
            }
        },
        computed:{
            isLoggedIn () {
                return !!this.usuarioactual
            },
            isFollowing() {
                for (const following of this.yofollowing) {
                    if (following.id === this.user.id) {
                        return true
                    }
                } 
                 return false  
                }
        },
        methods: {
            async seguir (userid) {
                this.deshabilitar = true
                await this.$axios.post('/users/follow', {
                    user_id: userid
                })
                    .then(response => {
                        this.yofollowing.push({ id: userid })
                        this.deshabilitar = false
                    })
                let respuesta = 'Ahora te sigue'
                    await this.$axios.post(`/notif/newnotifollow`,{
                        notification_type : respuesta,
                        receptor_id :  userid
                    })
                    
        },
        unFollow(Id) {
                
                this.deshabilitar = true
                this.$axios.delete(`/users/unfollow/${this.user.id}`)
                    .then(response => {
                        this.yofollowing = this.yofollowing.filter(u => {
                            return u.id !== Id
                        })
                this.deshabilitar = false
                    })
            }
        },

    }
</script>

<style scoped>
#suscribe{
    background-color: blueviolet;
}

</style>