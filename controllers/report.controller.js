const ReportModel = require('../models/report.model');
const ObjectID = require('mongoose').Types.ObjectId;
const PostModel = require ('../models/post.model');

//trouver tout les utilisateurs
module.exports.getAllReports = async (req, res) => {
    const reports = await ReportModel.find();
    res.status(201).json(reports);
};

module.exports.confirmReport = async (req, res) => 
{
    console.log("DANS CONFIRMREPORT");
    console.log(req.body)

    ReportModel.findByIdAndUpdate(req.body.idReport,
        {
            $set: { "post.isSuspend" : true },
        }, (err, docs) =>
        {
            if(!err) 
            {
                console.log("Pas 'erreur report : ");
                console.log(docs)

                PostModel.findByIdAndUpdate(req.body.idPost ,
                    {
                        $set: { isSuspend : true },
                    }, (err, docs) =>
                    {
                        if(!err) 
                        {
                           console.log(" PAS Erreur post : ")
                            console.log(docs)
                           res.status(200).send(docs)
                        }
                        else 
                        {
                           console.log("Erreur post : ")
                            console.log(err), 
                            res.status(404).send(err)
                        }
                    })
            }
            else 
            {
                console.log("Erreur report : ")
                console.log(err)
                res.status(404).send(err)
            }
        })

         
}

module.exports.cancelReport = async (req, res) => 
{
    console.log("DANS CANCELREPORT");
    console.log(req.body)

    ReportModel.findByIdAndUpdate(req.body.idReport,
        {
            $set: { "post.isSuspend" : false },
        }, (err, docs) =>
        {
            if(!err) 
            {
                console.log("Pas 'erreur report : ");
                console.log(docs)

                PostModel.findByIdAndUpdate(req.body.idPost ,
                    {
                        $set: { isSuspend : false },
                    }, (err, docs) =>
                    {
                        if(!err) 
                        {
                           console.log(" PAS Erreur post : ")
                            console.log(docs)
                           res.status(200).send(docs)
                        }
                        else 
                        {
                           console.log("Erreur post : ")
                            console.log(err), 
                            res.status(404).send(err)
                        }
                    })
            }
            else 
            {
                console.log("Erreur report : ")
                console.log(err)
                res.status(404).send(err)
            }
        })

         
}

module.exports.deleteReport = async (req, res) => 
{
    console.log("DANS DELETEREPORT");
    console.log(req.params)
     ReportModel.findByIdAndRemove(req.params.id, (err, docs) => {
        if(!err) res.status(200).send(docs);
        else console.log("Delete error : " + err);
    })
}
