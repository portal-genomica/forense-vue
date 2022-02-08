<template>
    <div class="col-12" v-if="data">
        <h2>Dados de Contato</h2>
        <div class="row mb-3">
            <div class="col-auto">
                <span class="form-check-label  d-flex">Nome: {{data.name}}</span>
                <span class="form-check-label  d-flex">E-mail: {{data.email}}</span>
                <span class="form-check-label  d-flex">Data de Nascimento: {{data.date_of_birth}}</span>
            </div>
        </div>
    </div>    
</template>

<script>
    export default{
        name: 'ContactData',
        props: ['data']
    }
</script>