<template>
    <div id="container">

        <div class="columns">
            <div class="column is-4 is-offset-8">
                <div id="notificacion" class="notification is-primary">
                    <button class="delete"></button>
                        Primar lorem ipsum dolor sit amet, consectetur
                        adipiscing elit lorem ipsum dolor. <strong>Pellentesque risus mi</strong>, tempus quis placerat ut, porta nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida purus diam, et dictum <a>felis venenatis</a> efficitur. Sit amet,
                        consectetur adipiscing elit
                    </div>
                </div>
        </div>
        

    </div>
</template>

<script>
    export default {
        name: 'goals'
        
    }
</script>

<style scoped>


#notificacion{
    background-color: black !important;
    opacity: .70;
    position:fixed;
    z-index: 3;

}

</style>