<template>
    <div class="col-md">
        <div class="table-responsive">
            <table class="table table-vcenter">
                <thead>
                    <tr>
                        <th>SNP</th>
                        <th>Gene</th>
                        <th>Alelo Observado</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="snp in snps" :key="snp.snp">
                        <td><a :href="snp.url_snp" target="_blank">{{ snp.snp }}</a></td>
                        <td><a :href="snp.url_gene" target="_blank">{{ snp.gene }}</a></td>
                        <td>{{ snp.genotype }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Tabela',
        props: ["snps"]
    }
</script>