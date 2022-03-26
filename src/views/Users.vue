<template>
  <div class="px-4">
      <b-button variant="info" class="mt-2" @click="showCreatePopup">CREATE USER</b-button>
      <b-table striped hover  :items="getUsers" responsive="sm" class="text-center">
        <template #cell(avatar)="data">
          <router-link :to="`user/${data.item.actions}`">
            <img :src="data.item.avatar"/>
          </router-link>
        </template>

        <template #cell(full_name)="data">
          <router-link :to="`user/${data.item.actions}`">{{ data.item.full_name }}</router-link>
        </template>

        <template #cell(actions)="data">
          <b-button variant="warning" @click="showUpdatePopup(data.item.actions)">Update</b-button>
          <b-button variant="danger" class="marginl-10" @click="showDeletePopup(data.item.actions)">Delete</b-button>
        </template>
      </b-table>

      <b-modal ref="delete-modal" hide-footer hide-header>
        <div class="d-block text-center">
          <h3>Do you sure to delete?</h3>
        </div>
        <div class="d-flex justify-content-center">
          <div>
            <b-button  variant="outline-danger" block @click="deleteUser">Yes</b-button>
          </div>
          <div class="marginl-10">
            <b-button  variant="outline-info" block @click="hideDeleteModal">No</b-button>
          </div>
        </div>
      </b-modal>

      <b-modal v-model="updateModalShow"  hide-footer hide-header>
        <div class="d-block text-left">
          <b-form @submit.prevent="updateUser">
            <b-form-group
              id="input-group-1"
              label="Name:"
              label-for="input-1"
            >
              <b-form-input
                id="input-1"
                v-model="form.name"
                type="text"
                placeholder="Enter Name"
              ></b-form-input>
              <p class="text-danger text-error">{{err.name}}</p>
            </b-form-group>

            <b-form-group id="input-group-2"  class="mt-1" label="Job:" label-for="input-2">
              <b-form-input
                id="input-2"
                type="text"
                v-model="form.job"
                placeholder="Enter Job"
              ></b-form-input>
              <p class="text-danger text-error">{{err.job}}</p>
            </b-form-group>

            <div class="d-flex flex-row-reverse">
              <b-button  variant="outline-info" block type="submit">Save</b-button>
            </div>
          </b-form>
        </div>
      </b-modal>


      <b-modal v-model="createModalShow"  hide-footer hide-header>
        <div class="d-block text-left">
          <b-form @submit.prevent="createUser">
            <b-form-group
              id="input-group-1"
              label="Name:"
              label-for="input-1"
            >
              <b-form-input
                id="input-1"
                v-model="form.name"
                type="text"
                placeholder="Enter Name"
              ></b-form-input>
              <p class="text-danger text-error">{{err.name}}</p>
            </b-form-group>

            <b-form-group id="input-group-2"  class="mt-1" label="Job:" label-for="input-2">
              <b-form-input
                id="input-2"
                type="text"
                v-model="form.job"
                placeholder="Enter Job"
              ></b-form-input>
              <p class="text-danger text-error">{{err.job}}</p>
            </b-form-group>

            <div class="d-flex flex-row-reverse">
              <b-button  variant="outline-info" block type="submit">create</b-button>
            </div>
          </b-form>
        </div>
      </b-modal>
      
      <div v-if="users.length">
        <span  v-for="num in pagination" :key="num"
          :class="activePage == num ? 'text-info pagination-num': 'text-white pagination-num'"
          @click="changePage(num)"
        >
        {{ num }}
        </span>
      </div>
  </div>
</template>

<script>
import users from '@/store/users'
import {mapGetters} from "vuex";
export default {
  created(){
      this.$store.dispatch('users/callUsers', this.$route.query.page ? this.$route.query.page : null)
  },
  data(){
    return{
      singleId: null,
      createModalShow: false,
      updateModalShow: false,
      form: {
        name: '',
        job: ''
      },
      err: {
        name: '',
        job: ''
      },
      fields: [
        'index',
        'avatar',
        'full_name',
        'email',
        'actions'
      ],
      checkClicked: false,
      activePage: this.$route.query.page ? this.$route.query.page : null
    }
  },
  methods:{
    changePage(num){
      if(this.activePage != num){
        this.activePage = num;
        this.$store.dispatch('users/callUsers', num)
        this.$router.push({name: 'Users', query:{page: num}})
      }
    },
    showDeletePopup(id){
      this.singleId = id;
      this.$refs['delete-modal'].show()
    },
    deleteUser(){
      this.$store.dispatch('users/userDelete', this.singleId)
      this.$refs['delete-modal'].hide()
    },
    hideDeleteModal(){
      this.$refs['delete-modal'].hide()
    },
    showUpdatePopup(id){
      this.singleId = id;
      const user = this.$store.getters['users/getUser'](id)
      if(user.first_name){
        this.form.name = user.first_name
      }else{
        this.form.name = ''
      }
      if(user.job){
        this.form.job = user.job
      }else{
        this.form.job = ''
      }
      this.updateModalShow = true
    },
    updateUser(){
      this.checkClicked = true
      this.checkNameValid();
      this.checkJobValid();
      if(!this.err.name.length && !this.err.job.length){
        this.$store.dispatch('users/updateUser', { id:this.singleId, data: this.form }).then((data)=>{
          this.updateModalShow = false
        })
      }
    },
    showCreatePopup(){
      this.form.name = ''
      this.form.job = ''
      this.createModalShow = true
    },
    createUser(){
      this.checkClicked = true
      this.checkNameValid();
      this.checkJobValid();
      if(!this.err.name.length && !this.err.job.length){
        this.$store.dispatch('users/createUser', this.form).then((data)=>{
          this.createModalShow = false
        })
      }
    },
    checkNameValid() {
        if(!this.form.name.length){
          this.err.name = 'This field is required'
        }else if(!/^[a-z ,.'-]+$/i.test(this.form.name)){
          this.err.name = 'The Name is not right'
        }else{
          this.err.name = ''
        }
    },
    checkJobValid() {
      if(!this.form.job.length){
        this.err.job = 'This field is required'
      }else{
        this.err.job = ''
      }
    }
  },
  computed: {
    ...mapGetters({
      users : 'users/getUsers',
      pagination : 'users/getPagination',
    }),
    getUsers(){
      return this.users.reduce((acc, user, key)=>{
        acc.push({
          index: this.activePage ? key+1+6*(this.activePage-1) : key+1,
          avatar: user.avatar,
          full_name: `${user.first_name} ${user.last_name}`,
          email: user.email,
          actions: user.id
        })
        return acc
      },[])
    },
  },
  watch: {
    form:{
      handler(){
        if(this.checkClicked){
            this.checkNameValid()
            this.checkJobValid()
        }
      },
      deep: true,
    },
    updateModalShow(value){
      if(!value){
        this.checkClicked = false
        this.err.name = ''
        this.err.job = ''
      }
    },
    createModalShow(value){
      if(!value){
        this.checkClicked = false
        this.err.name = ''
        this.err.job = ''
      }
    }
  }

}
</script>

<style scoped>
.pagination-num{
  cursor: pointer;
  background-color: black;
  padding: 5px 10px;
  margin-left:1px;
  font-size: 16px;
  font-weight: bold;
}
.marginl-10{
  margin-left: 10px;
}
.text-error{
  height: 20px;
}
</style>