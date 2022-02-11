<template>
    <div class="col-10">
        <div>
            <div class="card">
                <ul class="nav nav-tabs" data-bs-toggle="tabs">
                    

                    <li class="nav-item" v-for="(c, index) in categories" :key="c.name">
                        <a :href="'#tabs-'+c.id" :class="['nav-link', {active: index == 0}]" data-bs-toggle="tab" aria-current="true" v-on:click="map_active = false">{{c.name}}</a>
                    </li>


                    <li class="nav-item">
                        <a :href="'#tabs-ancestry'" class="nav-link" data-bs-toggle="tab" aria-current="true" v-on:click="map_active = true">Ancestralidade</a>
                    </li>
                </ul> 
                <div class="card-body tab-content">
                    
                    <div v-for="(c, index) in categories" :key="c.id" :class="['tab-pane', {active: index == 0}]" :id="'tabs-'+c.id">
                        <phenotype-panel  v-for="v in c.views" :key="v.id" :user="targetUser" :url="phenotypeUrl(v.id)"></phenotype-panel>
                    </div>

                    <div class="tab-pane" id="tabs-ancestry">
                        <ancestry-panel :active="map_active" :fetchurl="ancestryUrl"></ancestry-panel>
                    </div>
                </div> 
            </div>
        </div>
    </div>
    
</template>

<script>
import AncestryPanel from '../components/AncestryPanel.vue'
import PhenotypePanel from '../components/PhenotypePanel.vue'
    export default {
        name: 'User',
        components: { 
            AncestryPanel,
            PhenotypePanel 
        },
        data: function(){
            return {
                teste: false,
                targetUser: null,
                ancestryUrl: 'ancestry/prediction/1/'+this.$route.params.id,
                categories: [],
                map_active: false
            }
        },
        mounted: async function() {
            this.targetUser = await this.fetchUser()
            this.categories = await this.fetchCategories()
        },
        methods: {
            phenotypeUrl: function(view_id){
                return 'views/'+view_id+'?user_id='+this.$route.params.id+'&snps=true'
            },
            fetchUser: async function(){
                const targetUserResponse = await this.$root.getRequest('users/'+this.$route.params.id)
                return targetUserResponse.json()
            },
            fetchCategories: async function(){
                const categoriesResponse = await this.$root.getRequest('categories/')
                const categoriesJson = await categoriesResponse.json()
                
                let categories = []

                for(let category of categoriesJson.data){
                    let viewsResponse = await this.$root.getRequest('views/?category_id='+category.id)
                    let viewsJson = await viewsResponse.json()
                    
                    categories.push({
                        id: category.id,
                        name: category.name,
                        views: viewsJson.data
                    })
                }

                return categories 
            }
        }
    }
</script>