const { workerData, parentPort, isMainThread } = require('worker_threads')
const Util = require('./util')
const DataUtil = require('./datautil')
const Settings = require('./settings')

let enabled = Settings.get('enabled')
let start = true
let timeInterval = Settings.get('interval') * 1000 // milliseconds

//-------------------------------------------------------------
if(isMainThread) {
    throw new Error('Data sender is not a worker')
}
console.log('Executing in a worker thread : ' + workerData)

parentPort.on('message', (value) => {
    if (value === 'cleanup') {
        clearTimeout(interval)
        process.exit(0)
    }
})

//--------------------------------------------------------------
// INIT
//-------------------------------------------------------------
let interval = null
let influxDB = null
let hwdata = {} 

console.log("Data sender is now running")

interval = setTimeout(routine, timeInterval)
//--------------------------------------------------------------

function routine() {
    // Update values
    enabled = Settings.get('enabled')
    timeInterval = Settings.get('interval') * 1000
    let db = Settings.get('db')

    if(enabled) {
        if(start) {
            influxDB = Util.connectToInfluxDB(db)
            start = false
        }

        // Retrieve system data
        DataUtil.hostname(hwdata)
        DataUtil.cpuSpeed(hwdata)
        DataUtil.cpuLoad(hwdata)
        DataUtil.cpuTemperature(hwdata)
        DataUtil.memoryStats(hwdata)

        console.log("Hostname: " + hwdata.hostname)
            
        Util.sendDataToInfluxDB(influxDB, hwdata)
    }
    
    // Update timeout value
    interval = setTimeout(routine, timeInterval)
}
//--------------------------------------------------------------










