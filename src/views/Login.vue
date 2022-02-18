<style>
    @import url("https://unpkg.com/@tabler/core@latest/dist/css/tabler.min.css");
    #login{
        position: absolute;
        height: 100%;
        width: 100%;
        margin: 0;
        padding: 0;
        overflow: hidden;
    }
</style>

<template>
    <div id="login" class="page-wrapper">
        <div class="container h-100">
            <div class="row align-items-center justify-content-center h-100">  
                <div class="col-sm-5">
                        <div class="card">
                            <div class="card-header">  
                                <h3 class="card-title">Login</h3>            
                            </div>
                            <div class="card-body">
                                <div class="input-icon mb-3">
                                    <span class="input-icon-addon">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-at" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                            <circle cx="12" cy="12" r="4"></circle>
                                            <path d="M16 12v1.5a2.5 2.5 0 0 0 5 0v-1.5a9 9 0 1 0 -5.5 8.28"></path>
                                            </svg>
                                    </span>
                                    <input type="text" name="email" v-model="user.email" class="form-control" placeholder="E-mail">
                                </div>
                                <div class="input-icon mb-3">
                                    <span class="input-icon-addon">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-lock" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                            <rect x="5" y="11" width="14" height="10" rx="2"></rect>
                                            <circle cx="12" cy="16" r="1"></circle>
                                            <path d="M8 11v-4a4 4 0 0 1 8 0v4"></path>
                                        </svg>
                                    </span>
                                    <input type="password" v-model="user.password" name="password" class="form-control" placeholder="Senha">
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <a href="#">Esqueceu sua senha?</a>
                                    </div>
                                    <span v-if="incorrect" class="red">E-mail ou senha inválidos</span>
                                </div>
                            </div>    
                            <div class="card-footer text-end">
                                <div class="d-flex">
                                    <button class="btn btn-primary ms-auto" v-on:click="login">
                                        Login
                                    </button>
                                </div>
                            </div>
                            
                        </div>

                    <div class="row my-4 align-items-center justify-content-around">
                        <div class="col-md-5">
                            <a href="https://sbcb.inf.ufrgs.br/" target="_blank"><img id="sbcb-logo" src="../assets/logo.svg" ></a>    
                        </div>
                        <div class="col-md-5 d-flex align-content-center justify-content-center align-items-center">
                            <a href="https://inctforense.wordpress.com/" target="_blank"><img id="inct-logo" class="resize-img" src="../assets/INCT1.png"></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Login',
    data: function(){
        return {
            user: {
                email: '',
                password: ''
            },
            incorrect: false,
            authentication: false
        }
    },
    mounted: async function(){
        const response = await this.$root.checkToken();

        if(response){
            this.$router.push({name: 'Home'})
        } 
    },
    methods: {
        login: async function(){
            let response;
            const loginUrl = this.$root.apiUrl + 'login/access-token'        

           response = await fetch(loginUrl, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                //credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json',
                },
                // when 'follow' is set, fetch() API follows the redirect response (HTTP status code = 301,302,303,307,308)
                redirect: 'follow', // manual, *follow, error
                body: JSON.stringify(this.user) // body data type must match "Content-Type" header
            });

            if(response.ok){
                let responseJson = await response.json()
                this.$root.token = responseJson
                this.incorrect = false
                localStorage.setItem('token', JSON.stringify(responseJson))
                this.$router.push({name: 'Home'})
                
            } else {
                this.incorrect = true
            }
        }
    }
}
</script>