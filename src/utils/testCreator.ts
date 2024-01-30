import test from "node:test"

interface job_mapping {
    worker_id: string,
    bu_id: string,
    former_job: string,
    domain: string,
    job_farm: string,
    job_profile: string,
    job_grade: string,
}

export class TestManager {
    headers = ["worker_id", "bu_id", "former_job", "domain", "job_farm", "job_profile", "job_grade"]
    availableValues = {
        worker_id: "key",
        bu_id: ["big", "small", "some", "finance"],
        former_job: ["manager", "oil manager", "worker"],
        domain: ["gas", "oil", "central"],
        job_farm: ["jb1", "jb2", "jb3", "jb4"],
        job_profile: ["project leader", "worker", "expert"],
        job_grade: 5,
    }
    constructor() {

    }

    public create(bu_id: string, nbJobs: number, percentage:number): Array<job_mapping> {
        const results = []
        console.log("create")
        for (let i = 0; i < nbJobs; i++) {
            const fillJob = Math.random() < percentage
            const former_job_id = Math.floor(Math.random() * this.availableValues.former_job.length)
            const domain_id = Math.floor(Math.random() * this.availableValues.domain.length)
            const job_farm_id = Math.floor(Math.random() * this.availableValues.job_farm.length)
            const job_profile_id = Math.floor(Math.random() * this.availableValues.job_profile.length)
            const job_grade = Math.floor(Math.random() * this.availableValues.job_grade)
            const worker_id = bu_id + "_" + i
            const job = {
                worker_id: worker_id,
                bu_id: bu_id,
                former_job: this.availableValues.former_job[former_job_id],
                domain: fillJob ? this.availableValues.domain[domain_id] : "",
                job_farm: fillJob ? this.availableValues.job_farm[job_farm_id] : "",
                job_profile: fillJob ? this.availableValues.job_profile[job_profile_id] : "",
                job_grade: fillJob ? (""+job_grade) : ""
            }
            results.push(job)

        }
        return results
    }

    public exportToCSV(data: Array<job_mapping>): string {
        const csvRows = data.map(job =>
            this.headers.map(header => JSON.stringify(job[header as keyof job_mapping])).join(',')
        );
        return [this.headers.join(','), ...csvRows].join('\n');
    }

    public downloadCSV(data: Array<job_mapping>, filename: string): void {
        const csvData = this.exportToCSV(data);
        const blob = new Blob([csvData], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);

        // Create a link and trigger the download
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        // Cleanup the URL
        window.URL.revokeObjectURL(url);
    }

    public allInOne(bu_id: string, nbJobs: number, percentage: number):void{
        const testData = this.create(bu_id, nbJobs, percentage)
        this.downloadCSV(testData,bu_id+".csv")
        
    }


}