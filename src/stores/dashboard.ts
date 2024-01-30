import { defineStore } from 'pinia';

interface MissingData {
    worker_id: number;
    bu_id: number;
    former_job: number;
    domain: number;
    job_farm: number;
    job_profile: number;
    job_grade: number;
}

interface BuStatistics {
    number_of_workers: number;
    missing_data: MissingData;
}

export interface BuStatisticsCollection {
    [buId: string]: BuStatistics;
}



export const useDashboardStore = defineStore('dashboard', {
    state: () => {
        return {
            summary: {} as BuStatisticsCollection,
        }
    },
    actions: {
        setState(state: BuStatisticsCollection) {
            console.log(state)
            this.summary = state
        },
    },
})
