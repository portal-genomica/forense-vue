<template>
    <div class="col-12" v-if="data">
        <h2>Dados Antropométricos</h2>
        <div class="row mb-3">
            <div class="col-auto">
                <span class="form-check-label d-flex">Altura: {{data.height}}</span>
                <span class="form-check-label  d-flex">Peso: {{data.weight}}</span>
                <span class="form-check-label  d-flex">Nº do Calçado: {{data.shoe_size}}</span>
                <span class="form-check-label  d-flex">Orelha Saliente: {{sim_ou_nao(data.protuding_ear)}}</span>
                <span class="form-check-label  d-flex">Lente de Contato: {{sim_ou_nao(data.contact_lens)}}</span>
                <span class="form-check-label  d-flex">Cabelo Pintado/Descolorido: {{sim_ou_nao(data.unnatural_hair_type)}}</span>
                <span class="form-check-label  d-flex">Lóbulo da Orelha Solto: {{sim_ou_nao(data.unattached_earlobs)}}</span>
                <span class="form-check-label  d-flex">Está bem Bronzeado: {{sim_ou_nao(data.tanned_skin)}}</span>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        name: 'AnthropometricData',
        props: ['data'],
        methods: {
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