<template>
    <div class="col-12" v-if="data">
        <h2 class="d-flex">Dados Epidemiológicos</h2>
        <div class="row mb-3">
            <div class="col-lg-5">
                <div class="mb-3">
                    <label class="form-label">Sexo</label>
                    <input type="text" class="form-control form-control-flush" :value="sex" disabled>
                </div>
                <div class="mb-3">
                    <label class="form-label">Origem</label>
                    <input type="text" class="form-control form-control-flush" :value="origin" disabled>
                </div>
                <div class="mb-3">
                    <label class="form-label">Cidade de Residência</label>
                    <input type="text" class="form-control form-control-flush" :value="current_city" disabled>
                </div>
                <div class="mb-3">
                    <label class="form-label">Cidade Natal</label>
                    <input type="text" class="form-control form-control-flush" :value="hometown" disabled>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        name: 'EpidemiologicalData',
        props: ['data'],
        data: function(){
            return {
                user_sex:       '',
                user_origin:    '',
                user_current_city:   '',
                user_hometown:  ''
            }
        },
        computed: {
            sex: function(){
                if(this.user_sex == 'Male'){
                    return 'Masculino'
                } else if(this.user_sex == 'Female') {
                    return 'Feminino'
                } else {
                    return 'Não há dados para sexo.'
                }
            },
            origin: function(){
                if(this.user_origin){
                    return this.user_origin
                } else {
                    return 'Não há dados para origem.'
                }
            },
            current_city: function(){
                if(this.user_current_city){
                    return this.user_current_city.title
                } else {
                    return 'Não há dados para residência.'
                }
            },
            hometown: function(){
                if(this.user_hometown) return this.user_hometown.title
                else return 'Não há dados para cidade natal.'
            }
        },
        watch: {
            data: function(value){
                console.log(value)
                this.user_sex       = value.sex
                this.user_origin    = value.origin
                this.user_hometown       = value.hometown
                this.user_current_city   = value.current_city
            }
        }
    }
</script>