<template>
    <div class="col-12" v-if="data">
        <h2>Dados Biológicos</h2>
        <div class="row mb-3">
            <div class="col-md-4">
                <div class="mb-3">
                    <label class="form-label">Tipo de Cabelo</label>
                    <input type="text" class="form-control form-control-flush" :value="hair_type_name" disabled>
                </div>

                <div class="mb-3">
                    <label class="form-label">Cor do Cabelo</label>
                    <input type="text" class="form-control form-control-flush" :value="hair_color_name" disabled>
                </div>

                <div class="mb-3">
                    <label class="form-label">Cor da Pele</label>
                    <input type="text" class="form-control form-control-flush" :value="skin_color_name" disabled>
                </div>

                <div class="mb-3">
                    <label class="form-label">Cor do Olho</label>
                    <input type="text" class="form-control form-control-flush" :value="eye_color_name" disabled>
                </div>


                <div class="mb-3">
                    <label class="form-label">Cabelo Observado</label>
                    <input type="text" class="form-control form-control-flush" :value="hair_obs_name" disabled>
                </div>


                <div class="mb-3">
                    <label class="form-label">Quantidade de cabelo</label>
                    <input type="text" class="form-control form-control-flush" :value="hairs_name" disabled>
                </div>



                <div class="mb-3">
                    <label class="form-label">Quantidade de pelos</label>
                    <input type="text" class="form-control form-control-flush" :value="body_hairs_name" disabled>
                </div>
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
                eye_color:  {},
                skin_color: {},
                hair_color: {},
                hair_type:  {},
                hair_obs :  '',
                body_hairs: '',
                hairs:      ''
            }
        },
        computed: {
            eye_color_name: function(){
                if(this.eye_color){
                    return this.eye_color.title
                } else {
                    return "Não há dados para cor do olho."
                }
            },  
            hair_color_name: function(){
                if(this.hair_color){
                    return this.hair_color.title
                } else {
                    return "Não há dados para cor do cabelo."
                }
            },  
            skin_color_name: function(){
                if(this.skin_color){
                    return this.skin_color.title
                } else {
                    return "Não há dados para cor da pele."
                }
            },  
            hair_type_name: function(){
                if(this.hair_type){
                    return this.hair_type.title
                } else {
                    return "Não há dados para tipo do cabelo."
                }
            },
            hair_obs_name: function(){
                if(this.hair_obs){
                    return this.hair_obs
                } else {
                    return "Não há dados."
                }
            },
            body_hairs_name: function(){
                switch(this.body_hairs){
                    case 1:     return 'Muito'
                    case 2:     return 'Médio'
                    case 3:     return 'Pouco'
                    default: return 'Não há dados.'
                }
            },
            hairs_name: function(){
                switch(this.hairs){
                    case 1:     return 'Muito'
                    case 2:     return 'Médio'
                    case 3:     return 'Pouco'
                    default: return 'Não há dados.'
                }
            }
        },
        watch: {
            data: function(data) {
                this.eye_color  = data.eye_color
                this.skin_color = data.skin_color
                this.hair_color = data.hair_color
                this.hair_type  = data.hair_type
                this.hair_obs   = data.hair_obs
                this.hairs      = data.hairs
                this.body_hairs      = data.body_hairs
                
            }
        }
    }
</script>