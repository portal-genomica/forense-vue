<template>
  <body class="antialiased">
    <router-view/>
  </body>
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
    },
    methods: {
      getRequestHeader: async function(){
        
        let response = await this.checkToken()

        if(response){
          return {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer '+ this.token.access_token
          }
        } else {
          return null
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
            headers: await this.getRequestHeader()
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
            headers: await this.getRequestHeader(),
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
            headers: await this.getRequestHeader(),
            body: JSON.stringify(body) 
        });

        return response
      },
      logout: function(){
        this.token = null
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        this.$router.push({name: 'Login'})
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
