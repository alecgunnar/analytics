import axios from 'axios'

export default {
    async createApplication(name) {
        const response = await axios.post('http://localhost:8080/apps', {name})
        return response.data.data.id
    },
    async loadApplication(id) {
        const response = await axios.get(`http://localhost:8080/apps/${id}`)
        return response.data
    },
    async loadApplications() {
        const response = await axios.get('http://localhost:8080/apps')
        return response.data
    }
}