<style>
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
</style>

<template>
    <div v-if="modelValue">
        <div class="card mb-3">
            <div class="card-body">
                <h3 class="card-title d-flex">Dados Pessoais do Participante</h3>

               <div class="row">
                    <div class="col-lg-6">
                        <div class="mb-3">
                            <label class="form-label d-flex">Nome</label>
                            <input type="text" v-model="value.name" name="name" class="form-control" placeholder="Nome">
                        </div>        
                    </div>
                    
                    <div class="col-lg-3">
                        <div class="mb-3">
                            <label class="form-label d-flex">Amostra</label>
                            <input v-if="mode === CREATE_USER" type="text" v-model="value.sample" name="sample" class="form-control" placeholder="Ex: HC000...">
                            <input v-if="mode === EDIT_USER" type="text" v-model="value.sample" name="sample" class="form-control" placeholder="Ex: HC000..." disabled>
                        </div>
                    </div>

                    <div class="col-lg-3">
        
                        <div class="mb-3">
                            <label class="form-label d-flex">Data de Nascimento</label>
                            <input type="date" v-model="value.date_of_birth" name="date_of_birth" class="form-control">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-6">
                        <div class="mb-3">
                            <label class="form-label d-flex">E-mail</label>
                            <input v-if="mode === EDIT_USER" type="text" v-model="value.email" name="email" class="form-control" placeholder="E-mail" disabled>
                            <input v-if="mode === CREATE_USER" type="text" v-model="value.email" name="email" class="form-control" placeholder="E-mail">
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="mb-3">
                            <label class="form-label d-flex">Senha</label>
                            <input v-if="mode === EDIT_USER" type="password" v-model="value.password" name="password" class="form-control" placeholder="Senha" disabled>
                            <input v-if="mode === CREATE_USER" type="password" v-model="value.password" name="password" class="form-control" placeholder="Senha">
                        </div>
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col-lg-6">
                        <label class="form-label d-flex">Repita a Senha</label>
                        <input v-if="mode === EDIT_USER" type="password" v-model="value.password_confirmation" name="password" class="form-control" placeholder="Senha" disabled>
                        <input v-if="mode === CREATE_USER" type="password" v-model="value.password_confirmation" name="password" class="form-control" placeholder="Senha">
                    </div>
                </div>
            </div>
        </div>
         <div class="card mb-3">
        <div class="card-body">
            <div class="col-12" v-if="user">
                <h3 class="card-title d-flex">Dados Epidemiológicos</h3>

                <div class="row">
                    <div class="col-lg-6">
                        <div class="mb-3 ">
                            <div class="form-label d-flex">Sexo</div>
                            <div class="row justify-content-start">
                                <div class="col-auto">
                                    <label class="form-check form-check-inline">
                                    <input v-model="value.sex" name="sex" class="form-check-input" type="radio" value="Male" checked>
                                    <span class="form-check-label">Masculino</span>
                                    </label>

                                </div>
                                <div class="col-auto">
                                <label class="form-check form-check-inline">
                                <input v-model="value.sex" name="sex" class="form-check-input" value="Female" type="radio">
                                <span class="form-check-label">Feminino</span>
                                </label>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>

                <div class="row mb-3">
                    <div class="col-lg-12">
                        <h4 class="d-flex">Cidade de Nascimento</h4>
                        <location-select v-model="value.hometown_id"></location-select>
                    </div>
                </div>

                <div class="row mb-3">
                    <div class="col-lg-12">
                        <h4 class="d-flex">Cidade de Residência</h4>
                        <location-select v-model="value.current_city_id"></location-select>
                    </div>
                </div>

                <h3 class="card-title d-flex">Dados Antropométricos</h3>

                <div class="row mb-3">
                    <div class="col-lg-6">
                        <div class="pt-2">
                            <label class="form-check form-switch">
                                <input class="form-check-input" v-model="value.protruding_ear" name="is_active" type="checkbox">
                                <span class="form-check-label strong d-flex">Orelha Saliente</span>
                            </label>
                        </div>
                        <div class="pt-2">
                            <label class="form-check form-switch">
                                <input class="form-check-input" v-model="value.contact_lens" name="is_active" type="checkbox">
                                <span class="form-check-label strong d-flex">Lente de Contato</span>
                            </label>
                        </div>
                        <div class="pt-2">
                            <label class="form-check form-switch">
                                <input class="form-check-input" v-model="value.unnatural_hair_color" name="is_active" type="checkbox">
                                <span class="form-check-label strong d-flex">Cabelo Pintado/Descolorido</span>
                            </label>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="pt-2">
                            <label class="form-check form-switch">
                                <input class="form-check-input" v-model="value.unattached_earlobs" name="is_active" type="checkbox">
                                <span class="form-check-label strong d-flex">Lóbulo da Orelha Solto</span>
                            </label>
                        </div>
                        <div class="pt-2">
                            <label class="form-check form-switch">
                                <input class="form-check-input" v-model="value.tanned_skin" name="is_active" type="checkbox">
                                <span class="form-check-label strong d-flex">Está bem Bronzeado</span>
                            </label>
                        </div>
                        <div class="pt-2">
                            <label class="form-check form-switch">
                                <input class="form-check-input" v-model="value.unnatural_hair_type" name="is_active" type="checkbox">
                                <span class="form-check-label strong d-flex">Cabelo Alisado/Encrespado</span>
                            </label>
                        </div>
                    </div>
                </div>

                <div class="row mb-3">
                    <div class="col-lg-4">
                        <label class="form-label d-flex">Altura</label>
                        <input type="number" v-model="value.height" min="0" name="height" class="form-control" placeholder="Ex: 180...">    
                    </div>
                    <div class="col-lg-4">
                        <label class="form-label d-flex">Peso</label>
                        <input type="number" v-model="value.weight" name="weight" class="form-control" min="0.0" step="0.1" placeholder="Ex: 78.3...">
                    
                    </div>
                    <div class="col-lg-4">
                        <label class="form-label d-flex">Tamanho do Calçado</label>
                        <input type="number" v-model="value.shoe_size" name="shoe_size" min="0" class="form-control" placeholder="Ex: 41...">
                    </div>
                </div>

               
                            
            </div>
            
        </div>
        
    </div>
    <div class="card  mb-3">
        <div class="card-body">
            <h3 class="card-title d-flex">Dados Biológicos</h3>

            <div class="row mb-3">
                <div class="col-lg-6">
                    <label class="form-label d-flex">Cor do Olho</label>

                    <select class="form-select" v-model="value.eye_color_id">
                        <option :value="0" disabled selected>Selecione a cor do olho</option>
                        <option v-for="eye_color in eye_colors" :key="eye_color.id" :value="eye_color.id">{{eye_color.title}}</option>
                    </select>
                </div>
                
            </div>
            
            <div class="row mb-3">

                <div class="col-lg-6">
                    <label class="form-label d-flex">Cor da Pele</label>
                    <select class="form-select" v-model="value.skin_color_id">
                        <option :value="0" disabled selected>Selecione a cor da pele</option>
                        <option v-for="skin_color in skin_colors" :key="skin_color.id" :value="skin_color.id">{{skin_color.title}}</option>
                        <option v-for="skin_color in skin_colors" :key="skin_color.id" :value="skin_color.id">{{skin_color.title}}</option>
                    </select>
                </div>
            </div>
            <div class="row mb-3">

                <div class="col-lg-6">
                    <label class="form-label d-flex">Cor do Cabelo</label>
                    <select class="form-select" v-model="value.hair_color_id">
                        <option :value="0" disabled selected>Selecione a cor do cabelo</option>
                        <option v-for="hair_color in hair_colors" :key="hair_color.id" :value="hair_color.id">{{hair_color.title}}</option>
                    </select>
                </div>

            </div>

            <div class="row">
                <div class="col-lg-6">
                    <label class="form-label d-flex">Tipo do Cabelo</label>
                    <select class="form-select" v-model="value.hair_type_id">
                        <option :value="0" disabled selected>Selecione o tipo do cabelo</option>
                        <option v-for="hair_type in hair_types" :key="hair_type.id" :value="hair_type.id">{{hair_type.title}}</option>
                    </select>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-6">
                    <label class="form-label d-flex">Quantidade de Cabelo</label>
                    <select class="form-select" v-model="value.hairs">
                        <option :value="0" disabled selected>Selecione a quantidade de cabelo</option>
                        <option :value="1">Muito</option>
                        <option :value="2">Médio</option>
                        <option :value="3">Pouco</option>
                    </select>
                </div>
            </div>


            <div class="row">
                <div class="col-lg-6">
                    <label class="form-label d-flex">Quantidade de Pelos</label>
                    <select class="form-select" v-model="value.body_hairs">
                        <option :value="0" disabled selected>Selecione a quantidade de Pelos</option>
                        <option :value="1">Muito</option>
                        <option :value="2">Médio</option>
                        <option :value="3">Pouco</option>
                    </select>
                </div>
            </div>
        </div>
    </div>

    <div class="card">
                <div class="card-body">
                    <h3 class="card-title d-flex">Status na Plataforma</h3>
                
                    <div class="row justify-content-start">

                        <div class="col-lg-3 d-flex ">
                            <div class="pt-2">
                                <label class="form-check form-switch">
                                    <input class="form-check-input" v-model="value.is_superuser" name="is_superuser" type="checkbox">
                                    <span class="form-check-label strong">Super Usuário</span>
                                </label>
                            </div>
                        </div>

                        <div class="col-lg-3 d-flex">
                            <div class="pt-2">
                                <label class="form-check form-switch">
                                    <input class="form-check-input" v-model="value.is_active" name="is_active" type="checkbox">
                                    <span class="form-check-label strong">Usuário Ativo</span>
                                </label>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
    </div>
   
    
