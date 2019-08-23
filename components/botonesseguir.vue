<template>
    <div>
        <div class="container">
                <div class="columns is-centered is-mobile">
                    <div class="column is-narrow">
                        <button class="button is-success" v-if="isFollowing" @click="unFollow(user.id)">No Seguir</button>
                        <button class="button is-success" v-else @click="seguir(user.id)">Seguir</button>
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
                type: Object,
                required: true
            },
            following:{
                type: Array,
                required: true
            }
        },
        computed:{
            isFollowing() {
                for (const following of this.following) {
                    if (following.id === this.user.id) {
                        return true
                    }
                } 
                 return false  
                }
        },
        methods: {
            async seguir (id) {

                await this.$axios.post('/users/follow', {
                    user_id: id
                })
                    .then(response => {
                        this.usuarioactual.following.push({ id: id })
                    })
                let respuesta = 'Ahora te sigue'
                    await this.$axios.post(`/notif/newnoti`,{
                        notification_type : respuesta,
                        receptor_id :  id
                    })
        },
        unFollow(Id) {
                this.$axios.delete(`/users/unfollow/${this.user.id}`)
                    .then(response => {
                        this.usuarioactual.following = this.usuarioactual.following.filter(u => {
                            return u.id !== Id
                        })
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