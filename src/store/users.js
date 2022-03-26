import axios from "@/api/axios";


export default ({
    namespaced: true,
    state: {
        pagination:0,
        singleUser:null,
        users:[],
    },
    getters: {
        getUsers: (state) => state.users,
        getUser: (state) => (id) => state.users.find( user => user.id == id),
        getPagination: (state) => state.pagination,
        getSingleUser: (state) => state.singleUser,
    },
    mutations: {
        setUsers(state,data){
            state.users = data;
        },
        setPagination(state, data){
            state.pagination = data
        },
        setSingleUser(state, user){
            state.singleUser = user
        },
        deleteSingleUser(state, id){
            state.users= state.users.filter(user => user.id != id)
        },
        updateSingleUser(state, user){
            state.users.map((person)=>{
                if(person.id == user.id){
                    person.first_name = user.data.name
                    person.job = user.data.job
                }
            })
        }
    },
    actions: {
        callUsers({commit}, page){
            if(page === null){
                axios.get(`/users`).then((response)=>{
                    commit('setPagination', 0)
                    commit('setUsers', response.data.data)
                }).catch((err)=>{
    
                }) 
            }else{
                axios.get(`/users?page=${page}`).then((response)=>{
                    commit('setPagination', response.data.total_pages)
                    commit('setUsers', response.data.data)
                }).catch((err)=>{
    
                })
            }
        },
        callSingleUser({commit}, id){
            axios.get(`/users/${id}`).then((response)=>{
                commit('setSingleUser',response.data.data)
            }).catch((err)=>{

            })
        },
        userDelete({commit}, id){
            axios.delete(`/users/${id}`).then((response)=>{
                commit('deleteSingleUser',id)
            }).catch((err)=>{

            })
        },
        updateUser({commit}, user){
            axios.put(`/users/${user.id}`,user.data).then((response)=>{
                commit('updateSingleUser', user)
                return response.data
            }).catch((err)=>{

            })
        },
        createUser(_, user){
            axios.post('/users', user).then((response)=>{
                // commit('updateSingleUser', user)
                return response.data
            }).catch((err)=>{

            })
        }
    },
})
