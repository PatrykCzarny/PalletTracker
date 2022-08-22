const {
    db
} = require('../db/db');
const {
    FcRecord
} = require('./fc');

class SettingsRecord {
    constructor(user) {}
    static async _validateFc(fc) {
        return new Promise(async res => {
            const resp = await FcRecord.checkFcExists(fc);
            res(resp)
        })
    }

    static _selectDbFc(user) {
        return db.collection(`${(user.fc).toUpperCase()}-Grid`);
    }

    static async findGroupCategory(user) {
        if (await this._validateFc(user) === null) {
            return false
        };
        const gridFc = this._selectDbFc(user);
        const group = await gridFc.findOne({
            "type": 'group'
        });
        const category = await gridFc.findOne({
            "type": 'category'
        });
        return {
            category,
            group
        }
    }

}

module.exports = {
    SettingsRecord,
}