import axios from 'axios'

export default {
    async createApplication(name) {
        const response = await axios.post(`${process.env.VUE_APP_BACKEND_URL}/apps`, {name})
        return response.data.data.id
    },
    async loadApplication(id) {
        const response = await axios.get(`${process.env.VUE_APP_BACKEND_URL}/apps/${id}`)
        return response.data
    },
    async loadApplications() {
        const response = await axios.get(`${process.env.VUE_APP_BACKEND_URL}/apps`)
        return response.data
    },
    async loadClientScript (id) {
        const response = await axios.get(`${process.env.VUE_APP_BACKEND_URL}/apps/${id}/script`)
        return response.data.script
    }
}