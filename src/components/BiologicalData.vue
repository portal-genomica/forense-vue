<template>
    <div class="col-12" v-if="data">
        <h2>Dados Epidemiológicos</h2>
        <div class="row mb-3">
            <div class="col-auto">
                <span class="form-check-label d-flex">Cor do Olho: {{eye_color_name}}</span>
                <span class="form-check-label d-flex">Cor da Pele: {{skin_color_name}}</span>
                <span class="form-check-label d-flex">Cor do Cabelo: {{hair_color_name}}</span>
                <span class="form-check-label d-flex">Tipo de Cabelo: {{hair_type_name}}</span>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        name: 'BiologicalData',
        props: ['data'],
        data: function(){
            return {
                eye_color: {},
                skin_color: {},
                hair_color: {},
                hair_type: {},
            }
        },
        computed: {
            eye_color_name: function(){
                if(this.eye_color.title){
                    return this.eye_color.title
                } else {
                    return "Não há dados para cor do olho."
                }
            },  
            hair_color_name: function(){
                if(this.hair_color.title){
                    return this.hair_color.title
                } else {
                    return "Não há dados para cor do cabelo."
                }
            },  
            skin_color_name: function(){
                if(this.skin_color.title){
                    return this.skin_color.title
                } else {
                    return "Não há dados para cor da pele."
                }
            },  
            hair_type_name: function(){
                if(this.hair_type.title){
                    return this.hair_type.title
                } else {
                    return "Não há dados para tipo do cabelo."
                }
            }
        },
        watch: {
            data: function(data) {
                this.eye_color  = data.eye_color
                this.skin_color = data.skin_color
                this.hair_color = data.hair_color
                this.hair_type  = data.hair_type
            }
        }
    }
</script>