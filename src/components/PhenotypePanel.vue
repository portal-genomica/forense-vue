<template>
    <div class="card">
        <div class="card-header align-bottom">
            <div>
                <h1>{{title}}</h1>
                <span class="card-subtitle">{{description}}</span>
            </div>   
            
        </div>
        <div class="card-body">
                <div class="row row-deck row-cards">
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-body d-flex align-items-center justify-content-center" >
                                <donut v-bind:user="user" v-bind:id="view.id" v-bind:target-user="targetUser" v-bind:prediction="prediction" v-if="prediction"></donut>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-body">
                                <tabela v-bind:id="view.id" v-bind:snps="snps"></tabela>
                            </div>
                        </div>
                    </div>
                    
                </div>
                
        </div>
        <div class="card-footer">
            <span class="card-title">Amostra: {{targetUser.sample}}</span>
            <span class="card-title">Classe Real: {{classe_real}}</span>
        </div>
    </div>
</template>

<script>
    import Donut from '@/components/Donut.vue'
    import Tabela from '@/components/Tabela.vue'

    export default {
        name: 'PheynotypePanel',
        data: function(){
            return {
                
            }
        },
        components: {
            Donut,
            Tabela
        }

    }
</script>