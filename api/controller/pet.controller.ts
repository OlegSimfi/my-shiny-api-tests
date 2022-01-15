import { URLSearchParams } from 'url';
import { definitions, operations } from '../../.temp/types'
import { JsonRequestWithValidation } from '../request';
import { BaseController } from './base.controller';

export class PetController extends BaseController {
    async getById(id: number | string) {
        return (
            await new JsonRequestWithValidation()
                .url(`http://localhost/v2/pet/${id}`)
                .headers({ token: this.params.token })
                .cookieJar(this.params.cookies)
                .send<operations['getPetById']['responses']['200']['schema']>()
        ).body;
    }

    async findByTags(tags: string | string[]) {
        return (
            await new JsonRequestWithValidation()
                .url(`http://localhost/v2/pet/findByTags`)
                .headers({ token: this.params.token })
                .cookieJar(this.params.cookies)
                .searchParams(new URLSearchParams({ tags }))
                .send<operations['findPetsByTags']['responses']['200']['schema']>()
        ).body;
    }

    async findByStatus(status: string | string[]) {
        return (
            await new JsonRequestWithValidation()
                .url(`http://localhost/v2/pet/findByStatus`)
                .headers({ token: this.params.token })
                .cookieJar(this.params.cookies)
                .searchParams(new URLSearchParams({ status }))
                .send<operations['findPetsByStatus']['responses']['200']['schema']>()
        ).body;
    }


    async addNew(pet: Omit<definitions['Pet'], "id">) {
        return (
            await new JsonRequestWithValidation()
                .url(`http://localhost/v2/pet`)
                .headers({ token: this.params.token })
                .cookieJar(this.params.cookies)
                .method('POST')
                .body(pet)
                .send<Required<operations['addPet']['responses']['200']['schema']>>()
        ).body;
    }

    async update(pet: definitions['Pet']) {
        return (
            await new JsonRequestWithValidation()
                .url(`http://localhost/v2/pet`)
                .headers({ token: this.params.token })
                .cookieJar(this.params.cookies)
                .method('PUT')
                .body(pet)
                .send<operations['updatePet']['responses']['200']['schema']>()
        ).body;
    }

    async delete(id: number | string) {
        return (
            await new JsonRequestWithValidation()
                .url(`http://localhost/v2/pet/${id}`)
                .headers({ token: this.params.token })
                .cookieJar(this.params.cookies)
                .method('DELETE')
                .send<{ message: string }>()
        ).body;
    }
}