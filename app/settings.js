const fs = require('fs')

let filePath = __dirname + '/../settings.json'

let Settings = {

    /**
     * Return all settings entries (JS Object)
     * @returns {Object} JS Object
     */
    getAll: function() {
        const data = fs.readFileSync(filePath, {encoding: 'utf-8', flag: 'r'})
        return JSON.parse(data)
    },

    /**
     * Retrieve the value for a given property from the settings file
     * @param {string} property name (string)
     * @returns value
     */
    get: function(property) {
        let settings = this.getAll()
        return settings[property]
    },

    /**
     * Save settings data from a JS Object into a JSON file
     * @param {Object} jsObject 
     */
    setAll: function(jsObject) {
        let key = Object.keys(jsObject)
        let values = Object.values(jsObject)

        for(let i =0; i < key.length; i++) {
            this.set(key[i], values[i])
        }
    },

    /**
     * Set the value for a given property
     * @param {string} property name (string)
     * @param {*} value 
     */
    set: function(property, value) {
        let settings = this.getAll()
        settings[property] = value

        try {
            let toWrite = JSON.stringify(settings, null, 2)
            fs.writeFileSync(filePath, toWrite)
            console.log('writing property to ' + filePath)
        } catch(e) {
            console.error(e)
        }
    }
}
module.exports = Settings