<template>
    <div v-bind:id="idDiv" class="chart-lg"></div>
</template>

<script>
    export default{
        name: 'Donut',
        props : ['user', 'id', 'targetUser', 'prediction'],
        data : function(){
            return {
                idDiv: 'view-donut-'+this.$props.id,
                idDonut: 'donut'+this.$props.id,
                donut: null
            }
        },
        mounted: async function(){

            // const fetchUrl = this.$root.getViewUrl(this.$props.id, this.$props.targetUser)

            // const resp = await session.getRequest(fetchUrl)        
            
            // const data = await resp.json();
            if(this.donut == null){
                this.donut = this.newDonut(this.$data.idDiv, this.$data.idDonut)

            }
            this.donut.render()
            if(this.$props.prediction){
                this.updateDonut(this.$data.idDonut, this.$props.prediction)
            }
        },
        destroyed: function(){
            this.donut.destroy()
        },
        watch: {
            prediction:{
                handler: function(){
                }
            }
        },
        methods: {
            updateDonut: function(id, data){
                ApexCharts.exec(id, 'updateSeries', 
                    getSeriesDonut(data)
                , true)


                ApexCharts.exec(id, 'updateOptions',  
                    {
                        'labels': getLabelsDonut(data)
                    }
                , true)
            },
            getSeriesDonut: function(data){
                return Object.values(data)
            },
            getLabelsDonut(data){
                return Object.keys(data)
            },
            newDonut: function (div, idDonut) {
                donut = new ApexCharts(document.getElementById(div), {
                    chart: {
                        id: idDonut,
                        type: "donut",
                        fontFamily: 'inherit',
                        height: '400',
                        sparkline: {
                            enabled: true
                        },
                        animations: {
                            enabled: true,
                            easing: 'easeinout',
                            speed: 800,
                            animateGradually: {
                                enabled: true,
                                delay: 150
                            },
                            dynamicAnimation: {
                                enabled: true,
                                speed: 350
                            }
                        }
                    },
                    dataLabels: {
                        enabled: true,
                        formatter: function(val){
                            return Math.floor(val) + '%'
                        },
                    },
                    fill: {
                        opacity: 1,
                    },
                    series: [],
                    labels: [],
                    grid: {
                        strokeDashArray: 4,
                    },
                    colors: ["#206bc4", "#79a6dc", "#d2e1f3", "#e9ecf1", "#3889A6", "#83D5F2" ],
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
                    tooltip: {
                        fillSeriesColor: false
                    },
                });

                return donut
            }
        }
    }
</script>