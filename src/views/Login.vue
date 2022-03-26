<template>
  <div class="login mx-auto">
    <h1 class="text-center my-4">Login</h1>
    <b-form @submit.prevent="onSubmit">
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          placeholder="Enter email"
        ></b-form-input>
        <p class="text-danger text-error">{{err.email}}</p>
      </b-form-group>

      <b-form-group id="input-group-2"  class="mt-1" label="Password:" label-for="input-2">
        <b-form-input
          id="input-2"
          type="password"
          v-model="form.password"
          placeholder="Enter password"
        ></b-form-input>
        <p class="text-danger text-error">{{err.password}}</p>
      </b-form-group>

      <div class="text-center mt-1">
        <b-button type="submit"  variant="primary">Submit</b-button>
      </div>
    </b-form>

    <b-modal ref="errorModal" hide-footer hide-header>
      <div class="d-block text-center">
        <h3 class="text-danger">Oops!</h3>
        <p class="text-center text-danger">{{error}}</p>
      </div>
    </b-modal>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          email: '',
          password: '',
        },
        err: {
          email: '',
          password: '',
        },
        error: '',
        checkSubmit: false,
      }
    },
    methods: {
      onSubmit() {
        this.error = ''
        this.checkSubmit = true;
        this.checkEmailValid()
        this.checkPasswordValid()
        if(!this.err.email.length && !this.err.password.length){
         this.$store.dispatch('auth/logIn', this.form).then((res)=>{
           this.$router.push({name:'Users', query:{page: 1}})
         }).catch((err)=>{
           this.error = err;
           this.$refs.errorModal.show()
         })
        }
      },
      checkEmailValid() {
        if(!this.form.email.length){
          this.err.email = 'This field is required'
        }else if(!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.form.email)){
          this.err.email = 'This E-mail is not valid'
        }else{
          this.err.email = ''
        }
      },
      checkPasswordValid() {
        if(!this.form.password.length){
          this.err.password = 'This field is required'
        }
        else if(this.form.password.length<8){
          this.err.password = 'Password must be more than 8 symbols'
        }else{
          this.err.password = ''
        }
      }
    },
    watch: {
      form:{
        handler(){
          if(this.checkSubmit){
            this.checkEmailValid()
            this.checkPasswordValid()
          }
        },
        deep: true,
      }
    }
  }
</script>

<style scoped>
.text-error{
  height: 20px;
}
.login{
  width: 40vw;
}
.mx-auto{
  margin: auto;
}
</style>