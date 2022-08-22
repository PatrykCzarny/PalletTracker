const {
    db,
    ObjectId,
} = require('../db/db');
const {
    FcRecord
} = require('./fc');


class ArchiveRecord {

    constructor(user) {

    }

    static async _validateFc(fc) {
        return new Promise(async res => {
            const resp = await FcRecord.checkFcExists(fc);
            res(resp)
        })
    }

    static _selectDbFc(user) {
        return db.collection(`${(user.fc).toUpperCase()}-Archive`);
    }

    //////////////////////////////////////////////////////////////
    //////// napisac async for each zeby nie zapchac pamieci /////
    /////////////////////// findOneCursor ///////////////////////
    /////////////////////////////////////////////////////////////
    // static async findOneCursor(obj, findProperty) {
    //     const gridFc = this._selectDbFc(obj);
    //     return await gridFc.findOne({
    //         findProperty: obj[findProperty]
    //     });
    // }



    static async findOne(user) {
        const gridFc = this._selectDbFc(user);
        return await gridFc.findOne({
            "_id": ObjectId(user.newItem._id)
        });
    }

    static async findAll(user) {
        return new Promise(async res => {
            if (await this._validateFc(user) === null) {
                res(false)
            };
            const gridFc = this._selectDbFc(user);
            const resp = await gridFc.find({}).toArray();
            res(resp);
        })
    }


    static async insert(oldObj, newObject, reqFc, typeArchive) {
        return new Promise(async res => {

            const thisFc = db.collection(`${reqFc.toUpperCase()}-Archive`);
            // console.log(reqFc);
            const request = {
                "lastUpdate": Date.now(),
                "type": typeArchive,
                "old": oldObj,
                "new": newObject,
            };

            await thisFc.insertOne(request);
            console.log('Inserted Data to Archive');
            res('inserted');
        });

    }

}

module.exports = {
    ArchiveRecord,
}