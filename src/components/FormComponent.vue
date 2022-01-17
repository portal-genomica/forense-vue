<template>
    <div class="col-12" v-if="user != null">
        <div class="section-profile row mb-3">
            <div class="col-8">
                 <div class="row">
                     <div class="col-10">
                        <h2>Dados de Contato</h2>
                     </div>
                 </div>
                 <div class="row mb-3">
                    <label class="form-label">E-mail:</label>
                    <div> <input type="text" class="form-control" name="email" v-model="user.email"> </div>
                    
                  </div>
                 <div class="row mb-3">
                    <label class="form-label">Telefone:</label>
                    <div><input type="tel" class="form-control" pattern="\([0-9]{2}\) [0-9]{4,6}-[0-9]{3,4}$" name="phone" placeholder="(99)99999-9999"></div>
                  </div>
            </div>
        </div>
        <div class="section-profile row mb-3">
            <div class="col-8">
                <div class="row">
                    <div class="col-10">
                        <h2>Dados Antropométricos</h2>
                     </div>
                </div>
                <div class="row mb-3">
                    <label class="form-label">Altura:</label>
                    <div><input type="number" class="form-control" name="height" v-model="user.height"></div>
                </div>
                <div class="row mb-3">
                    <label class="form-label">Peso:</label>
                    <div><input type="number" class="form-control" name="weight" v-model="user.weight"></div>
                </div>
                <div class="row mb-3">
                    <label class="form-label">Tamanho do Calçado:</label>
                    <div><input type="number" class="form-control" name="shoe-size" v-model="user.shoe_size"></div>
                </div>
            </div>
        </div>
        <div class="row mb-3" v-if="success != null">
            <div v-if="success === true" class="alert alert-success mb-0" role="alert">
                <h4 class="alert-title">Feito!</h4>
                <div class="text-muted">As alterações foram salvas com sucesso.</div>
            </div>
            <div v-if="success === false" class="alert alert-danger mb-0" role="alert">
                <h4 class="alert-title">Opa&hellip;</h4>
                <div class="text-muted">Erro no formulário.</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        name: 'FormComponent',
        props: ['user'],
        data: function (){
            return {
                formData : {
                    'name': null,
                    'email': null,
                    'password': null,
                    'sample': null,
                    'date_of_birth': null,
                    'is_active': false,
                    'is_superuser': false,
                    'sex': null,
                    'weight': null,
                    'height': null,
                    'shoe_size': null,
                    'nationality': null
                },
                success: null
            }
        },
        mounted: async function(){

        }, 
        methods: {
            save: async function(){
                
            }
        }
    }
</script>