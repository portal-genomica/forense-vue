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
                <option value="0" disabled selected>Selecione uma cidade</option>
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
                estados: [
                    {name: 'Acre', value: 'AC'},
                    {name: 'Alagoas', value: 'AL'},
                    {name: 'Amapá', value: 'AP'},
                    {name: 'Amazonas', value: 'AM'},
                    {name: 'Bahia', value: 'BA'},
                    {name: 'Ceará', value: 'CE'},
                    {name: 'Distrito Federal', value: 'DF'},
                    {name: 'Espírito Santo', value: 'ES'},
                    {name: 'Goiás', value: 'GO'},
                    {name: 'Maranhão', value: 'MA'},
                    {name: 'Mato Grosso', value: 'MT'},
                    {name: 'Mato Grosso do Sul', value: 'MS'},
                    {name: 'Minas Gerais', value: 'MG'},
                    {name: 'Pará', value: 'PA'},
                    {name: 'Paraíba', value: 'PB'},
                    {name: 'Paraná', value: 'PR'},
                    {name: 'Pernambuco', value: 'PE'},
                    {name: 'Piauí', value: 'PI'},
                    {name: 'Rio de Janeiro', value: 'RJ'},
                    {name: 'Rio Grande do Norte', value: 'RN'},
                    {name: 'Rio Grande do Sul', value: 'RS'},
                    {name: 'Rondônia', value: 'RO'},
                    {name: 'Roraima', value: 'RR'},
                    {name: 'Santa Catarina', value: 'SC'},
                    {name: 'São Paulo', value: 'SP'},
                    {name: 'Sergipe', value: 'SE'},
                    {name: 'Tocantins', value: 'TO'}
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
            selected_state: async function(uf){
                let fetchUrl = 'locations?limit=900&state='+uf

                let cities_request = await this.$root.getRequest(fetchUrl)

                let cities = await cities_request.json()

                this.cities = cities.data
                // reset value
                this.selected_city = 0
            },
            // selected_city: function(city){
                
            // }
        }
    }
</script>