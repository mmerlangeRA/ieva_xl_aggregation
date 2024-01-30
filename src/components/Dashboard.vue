
<template>
    <v-container>
   <h1>Hello Dashboard </h1>
    <v-data-table
          :headers="headers"
          :items="statisticsArray"
          class="elevation-1"
        ></v-data-table>
        </v-container>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useDashboardStore } from '@/stores';
import { BuStatisticsCollection } from '@/stores/dashboard';
import { mergeAllFiles } from '@/api/fileManager';

const { t } = useI18n()

const dashboardStore = useDashboardStore()

//const summary = ref<BuStatisticsCollection>(null)
let summary={}
const statisticsArray = ref([])
const headers= ref([
    { title: 'BU ID', key: 'buId' },
    { title: 'Number of Workers', key: 'number_of_workers' },
    { title: 'Missing Farm', key: 'missing_farm' },
    { title: 'Missing profile', key: 'missing_profile' },
    { title: 'Missing grade', key: 'missing_grade' },
])

dashboardStore.$subscribe((mutation, state) => {
    console.log("muttation on dashboardStore")
    summary = mutation.events.newValue
    prepareDataForTable(summary)
})

function prepareDataForTable(dictInfo: BuStatisticsCollection) {
    statisticsArray.value = Object.entries(dictInfo).map(
        ([buId, stats]) => {
            return {
                buId,
                number_of_workers: stats.number_of_workers,
                missing_farm: stats.missing_data.job_farm,
                missing_profile: stats.missing_data.job_profile,
                missing_grade: stats.missing_data.job_grade,
            };
        }
    )
    console.log(statisticsArray.value)
}

onMounted(async () => {
    summary = dashboardStore.$state.summary
    if (!summary || true) {
        await mergeAllFiles()
    } else {
        prepareDataForTable(summary)
   }
})

</script>
  
<style lang="scss" scoped></style>
  

