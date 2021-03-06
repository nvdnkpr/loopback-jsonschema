var LJSRequest = require('./ljs-request');
var CollectionSchema = require('../domain/collection-schema');
var ItemSchema = require('../domain/item-schema');

module.exports = {
    collection: function correlateCollection (collectionName, ctx, result, next) {
        var baseUrl = new LJSRequest(ctx.req, ctx.req.app).baseUrl();
        var schemaUrl = CollectionSchema.urlForCollectionName(collectionName);

        injectSchemaHeaders(baseUrl + schemaUrl, ctx.res);
        next();
    },
    instance: function correlateInstance (collectionName, ctx, result, next) {
        var baseUrl = new LJSRequest(ctx.req, ctx.req.app).baseUrl();
        var schemaUrl = ItemSchema.urlForCollectionName(collectionName);
        injectSchemaHeaders(baseUrl + schemaUrl, ctx.res);
        next();
    }
};

function injectSchemaHeaders(schemaUrl, res) {
    res.set('Content-Type', 'application/json; charset=utf-8; profile="' + schemaUrl + '"');
    res.set('Link', '<' + schemaUrl + '>; rel="describedby"');
}
