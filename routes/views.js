const {
    Router
} = require('express');
const {
    db
} = require('../db/db');
const {
    GridRecord
} = require('../records/grid');
const {
    SettingsRecord
} = require('../records/settings');
const {
    ArchiveRecord
} = require('../records/archive');
const {
    Deliveries
} = require('../records/deliveries');

const routerList = Router();
const routerHeatmap = Router();
const routerSettings = Router();
const routerArchive = Router();
const routerDelivery = Router();
const routerError = Router();
const routerMain = Router();




routerList.get('/:FC?', async (req, res) => {
    try {

        const resp = await GridRecord.findAll({
            fc: req.params.FC,
            type: 'stock',
        });

        const renderViews = resp ? 'list' : 'errorFc';
        const returnData = resp ? resp : '';
        res.render(renderViews, {
            returnData,
            fc: req.params.FC,
        })
    } catch (e) {
        console.log('Error :/ routerList :', e);
    }
});

routerHeatmap.get('/:FC?', async (req, res) => {
    try {

        const resp = await GridRecord.findAll({
            fc: req.params.FC,
            type: 'stock',
        });
        const renderViews = resp ? 'heatmap' : 'errorFc';
        const returnData = resp ? resp : '';
        res.render(renderViews, {
            returnData,
            fc: req.params.FC
        })
    } catch (e) {
        console.log('Error :/ routerHeatmap :', e);
    }
});

routerSettings.get('/:FC?', async (req, res) => {
    try {
        const resp = await SettingsRecord.findGroupCategory({
            fc: req.params.FC
        });
        const renderViews = resp ? 'settings' : 'errorFc';
        const returnData = resp ? {
            group: resp.group.list,
            category: resp.category
        } : '';

        res.render(renderViews, {
            returnData
        })
    } catch (e) {
        console.log('Error :/ routerSettings :', e);
    }
});

routerArchive.get('/:FC?', async (req, res) => {
    try {
        const resp = await ArchiveRecord.findAll({
            fc: req.params.FC,
        });
        const renderViews = resp ? 'archive' : 'errorFc';
        const returnData = resp ? resp : '';
        res.render(renderViews, {
            returnData
        })
    } catch (e) {
        console.log('Error :/ routerArchive :', e);
    }
});

routerDelivery.get('/:FC?', async (req, res) => {
    try {
        const scheduleDelivery = await GridRecord.findAll({
            fc: req.params.FC,
            type: 'scheduleDelivery',
        });
        const expectedDelivery = await GridRecord.findAll({
            fc: req.params.FC,
            type: 'expectedDelivery',
        });
        const renderViews = scheduleDelivery && expectedDelivery ? 'delivery' : 'errorFc';
        res.render(renderViews, {
            scheduleDelivery,
            expectedDelivery,
            fc: req.params.FC
        })
    } catch (e) {
        console.log('Error :/ routerDelivery :', e);
    }
});



routerMain.get('/', async (req, res) => {
    res.render('mainPage')
})

routerError.get('*', async (req, res) => {
    try {
        res.redirect('/mainPage');
    } catch (e) {
        console.log('Error :/ routerError :', e);
    }
});




module.exports = {
    routerList,
    routerHeatmap,
    routerSettings,
    routerArchive,
    routerDelivery,
    routerError,
    routerMain,
};