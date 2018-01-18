const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tableSchema = new Schema({
    columns: Array,
    data: Object,
    created_at: {type: Date},
    updated_at: {type: Date}
})

tableSchema.pre('save', function (next) {
    now = new Date();
    this.updated_at = now;
    if (!this.created_at) {
        this.created_at = now;
    }
    next();
})

module.exports = mongoose.model('Table', tableSchema);