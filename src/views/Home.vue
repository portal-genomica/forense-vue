<template>
  <body>
    <div class="wrapper">
        <aside class="navbar navbar-vertical navbar-expand-lg navbar-dark" v-on:click="printCategories">
            <div class="container-fluid">
                <navbar :categories="categories" v-bind:user="user"></navbar>
            </div>
        </aside>
        <div class="page-wrapper">
            <div class="page-body">
                <div class="container-xl" v-if="ready">
                  <router-view/>                            
                </div>
            </div>
        </div>
    </div>
  </body>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'Home',
  data: function(){
    return {
      user: JSON.parse(localStorage.getItem('user')),
      ready: true,
      categories: []
    }
  },
  mounted: async function(){
    const response = await this.$root.checkToken()
    
    if(response == false){
      this.$router.push({name: 'Login'})
    } else {
      this.$router.push({name: 'Profile'})
    }
    console.log(await this.$root.getRequest('phenotypes/'+this.user.id))
    this.getCategories()
  },
  components: {
    Navbar
  },
  methods: {
    getCategories: async function (){
      const categoriesResponse = await this.$root.getRequest('categories/')
      const categoriesJson = await categoriesResponse.json()

      this.categories = categoriesJson.data

    }
  }
}
</script>
