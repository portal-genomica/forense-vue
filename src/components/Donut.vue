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
                }
            }
        },
        mounted: function(){
            let data = this.$props.prediction

            this.options.labels = this.getLabels(data)
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