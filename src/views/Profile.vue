<style>

    .card-profile span{
        --tblr-avatar-size: 120px;
    }

    /* Remove arrows from number input */
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
        -webkit-appearance: none;
        margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
    }

    input[type=number] {
        -moz-appearance:textfield; /* Firefox */
    }

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
                          <a href="#tabs-home" class="nav-link active" data-bs-toggle="tab">Feed</a>
                        </li>
                        <li class="nav-item">
                          <a href="#tabs-contato" class="nav-link" data-bs-toggle="tab">Dados de Contato</a>
                        </li>
                        <li class="nav-item">
                          <a href="#tabs-antropometrico" class="nav-link" data-bs-toggle="tab">Dados Antropométricos</a>
                        </li>

                      </ul>
                </div>
            </div>
            <div class="card d-flex flex-column card-profile p-0 tab-content">
                <div class="tab-pane active show card-body" id="tabs-home">
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
                <div class="tab-pane card-body" id="tabs-contato">
                    <div class="col-8">
                        <div class="row">
                            <div class="col-10">
                                <h2>Dados de Contato</h2>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label class="form-label">E-mail:</label>
                            <div> <input type="text" class="form-control" name="email" v-model="user.email"> </div>
                            
                        </div>
                        <div class="row mb-3">
                            <label class="form-label">Telefone:</label>
                            <div><input type="tel" class="form-control" pattern="\([0-9]{2}\) [0-9]{4,6}-[0-9]{3,4}$" name="phone" placeholder="(99)99999-9999"></div>
                        </div>
                    </div>
                </div>

                <div class="tab-pane card-body" id="tabs-antropometrico">
                    <div class="col-8">
                        <div class="row">
                            <div class="col-10">
                                <h2>Dados Antropométricos</h2>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label class="form-label">Altura:</label>
                            <div><input type="number" class="form-control" name="height" v-model="user.height"></div>
                        </div>
                        <div class="row mb-3">
                            <label class="form-label">Peso:</label>
                            <div><input type="number" class="form-control" name="weight" v-model="user.weight"></div>
                        </div>
                        <div class="row mb-3">
                            <label class="form-label">Tamanho do Calçado:</label>
                            <div><input type="number" class="form-control" name="shoe-size" v-model="user.shoe_size"></div>
                        </div>
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