<template>
    <div>
        <div class="container">
            <div class="columns is-centered">
                <div class="column is-half">
                    <div class="box">
                        <article class="media">
                            <div class="media-left">
                                <figure class="image is-64x64">
                                    <img :src="`${yo.avatar}`">
                                </figure>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'userbox'
        
    

    }
</script>

<style lang="scss" scoped>

</style>