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
                        <div class="card-body">
                            <div class="col-12">
                                <div class="row">
                                    <div class="col-md-auto">
                                        <h1 class="card-title">{{user.name}}</h1>
                                    </div>
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
                                    <div class="col-md-auto">
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
                          <a href="#tabs-epidemiologico" class="nav-link" data-bs-toggle="tab">Dados Epidemiológicos</a>
                        </li>
                        <li class="nav-item">
                          <a href="#tabs-antropometrico" class="nav-link" data-bs-toggle="tab">Dados Antropométricos</a>
                        </li>

                        <li class="nav-item">
                          <a href="#tabs-biologico" class="nav-link" data-bs-toggle="tab">Dados Biológicos</a>
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
                    <contact-data :data="user"></contact-data>
                </div>

                <div class="tab-pane card-body" id="tabs-epidemiologico">
                    <div class="col-8">
                        <epidemiological-data :data="phenotypes"></epidemiological-data>
                    </div>
                </div>

                <div class="tab-pane card-body" id="tabs-antropometrico">
                    <div class="col-8">
                        <anthropometric-data :data="phenotypes"></anthropometric-data>
                    </div>
                </div>

                <div class="tab-pane card-body" id="tabs-biologico">
                    <biological-data :data="phenotypes"></biological-data>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
    import AnthropometricData from '../components/AnthropometricData.vue'
    import ContactData from '../components/ContactData.vue'
    import EpidemiologicalData from '../components/EpidemiologicalData.vue'
    import BiologicalData from '../components/BiologicalData.vue'

    export default {
        components: { 
            AnthropometricData, 
            ContactData,
            EpidemiologicalData,
            BiologicalData
        },
        name: 'Profile',
            data: function(){
            return {
                user: JSON.parse(localStorage.getItem('user')),
                phenotypes: {}
            }
        },
        mounted: async function() {
            let response = await this.$root.getRequest('phenotypes/'+this.user.id)

            if( response.ok ){
                this.phenotypes = await response.json()
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