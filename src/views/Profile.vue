<style>
    @import url("https://unpkg.com/@tabler/core@latest/dist/css/tabler.min.css");
</style>

<template>
    <div class="col-10">
        <div class="row row-deck row-cards">
            <div class="card d-flex flex-column card-profile p-0">
                <div class="row row-0 flex-fill mb-2">
                    <div class="col-md-auto">
                        <span class="avatar avatar-xl">{{initials}}</span>
                    </div>
                    <div class="col">
                        <div class="card-body d-flex">
                            <div class="col-12">
                                <div class="row">
                                    <h1 class="card-title">{{user.name}}</h1>
                                </div>
                                <div class="row">
                                    <div class="col-md-auto"> 
                                        <div class="row">
                                            <span class="text-azure strong" v-if="!user.is_superuser">Amostra:</span>
                                        </div>
                                        <div class="row">
                                            <span class="text-azure strong">E-mail:</span>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="row" v-if="!user.is_superuser">
                                            <span>{{user.sample}}</span>
                                        </div>
                                        <div class="row">
                                            <span>{{user.email}}</span>
                                        </div>
                                    </div>
                                </div>    
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div class="row row-0 flex-fill">
                    <ul class="nav nav-tabs" data-bs-toggle="tabs">
                        <li class="nav-item">
                          <a href="#tabs-home-ex1" class="nav-link active" data-bs-toggle="tab">Feed</a>
                        </li>
                        <li class="nav-item">
                          <a href="#tabs-profile-ex1" class="nav-link" data-bs-toggle="tab">Perfil</a>
                        </li>
                      </ul>
                </div>
            </div>
            <div class="card d-flex flex-column card-profile p-0 tab-content">
                <div class="tab-pane active show card-body" id="tabs-home-ex1">
                    <div class="col-12">
                        <div class="row">
                            <div>
                                <h2 v-if="user.sex == 'Male'">Bem-vindo, {{user.name}}</h2>
                                <h2 v-if="user.sex == 'Female'">Bem-vinda, {{user.name}}</h2>
                            </div>
                        </div>
                        <div class="row">
                            <div>
                                <span>Neste painel você encontra informações e atualizações sobre a pesquisa corrente.</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tab-pane card-body" id="tabs-profile-ex1">
                    <div class="col-12">
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
    export default {
        name: 'Profile',
        data: function(){
            return {
                user: JSON.parse(localStorage.getItem('user'))
            }
        },
        computed: {
            initials: function(){
                const names_array = this.user.name.split(' ')
                return String(names_array[0][0] + names_array[names_array.length-1][0]).toUpperCase()
            }
        }
    }
</script>