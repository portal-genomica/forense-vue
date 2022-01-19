<template>
<!-- 
    <body class="antialiased">
        <div id="app" class="wrapper">
            <aside class="navbar navbar-vertical navbar-expand-lg navbar-dark" v-on:click="printCategories">
                <div class="container-fluid">
                    <nav-bar  v-bind:user="user" v-bind:categories="categories"></nav-bar>
                </div>
            </aside>
            <div class="page-wrapper">
                <div class="page-body">
                    <div class="d-flex h-100 justify-content-center align-items-center" v-if="ready">                          
                        <router-view></router-view>  
                    </div>
                </div>
            </div>
        </div>
    </body> -->
        

  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/login">Login</router-link>
  </div>
  <router-view/>
</template>

<script>
  export default{
    name: 'App',
    data: function(){
      return {
        token: null,
        authenticated: false,
        apiUrl: 'https://sbcb.inf.ufrgs.br/forense/api/v1/'
      }
    },
    mounted: async function(){
      console.log(this.authenticated)
    },
    methods: {
      getRequestHeader: function(){
        return {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ this.token.access_token
        }
      },
      checkToken: async function(){
        if(this.token == null){
          let token = JSON.parse(localStorage.getItem('token'))
          
          if(token == null) return false
     
          this.token = token
        }


        const checkUrl = this.$root.apiUrl + 'login/test-token'

        const response = await fetch(checkUrl, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            //credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ this.token.access_token
            }
        });

        if(response.ok){
          localStorage.setItem('user', JSON.stringify(await response.json()))
        }

        return response.ok
      },
      getRequest: async function (relativePath){

        
        const url = this.apiUrl + relativePath.replace('./', ''); 

        const response = await fetch(url, {
            method: 'GET', 
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            //credentials: 'same-origin', // include, *same-origin, omit
            headers: this.getRequestHeader()
        });

        return response;
      },
      patchRequest: async function (relativePath, body = ''){

        const url = this.apiUrl + relativePath.replace('./', ''); 

        const response = await fetch(url, {
            method: 'PATCH', 
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            //credentials: 'same-origin', // include, *same-origin, omit
            headers: this.getRequestHeader(),
            body: JSON.stringify(body) 
        });

        return response;
      },
      postData: async function(path, body){
        const url = this.apiUrl + path.replace('./', ''); // absolut path

        const response = await fetch(url, {
            method: 'POST', 
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            //credentials: 'same-origin', // include, *same-origin, omit
            headers: this.getRequestHeader(),
            body: JSON.stringify(body) 
        });

        return response
      },
      getToken: async function(){
        const tokenObj = JSON.parse(localStorage.getItem('token'));
        console.log(tokenObj)
      }
    }
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
