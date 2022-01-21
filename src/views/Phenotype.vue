<template>
    <div class="col-10">
        <phenotype-panel :user="user" :url="url"></phenotype-panel>
    </div>
</template>

<script>
    import PhenotypePanel from '../components/PhenotypePanel.vue';

    export default {
        name: 'Phenotype',
        data: function(){
            return {
                url: 'views/1/complete'
            }
        },
        components: {
            PhenotypePanel
        },
        computed: {
            user: function(){
                return JSON.parse(localStorage.getItem('user'))
            }
        }
    }
</script>