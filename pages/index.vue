<template >
  <div>
      <div>
        <div id="Homepagenav">
          <div id="logo">
            <img src="logo.png">
            <h2>Scute</h2>
          </div>
        </div>
        <div id="banner">
          <div class="container">
            <div class="columns is-mobile is-centered">
              <div class="column is-10">

                <div v-if="register.valor ==1" class="form">
                  <h1 class="title is-4">¡Loggeate y gana dinero publicando tus dibujos!</h1>
                    <form @submit.prevent="login">
                      <div class="Field">
                      <div class="control">
                        <input class="input" v-model="email" type="email"  placeholder="Escribe tu Nombre de Usuario">
                      </div>
                    </div>
                    <div class="Field">
                    <div class="control">
                      <input class="input" v-model="password" type="password" placeholder="Escribe tu Contraseña" >
                    </div>
                    </div>
                    <div class="field">
                      <div class="control">
                        <button class="button is-success is-fullwidth">Login!</button>
                      </div>
                    </div>
                    <span>¿Solo vienes de visita? <a href="">¡Oprime aquí!</a></span>
                  </form>
                  <span>¿Aún no tienes cuenta? <button @click="mostrar" class="button is-success is-small">¡Registrate aquí!</button></span>
                </div>
                <div v-else class="form">
                  <h3 class="title is-4">¡Registrate y gana dinero publicando tus dibujos!</h3>
    
                <form method="post" id="Login" @submit.prevent="signup">
                      <div class="Field">
                      <div class="control">
                        <input class="input" type="text" name="name" v-model="name" v-validate="'required'"  placeholder="Escribe tu Nombre">
                      </div>
                    </div>

                        <div class="Field">
                      <div class="control">
                        <input class="input" type="text" name="username" v-model="username" v-validate="'required'"  placeholder="Escribe tu Nombre de usuario">
                      </div>
                    </div>

                    <div class="Field">
                      <div class="control">
                        <input class="input" type="e-mail" name="email" v-model="email" v-validate="'required'" placeholder="Escribe tu E-mail">
                      </div>
                    </div>

                      <div class="Field">
                      <div class="control">
                        <input class="input" type="Password" v-model="password"  placeholder="Escribe tu Contraseña">
                      </div>
                    </div>

                    <div class="field">
                      <div class="control">
                        <button class="button is-success is-fullwidth">Registrame!</button>
                      </div>
                    </div>
                    <span>Al hacer click en "Registrame!" estarás aceptando nuestros <a href="">Terminos y condiciones</a></span> <br>
                    <span>¿Solo vienes de visita? <a href="">¡Oprime aquí!</a></span>
                  </form>
                
                </div>
                

              </div>
            </div>

        </div>
          
        </div>
      </div>
      <footer><div id="foot">
            </div></footer>
  </div>
</template>

<script>


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
    fail,
  },

  data() {
    return {
      register:{valor : 1},
      error:null,
      name :'',
      username:'',
      email: '',
      password: ''
	}
  },
  mounted() {
      setTimeout(() => {
      this.moveToDashboard()
      }, 1000)
  },

    methods:{
      moveToDashboard() {
      this.$router.push('home')
    },

      async signup() {
      try {
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
        this.$router.push('newuser')
        
        

      } catch (e) {
		console.log("Error");
        console.log(e);
      }
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

        this.$router.push('home')
      } catch (e) {
        this.error = e.response.data.message
      }
    }
    


    }  
  
  
}

</script>

<style scoped>
#Homepagenav{
  
  height: 50px;
  width: 100%;
  background-color: #23d160
}
#logo{
  position: relative;
  left: 40%;
}
#Homepagenav img{
  width:  45px;
  height: 45px;
}
#Homepagenav h2{
position: relative;
display:inline-block;
font-size: 33px !important;
color: white;
bottom: 10px;
}
#banner{
  background-image: url('https://res.cloudinary.com/scute/image/upload/v1562085145/banner2-min_1_z9vzlb.png');
  width: 100%;
  height: 580px;
}
#foot{
  width: 100%;
  height: 20px;
  background-color: #23d160;
  z-index: 1;
}



.form{
  background-color: black;
  padding: 1em;
  opacity: .70;
  border-radius: 7px;
  margin-top: 5.2em;
}



.control{
  margin: 1em;
}

#tit{
  background-color:black;
  opacity: .80;
  border-radius: 7px;
  padding: 1em;
  margin-top: 1em !important;
  z-index: 2 !important;
}

h1{
  color: white;
}

</style>
