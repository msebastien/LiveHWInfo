const si = require('systeminformation')
const os = require('os')
const Settings = require('./settings')

/**
 * Utility functions for retrieving system data from the host
 */
let DataUtil = {
    hostname: function(data) {
        let hostname = Settings.get('hostname')
        // If a custom hostname is specified in the settings
        if(hostname) {
            data.hostname = hostname
        } else {
            data.hostname = os.hostname()
            Settings.set('hostname', os.hostname())
        }
         
    },

    cpuSpeed: function(data) {
        si.cpuCurrentspeed(function(d) {
            data.cpu_speed = d.avg // GHz
            //Object.assign(hwdata, {cpu_speed: d.avg})
        })
        .catch((error) => console.error(error))
    },

    cpuLoad: function(data) {
        si.currentLoad().then((d) => {
            data.cpu_load = d.avgload * 100 // Percent
        })
        .catch((error) => console.error(error))
    },

    cpuTemperature: function(data) {
        si.cpuTemperature().then((d) => {
            data.cpu_temp = d.main // °C
        })
        .catch((error) => console.error(error))
    },

    memoryStats: function(data) {
        si.mem().then((d) => {
            data.mem_used = d.active / 1.0e9 // Gigabytes
        })
        .catch((error) => console.error(error))
    }
}
module.exports = DataUtil