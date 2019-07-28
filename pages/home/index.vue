<template>
    <div>
        <navbar></navbar>


        <!-- Userbox -->
    <div class="container">
       <div id="columnbox" class="columns is-centered ">
                <div class="column is-half">                    
                    <div class="box">
                        <article id="media" class="media">
                        <div class="media-left">
                                <figure class="image is-256x256">
                                    <img id="avatar" class="is-rounded" :src="`${yo.avatar}`">
                                 </figure>
                        </div>
                        <div class="mediacontent">
                            <div class="content">
                                <form @submit.prevent="post(yo.id)">
                                    <div class="columns is-centered is-mobile">
                                        <div class="column is-9">
                                            <textarea v-model="textinbox" class="textarea is-success is-large" placeholder="Publica algo..."  @postinbox="vimodel = $event"></textarea>
                                        </div>
                                        <div class="column" >
                                            
                                            <div class="file is-success  is-fullwidth">
                                                <label class="file-label">
                                                    <input class="file-input" type="file" name="image" accept="image/png, image/jpeg" @change="onFileChange">
                                                    <span class="file-cta">
                                                        <i class="far fa-images fa-lg"></i>
                                                    </span>
                                                </label>
                                            </div>
                                           
                                            <button id="post" class="button  is-normal is-success">Post</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        </article>
                        
                        <template v-if="imagepreview == true" >
                            <div class="columns is-centered is-mobile">
                                <div class="column is-half">
                                    <div id="cajaimagen" class="box">
                                        <button id="quitar" class="button is-danger is-fullwidth" @click="removeImage">Quitar</button>
                                        <figure class="image is-4by3">
                                            <img id="imagensubir"  alt="Image" :src="image">
                                        </figure>
                                    </div>
                                </div>
                            </div>
                        </template>
                    
                    </div>
                </div>
            </div>

   
        
        <!-- Userbox -->



        <!-- Post-box -->
        <div class="colums">
            <div class="column is-8 is-offset-2">
                <div  class="box">
                    <div v-for="post in posts" class="box">
  <article class="media">
    <div class="media-left">
      <figure class="image is-64x64">
        <img class="is-rounded" :src="post.user.avatar">
      </figure>
    </div>
    <div class="media-content">
      <div class="content">
        <p>
          <strong>{{post.user.username}}</strong>
          <br>
          {{post.post}}
        </p>
      </div>
      <div v-show="post.image !== null" class="box">
        <figure class="image">
            <img :src="post.image">
        </figure>
    </div>
      <nav class="level is-mobile">
        <div class="level-left">
          <a class="level-item" aria-label="reply">
            <span class="icon is-small">
              <i class="fas fa-reply" aria-hidden="true"></i>
            </span>
          </a>
          <a class="level-item" aria-label="retweet">
            <span class="icon is-small">
              <i class="fas fa-retweet" aria-hidden="true"></i>
            </span>
          </a>
          <a class="level-item" aria-label="like">
            <span class="icon is-small">
              <i class="fas fa-heart" aria-hidden="true"></i>
            </span>
          </a>
        </div>
      </nav>
    </div>
  </article>
    
</div>

                </div>

            </div>
        </div>
        <!-- Post-box -->
         </div>
        

    </div>
</template>

<script>
import navbar from '../../components/navbar'
import userbox from '../../components/userbox'
    
    export default {
        middleware: ['auth'],
        components:{
            navbar
        },
        data(){
            return{
                textinbox: '',
                yo:{},
                image:'',
                file:{},
                imagepreview : false,
                vimodel: '',
                posts:[]

            }
        },
        created(){
            this.me()
            this.timeline()
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
                this.file = files[0];
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
                console.log  (this.image)
                console.log  (this.file)
                },
                //postear
            post (id){
                this.$axios.post('/post', {
                    user_id : id,
                    post: this.textinbox,
                    image : this.image

                })
                .then(userresponse => {
                    console.log('Listo');
                    this.image = '';
                    this.textinbox = '';
                    this.imagepreview = false;
                }).catch (e =>{
                    console.log(e)
                })
            },
            timeline(){
                this.$axios.get('/users/timeline')
                .then(response => {
                    this.posts = response.data.data.reverse()
                    console.log(this.posts)
                }).catch (e =>{
                    console.log(e)
                })
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
#media{
    display:flex;
    justify-content: center;
}
#columnbox{
    margin-top: 25px;
}

</style>