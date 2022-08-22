const {
    db
} = require('../db/db')

class FcRecord {
    constructor(name) {}
    static async checkFcExists(name) {
        return new Promise(async res => {
            const allFc = db.collection('AllFC');
            const resFc = await allFc.findOne({
                "name": name.fc.toUpperCase()
            });
            res(resFc)
        })
    };
    static async getAllFc() {
        return new Promise(async res => {
            const allFc = db.collection('AllFC');
            const resFc = await allFc.find({}).toArray();
            const tabFc = resFc.map(el => el.name)
            res(tabFc)
        })
    };

}

module.exports = {
    FcRecord,
}