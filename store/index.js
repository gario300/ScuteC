export const strict = false
export const state = () => ({
  
    currentuser:{},
    following: [],
    goals: []
  })
  
  export const actions = {
    getusuario ({commit}){
        this.$axios.get('/account/me')
                    .then(response => {
                        console.log(response.data.data)
                        let currentuser = response.data.data
                        let following = response.data.data.following
                        let goals = response.data.data.goals
                        commit ('set_following', following)
                        commit('set_currentuser', currentuser)
                        commit('set_goals', goals)
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
  set_goals(state, goals){
    state.goals = goals
}
 
    
  }
  
 