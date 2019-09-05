<template>
<div>
        <nav id="NavS">
            <div class="container" id="Cntainernav">
                <div class="columns is-mobile is-gapless">
                    <div class="column" >
                        <a class="Elz" href="#" @click="home"><span><i class="fas fa-camera-retro fa-lg"></i></span></a>
                    </div>
                    <div class="column">
                        <a href="#" class="Elz" @click="notificationspush" ><span ><i class="fas fa-bell fa-lg"></i>{{notif.length}}</span></a>
                    </div>
                    <div class="column ">
                        <a href="#" class="Elz"><span><i class="fas fa-envelope fa-lg"></i></span></a>
                    </div>
                    <div class="column ">
                        <a href="#" @click="destacado" class="Elz"><span><i class="fas fa-star fa-lg"></i></span></a>
                    </div>
                    <div class="column ">
                        <a href="#" @click="finder" class="Elz"><span><i class="fas fa-search fa-lg"></i></span></a>
                    </div>
                    <div class="column">
                        <a href="#" @click="menu" class="Elz"><span><i class="fas fa-bars fa-lg"></i></span></a>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
import goals  from '@/components/goals'
    export default {
        name: 'navbar',
        components: {
            goals
        },
        data(){
            return{
                homenav: false,
                notif: []
            }
        },
        created (){
            this.getnotif()

        },
        mounted(){
            setInterval(() => {
            this.getnotif()
            }, 30000)
        },
        methods: {
            home(){
                this.$router.push('/galeria')
            
            },
            destacado(){
               this.$router.push('/destacado') 
            },
            menu(){
                this.$router.push('/menu')
                },
                async notificationspush(){
                    this.$router.push('/user/notifications')
                
                },
                finder(){
                    this.$router.push('/finder')
                },

                async getnotif(){
                    await  this.$axios.get('notif/getnotiview')
                    .then(response => {
                    this.notif = response.data.data
                    })

                    

                }
            
        }
  
    }
</script>

<style>
#NavS{
    height: 32px;
    width: 100%;
    background-color: #23d160;
}
#Cntainernav{
    margin: none !important;
    padding-top: 3px;

}
.Elz{
    text-decoration: none;
    color: #178d40;

}
#Cntainernav div{
    display: flex;
    justify-content: center;

}
#home{
    width: 100% !important;
    height: 100% !important;
}
</style>
