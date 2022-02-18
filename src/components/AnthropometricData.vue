<template>
    <div class="col-12" v-if="data">
        <h2 class="d-flex">Dados Antropométricos</h2>
        <div class="row mb-3">
            <div class="col-auto">
                <div class="mb-3">
                    <label class="form-label d-flex">Altura</label>
                    <input type="text" class="form-control form-control-flush" :value="height" disabled>
                </div>
                <div class="mb-3">
                    <label class="form-label d-flex">Peso</label>
                    <input type="text" class="form-control form-control-flush" :value="weight" disabled>
                </div>
                <div class="mb-3">
                    <label class="form-label d-flex">Nº do Calçado</label>
                    <input type="text" class="form-control form-control-flush" :value="shoe_size" disabled>
                </div>
                <div class="mb-3">
                    <label class="form-label d-flex">Mão Preferencial</label>
                    <input type="text" class="form-control form-control-flush" :value="right_hand" disabled>
                </div>
                <div class="mb-3">
                    <label class="form-label d-flex">Orelha Saliente</label>
                    <input type="text" class="form-control form-control-flush" :value="protuding_ear" disabled>
                </div>

                <div class="mb-3">
                    <label class="form-label d-flex">Lóbulo da Orelha Solto</label>
                    <input type="text" class="form-control form-control-flush" :value="unattached_earlobs" disabled>
                </div>

                <div class="mb-3">
                    <label class="form-label d-flex">Lente de Contato</label>
                    <input type="text" class="form-control form-control-flush" :value="contact_lens" disabled>
                </div>

                <div class="mb-3">
                    <label class="form-label d-flex">Cabelo Pintado/Descolorido</label>
                    <input type="text" class="form-control form-control-flush" :value="unnatural_hair_type" disabled>
                </div>


                <div class="mb-3">
                    <label class="form-label d-flex">Está bem Bronzeado</label>
                    <input type="text" class="form-control form-control-flush" :value="tanned_skin" disabled>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        name: 'AnthropometricData',
        props: ['data'],
        data: function(){
            return {
                // height: null,
                // weight: null,
                // shoe_size: null,
                // protuding_ear: null,
                // contact_lens: null,
                // unnatural_hair_type: null,
                // unattached_earlobs: null,
                // tanned_skin: null,
                // right_hand: null,
                user_data: {},
            }
        },
        computed: {
            height: function(){
                if(this.user_data.height) {
                    return this.user_data.height
                } else {
                    return 'Não há dados.'
                }
            },
            weight: function(){
                if(this.user_data.weight) {
                    return this.user_data.weight
                } else {
                    return 'Não há dados.'
                }
            },
            shoe_size: function(){
                if(this.user_data.shoe_size){
                    return this.user_data.shoe_size
                } else {
                    return 'Não há dados.'
                }
            },
            right_hand: function(){
                if(this.user_data.right_handed == true){
                    return 'Direita'
                } else if(this.user_data.right_handed == false) {
                    return 'Esquerda'
                } else {
                    return 'Não há dados.'
                }
            },
            protuding_ear: function(){
                if(this.user_data.protuding_ear == true){
                    return 'Sim'
                } else if(this.user_data.protuding_ear == false){
                    return 'Não'
                } else {
                    return 'Não há dados.'
                }
            },
            contact_lens: function(){
                if(this.user_data.contact_lens == true){
                    return 'Sim'
                } else if(this.user_data.contact_lens == false){
                    return 'Não'
                } else {
                    return 'Não há dados.'
                }

            },
            unnatural_hair_type: function(){
                if(this.user_data.unnatural_hair_type == true){
                    return 'Sim'
                } else if(this.user_data.unnatural_hair_type == false){
                    return 'Não'
                } else {
                    return 'Não há dados.'
                }
            },
            unattached_earlobs: function(){
                if(this.user_data.unattached_earlobs == true){
                    return 'Sim'
                } else if(this.user_data.unattached_earlobs == false){
                    return 'Não'
                } else {
                    return 'Não há dados.'
                }
            },
            tanned_skin: function(){
                if(this.user_data.tanned_skin == true){
                    return 'Sim'
                } else if(this.user_data.tanned_skin == false){
                    return 'Não'
                } else {
                    return 'Não há dados.'
                }
            },
            
        },
        watch: {
            data: function(value){
                console.log(value)
                this.user_data = value
                
                // this.height         =   value.height
                // this.weight         =   value.weight
                // this.shoe_size      =   value.shoe_size
                // this.protuding_ear  =   value.protuding_ear
                // this.contact_lens   =   value.contact_lens
                // this.unnatural_hair_type    = value.unnatural_hair_type
                // this.unattached_earlobs     = value.unattached_earlobs
                // this.tanned_skin    =   value.tanned_skin
                // this.right_hand     =   value.right_hand

                
            }
        }
    }
</script>