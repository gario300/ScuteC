<template>
    <div class="container">
        {{message}}

    </div>
</template>

<script>
    export default {
        name: 'fail',
        
        props: {
            message: {
                type: String,
                required: true,
            },
            type: {
                type: String,
                required: true,
            },
        },
    };
    
</script>

<style lang="scss" scoped>

</style>