const {
    db,
    ObjectId,
} = require('../db/db');
const {
    FcRecord
} = require('./fc');
const {
    ArchiveRecord
} = require('./archive');
const {
    resNumber
} = require('./auxiliaryFunctions');
const {
    request
} = require('express');


class GridRecord {

    constructor(obj) {

    }

    static async _validateFc(fc) {
        return new Promise(async res => {
            const resp = await FcRecord.checkFcExists(fc);
            res(resp)
        })
    }

    static _selectDbFc(user) {
        return db.collection(`${user.fc.toUpperCase()}-Grid`);
    }

    static async findOne(user) {
        const gridFc = this._selectDbFc(user);
        return await gridFc.findOne({
            "_id": ObjectId(user.newItem._id)
        });
    }

    //////////////////////////////////////////////////////////////
    //////// napisac async for each zeby nie zapchac pamieci /////
    /////////////////////// findAllCursor ///////////////////////
    /////////////////////////////////////////////////////////////

    // static async findOneCursor(obj) {
    //     // console.log('find one', obj);
    //     const gridFc = this._selectDbFc(obj);
    //     return await gridFc.findOne({
    //         'type': user.type
    //     });
    // }

    // static async findAllCursor(obj) {
    //     const gridFc = this._selectDbFc(obj);
    //     return await gridFc.findOneCursor(obj);
    // }

    static async findAll(user) {
        return new Promise(async res => {
            if (await this._validateFc(user) == null) {
                res(false)
            };
            const gridFc = this._selectDbFc(user);

            const resp = await gridFc.find({
                type: user.type
            }).toArray();

            res(resp);
        })
    }


    static async update(user) {
        if (Object.keys(user.newItem).length < 1) {
            return 'New item does not exist'
        }
        if (await this._validateFc(user) === null) {
            return 'This FC does not exist'
        };
        const oldRecord = await this.findOne(user);
        if (oldRecord === null) {
            return 'This item does not exist'
        }
        if (String(oldRecord.lastUpdate) !== String(user.newItem.lastUpdate)) {
            return ('Update required, your data is out of date');
        }
        const gridFc = this._selectDbFc(user);

        const filling = resNumber(user.newItem.filling, 'filling') === false ? Number(oldRecord.filling) : resNumber(user.newItem.filling, 'filling');

        const quantity = resNumber(user.newItem.quantity, 'quantity') === false ? Number(oldRecord.quantity) : resNumber(user.newItem.quantity, 'quantity');

        const setNewItem = {
            "type": String(user.newItem.type),
            "group": String(user.newItem.group),
            "category": String(user.newItem.category),
            "filling": filling,
            "asin": String(user.newItem.asin),
            "quantity": quantity,
            "arrivalID": String(user.newItem.arrivalID),
            "departureID": String(user.newItem.departureID),
            "use": String(user.newItem.use),
            "lastUpdate": Date.now()
        }

        gridFc.updateOne({
            _id: ObjectId(user.newItem._id)
        }, {
            $set: setNewItem
        });
        await ArchiveRecord.insert(oldRecord, setNewItem, user.fc, 'update');
    }

    static async swap(user) {
        if (await this._validateFc(user) === null) {
            return 'bad fc'
        };
        const firstRecord = await this.findOne({
            fc: user.fc,
            newItem: {
                _id: user.firstRecord._id
            }
        });

        if (firstRecord === null) {
            return 'bad firstRecord'
        }
        const secondRecord = await this.findOne({
            fc: user.fc,
            newItem: {
                _id: user.secondRecord._id
            }
        });
        if (secondRecord === null) {
            return 'bad secondRecord'
        }
        if (String(firstRecord.lastUpdate) !== String(user.firstRecord.lastUpdate) ||
            String(secondRecord.lastUpdate) !== String(user.secondRecord.lastUpdate)) {
            return ('Update required, your data is out of date');
        }
        const gridFc = this._selectDbFc(user);
        const setFirstItem = firstRecord;
        setFirstItem.lastUpdate = Date.now();
        delete setFirstItem._id;
        delete setFirstItem.name;
        const setSecondItem = secondRecord;
        setSecondItem.lastUpdate = Date.now();
        delete setSecondItem._id;
        delete setSecondItem.name;

        gridFc.updateOne({
            _id: ObjectId(user.firstRecord._id)
        }, {
            $set: setSecondItem
        });
        gridFc.updateOne({
            _id: ObjectId(user.secondRecord._id)
        }, {
            $set: setFirstItem
        });

        await ArchiveRecord.insert(setFirstItem, setSecondItem, user.fc, 'swap');
    }

}

module.exports = {
    GridRecord,
}