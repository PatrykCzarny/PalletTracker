const {
    db
} = require('../db/db')

class Deliveries {
    constructor() {}

    static async getNewDeliveryNo() {
        return new Promise(async res => {
            const deliveries = db.collection('Deliveries');
            const cursor = deliveries.find({}).sort({
                deliveryNo: -1
            }).limit(1);
            let delivery = await cursor.toArray();
            delivery = delivery[0];
            res(Number(delivery.deliveryNo) + 1)
        });
    };

    static async insertDelivery(user) {
        return new Promise(async res => {
            const deliveries = db.collection('Deliveries');
            const getDeliveryNumber = await getNewDeliveryNo();
            const data = {
                from: String(user.from),
                to: String(user.to),
                deliveryNo: Number(getDeliveryNumber),
            };
            await deliveries.insertOne(data);
            res();
        });
    };

}

module.exports = {
    Deliveries,
}