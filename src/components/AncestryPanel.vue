<style>
    #gencove{
        height: 600px;
     
    }


</style>

<template>
    <div class="col-12" v-if="fetchurl">
        <div class="row w-100">
            <div class="col-8">
                <div id="gencove"></div>
            </div>
            <div class="col-4">
                <div class="card h-100">
                    <div class="card-body card-body-scrollable card-body-scrollable-shadow">
                        <div class="divide-y">
                            <div class="ancestry-list row" v-for="region in ancestry_data" :key="region.id" v-on:mouseout="clearRegion" v-on:mouseover="selectRegion">
                                <div class="col-9">
                                    <div class="row">    
                                            <div class="col-2">

                                            <a href="#" class="badge" :style="{backgroundColor: region.color}"></a>
                                            </div>
                                           <div class="col-10 overflow-hidden">

                                            <span style="color: #444" class="mx-1 strong  name-region">{{region.name}}</span>
                                           </div>
                                        
                                    </div>
                                </div>
                                <div class="col text-end text-nowrap">
                                    <span class="strong text-azure" style="font-size: 0.9em">{{percent(region.prediction)}}</span>    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import * as d3 from 'd3';
    import L from 'leaflet';
    import * as turf from '@turf/turf';

    import { toRaw } from "vue";

    import "leaflet/dist/leaflet.css"

    export default {
        name: 'AncestryPanel',
        props: {
            fetchurl: {
                type: String,
                required: true
            }
        },
        data: function(){
            return {
                ancestry_data: [],
                map: null,
                svg: null,
                fillOpacity: 0.4,
                fillOpacityHover: 0.1,
                strokeOpacity: 0.6,
                strokeOpacityHover: 0.3,
                mapCreated: false
            }
        },
        mounted: async function() {
            let fetchUrl = this.$props.fetchurl;
            
            this.createMap()

            const mapRequest = await this.$root.getRequest(fetchUrl)
            const mapJson = await mapRequest.json()

            
            if(this.$route.params.id) this.ancestry_data = mapJson.areas.sort((a, b) => b.prediction - a.prediction)
            else this.ancestry_data = mapJson.sort((a, b) => b.prediction - a.prediction) 
               

            this.fillMap() 
        },
        methods: {
            createMap: function(){
                const map = L
                    .map('gencove', {
                        'minZoom': 2,
                        'maxBounds': [[84.67351256610522, -174.0234375], [-58.995311187950925, 223.2421875]]
                    })
                    .setView([14, 2], 3);   // center position + zoom
                    
                    // Add a tile to the map = a background. Comes from OpenStreetmap
                L.tileLayer(
                    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
                    maxZoom: 6,
                    noWrap: true,
                    }).addTo(map);
                
                // Add a svg layer to the map
                this.svg = L.svg({clickable: true}).addTo(map);
                

                const overlay = d3.select(map.getPanes().overlayPane)
                overlay.select('svg').attr("pointer-events", "auto")    

                this.map = map
            },
            fillMap: function(){
                // iterate over the reverse order so the greater values of prediction stay on the top of the map
                this.ancestry_data.slice().reverse().forEach( d => {
                    let coords = turf.polygonSmooth(turf.polygon(d.region), {iterations: 8})
                    
                    var polyline = L.geoJson(coords, 
                                                {
                                                    color: d.color, 
                                                    fillOpacity:    this.fillOpacity, 
                                                    strokeOpacity:  this.strokeOpacity
                                                }
                                            ).addTo(toRaw(this.map));

                    polyline.bindTooltip(d.name+' - '+this.percent(d.prediction))
                })

                let component = this;

                d3.selectAll('path.leaflet-interactive')
                .data(this.ancestry_data.slice().reverse())
                .join('path.leaflet-interactive')
                    .on('mouseover', function(){
                            d3.selectAll('path')
                                .style('fill-opacity', component.fillOpacityHover)
                                .style('stroke-opacity', component.strokeOpacityHover)
                            d3.select(this).style('fill-opacity', component.fillOpacity)
                            d3.select(this).style('stroke-opacity', component.strokeOpacity)
                    })
                    .on('mouseout', function(){
                        d3.selectAll('path')
                                .style('fill-opacity', component.fillOpacity)
                                .style('stroke-opacity', component.strokeOpacity)
                    })
            },
            selectRegion: function(e){
                let name;
                let component = this;


                if(e.target.querySelector(".name-region")){
                    name = e.target.querySelector(".name-region").innerHTML
                } else {
                    name = e.target.innerHTML
                }

                d3.selectAll('path.leaflet-interactive')
                    .style('stroke-opacity', function(d){
                        if(d.name != name) return component.strokeOpacityHover
                    })
                    .style('fill-opacity', function(d){
                        if(d.name != name) return component.fillOpacityHover
                    })
            },
            clearRegion: function(){
                let component = this
                d3.selectAll('path.leaflet-interactive')
                .style('fill-opacity', component.fillOpacity)
                .style('stroke-opacity', component.strokeOpacity)
            },
            percent: function(number){
                return Math.ceil(100*number)+'%'
            }
        }
    }
</script>