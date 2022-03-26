<template>
    <div class="d-flex justify-content-center" v-if="singleUser">
        <b-card
            :title="`${singleUser.first_name} ${singleUser.last_name}`"
            :img-src="singleUser.avatar"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem;"
            class="mb-2"
        >
        <p>First Name: {{singleUser.first_name}}</p>
        <p>Last Name: {{singleUser.last_name}}</p>
        <p>Id: {{singleUser.id}}</p>
        <p>E-mail: {{singleUser.email}}</p>

        </b-card>
    </div>    
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    props:['id'],
    created(){
        this.$store.dispatch('users/callSingleUser', this.id)
    },
    computed: {
      ...mapGetters({
        singleUser : 'users/getSingleUser',
      }),
    }  
 
}
</script>

<style scoped>
.mx-10-auto{
    margin: 10px auto;
}
</style>