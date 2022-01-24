
<template>
    <div class="col-10" >
        <div class="card-tabs ">
            <ul class="nav nav-tabs" data-bs-toggle="tabs">
                <li class="nav-item" v-for="(view, index) in views" :key="view.title">
                    <a :href="'#tabs-'+view.id" :class="['nav-link', {active : index == 0}]" data-bs-toggle="tab" aria-current="true">{{view.title}}</a>
                </li>
             </ul> 

            <div class="tab-content col-12">
                <div v-for="(view, index) in views" :key="view.id" :class="['tab-pane', {active : index == 0}]" :id="'tabs-'+view.id">
                    <phenotype-panel :user="user" :url="getUrl(view.id)"></phenotype-panel>
                </div> 
            </div>
        </div>
        
    </div>
</template>

<script>
    import PhenotypePanel from '../components/PhenotypePanel.vue';

    export default {
        name: 'Phenotype',
        data: function(){
            return {
                views: []
            }
        },
        components: {
            PhenotypePanel
        },
        computed: {
            user: function(){
                return JSON.parse(localStorage.getItem('user'))
            }
        },
        mounted: async function(){
            await this.getViews()
        },
        watch:{
            $route: async function(){
                await this.getViews()
            }
        },
        methods: {
            getViews: async function(){
                let categoryId = this.$route.params.category

                let viewsResponse = await this.$root.getRequest('views/category/'+categoryId)
                let viewsJson = await viewsResponse.json()
                
                this.views = viewsJson
            },
            getUrl: function(id){
                return 'views/'+id+'/complete'
            }
        }
    }
</script>