
<style>
    .modal-body{
        max-height: 800px;
    }
</style>
<template>
    <div class="col-12">
        
        <div class="row mb-3">
            <div class="col-2 align-self-end">
                
                    <label class="form-label d-flex no-wrap">Nº resultados:</label>
                
                    <select class="form-select" v-model="rowsNumber">
                        <option value="10">10</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                
            </div>
            <div class="col-6 align-self-end">
                
                    <label class="form-label d-flex">Pesquisar:</label>
                    <div class="input-icon"> 
                        <span class="input-icon-addon">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-search" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <circle cx="10" cy="10" r="7" />
                                <line x1="21" y1="21" x2="15" y2="15" />
                            </svg>
                        </span> 
                        <input id="pesquisa-usuario" class="form-control" type="text" v-model="query" :placeholder="placeholder">
                    </div>
                
            </div>
            <div class="col-2 align-self-end">
                
                    <label class="form-label d-flex">Filtrar por:</label>
                
                    <select class="form-select" v-model="searchType">
                        <option value="0">Nome</option>
                        <option value="1">Amostra</option>
                    </select>
                
            </div>
            <div class="col-2 align-self-end">
                    <a href="#" class="btn btn-teal d-flex" data-bs-toggle="modal" data-bs-target="#create-user-modal" v-on:click="createUser">
                    Criar Usuário
                    </a>
                
            </div>
        </div>

        <div class="row ">
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
                                            <a href="#" data-bs-toggle="modal" data-bs-target="#user" v-on:click="editUser(u)">
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
        
        <div class="modal modal-blur fade h-80" id="user" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body overflow-auto"> 
                        <div class="col-12">
                            <div class="row mb-2">
                                <form-component :mode="false" v-model="targetUser"></form-component>
                            </div>
                            <div class="row">
                                <div v-if="success === true" class="alert alert-success mb-0" role="alert">
                                    <h4 class="alert-title">Feito!</h4>
                                    <div class="text-muted">O usuário foi inserido no banco de dados com sucesso.</div>
                                </div>
                                <div v-if="success === false" class="alert alert-danger mb-0" role="alert">
                                    <h4 class="alert-title">Opa&hellip;</h4>
                                    <div class="text-muted">Erro no formulário.</div>
                                </div>
                            </div>
                        </div>
                        
                        
                    </div>
                    <div class="modal-footer">
                        <a href="#" class="btn btn-link link-secondary" data-bs-dismiss="modal">
                            Cancelar
                        </a>
                        <button class="btn btn-primary ms-auto" v-on:click="saveEdit">
                            Salvar
                        </button> 
                    </div>
                </div>
            </div>
        </div> 

        <div class="modal modal-blur fade h-80" id="create-user-modal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-lg " role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body overflow-auto"> 
                        <div class="col-12">
                            <div class="row mb-2">
                                <form-component :mode="true" v-model="targetUser"></form-component>
                            </div>
                            <div class="row">
                                <div v-if="success === true" class="alert alert-success mb-0" role="alert">
                                    <h4 class="alert-title">{{alert_message.title}}</h4>
                                    <div class="text-muted">{{alert_message.body}}</div>
                                </div>
                                <div v-if="success === false" class="alert alert-danger mb-0" role="alert">
                                    <h4 class="alert-title">{{alert_message.title}}</h4>
                                    <div class="text-muted">{{alert_message.body}}</div>
                                </div>
                            </div>
                        </div>
                        
                        
                    </div>
                    <div class="modal-footer">
                        <a href="#" class="btn btn-link link-secondary" data-bs-dismiss="modal">
                            Cancelar
                        </a>
                        <button class="btn btn-primary ms-auto" v-on:click="saveUser">
                            Salvar
                        </button> 
                    </div>
                </div>
            </div>
        </div> 
        
    </div>
</template>

