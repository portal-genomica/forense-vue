<template>
    <div class="col-10">
        <keep-alive>
            <phenotype-panel v-for="view in views" :key="view.id" :user="user" :url="getUrl(view.id)"></phenotype-panel>
        </keep-alive>
    
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

                console.log(viewsJson)
            },
            getUrl: function(id){
                return 'views/'+id+'/complete'
            }
        }
    }
</script>