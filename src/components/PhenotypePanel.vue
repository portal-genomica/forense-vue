<template>
    <div class="card" v-if="url">
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
                                <donut :prediction="prediction"></donut>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-body">
                                <tabela :snps="snps"></tabela>
                            </div>
                        </div>
                    </div>
                    
                </div>
                
        </div>
        <div class="card-footer" v-if="user">
            <span class="card-title">Amostra: {{user.sample}}</span>
            <span class="card-title">Classe Real: {{classe_real}}</span>
        </div>
    </div>
</template>

<script>
    import Donut from '@/components/Donut.vue'
    import Tabela from '@/components/Tabela.vue'

    export default {
        name: 'PhenotypePanel',
        props: ['url', 'user'],
        data: function(){
            return {
                classe_real: null,
                snps: [],
                prediction: [],
                title: '',
                description: ''
            }
        },
        mounted: async function(){
            let fetchUrl = this.$props.url;

            let response = await this.$root.getRequest(fetchUrl)
            let data = await response.json()

            
            this.title = data.title
            this.prediction = data.prediction
            this.classe_real = data.classe_real

            this.snps = data.snps.map( d => {
                d['url_gene'] = "https://www.genecards.org/cgi-bin/carddisp.pl?gene="+d.gene;
                d['url_snp']  = "https://www.ncbi.nlm.nih.gov/snp/"+d.snp;
                return d;
            })
        },
        components: {
            Donut,
            Tabela
        }

    }
</script>