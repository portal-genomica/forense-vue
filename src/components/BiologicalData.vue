<template>
    <div class="col-12" v-if="data">
        <div class="row">
            <h1>Informações Fenotípicas</h1>
        </div>
        <div class="row">
            <div class="col">
                <div class="row">
                    <h2>Cabelo</h2>
                </div>
                <div class="row">
                    <div class="col">
                        <span>Tipo de cabelo: {{data.hair_type}}</span>
                        <span>Cor do cabelo: {{data.hair_color}}</span>
                        <span>Quantidade de cabelo: {{data.hairs}}</span>
                        <span>Cabelo observado: {{data.hair_obs}}</span>
                        <span>Quantidade de pelo: {{data.body_hairs}}</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col">
                <div class="row">
                    <h2>Olho</h2>
                </div>
                <div class="row">
                    <div class="col">
                        <span>Cor do olho: {{data.eye_color}}</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col">
                <div class="row">
                    <h2>Pele</h2>
                </div>
                <div class="row">
                    <div class="col">
                        <span>Cor da pele: {{data.skin_color}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        name: 'BiologicalData',
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