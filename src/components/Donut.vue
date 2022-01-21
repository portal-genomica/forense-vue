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
                series: [],
                options: {
                    colors: ["#206bc4", "#79a6dc", "#d2e1f3", "#e9ecf1", "#3889A6", "#83D5F2" ],
                    labels: []
                }
            }
        },
        mounted: function(){
            let data = this.$props.prediction

            console.log(data)
            this.labels = this.getLabels(data)
            this.series = this.getSeries(data)


        },
        methods: {
            getLabels: function(data){
                if(data.length > 0)
                    return Object.keys(data[0])
                else return []                 
            },
            getSeries: function(data){
                if(data.length > 0)
                    return Object.values(data[0])
                else return []
            }
        }
    }
</script>