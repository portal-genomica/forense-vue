<template>
    <div class="col-12" v-if="data">
        <h2 class="d-flex">Dados de Contato</h2>
        <div class="row mb-3">
            <div class="col-lg-4">

                <div class="mb-3">
                    <label class="form-label d-flex">Nome</label>
                    <input type="text" class="form-control form-control-flush" :value="data.name" disabled>
                </div>
                <div class="mb-3">
                    <label class="form-label d-flex">E-mail</label>
                    <input type="text" class="form-control form-control-flush" :value="data.email" disabled>
                </div>
                <div class="mb-3">
                    <label class="form-label d-flex">Data de Nascimento</label>
                    <input type="text" class="form-control form-control-flush" :value="date" disabled>
                </div>
            </div>
        </div>
    </div>    
</template>

<script>
    export default{
        name: 'ContactData',
        props: ['data'],
        data: function(){
            return {
                date_of_birth: null
            }
        },
        computed: {
            date: function(){
                if(this.date_of_birth){
                    return this.date_of_birth
                } else {
                    return "Não há data de nascimento."
                }
            }
        },
        watch: {
            data: function(value){
                this.date_of_birth = value.date_of_birth
            }
        }
    }
</script>