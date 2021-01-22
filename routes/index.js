const express = require('express')
let router = express.Router()
const Influx = require('influx')
const Settings = require('../app/settings')

const Util = require('../app/util')


//----------------------------------------------------------------------------
//  ROUTES
//----------------------------------------------------------------------------

/**
 * Display home page
 */
router.route('/')
    .get(function(req, res) {
        res.render('pages/home')
    })

router.route('/settings')
    .post(function(req, res){
        console.log("TEST:" + JSON.stringify(req.body))
        Settings.setAll(req.body)
        res.status(204).send()
    })
    .get(function(req, res) {
        res.json(Settings.getAll())
    })
    
/**
 * TODO : Retrieve data from InfluxDB
 */
router.route('/systeminfo')
    .get(function(req, res) {
        //let influxDB = Util.connectToInfluxDB(database)
        //influxDB.query()

        res.render('pages/error')
    })


//------------------------------------------------------------
//  QUERY
//------------------------------------------------------------
/*function getQueryFromParams(params) {
    var measurement = params.measurement;
    var idNode = params.device;
    var timeFilter = params.timeFilter;
    var query = "";

    if (timeFilter === "None") query = "SELECT * FROM " + measurement + " WHERE device='" + idNode + "'";
    else if (timeFilter === "Since") {
        var ntime = params.nTime;
        var timeUnit = params.timeUnit;
        query = "SELECT * FROM " + measurement + " WHERE device='" + idNode + "' AND time> now() - " + ntime + timeUnit;
    }
    else if (timeFilter === "Between") {
        var time1 = moment(params.time1).utc().format();
        var time2 = moment(params.time2).utc().format();
        query = "SELECT * FROM " + measurement + " WHERE device='" + idNode + "' AND time>'" + time1 + "' AND time<'" + time2 + "'";
    }

    return query;
}*/

module.exports = router