const express = require('express');
const router = express.Router();

const Table = require("../models/tableModel")

router.get('/', async (req, res, next) => {

    const response = await Table.findOne({}, {}, {sort: {'created_at': -1}})

    if (!response) {
        res.json({
            data: [],
            columns: [],

        })
        return
    }

    res.json(response)
});
router.post('/', async (req, res) => {

    const table = new Table({
        columns: req.body.columns,
        data: req.body.data
    })

    const response = await table.save()
    res.json({success: "ok"})
})

module.exports = router;