</template>

<script>
import LocationSelect from './LocationSelect.vue'
    export default{
  components: { LocationSelect },
        name: 'FormComponent',
        props: {
            modelValue: Object,
            user: Object,
            mode: Boolean
        },
        emits: ['update:modelValue'],
        
        data: function (){
            return {
                EDIT_USER:      false,
                CREATE_USER:    true,
                success:        null,
                formData:       [],
                eye_colors:     [],
                skin_colors:    [],
                hair_colors:    [],
                hair_types:     []
            }
        },
        computed:{
            value: {
                get(){
                    return this.modelValue
                },
                set(value){
                    this.$emit('update:modelValue', value)
                },
            }
        },
        mounted: async function(){
            await this.getEyeColors()
            await this.getSkinColors()
            await this.getHairColors()
            await this.getHairTypes()
            
            this.value = this.modelValue
            // this.value = Object.assign(this.modelValue, {
            //         current_city_id: 0,
            //         hometown_id: 0,
            //         tanned_skin: null,
            //         contact_lens: null,
            //         protuding_ear: null,
            //         unattached_earlobs: null,
            //         unnatural_hair_type: null,
            //         skin_color: null,
            //         hair_color: null,
            //         hair_type: null,
            //         eye_color: null,
            //         crespo: null
            // })
        }, 
        watch: {
            user: function() {
                this.formData = this.user
            }
        },
        methods: {
            getEyeColors: async function(){
                let request = await this.$root.getRequest('eye_colors/')
                let eye_colors = await request.json()
                
                this.eye_colors = eye_colors.data
            },
            getSkinColors: async function(){
                let request = await this.$root.getRequest('skin_colors/')
                let skin_colors = await request.json()
                
                this.skin_colors = skin_colors.data
            },
            getHairColors: async function(){
                let request = await this.$root.getRequest('hair_colors/')
                let hair_colors = await request.json()
                
                this.hair_colors = hair_colors.data
            },
            getHairTypes: async function(){
                let request = await this.$root.getRequest('hair_types/')
                let hair_types = await request.json()
                
                this.hair_types = hair_types.data
            }

        }
    }
</script>