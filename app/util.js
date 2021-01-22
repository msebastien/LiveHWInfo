const { Worker, workerData } = require('worker_threads')
const Influx = require('influx')
const Settings = require('./settings')

/**
 * Utility functions for LiveHwInfo
 */
let Util = {
    /**
     * Create and run a new worker thread
     * @param {*} path 
     * @param {*} callback 
     */
    runWorker: function(path, cb) {
        const worker = new Worker(path, { workerData: 'datasender.js'})
        worker.on('message', (msg) => {
            cb(null, msg)
        })
        worker.on('error', cb)
        worker.on('exit', (exitCode) => {
            if(exitCode !== 0) {
                new Error(`Worker has stopped with code ${exitCode}`)
            }
        })
        return worker
    },

    /**
     * Establish a connection with a InfluxDB database by specifying its name
     * @param {*} database 
     */
    connectToInfluxDB: function(database){
        return new Influx.InfluxDB({
            host : Settings.get('db_host'),
            port : Settings.get('db_port'),
            database : Settings.get('db'),
            username : Settings.get('db_username'),
            password : Settings.get('db_password')
        })
    },

    /**
     * Send data to a InfluxDB database
     * @param {*} database 
     * @param {*} data 
     */
    sendDataToInfluxDB: function(influxDB, data) {
        key = Object.keys(data)
        //console.log(key)
        let date = new Date()
        console.log(date.toISOString())
    
        for(var i=0; i<key.length; i++){
            if(key[i] !== "hostname"){
                console.log("Key : " + key[i] + "; Value : " + data[key[i]]);
                influxDB.writePoints([
                    {
                        measurement : key[i],
                        tags : { host : data.hostname },
                        fields : { value : data[key[i]]},
                        timestamp: date // in milliseconds
                    }
                ]).catch(function(e) {
                    console.log("ERROR");
                    console.log(e);
                })
            }
        }
    }
}
module.exports = Util