<template>
    <div class="collapse navbar-collapse" >
        <ul class="navbar-nav pt-lg-3 d-flex" v-if="user">
            <li class="nav-item">
                <div class="nav-link disabled">
                    <span class="title"><h3>{{user.name}}</h3></span>   
                </div>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" :to="{name: 'Profile'}">
                    Página Inicial
                </router-link>
            </li>
            <div v-if="user.is_superuser">
                <li class="nav-item">
                    <router-link class="nav-link" :to="{name: 'Admin'}">
                        Painel Administrador
                    </router-link>
                </li>
            </div>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" id="navbar-base" data-bs-toggle="dropdown" role="button" aria-expanded="false">
                    <span class="nav-link-title">
                    Informações Fenotípicas
                    </span>
                </a>
                <div class="dropdown-menu" aria-labelledby="navbar-base">
                    <div class="dropdown-menu-columns">
                        <div class="dropdown-menu-column">
                            
                            <router-link v-for="category in categories" :key="category.id" class="dropdown-item" :to="{path: '/fenotipo/' + category.id}" >
                                {{category.name}}
                            </router-link>
                        </div>
                    </div>
                </div>
            </li>
            <div >
                <li class="nav-item">
                    <router-link class="nav-link" :to="{name: 'Ancestry'}">
                        Ancestralidade
                    </router-link>
                </li>
            </div> 


            <li class="nav-item mt-auto">
                <a href="#" class="nav-link" v-on:click="logout">
                    <span class="nav-link-icon d-md-none d-lg-inline-block text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-logout" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"></path>
                            <path d="M7 12h14l-3 -3m0 6l3 -3"></path>
                         </svg>
                    </span>
                    
                    <span class="nav-link-title text-white"><strong>Log out</strong></span>
                </a>
                
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'Navbar',
    props : ['categories', 'user'],
    methods : {
        logout:  function(){
            this.$root.logout()
        }
    },
    watch: {
        user: function(user){
            console.log(user)
        }
    }
}
</script>