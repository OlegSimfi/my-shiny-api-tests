import { strict as assert } from 'assert'
import { definitions } from '../.temp/types';
import { ApiClient } from '../api/client';

describe('Store', () => {
    it('can return his inventory, and correctly updates statuses', async function () {
        // Potential issue when running in parallel, and other threads will add pets as well.
        const adminClient = await ApiClient.loginAs({ username: 'admin', password: 'admin' });
        const inventory = await adminClient.store.getInventory();
        assert(Object.keys(inventory).length > 0, `List of inventory statuses must not be empty`)

        await adminClient.pet.addNew(petWithStatus('available'))
        const inventoryWithAvailableAdded = await adminClient.store.getInventory()
        assert.equal(inventoryWithAvailableAdded.available, inventory.available + 1, `Available value in inventory must be increased by 1`)

        await adminClient.pet.addNew(petWithStatus('pending'))
        const inventoryWithPendingAdded = await adminClient.store.getInventory()
        assert.equal(inventoryWithPendingAdded.pending, inventory.pending + 1, `Pending value in inventory must be increased by 1`)

        await adminClient.pet.addNew(petWithStatus('sold'))
        const inventoryWithSoldAdded = await adminClient.store.getInventory()
        assert.equal(inventoryWithSoldAdded.sold, inventory.sold + 1, `Sold value in inventory must be increased by 1`)
    })
})

function petWithStatus(status: definitions['Pet']['status']){
    return {
        "category": {
            "id": 0,
            "name": "string"
        },
        "name": "Cat",
        "photoUrls": ["https://test.com/image.jpg"],
        "tags":[
            {
                "id": 0,
                "name": "string"
            },
        ],
        "status": status
    }
}