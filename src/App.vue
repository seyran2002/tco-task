<template>
  <div id="app">
    <header-menu v-if="checkRout"/>
    <div v-if="isPending"  class="loading">
        <spinner class="spinner"/>
    </div>
    <router-view/>
  </div>
</template>

<script>
import HeaderMenu from './components/HeaderMenu'
import Spinner from './components/loading/Spinner'
import {mapGetters} from "vuex";
export default {
  components:{
    'header-menu':HeaderMenu,
    'spinner': Spinner
  },
  computed:{
    ...mapGetters({
        isPending : 'getIsPending'
    }),
    checkRout(){
      if(this.$store.getters['auth/getIsLoggedIn']){
        return true
      }
      return false
    }
  },
}
</script>

<style scoped>
.loading{
  background-color: rgba(0,0,0,0.1);
  backdrop-filter: blur(8px);
  position: fixed;
  top:0px;
  left: 0px;
  z-index: 100%;
  width: 100%;
  height: 100%;
}
.spinner{
  position: fixed;
  top: 50%;
  left:50%;
  transform: translate(-50%, -50%);
}
</style>