<script>
import FormComponent from '../components/FormComponent.vue';


    export default{
        name: 'Admin',
        components: { 
            FormComponent,
        },
        data: function(){
            return {   
                users: [],
                query: '',
                skip: 0, // parametro pra por um offset no request de usuarios
                timeout: null,
                allUsersFetched: false, // parametro para esconder o botão de carregar novos usuários quando não encontra mais usuarios no banco
                rowsNumber: 10,
                searchType: 0,
                targetUser: {},
                success: null,
                alert_message: '',
                teste: 0

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
            },
            placeholder: function(){
                if(this.searchType == 0){
                    return "Pesquise o nome do usuário..."
                } else {
                    return "Pesquise o nome da amostra..."
                }
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
            queryGet: function(){ 
                if(this.query == '') return ''
                else if(this.searchType == 0){
                    return '&name='+this.query
                } else if(this.searchType == 1){
                    return '&sample='+this.query
                }   
            
            },
            get_initials: function(name){
                const names_array = name.split(' ')
                return String(names_array[0][0] + names_array[names_array.length-1][0]).toUpperCase()
            },
            editUser: async function(u){
                this.success = null
                let responsePhenotypes = await this.$root.getRequest(`phenotypes/${u.id}`)

                if(responsePhenotypes.ok){

                    let phenotypesData = await responsePhenotypes.json()
                    this.targetUser = this.editPhenotype(Object.assign(phenotypesData, u))


                } else {    
                    this.targetUser = Object.assign(
                        this.newUser(u), 
                        this.createUser()
                    )
                }

            },
            // return only the fields required to create a new user
            newUser: function(user){
                return {
                    id:   user.id,
                    name: user.name,
                    email: user.email,
                    password: user.password,
                    password_confirmation: user.password_confirmation,
                    date_of_birth: user.date_of_birth,
                    is_active: user.is_active,
                    is_superuser: user.is_superuser
                }
            },
            newPhenotype: function(user){
                return {
                    user_id:            user.id,
                    sample:             user.sample,
                    hometown_id:        user.hometown_id,
                    current_city_id:    user.current_city_id,
                    eye_color_id:       user.eye_color_id,
                    hair_color_id:      user.hair_color_id,
                    skin_color_id:      user.skin_color_id,
                    hair_type_id:       user.hair_type_id,
                    sex:                user.sex,
                    height:             user.height,
                    weight:             user.weight,
                    shoe_size:          user.shoe_size,
                    right_handed:       user.right_handed,
                    protruding_ear:     user.protruding_ear,
                    contact_lens:       user.contact_lens,
                    tanned_skin:        user.tanned_skin,
                    hairs:              user.hairs,
                    body_hairs:         user.body_hairs,
                    collected_at:       user.collected_at,
                    unnatural_hair_color:   user.unnatural_hair_color,
                    unnatural_hair_type:    user.unnatural_hair_type,
                    unattached_earlobes:    user.unattached_earlobes,
                    hair_obs:           user.hair_obs
                } 
            },
            // create object based on /phenotypes/ response
            editPhenotype: function(user){
                
                if(!user.hometown) user.hometown = {id: 0}
                if(!user.current_city) user.current_city = {id: 0}
                if(!user.eye_color) user.eye_color = {id: 0}
                if(!user.hair_color) user.hair_color = {id: 0}
                if(!user.skin_color) user.skin_color = {id: 0}
                if(!user.hair_type) user.hair_type = {id: 0}

                return {
                    user_id:            user.user_id,
                    email:              user.user.email,
                    name:               user.user.name,
                    sample:             user.sample,
                    date_of_birth:      user.date_of_birth,
                    is_active:          user.is_active,
                    is_superuser:       user.is_superuser,
                    sex:                user.sex,
                    height:             user.height,
                    weight:             user.weight,
                    shoe_size:          user.shoe_size,
                    right_handed:       user.right_handed,
                    protruding_ear:     user.protruding_ear,
                    contact_lens:       user.contact_lens,
                    tanned_skin:        user.tanned_skin,
                    hairs:              user.hairs,
                    body_hairs:         user.body_hairs,
                    collected_at:       user.collected_at,
                    unnatural_hair_color:   user.unnatural_hair_color,
                    unnatural_hair_type:    user.unnatural_hair_type,
                    unattached_earlobes:    user.unattached_earlobes,
                    hair_obs:           user.hair_obs,
                    hometown_id:        user.hometown.id,
                    current_city_id:    user.current_city.id,
                    eye_color_id:       user.eye_color.id,
                    hair_color_id:      user.hair_color.id,
                    skin_color_id:      user.skin_color.id,
                    hair_type_id:       user.hair_type.id
                }
            },
            createUser: function(){
                this.targetUser = {
                    user_id: 0,
                    sample: "",
                    hometown_id: 0,
                    current_city_id: 0,
                    eye_color_id: 0,
                    hair_color_id: 0,
                    skin_color_id: 0,
                    hair_type_id: 0,
                    sex: "Male",
                    height: 0,
                    weight: 0,
                    shoe_size: 1,
                    right_handed: true,
                    protruding_ear: false,
                    contact_lens: false,
                    unnatural_hair_color: false,
                    unnatural_hair_type: false,
                    unattached_earlobes: false,
                    tanned_skin: false,
                    collected_at: "",
                    hairs: 1,
                    body_hairs: 1,
                    hair_obs:     '',
                }
            },
            saveUser: async function(){
                let responseGetUsers = await this.$root.getRequest(`users?name=${this.targetUser.name}`)
                
                let users = await responseGetUsers.json()
                
                if(!users.data.length){

                    let responseCreateUser = await this.$root.postData('users/', this.newUser(this.targetUser))

                    if(responseCreateUser.ok){
                        let new_user = await responseCreateUser.json()
                        console.log(new_user)
                        this.targetUser.user_id = new_user.id
                        
                        await this.savePhenotype(this.targetUser)
                        // this.cleanForm()
                    } else {
                        this.sendAlert({
                            status: false,
                            title: 'Opa...',
                            message: 'Erro no formulário. Não foi possível criar o usuário no banco de dados.'
                        })

                    }
                
                } else {

                    let new_user = users.data[0]


                    this.targetUser.id = new_user.id
                    this.targetUser.user_id = new_user.id
                    
                    let updateUser = await this.$root.patchRequest(`users/update/${this.targetUser.id}`, {
                        name:           this.targetUser.name,
                        date_of_birth:  this.targetUser.date_of_birth,
                        is_active:      this.targetUser.is_active,
                        is_superuser:   this.targetUser.is_superuser  
                    })

                    if(updateUser.ok) console.log(await updateUser.json())

                    await this.savePhenotype(this.targetUser)

                }

                
            },
            savePhenotype: async function(new_user){

                let responsePhenotypes = await this.$root.postData('phenotypes/', this.newPhenotype(new_user))
                
                if(responsePhenotypes.ok){

                    this.sendAlert({
                        status: true,
                        title: 'Feito!',
                        message: 'O usuário foi inserido no banco de dados com sucesso.'
                    })

                } else {
                    this.sendAlert({
                        status: false,
                        title: 'Opa...',
                        message: 'Erro no formulário. O usuário foi inserido no banco de dados, porém as informações fenotípicas não estão corretas.'
                    })                        
                }

                // this.users.push(new_user)

            },
            saveEdit: async function(){
                // check if user has registered phenotypes

                let responseUserUpdate = await this.$root.patchRequest('users/update/'+this.targetUser.user_id, this.targetUser)

                let response = await this.$root.getRequest(`phenotypes/${this.targetUser.user_id}`)

                if(response.ok){
                    
                    let responsePhenotypes = await this.$root.patchRequest(`phenotypes/${this.targetUser.user_id}`, this.targetUser)

                    if(responsePhenotypes.ok){
                        this.sendAlert({
                            status: true,
                            title: 'Feito!',
                            message: 'Fenótipos atualizados com sucesso.'
                        })

                        console.log(await responsePhenotypes.json())
                    }   
                    else{
                        this.sendAlert({
                            status: false,
                            title:  'Opa...',
                            message: 'Não foi possível atualizar os fenótipos do usuário.'
                        })
                    }
                    if(responseUserUpdate.ok){
                        console.log('edit user ok;')
                    } else {
                        console.log('Erro edit user;')
                    }
                } else {
                    let responsePhenotypes = await this.$root.postData(`phenotypes/`, this.newPhenotype(this.targetUser))

                    if(responsePhenotypes.ok){
                        this.sendAlert({
                            status: true,
                            title: 'Feito!',
                            message: 'Fenótipos criado com sucesso.'
                        })

                        console.log(await responsePhenotypes.json())
                    }   
                    else{
                        this.sendAlert({
                            status: false,
                            title:  'Opa...',
                            message: 'Não foi possível criar os fenótipos do usuário.'
                        })
                    }
                }
                
                
            },
            sendAlert: function(message_obj){
                this.success        = message_obj.status

                this.alert_message  = {
                    title: message_obj.title,
                    body: message_obj.message
                }
            }
        }
    }
</script>