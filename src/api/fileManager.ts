import service from '@/utils/request'
import {useDashboardStore } from '@/stores/index'
import { BuStatisticsCollection } from '@/stores/dashboard'

export interface IFilesData {
    files: Array<string>
}



export async function mergeAllFiles() {
    
    const state = await service.get<BuStatisticsCollection>(
        '/process'
    )
    console.log(state)
    useDashboardStore().setState(state.data)
    return

}

/*


*/

export const postNewFile = (file: File) => {
    console.log("postNewFile")
    const formData = new FormData();
    formData.append('file', file);
    console.log(file)
    console.log(typeof(file))
    service.post<any>(
        '/upload',
        formData,
        {
            
            headers: {
                // Overwrite Axios's automatically set Content-Type
                'Content-Type': 'multipart/form-data'
            }
        }
    )
}


export const getFiles = () => service.get<IFilesData[]>('/files')

export async function deleteFile(filename: string) {


        // Fetch request to the upload endpoint
        const responseRaw = await fetch(serverUrl + '/delete/' +filename, {
            method: 'DELETE',
        })
        const response = await responseRaw.json()
        return response
}