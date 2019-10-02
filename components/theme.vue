<template>
    <div>
        <div id="previo" v-bind:style="{ 'background-image': 'url(' + image1 + ')' }">
                       <nav :class="`${navbr}`">
                           <div class="container" id="Cntainernav">
                                <div class="columns is-mobile is-gapless">
                                    <div class="column" >
                                        <a :class="`${icons}`" href="#"><span><i class="fas fa-camera-retro fa-lg"></i></span></a>
                                    </div>
                                    <div class="column">
                                        <a href="#" :class="`${icons}`"><span ><i class="fas fa-bell fa-lg"></i></span></a>
                                    </div>
                                    <div class="column ">
                                        <a href="#" :class="`${icons}`"><span><i class="fas fa-envelope fa-lg"></i></span></a>
                                    </div>
                                    <div class="column ">
                                        <a href="#"  :class="`${icons}`"><span><i class="fas fa-star fa-lg"></i></span></a>
                                    </div>
                                    <div class="column">
                                        <a href="#" :class="`${icons}`"><span><i class="fas fa-search fa-lg"></i></span></a>
                                    </div>
                                    <div class="column">
                                        <a href="#" :class="`${icons}`"><span><i class="fas fa-bars fa-lg"></i></span></a>
                                    </div>
                                </div>
                            </div>
                       </nav>
                        <div id="columnbox" class="columns is-centered ">
                <div class="column is-12">                    
                    <div class="box" v-bind:style="{ 'background-image': 'url(' + image2 + ')' }">
                        <article id="media" class="media">
                        <div class="media-left">
                                <figure class="image is-64x64">
                                    <img id="avatar" class="is-rounded" :src="`${currentuser.avatar}`">
                                 </figure>
                        </div>
                        <div class="mediacontent">
                            <div class="content">
                                <form>
                                    <div class="columns is-centered is-mobile">
                                        <div class="column is-9">
                                            <textarea :class="`textarea is-${apariencia} is-large`" placeholder="Así lucirá tu tema"></textarea>
                                            <span id="contador" :class="`help is-${apariencia}`">
                                                300
                                            </span>

                                        </div>
                                        <div class="column" >
                                            
                                            <div :class="`file is-${apariencia} is-fullwidth`">
                                               <label class="file-label">
                                                    <span class="file-cta">
                                                        <i class="far fa-images fa-lg"></i>
                                                    </span>
                                                </label> 
                                            </div>
                                           
                                            <button id="post" :class="`button is-normal is-${apariencia}`">Post</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        </article>
                    </div>
                </div>
            </div>
            <div class="colums">
                <div id="columna" class="column is-12">
                    <div  class="box" v-bind:style="{ 'background-image': 'url(' + image3 + ')' }">
                            <article  class="media">
                                <div  class="media-left">
                                <figure  class="image is-64x64">
                                <img id="postuserimage" class="is-rounded" :src="currentuser.avatar">
                                </figure>
                                </div>
                                <div id="barra" class="media-content">
                                <div class="content">     
                                    <p :class="`has-text-${text}`">
                                    <strong :class="`has-text-${text}`">{{currentuser.username}}</strong>  <small>Hace mil años</small>  
                                    
                                    <br>
                                    Esta será la apariencia en los posts!
                                    </p>
                                    
                                </div>  
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
        name: 
            'previa',
        props: {
            currentuser:{
                type: Object,
                required: true
            },
            navbr: {
                type: String,
                required: true
            },
            icons:{
                type: String,
                required: true
            },
            apariencia:{
                type: String,
                required: true
            },
            text:{
                type: String,
                required: true
            },
            image1:{
                type: String,
                required: true
            },
            image2:{
                type: String,
                required: true
            },
            image3:{
                type: String,
                required: true
            },
            width:{
                type: String,
                required: false
            },
            heigth:{
                type: String,
                required: false
            }
        }
        
    }
</script>

<style scoped>



#previo{
    width: 320px;
    height: 480px;
    border: 1px solid black;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100% ;
    background-color: white;
}

textarea{
    overflow: hidden;
}

img{
    max-height: 64px !important;
    max-width: 64px !important;
    width: 64px !important;
    height: 64px !important;
}
button{
    margin-top: 15px !important;
}
.box{
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100% ;
}

#contador{
    float: right !important;
}
</style>