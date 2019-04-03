import axios from 'axios'

export default {
    async loadHitsCount (appId) {
        const response = await axios.get(`http://localhost:8080/apps/${appId}/hits`)
        return response.data
    }
}