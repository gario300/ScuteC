<template>
<div>
        <nav :class="`${tema.estilonavbar} : ${tieneuntema}, NavS : ${!tieneuntema}`">
            <div class="container" id="Cntainernav">
                <div class="columns is-mobile is-gapless">
                    <div class="column" >
                        <a :class="`green : !${tieneuntema}, ${tema.estiloiconos} : ${tieneuntema} `" href="#" @click="home"><span><i class="fas fa-camera-retro fa-lg"></i></span></a>
                    </div>
                    <div class="column">
                        <a href="#" :class="`green : !${tieneuntema}, ${tema.estiloiconos} : ${tieneuntema} `" @click="notificationspush" ><span ><i class="fas fa-bell fa-lg"></i>{{notif}}</span></a>
                    </div>
                    <div class="column ">
                        <a href="#" :class="`green : !${tieneuntema}, ${tema.estiloiconos} : ${tieneuntema} `" @click="messages" ><span><i class="fas fa-envelope fa-lg"></i>{{notis}}</span></a>
                    </div>
                    <div class="column ">
                        <a href="#" @click="destacado" :class="`green : !${tieneuntema}, ${tema.estiloiconos} : ${tieneuntema} `"><span><i class="fas fa-star fa-lg"></i></span></a>
                    </div>
                    <div class="column ">
                        <a href="#" @click="finder" :class="`green : !${tieneuntema}, ${tema.estiloiconos} : ${tieneuntema} `"><span><i class="fas fa-search fa-lg"></i></span></a>
                    </div>
                    <div class="column">
                        <a href="#" @click="menu" :class="`green : !${tieneuntema}, ${tema.estiloiconos} : ${tieneuntema} `"><span><i class="fas fa-bars fa-lg"></i></span></a>
                    </div>
                </div>
            </div>
        </nav>
        <goals
        :goals="goals"
        />
    </div>
</template>

<script>
import goals  from '@/components/goals'
import { async } from 'q';
import {mapState} from 'vuex'
    export default {
        name: 'navbar',
        components: {
            goals
        },
        props:{
            tieneuntema: {
                type: Boolean,
                required: true
            },
            tema:{
                type: Object,
                required: true
            }
        },
        computed: {
        ...mapState([
        'notif', 'notis'
        ])
        },
        data(){
            return{
                homenav: false,
                goals:[],
                predefinido: 'NavS'

            }
        },
        created (){
            this.$store.dispatch('notificaciones')

        },
        mounted(){
            setInterval(() => {
            this.$store.dispatch('notificaciones')
            }, 50000)
        },
        methods: {
            home(){
                this.$router.push('/galeria')
            
            },
            destacado(){
               this.$router.push('/destacado') 
            },
            messages(){
                this.$router.push('/messages') 
            },
            menu(){
                this.$router.push('/menu')
                },
                async notificationspush(){
                   await this.truenotif()
                    this.$router.push('/notifications')
                    
                
                },
                finder(){
                    this.$router.push('/finder')
                },

                async getnotif(){
                    await  this.$axios.get('notif/getnotiview')
                    .then(response => {
                    this.notif = response.data.data
                    this.getseenders()
                    })
                    this.getgoal()
                },
                async getseenders(){
                    await this.$axios.get('notif/notisending')
                    .then(response => {
                    this.notisend = response.data.data
                    })
                },

                async getgoal(){
                    await  this.$axios.get('/account/getgoal')
                    .then(response => {
                    this.goals = response.data.data
                    })
                },
                async truenotif(){
                    await this.$axios.put('notif/notiview')
                }

            
        }
  
    }
</script>

<style>
.NavP{
    height: 32px;
    width: 100%;
    background-color: #00d1b2;
}
.NavS{
    height: 32px;
    width: 100%;
    background-color: #23d160;
}
.NavV{
    height: 32px;
    width: 100%;
    background-color: #d444cd;
}
.NavB{
    height: 32px;
    width: 100%;
    background-color: black;
}
.NavD{
    height: 32px;
    width: 100%;
    background-color: #ff3860;
}
.NavW{
    height: 32px;
    width: 100%;
    background-color: #ffdd57;
}

#Cntainernav{
    margin: none !important;
    padding-top: 3px;

}
.green{
    text-decoration: none;
    color: #178d40;

}
.white{
    text-decoration: none;
    color: white;

}
.black{
    text-decoration: none;
    color: black;

}

.gray{
    text-decoration: none;
    color: gray;

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
