require('../../support');

var expect = require('chai').expect;

var ItemSchema = require('../../../lib/domain/item-schema');
var modelPropertiesConverter = require('../../../lib/domain/model-properties-converter');


describe('modelPropertiesConverter', function() {
    describe('converting $schema', function() {
        beforeEach(function() {
            this.jsonSchema = new ItemSchema();
            this.jsonSchema.update$schema();
            this.jsonSchema.__data.$schema = this.jsonSchema.$schema; // __data.$schema will be defined when a post is received
        });

        describe('.convert', function() {
            it('should convert only if there is a $schema', function() {
                delete this.jsonSchema.$schema;

                modelPropertiesConverter.convert(this.jsonSchema);

                expect(this.jsonSchema).to.not.have.ownProperty('%24schema');
            });

            it('should convert $schema to %24schema', function() {
                modelPropertiesConverter.convert(this.jsonSchema);

                expect(this.jsonSchema['%24schema']).to.exist;
                expect(this.jsonSchema.__data['%24schema']).to.exist;
                expect(this.jsonSchema.$schema).to.not.exist;
                expect(this.jsonSchema.__data.$schema).to.not.exist;
            });
        });

        describe('.restore', function() {
            beforeEach(function() {
                modelPropertiesConverter.convert(this.jsonSchema);
                modelPropertiesConverter.restore(this.jsonSchema);
            });

            it('should restore %24schema to $schema', function() {
                expect(this.jsonSchema.$schema).to.exist;
                expect(this.jsonSchema.__data.$schema).to.exist;
                expect(this.jsonSchema['%24schema']).to.not.exist;
                expect(this.jsonSchema.__data['%24schema']).to.not.exist;
            });
        });
    });
});
