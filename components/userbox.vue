<template>
    
</template>

<script>
    export default {
        middleware: ['auth'],
        name:'userbox',
        
        data(){
            
            return{
                yo:{},
                image:'',
                imagepreview : false,
                vimodel: ''
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
            },
            //imagen
            onFileChange(e) {
                let files = e.target.files || e.dataTransfer.files;
                if (!files.length)
                return;
                this.createImage(files[0]);
                this.imagepreview = true
                },
            createImage(file) {
                let image = new Image();
                let reader = new FileReader();
                let vm = this;

                reader.onload = (e) => {
                    vm.image = e.target.result;
                };
                reader.readAsDataURL(file);
                },
                removeImage: function (e) {
                this.image = '';
                this.imagepreview = false;
                }
        }
    }
</script>

<style scoped>
#avatar{
    max-height: 80px !important;
    max-width: 80px !important;
    width: 80px !important;
    height: 80px !important;
}
#post{
    margin-top: 20px !important;
}



#cajaimagen{
    margin-top: 10px;
}
#quitar{
    margin-bottom: 10px;
}


</style>