const storage = []

export default {
    createApplication(name) {
        const id = Math.floor(Math.random() * 1000000)

        storage.push({
            id, name
        })

        return new Promise(resolve => resolve(id))
    },
    loadApplication(id) {
        return new Promise((resolve) => {
            resolve(storage.find(app => app.id === id))
        })
    }
}