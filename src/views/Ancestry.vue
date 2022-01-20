<template>
    <div class="col-10">
        <div class="card">
            <div class="card-header">
                <h1>Ancestralidade Gencove</h1>
            </div>
            <div class="card-body">
                <ancestry-panel :fetchurl="'ancestry/prediction/1'"></ancestry-panel>
            </div>
        </div>     
    </div>
</template>

<script>
    import AncestryPanel from '@/components/AncestryPanel.vue'
    import "@tabler/core/dist/css/tabler.min.css"
    import "@tabler/core/dist/js/tabler.min.js"

    export default{
        name: 'Ancestry',
        components: {
            AncestryPanel
        }
    }
</script>