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

const collegeDetails = async function(req,res){
    try {
        collegeName = req.query.collegeName;
        if(!collegeName)
        
        return res.status(400).send({status:false, msg:'please provide collegeName in the query'})

        const collegeNames = await collegeModel.findOne({ name : collegeName, isDeleted:false })
        if(!collegeNames) {
            return res.status(404).send({ status : false , message : "no college available with this name" })
        }
        // let colleges = await collegeModel.findOne({name:collegeName, isDeleted:false})
        const {name,fullName,logoLink} = collegeNames

        const collegeId = collegeNames._id

        const internDetails = await internModel.find({collegeId:collegeId, isDeleted:false}).select
        ({"_id":1,"name":1,"email":1,"mobile":1})
        

        const interns = internDetails
        const data = {name:name,fullName:fullName,logoLink:logoLink,interns:internDetails}
        return res.status(201).send({ status: true, data: data })
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message });
    }

    }


module.exports.createCollege = createCollege
module.exports.collegeDetails = collegeDetails