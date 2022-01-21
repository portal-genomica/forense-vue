<template>
    <div v-if="prediction">
      <apexchart width="380" type="donut" :options="options" :series="series"></apexchart>
    </div>
</template>

<script>
    export default{
        name: 'Donut',
        props : ['prediction'],
        data : function(){
            return {
                series: [44, 55, 41, 17, 15],
                options: {
                    colors: ["#206bc4", "#79a6dc", "#d2e1f3", "#e9ecf1", "#3889A6", "#83D5F2" ],
                    labels: []
                }
            }
        },
        mounted: async function(){
            let data = this.$props.prediction
            
            this.labels = this.getLabels(data)
            this.series = this.getSeries(data)

        },
        methods: {
            getLabels: function(data){
                return Object.keys(data)                
            },
            getSeries: function(data){
                return Object.values(data)
            }
        }
    }
</script>