export const strict = false
export const state = () => ({
  
    currentuser:{},
    following: [],
    tieneuntema: false,
    tema: {},
    primeracarga: true,
    segundacarga: false,
    notif: 0,
    notis: 0,
    userthemes:[]
  })
  
  export const actions = {
    async getusuario ({commit}){
        await this.$axios.get('/account/me')
                    .then(response => {
                        let currentuser = response.data.data
                        let following = response.data.data.following
                        commit ('set_following', following)
                        commit('set_currentuser', currentuser)
  
                    })
    },
    async notificaciones({commit}){
      await this.$axios.get('notif/getnotiview')
        .then(response => {
          let notif = response.data.data
        commit('set_notif', notif)
        
        })
      await this.$axios.get('notif/notisending')
        .then(response => {
          let notisend = response.data.data
        commit('set_notis', notisend)
       
        })
        

    },
    async gettema({commit}){
        await this.$axios.get('/theme/currentheme')
        .then(response => {
          if (response.data.data !== null){

          let respuesta= response.data.data
          let tieneuntema = true

          let tema = {background : respuesta.background,
          colortexto: 'has-text-'+respuesta.colortexto,
          estilonavbar: respuesta.estilonavbar,
          estiloiconos: respuesta.estiloiconos,
          estilohelp: 'help is-'+respuesta.estilopagina,
          estilotextarea: 'textarea is-'+respuesta.estilopagina+' is-large',
          estilobuttonindex: 'button is-'+respuesta.estilopagina+' is-normal',
          estilofileindex: 'file is-'+respuesta.estilopagina+' is-fullwidth',
          background: respuesta.background, 
          userbox:respuesta.userbox, 
          postbox: respuesta.postbox,
          estilotexto: 'has-text-'+respuesta.colortexto,
          buttons: 'button is-'+respuesta.estilopagina,
          buttonfullwidth: 'button is-'+respuesta.estilopagina+' is-fullwidth',
          file:'file is-'+respuesta.estilopagina,
          filesmall:'file is-'+respuesta.estilopagina+' is-small',
          inputrounded: 'input is-rounded is-'+respuesta.estilopagina,
          inputreply:'input is-'+respuesta.estilopagina+' is-medium',
          buttonreply: 'button is-'+respuesta.estilopagina+' is-medium',
          select:'select is-rounded is-'+respuesta.estilopagina,
          inputfullwidth:'input is-'+respuesta.estilopagina+' is-fullwidth',
          temaid: respuesta.id, temanombre:respuesta.nombretema}
          
          commit('tiene_tema', tieneuntema)
          commit('set_tema', tema)

          } else {
            let tieneuntema = false
            let tema = {}
            console.log(tieneuntema)
            commit('tiene_tema', tieneuntema)
            commit('set_tema', tema)
          }

        })
      
    },
    async temas(){
      await this.$axios.get('/tienda/temasusuario')
      .then(response => {
        let userthemes = response.data.data.themes
        console.log(userthemes)
        commit ('set_themes', userthemes)

      })
    }

        
  }

  export const mutations = {
    set_currentuser(state, currentuser){
        state.currentuser = currentuser
    },
    set_following(state, following){
      state.following = following
    },
    tiene_tema(state, tieneuntema){
      state.tieneuntema = tieneuntema
    },
    set_tema(state, tema){
      state.tema = tema
    },
    set_notif(state, notif){
      state.notif = notif
    },
    set_notis(state, notis){
      state.notis = notis
    },
    
    set_themes(state, userthemes){
      state.userthemes = userthemes
    }
 
    
  }
  
 