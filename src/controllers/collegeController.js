const collegeModel = require('../models/collegeModel')
const internModel = require('../models/internModel')

const isValid = function(value){
    if(typeof value ==='undefined' || typeof value === null) return false
    if(typeof value === 'string' && value.trim().length ===0) return false
    return true
}

const isValidRequestBody = function(requestBody){
    return Object.keys(requestBody).length>0
}

const createCollege = async function (req, res) {
    try {
        const collegeData = req.body;
        const {name,fullName,logoLink} = collegeData
       
        if(!isValidRequestBody (collegeData)) {
            res.status(400).send({status: false, msg: "please enter college details" })
            return
        }

       if(!isValid(name)) {
           res.status(400).send({status: false, msg: "please enter college name" })
           return
       }
       if(!isValid(fullName)) {
        res.status(400).send({status: false, msg: "please enter college full name" })
        return
    }
    if(!isValid(logoLink)) {
        res.status(400).send({status: false, msg: "please enter logo link" })
        return
    }
    if (collegeData) {
        let savedcollegeData = await collegeModel.create(collegeData)
        res.status(201).send({status: true, data: {savedcollegeData} })
    }
    else {
        res.status(400).send({status: false, msg: "enter valid data" })
    }
}
catch (err) {
    res.status(500).send({status: false, msg: err.message });
}
}


module.exports.createCollege = createCollege