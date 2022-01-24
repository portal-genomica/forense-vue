<template>
    <div class="col-10">
        <div class="row w-100">
            <div class="col-2">
                <label class="form-label">Número de resultados:</label>
                <select class="form-select" v-model="rowsNumber">
                    <option value="10">10</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
            </div>
            <div class="col-8">
                <label class="form-label">Pesquisar:</label>
                <div class="input-icon mb-3"> 
                    <span class="input-icon-addon">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-search" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <circle cx="10" cy="10" r="7" />
                            <line x1="21" y1="21" x2="15" y2="15" />
                        </svg>
                    </span> 
                    <input id="pesquisa-usuario" class="form-control" type="text" v-model="query" :placeholder="placeholder()">
                </div>
            </div>
            <div class="col-2">
                <label class="form-label">Filtrar por:</label>
                <select class="form-select" v-model="searchType">
                    <option value="0">Nome</option>
                    <option value="1">Amostra</option>
                </select>
            </div>
        </div>
        <div class="row w-100">
            <div class="col-12">
                <div class="card">
                        <div class="table-responsive">
                            <table class="table table-vcenter table-striped">
                                <thead>
                                    <tr>
                                        <th>Avatar</th>
                                        <th>Amostra</th>
                                        <th>Nome</th>
                                        <th>E-mail</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="u in filteredUsers" :key="u.id">
                                        <td><span class="avatar avatar-sm bg-blue-lt" >{{get_initials(u.name)}}</span></td>
                                        <td>{{ u.sample }}</td>
                                        <td>{{ u.name }}</td>
                                        <td>{{ u.email }}</td>
                                        <td>
                                            <router-link :to="{name: 'UserView', params: {id: u.id}}">
                                                <span>
                                                    Visualizar
                                                </span>
                                            </router-link>
                                        </td>
                                        <td>
                                            <a href="#" data-toggle="modal" data-target="#user-admin-modal" v-on:click="editUser(u)">
                                                <span>
                                                    Editar
                                                </span>
                                            </a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>    
                </div>
            </div>
        </div>

        <div class="modal modal-blur fade" id="user-admin-modal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body"> 
                        <!-- <form-user ref="formuser"></form-user> -->
                    </div>
                    <div class="modal-footer">
                        <a href="#" class="btn btn-link link-secondary" data-dismiss="modal">
                            Cancel
                        </a>
                        <button class="btn btn-primary ms-auto" v-on:click="saveEdit">
                            Salvar
                        </button> 
                    </div>
                </div>
            </div>
        </div> 
    </div>
</template>

<script>
    export default{
        name: 'Admin',
        data: function(){
            return {   
                users: [],
                query: '',
                skip: 0, // parametro pra por um offset no request de usuarios
                timeout: null,
                allUsersFetched: false, // parametro para esconder o botão de carregar novos usuários quando não encontra mais usuarios no banco
                rowsNumber: 10,
                searchType: 0
            }
        },
        mounted: async function(){
            let parent = this
            document.querySelector('#pesquisa-usuario').addEventListener('keyup', function () {
                clearTimeout(parent.timeout);
                
                this.timeout = setTimeout( async function () {
                    await parent.getUsers()
                }, 1000);
            });

            await this.getUsers()
        },
        computed: {
            filteredUsers: function(){
                let regexQuery = new RegExp(this.query.toLowerCase())
                return this.users.filter( d => {
                    if(this.searchType == 0){    
                        if(d.name && !d.is_superuser){
                            return d.name.toLowerCase().match(regexQuery)
                        } 
                    }
                    else{
                        if(d.sample && !d.is_superuser){
                            return d.sample.toLowerCase().match(regexQuery)
                        } 
                    }
                }).slice(0, Number(this.rowsNumber))
            }
        },
        methods: {
            getUsers: async function(){
            
                const resp = await this.$root.getRequest('users/?skip=0'+this.queryGet())

                let users = await resp.json()

                this.pushUsers(users)
                
                // this.increaseCountUsers()
                
                if(users.data.length == 0){
                    this.skip = this.users.length
                    this.allUsersFetched = true
                }
            },
            pushUsers: function(users){
                for(let user of users.data){

                    let has_user = this.users.filter( d => {
                        if(user.name == d.name) return true
                    }).length

                    if(has_user > 0){
                        continue
                    } 
                    else{
                        this.users.push(user)
                    } 
                }
            },
            placeholder: function(){
                if(this.searchType == 0){
                    return "Pesquise o nome do usuário..."
                } else {
                    return "Pesquise o nome da amostra..."
                }
            },
            queryGet: function(){ 
                if(this.query == '') return ''
                else return '&name='+this.query   
            },
            get_initials: function(name){
                const names_array = name.split(' ')
                return String(names_array[0][0] + names_array[names_array.length-1][0]).toUpperCase()
            },
            filterUsers: function(){
                let regexQuery = new RegExp(this.query.toLowerCase())
                return this.users.filter( d => {
                    if(this.searchType == 0){    
                        if(d.name && !d.is_superuser){
                            return d.name.toLowerCase().match(regexQuery)
                        } 
                    }
                    else{
                        if(d.sample && !d.is_superuser){
                            return d.sample.toLowerCase().match(regexQuery)
                        } 
                    }
                }).slice(0, Number(this.rowsNumber))
            }
        }
    }
</script>