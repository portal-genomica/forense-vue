<template>
    <div class="col-12" v-if="data">
        <h2>Dados Epidemiológicos</h2>
        <div class="row mb-3">
            <div class="col-auto">
                <span class="form-check-label d-flex">Cor do Olho: {{data.eye_color}}</span>
                <span class="form-check-label d-flex">Cor da Pele: {{data.skin_color}}</span>
                <span class="form-check-label d-flex">Cor do Cabelo: {{data.hair_color}}</span>
                <span class="form-check-label d-flex">Tipo de Cabelo: {{data.hair_type}}</span>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        name: 'BiologicalData',
        props: ['data']
    }
</script>