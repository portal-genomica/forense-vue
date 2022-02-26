<template>
    <div class="row">
        <div class="col-4">
            <label class="form-label d-flex">UF</label>
            <select class="form-select" v-model="selected_state">
                <option value="" disabled selected>Selecione o estado</option>
                <option v-for="estado in estados" :key="estado.value" :value="estado.value">{{estado.value}}</option>
            </select>
        </div>
        <div class="col-8">
            <label class="form-label d-flex">Cidade</label>
            <select class="form-select" v-model="selected_city">
                <option :value="0" disabled selected>Selecione uma cidade</option>
                <option v-for="city in cities" :key="city.city_id" :value="city.city_id">{{city.city}}</option>
            </select>
        </div>
    </div>
</template>

<script>
    export default{
        name: 'LocationSelect',
        props: {
            modelValue: Number
        },
        emits: ['update:modelValue'],
        data: function(){
            return {
                selected_state: '',
                regions: [
                    {name: 'Centro-Oeste'},
                    {name: 'Nordeste'},
                    {name: 'Norte'},
                    {name: 'Sudeste'},
                    {name: 'Sul'}
                ],
                estados: [
                    {name: 'Acre', value: 'AC', region: 'Norte'},
                    {name: 'Alagoas', value: 'AL', region: 'Nordeste'},
                    {name: 'Amapá', value: 'AP', region: 'Norte'},
                    {name: 'Amazonas', value: 'AM', region: 'Norte'},
                    {name: 'Bahia', value: 'BA', region: 'Nordeste'},
                    {name: 'Ceará', value: 'CE', region: 'Nordeste'},
                    {name: 'Distrito Federal', value: 'DF', region: 'Centro-Oeste'},
                    {name: 'Espírito Santo', value: 'ES', region: 'Sudeste'},
                    {name: 'Goiás', value: 'GO', region: 'Centro-Oeste'},
                    {name: 'Maranhão', value: 'MA', region: 'Nordeste'},
                    {name: 'Mato Grosso', value: 'MT', region: 'Centro-Oeste'},
                    {name: 'Mato Grosso do Sul', value: 'MS', region: 'Centro-Oeste'},
                    {name: 'Minas Gerais', value: 'MG', region: 'Sudeste'},
                    {name: 'Pará', value: 'PA', region: 'Norte'},
                    {name: 'Paraíba', value: 'PB', region: 'Nordeste'},
                    {name: 'Paraná', value: 'PR', region: 'Sul'},
                    {name: 'Pernambuco', value: 'PE', region: 'Nordeste'},
                    {name: 'Piauí', value: 'PI', region: 'Norte'},
                    {name: 'Rio de Janeiro', value: 'RJ', region: 'Sudeste'},
                    {name: 'Rio Grande do Norte', value: 'RN', region: 'Nordeste'},
                    {name: 'Rio Grande do Sul', value: 'RS', region: 'Sul'},
                    {name: 'Rondônia', value: 'RO', region: 'Norte'},
                    {name: 'Roraima', value: 'RR', region: 'Norte'},
                    {name: 'Santa Catarina', value: 'SC', region: 'Sul'},
                    {name: 'São Paulo', value: 'SP', region: 'Sudeste'},
                    {name: 'Sergipe', value: 'SE', region: 'Nordeste'},
                    {name: 'Tocantins', value: 'TO', region: 'Norte'}
                ],
                cities: []
            }
        },
        computed: {
            selected_city: {
                get: function(){
                    return this.modelValue
                },
                set: function(value){
                    this.$emit('update:modelValue', value)
                }
            }
        },
        watch: {
            selected_state: async function(uf, oldUf){
                if(uf != ''){

                    let fetchUrl = 'locations?limit=900&state='+uf

                    let cities_request = await this.$root.getRequest(fetchUrl)

                    let cities = await cities_request.json()

                    this.cities = cities.data
                    
                    // reset value
                    if(oldUf != ''){
                        this.selected_city = 0
                    } 

                }

                // if(this.cities.filter(d => {
                //     if(this.selected_city ==  d.city_id){
                //         return d
                //     }
                // }).length == 0){

                // }
            },
            selected_city: async function(city){
                if(this.selected_state == '' && this.selected_city != 0){
                    let responseLocations = await this.$root.getRequest(`locations/${city}`)

                    let dataCity = await responseLocations.json()
                    
                    this.selected_state = this.estados.filter(d => {
                        if(d.name == dataCity.state) {
                            return d.value
                        }
                    })[0].value
                } else {
                    this.selected_state = ''
                    
                    if(this.cities.filter(d => {
                        if(this.selected_city ==  d.city_id){
                            return d
                        }
                    }).length == 0){
                        let responseLocations = await this.$root.getRequest(`locations/${city}`)

                        let dataCity = await responseLocations.json()
                        
                        this.selected_state = this.estados.filter(d => {
                            if(d.name == dataCity.state) {
                                return d.value
                            }
                        })[0].value
                    }
                }


            },
        }
    }
</script>