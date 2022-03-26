import axios from "@/api/axios";


export default ({
    namespaced: true,
    state: {
        token: null,
        isLoggedInUser: false,
    },
    getters: {
        getToken: (state) => state.token,
        getIsLoggedIn: (state) => state.isLoggedInUser,
    },
    mutations: {
        setRegisterData(state,data){
            state.registerData = data;
        },
        isLoggedInUser(state, data){
            state.token = data.token
            state.isLoggedInUser = data.isLoggedInUser
        }
    },
    actions: {
        logIn ({ commit }, data) {
            return new Promise((resolve, reject) => {
                axios.post('/login', data).then(({data})=>{
                    localStorage.setItem('token', data.token)
                    commit('isLoggedInUser', { token: data.token, isLoggedInUser:true })
                    resolve(data.token)
                }).catch((err)=>{
                    reject(err.response.data.error)
                })
            })
                
        },
        logout ({commit}){
            return new Promise((resolve) => {
                localStorage.removeItem('token')
                commit('isLoggedInUser', { token: null, isLoggedInUser: false })
                resolve(true)
              })
        },
        async isAuth ({state,commit}, token){
            //stegh petq a auth call anenq back vor jokenq es token@ valid a te che
            // ((vorovhetev chka auth api
            if(token){
                commit('isLoggedInUser', { token: state.token, isLoggedInUser: true })
            }else{
                commit('isLoggedInUser', { token: null, isLoggedInUser: false })
            }
            return true   
        }
    },
})
