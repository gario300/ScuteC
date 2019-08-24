export const strict = false
export const state = () => ({
  
    currentuser:[],
    following: []
  })
  
  export const actions = {
    getusuario ({commit}){
        this.$axios.get('/account/me')
                    .then(response => {
                        console.log(response.data.data)
                        let currentuser = response.data.data
                        let following = response.data.data.following
                        commit ('set_following', following)
                        commit('set_currentuser', currentuser)
                    })
    }
        
  }

  export const mutations = {
    set_currentuser(state, currentuser){
        state.currentuser = currentuser
    },
    set_following(state, following){
      state.following = following
  }
 
    
  }
  
 