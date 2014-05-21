require('../support');

var expect = require('chai').expect;
var loopback = require('loopback');
var request = require('supertest');

var loopbackJsonSchema = require('../../index');
var JsonSchema = require('../../lib/models/json-schema');
var jsonSchemaMiddleware = require('../../lib/middleware/json-schema.middleware');

var app = loopback();
app.set('restApiRoot', '/api');
app.use(app.get('restApiRoot'), jsonSchemaMiddleware());
loopbackJsonSchema.init(app);
app.installMiddleware();

describe('POST /:collection', function() {
    beforeEach(function (done) {
        JsonSchema.create({
            modelName: 'person',
            collectionName: 'people',
            title: 'Person',
            collectionTitle: 'People',
            type: 'object',
            properties: {}
        }, function(err, jsonSchema) {
            if (err) { throw err };
            jsonSchemaId = jsonSchema.id;
            done();
        });
    });

    xit('', function (done) {
        request(app)
            .post('/api/people')
            .set('Content-Type', 'application/json')
            .send('{"name": "Alice"}')
            .expect(200)
            .end(function (err, res) {
                if (err) { throw err };

                expect(res.headers['link']).to.exist;
                expect(res.headers['content-type']).to.match(/^application\/json; charset=utf-8; profile=.*\/api\/json-schemas\/.*/);
                done();
            });
    });
});