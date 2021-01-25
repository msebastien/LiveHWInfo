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
        si.cpuCurrentspeed().then((d) => {
            data.cpu_speed = d.avg // GHz
        })
        .catch((error) => console.error(error))
    },

    cpuSpeedCores: function(data) {
        si.cpuCurrentspeed().then((d) => {
            let cores = {}
            for(let i = 0; i < d.cores.length; i++) {
                Object.defineProperty(cores, `core_${i}`, 
                { enumerable: true, value: d.cores[i]})
            }
            data.cpu_speed_cores = cores // GHz
        })
        .catch((error) => console.error(error))
    },

    cpuLoad: function(data) {
        si.currentLoad().then((d) => {
            data.cpu_load = d.avgload * 100 // Percent
        })
        .catch((error) => console.error(error))
    },

    cpuLoadCores: function(data) {
        si.currentLoad().then((d) => {
            let cores = {}
            for(let i = 0; i < d.cpus.length; i++) {
                Object.defineProperty(cores, `core_${i}`, 
                { enumerable: true, value: d.cpus[i].load})
            }
            data.cpu_load_cores = cores // Percent
        })
        .catch((error) => console.error(error))
    },

    cpuTemperature: function(data) {
        si.cpuTemperature().then((d) => {
            data.cpu_temp = d.main // °C
        })
        .catch((error) => console.error(error))
    },

    cpuTemperatureCores: function(data) {
        si.cpuTemperature().then((d) => {
            let cores = {}
            for(let i = 0; i < d.cores.length; i++) {
                Object.defineProperty(cores, `core_${i}`, 
                { enumerable: true, value: d.cores[i]})
            }
            data.cpu_temp_cores = cores // °C
        })
        .catch((error) => console.error(error))
    },

    memoryStats: function(data) {
        si.mem().then((d) => {
            data.mem_used = d.active / 1.0e9 // Gigabytes
            data.mem_free = d.free / 1.0e9
            data.mem_swap_used = d.swapused / 1.0e9
        })
        .catch((error) => console.error(error))
    },

    ioStats: function(data) {
        si.disksIO().then((d) => {
            data.io_read_sec = d.rIO_sec // bytes/sec
            data.io_write_sec = d.wIO_sec
            data.io_total_sec = d.tIO_sec
        })
    },

    networkStats: function(data) {
        si.networkStats(Settings.get('networkInterface')).then((d) => {
            if(d.length > 0) {
                // Received bytes overall
                data.net_rx = d[0].rx_bytes / 1.0e6 // Megabytes
                data.net_rx_dropped = d[0].rx_dropped / 1.0e6
                data.net_rx_errors = d[0].rx_errors / 1.0e6

                // Transmitted bytes overall
                data.net_tx = d[0].tx_bytes / 1.0e6 // Megabytes
                data.net_tx_dropped = d[0].tx_dropped / 1.0e6
                data.net_tx_errors = d[0].tx_errors / 1.0e6
                
                data.net_rx_sec = d[0].rx_sec / 1.0e3 // kilobytes/sec
                data.net_tx_sec = d[0].tx_sec / 1.0e3
            }
            else {
                data.net_rx = -1 
                data.net_rx_dropped = -1
                data.net_rx_errors = -1

                data.net_tx = -1
                data.net_tx_dropped = -1
                data.net_tx_errors = -1
                
                data.net_rx_sec = -1
                data.net_tx_sec = -1
            }
        })
    }
}
module.exports = DataUtil