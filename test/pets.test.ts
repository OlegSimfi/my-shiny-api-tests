import {deepEqual, strict as assert} from 'assert'
import {PetController} from "../api/controller/pet.controller";
import {definitions} from "../.temp/types";

const pet = new PetController();

describe('Pet', () => {
    it('can get pet by id', async function () {
        const body = await pet.getById(1);
        assert(body.id == 1, `Expect API to return pet with id 1 but got ${body.id}`);
    });

    it('can get pet by status', async function () {

        let body = await pet.findByStatus('available')
        assert(body.length > 0)

        body = await pet.findByStatus('pending')
        assert(body.length > 0)

        body = await pet.findByStatus('sold')
        assert(body.length > 0)

        body = await pet.findByStatus(['pending', 'available'])
        assert(body.length > 0)
        assert(body.some(pet => pet.status == 'available'))
        assert(body.some(pet => pet.status == 'pending'))
        assert(!body.some(pet => pet.status == 'sold'))
    });

    it('can get pet by tag', async function () {
        const body = await pet.findByTags('tag1')
        assert(body.length > 0)
        assert(body.every(
            pet => pet.tags.some(
                (tag: any) => tag.name == 'tag1')
            ), `Every returned pet must contain tag1`
        )
    })

    it('can be added, updated and deleted', async function () {
        const petToCreate: Omit<definitions['Pet'], 'id'>  = {
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
            "status": "available"
        }
        const addedPet = await pet.addNew(petToCreate)

        assert.deepEqual(addedPet, {
            ...petToCreate,
            id: addedPet.id
        },`Expected created pet to match data used upon creation`)

        const foundAddedPet = await pet.getById(addedPet.id)
        assert.deepEqual(foundAddedPet,
            {...petToCreate,
            id: addedPet.id},
            `Expected created pet to match data used upon creation`)

        const newPet: definitions['Pet'] = {
            id: addedPet.id,
            category: {
                "id": 1,
                "name": "string2"
            },
            "name": "Dog",
            "photoUrls": ["https://test.com/image2.jpg"],
            "tags":[
                {
                    "id": 1,
                    "name": "string2"
                },
            ],
            "status": "pending"
        }
        const updatedPet = await pet.update(newPet)
        assert.deepEqual(updatedPet, newPet, `Expected updated pet to equal data used upon updating`)
        await pet.delete(addedPet.id)

        //TODO: assert 404 error on attemp to get pet thet was deleted
    });
}) 