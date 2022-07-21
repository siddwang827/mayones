const server = require('../server')
const chai = require('chai')
const chaiHttp = require('chai-http')
const { NODE_ENV } = process.env
const { truncateFakeData, createFakeData } = require('./fake_data_generator')

chai.use(chaiHttp);
chai.use(deepEqualInAnyOrder);

const assert = chai.assert;
const expect = chai.expect;
const requester = chai.request(app).keepOpen();

before(async () => {
    if (NODE_ENV !== 'test') {
        throw 'Not in test env';
    }

    await truncateFakeData();
    await createFakeData();
});


module.exports = {

}