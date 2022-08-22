const {
    MongoClient,
    ObjectId
} = require('mongodb');
// const {
//     resNumber
// } = require('./dbutils');

// class DB {
//     constructor() {
//         // this.client = client;
//         // this.db = db;
//     };

//     _buildConnect() {
//         this.client = new MongoClient('mongodb://localhost:27017');
//         this.client.connect().then(() => {
//             console.log('Connected');
//         });
//         this.db = this.client.db('Palletland');
//     };

//     async _checkFcExists(reqFc) {
//         return new Promise(async res => {
//             const allFc = this.db.collection('AllFC');
//             const resFc = await allFc.findOne({
//                 "name": `${reqFc}`
//             });
//             res(resFc)
//         })
//     };

//     async _findOne(requestedFc, name) {
//         return new Promise(async res => {
//             const resObj = await requestedFc.findOne({
//                 "name": `${name}`
//             });
//             res(resObj);
//         })
//     }

//     async _findStockFc(reqFc) {
//         return new Promise(async res => {
//             const requestedFc = this.db.collection(`${reqFc}-Grid`);
//             const resp = await requestedFc.find({
//                 type: "stock"
//             }).toArray();
//             res(resp)
//         })
//     };

//     async _findArchiveFc(reqFc) {
//         return new Promise(async res => {
//             const requestedFc = this.db.collection(`${reqFc}-Archive`);
//             const resp = await requestedFc.find({}).toArray();
//             res(resp)
//         })
//     };

//     async _findDeliveryFc(reqFc) {
//         return new Promise(async res => {
//             const requestedFc = this.db.collection(`${reqFc}-Grid`);
//             const resp = await requestedFc.find({
//                 type: "delivery"
//             }).toArray();
//             res(resp)
//         })
//     };

//     async _findGroupCategoryFc(reqFc) {
//         return new Promise(async res => {
//             const requestedFc = this.db.collection(`${reqFc}-Grid`);
//             const category = await requestedFc.findOne({
//                 type: "category"
//             });
//             const group = await requestedFc.findOne({
//                 type: "group"
//             });
//             res({
//                 category,
//                 group
//             })
//         })
//     };

//     async getStock(fc) {
//         return new Promise(async res => {
//             const reqFc = String(fc).toUpperCase();
//             const checkFc = await this._checkFcExists(reqFc);
//             if (checkFc === null) {
//                 res(false)
//             };
//             const resp = await this._findStockFc(reqFc);
//             res(resp)
//         })
//     };

//     async getArchive(fc) {
//         return new Promise(async res => {
//             const reqFc = String(fc).toUpperCase();
//             const checkFc = await this._checkFcExists(reqFc);
//             if (checkFc === null) {
//                 res(false)
//             };
//             const resp = await this._findArchiveFc(reqFc);
//             res(resp)
//         })
//     };

//     async getDelivery(fc) {
//         return new Promise(async res => {
//             const reqFc = String(fc).toUpperCase();
//             const checkFc = await this._checkFcExists(reqFc);
//             if (checkFc === null) {
//                 res(false)
//             };
//             const resp = await this._findDeliveryFc(reqFc);
//             res(resp)
//         })
//     };

//     async getGroupCategory(fc) {
//         return new Promise(async res => {
//             const reqFc = String(fc).toUpperCase();
//             const checkFc = await this._checkFcExists(reqFc);
//             if (checkFc === null) {
//                 res(false)
//             };
//             const resp = await this._findGroupCategoryFc(reqFc);
//             res(resp)
//         })
//     };

//     async addToArchive(oldObj, newObject, reqFc, typeArchive, needCheckFc) {
//         return new Promise(async res => {
//             if (needCheckFc) {
//                 const checkFc = await this._checkFcExists(reqFc);
//                 if (checkFc === null) {
//                     res(false)
//                 };
//             }
//             const thisFc = this.db.collection(`${reqFc}-Archive`);
//             const request = {
//                 "lastUpdate": Date.now(),
//                 "type": typeArchive,
//                 "old": oldObj,
//                 "new": newObject,
//             };
//             await thisFc.insertOne(request);
//             console.log('updated');
//             res('updated');
//         });
//     };

//     async updateLocation(fc, newItem) {
//         return new Promise(async res => {
//             const reqFc = String(fc).toUpperCase();
//             const checkFc = await this._checkFcExists(reqFc);
//             if (checkFc === null) {
//                 res(false)
//             };
//             const thisFc = this.db.collection(`${reqFc}-Grid`);
//             const foundItem = await this._findOne(thisFc, newItem.name);
//             if (foundItem.lastUpdate !== newItem.lastUpdate) {
//                 res('update required');
//             }
//             thisFc.updateOne({
//                 name: newItem.name
//             }, {
//                 $set: {
//                     "type": String(newItem.type),
//                     "group": String(newItem.group),
//                     "category": String(newItem.category),
//                     "filling": resNumber(newItem.filling, 'filling'),
//                     "asin": String(newItem.asin),
//                     "quantity": resNumber(newItem.quantity, 'quantity'),
//                     "arrivalID": String(newItem.arrivalID),
//                     "departureID": String(newItem.departureID),
//                     "use": String(newItem.use),
//                     "lastUpdate": Date.now()
//                 }
//             });
//             await this.addToArchive(foundItem, newItem, reqFc, 'update', false);
//             res('updated')
//         })
//     }
// }

// const db = new DB();

// db._buildConnect();



const client = new MongoClient('mongodb://localhost:27017');
client.connect();
const db = client.db('Palletland');
console.log('connected');

module.exports = {
    db,
    ObjectId,
}