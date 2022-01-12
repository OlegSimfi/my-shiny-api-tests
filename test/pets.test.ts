import got from 'got';
import { strict as assert } from 'assert'

describe('Pets', () => {
    it('can get pet by id', async function () {
        const response = await got('http://petstore.swagger.io/v2/pet/1');
        const body = JSON.parse(response.body);
        console.log(body);
        assert(body.id == 1);
    })
}) 