import axios from 'axios'

export default {
    async loadHitsCount(appId) {
        const response = await axios.get(`${process.env.VUE_APP_BACKEND_URL}/apps/${appId}/hits`)
        return response.data
    }
}