<template>
    <b-navbar class="px-4" toggleable="lg" type="light" variant="info">
        <b-navbar-brand href="#">NavBar</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
            <b-nav-item>
                <router-link to="/">Home</router-link>
            </b-nav-item>
            <b-nav-item>
                <router-link :to="{name: 'Users', query:{page:1}}">Users</router-link>
            </b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
            <b-nav-item @click="logout">Logout</b-nav-item>
        </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
export default {
    methods:{
        logout(){
            this.$store.dispatch('auth/logout').then(()=>{
                this.$router.push({name: 'Login'})
            })
        }
    }
}
</script>

<style scoped>
.ml-auto{
    margin-left: auto;
}
</style>