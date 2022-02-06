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
                                <apexchart width="380" type="donut" :options="options" :series="series"></apexchart>
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
    import Tabela from '@/components/Tabela.vue'

    export default {
        name: 'PhenotypePanel',
        props: ['url', 'user'],
        data: function(){
            return {
                classe_real: null,
                snps: [],
                prediction: [],
                series: [],
                options: {
                    legend: {
                        show: true,
                        position: 'bottom',
                        offsetY: 12,
                        markers: {
                            width: 10,
                            height: 10,
                            radius: 100,
                        },
                        itemMargin: {
                            horizontal: 8,
                            vertical: 8
                        },
                    },
                    colors: ["#206bc4", "#79a6dc", "#d2e1f3", "#e9ecf1", "#3889A6", "#83D5F2" ],
                    labels: [],
                    dataLabels: {
                        enabled: true,
                        formatter: function(val){
                            return Math.floor(val) + '%'
                        },
                    },
                    tooltip: {
                        fillSeriesColor: false
                    }
                },
                title: '',
                description: ''
            }
        },
        mounted: async function(){
            let fetchUrl = this.$props.url;
            
            let response = await this.$root.getRequest(fetchUrl)
            if(response.ok){
                let data = await response.json()
            
                this.title = data.title
                this.prediction = data.prediction
                this.classe_real = data.classe_real

                this.series = this.getSeries(this.prediction)
                this.options = {
                    labels:   this.getLabels(this.prediction)
                }
                this.snps = data.snps.map( d => {
                    d['url_gene'] = "https://www.genecards.org/cgi-bin/carddisp.pl?gene="+d.gene;
                    d['url_snp']  = "https://www.ncbi.nlm.nih.gov/snp/"+d.snp;
                    return d;
                })
            }
            
            
        },
        components: {
            Tabela
        }, 
        methods: {
            getLabels: function(data){ 
                if(data){
                    return Object.keys(data)  
                } else {
                    return []
                }
                   
            },
            getSeries: function(data){
                if(data){
                    return Object.values(data)
                } else {
                    return []
                }
            }
        }

    }
</script>