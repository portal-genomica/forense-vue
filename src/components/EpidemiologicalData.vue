<template>
    <div class="col-12" v-if="data">
        <h2>Dados Epidemiológicos</h2>
        <div class="row mb-3">
            <div class="col-auto">
                <span class="form-check-label d-flex">Sexo: {{sexo(data.sex)}}</span>
                <span class="form-check-label d-flex">Origem: {{data.origin}}</span>
                <span class="form-check-label d-flex">Residente em: {{data.city}}</span>
                <span class="form-check-label d-flex">Natural de: {{data.city}}</span>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        name: 'EpidemiologicalData',
        props: ['data'],
        methods: {
            sexo: function(sex) {
                if(sex == 'M') return 'Masculino'
                else if(sex == 'F') return 'Feminino'
                else return ''
            },
            sim_ou_nao: function(value){
                if(value){
                    return 'Sim'
                } else {
                    return 'Não'
                }
            }
        }
    }
</script>