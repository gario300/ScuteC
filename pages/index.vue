<template >
  <div id="contenedorprincipal" style="width:100%; height:100%;">
    <nav class="navbar is-success">
      <figure class="image is-64x64">
        <img src="https://res.cloudinary.com/scute/image/upload/v1566791684/recursos/kkk_l5cccj.png" alt="">
      </figure>
      <h3 class="title is-4 navbar-item">Scute</h3>
    </nav>
    <div class="container">
        <div class="columns is-centered is-mobile">
          <div class="column is-12">
            <div id="box1" class="box" v-if="register.valor ==1">
              <div id="formtitle"><h1 class="title is-5">Loggeate y gana dinero dibujando</h1></div>
              <div class="form">
                <span v-if="error.tipo4 == true" class="help is-danger">Error, usuario y/o contraseña incorrectos</span>
                <form @submit.prevent="login">
                <div class="field">
                  <div class="control">
                    <input type="mail" class="input is-fullwidth" v-bind:class="{'input is-fullwidth is-danger': error.tipo4}" v-model="email" name="email"  placeholder="Escribe tu Email">
                  </div>
                </div>
                <div class="field">
                  <div class="control">
                    <input type="password" class="input is-fullwidth" v-bind:class="{'input is-fullwidth is-danger': error.tipo4}" v-model="password" placeholder="Escribe tu contraseña">
                  </div>
                </div>
                <div class="field">
                  <div class="control">
                    <button class="button is-success is-fullwidth">Login!</button>
                    <span>¿Aún no tienes cuenta? <a @click="mostrar" > ¡Registrate aquí!</a> </span> <br>
                    <span><a href="#">Olvidé mi contraseña</a></span>
                  </div>
                </div>
                </form>
              </div>
            </div>

            <div v-else id="box2" class="box">
              <div id="formtitle"><h1 class="title is-5">Registrate y gana dinero dibujando</h1></div>
               <div class="form">
                <form @submit.prevent="signup">
                <span v-if="error.tipo3 == true" id="error" class="help is-danger">Verifica los siguientes datos, usuario y/o e-mail ya existentes</span>
               <div class="field">
                    <div class="control">
                      <label>Escribe tu nombre</label>
                      <input type="text" class="input is-fullwidth" v-bind:class="{'input is-fullwidth is-danger': error.tipo3}" v-model="name" name="name" v-validate="'required'" placeholder="No mayor a 10 Caracteres">
                    </div>
                  </div>
                  <div class="field">
                    <div class="control">
                      <label>Escribe tu nombre de usuario</label>
                      <input type="text" class="input is-fullwidth" v-bind:class="{'input is-fullwidth is-danger': error.tipo3}" name="username" v-validate="'required'" v-model="username" placeholder="No mayor a 10 Caracteres">
                    </div>
                  </div>
                  <div class="field">
                    <div class="control">
                      <label>Escribe tu Email</label>
                      <input type="email" v-bind:class="{'input is-fullwidth is-danger': error.tipo3}" class="input is-fullwidth" name="email" v-validate="'required'" v-model="email" placeholder="Una dirección Valida">
                    </div>
                  </div>
                  <div class="field">
                    <div class="control">
                      <label>Escribe tu contraseña</label>
                      <input type="password" class="input is-fullwidth" v-bind:class="{'input is-fullwidth is-danger': error.tipo1}" v-model="password" placeholder="No menor a 10 Caracteres">
                      <span class="help is-danger" id="error" v-if="error.tipo1 == true">Ambas contraseñas no coinciden</span>
                    </div>
                  </div>
                  <div class="field">
                    <div class="control">
                      <label>Confirma tu contraseña</label>
                      <input type="password" class="input is-fullwidth" v-bind:class="{'input is-fullwidth is-danger': error.tipo1}" v-model="confirmpassword" placeholder="Escribe nuevamente tu contraseña">
                      <span id="error" class="help is-danger" v-if="error.tipo1 == true">Ambas contraseñas no coinciden</span>
                    </div>
                  </div>
                  <div class="field">
                    <div class="control">
                      <button class="button is-fullwidth is-success" v-if="this.error.cargando == false">Registrame!</button>
                      <button class="button is-fullwidth is-success is-loading" v-else>Registrame!</button>
                      <span>Al hacer click en "Registrame!" estarás aceptando nuestros <a href="">Terminos y condiciones</a></span>
                    </div>
                  </div>
                  </form>
                </div>
            </div>
          
          </div>
        </div>
        <div v-if="register.valor == 1" class="columns is-centered">
          <div id="formtitle" class="column is-12">
            <figure  class="image is-128x128">
              <img src="https://res.cloudinary.com/scute/image/upload/v1566837591/recursos/IgnorantSilverIsabellineshrike-max-1mb_qxrqn1.gif" alt="">
            </figure>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import VeeValidate from 'vee-validate'

/*class uregister{
  constructor(name, username, email, password){
    this.name = name;
    this.username = username;
    this.email = email;
    this.password = password;
  }
}*/

export default {

  components: {
  },

  data() {
    return {
      register:{valor : 1},
      error:null,
      name :'',
      username:'',
      email: '',
      password: '',
      confirmpassword:'',
      error:{tipo1: false, cargando:false, tipo3:false, tipo4:false }
	}
  },
  created(){
  },
  mounted() {
      setTimeout(() => {
      this.moveToDashboard()
      }, 1000)
  },

    methods:{
      moveToDashboard() {
      this.$router.push('galeria')
    },

      async signup() {
      if(this.password == this.confirmpassword){
      try {
        this.error.cargando = true
        await this.$axios.post('signup', {
          name: this.name,
          username: this.username,
          email: this.email,
          password: this.password
        })
		
		console.log("local");
        await this.$auth.loginWith('local', {
          data: {
            email: this.email,
            password: this.password
          }
        

        })
        console.log('holamundo');
        
        this.$router.push('putuser')
        
        

      } catch (e) {
    console.log("Error");
        this.error.tipo3 = true
        console.log(e);
      }
    } else{
      this.error.tipo1 = true
    }
    this.error.cargando = false
    },
      
    mostrar (){

      if (this.register.valor == 1){
        this.register.valor ++;
      }
    },
    
    async login() {
      try {
        await this.$auth.loginWith('local', {
          data: {
            email: this.email,
            password: this.password
          }
        })

        this.$router.push('galeria')
      } catch (e) {
        this.error.tipo4 = true
      }
    },
    


    }  
  
  
}

</script>

<style scoped>


nav{
  display:flex;
  justify-content: center;
}
h3{
  margin:0% !important;
  padding-left: 0px !important;
  color:white;
}

.box{
  background-color: black;
  opacity: .70; 
  padding: 10px;
}

#contenedorprincipal{
  background-image: url('https://res.cloudinary.com/scute/image/upload/v1562085145/banner2-min_1_z9vzlb.png'); 
  position: absolute;
  height:100%;
  overflow-x:hidden !important;
  overflow-y: visible;
  background-repeat: repeat 
}

#formtitle{
  width: 100%;
  display:flex;
  justify-content: center;
  margin-bottom: 15px;
}

h1{
  font-weight: 700;
  color: white;
  opacity: 1;
}

.box input,button{
  opacity: 1 !important;
}

.box{
  margin-top: 4em;
}

#box2{
  margin-top: .5em;
}
#error, input{
  margin-bottom: 0px !important;
}


</style>
