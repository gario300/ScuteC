<template>
    <div class="container">
        <div class="columns">
            <div class="column is-12">
                <table class="table is-bordered is-striped is-hoverable is-fullwidth">
                    <thead>
                        <th>
                            Lugar
                        </th>
                        <th>
                            Usuario
                        </th>
                        <th>
                            Puntos
                        </th>
                    </thead>
                    <tbody>
                        <tr v-for="(position, index) in positions" v-if="index !== 0">
                            <th>{{index}}</th>
                            <td>{{position.username}}</td>
                            <td>{{position.puntos}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        

    </div>
</template>

<script>
    export default {
        name:
            'royal',
        props: {
            positions:{
                type: Array,
                required: true
            }
        },
        created(){
        },
        methods:{
            

        }

        
    }
</script>

<style lang="scss" scoped>

</style>