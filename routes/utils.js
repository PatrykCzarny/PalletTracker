const {
    Router
} = require('express');
const {
    db
} = require('../db/db');
const {
    GridRecord
} = require('../records/grid');


const routerUpdate = Router();
const routerSwap = Router();

routerUpdate.put('/:FC', async (req, res) => {
    try {
        const resUpdate = await GridRecord.update({
            fc: String(req.params.FC),
            newItem: req.body
        });
        res.send(resUpdate);
    } catch (e) {
        console.log('Error :/ routerUpdate :', e);
    }
});



// fc, 
// first item name, first item lastUpdate,
// second item name,  first item lastUpdate,
routerSwap.put('/:FC', async (req, res) => {
    try {
        // console.log(req.params.FC);
        const resUpdate = await GridRecord.swap({
            fc: String(req.params.FC),
            firstRecord: {
                _id: String(req.body.firstRecord._id),
                name: String(req.body.firstRecord.name),
                lastUpdate: String(req.body.firstRecord.lastUpdate),
            },
            secondRecord: {
                _id: String(req.body.secondRecord._id),
                name: String(req.body.secondRecord.name),
                lastUpdate: String(req.body.secondRecord.lastUpdate),
            },
        });
        res.send(resUpdate);
    } catch (e) {
        console.log('Error :/ routerSwap :', e);
    }
});



module.exports = {
    routerUpdate,
    routerSwap,
};