const { ObjectID, ObjectId } = require("mongodb");
const { update } = require("../controllers/contact.controller");

class ContactService {
    constructor(client) {
        this.Contact = client.db().collection("contacts");

    }
    extracConactData(payload) {A
        const contact = {
            nane: payload.name,
            email: payload.email,
            address: payload.address,
            phone: payload.phone,
            favorite: payload.favorite,
        };
        Objects.keys(contact).forEach(
            (key) => contact[key] === undefined && delete contact[key]
        );
        return contact;
    }

    async create(payload) {
        const contact = this.extracConactData(payload);
        const result = await this.Contact.findOneAndUpdate(
            contact,
            { $set: { favorite: contact.favorite === true } },
            { returnDocument: "after", upsert: true }
        );
        return result.value;
    }

    async find (filter) {
        const cursor = await this.contact.find(filter);
        return await cursor.toArray();
    }

    async findByName (name) {
        return await this.find({
            name: { $regex: new RegExp(name), $option: "i" },
        });
    }

    async findByID(id) {
        return await this.contact.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }
    async update (id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id): null,
        };
        const update = this.extracConactData(payload);
        const result =  await this.Contact.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result.value; 
    }

    async delete (id) {
        const result = await this.contact.findOneAndDelete({
            _id: ObjectId.isValid(id)? new ObjectId(id) : null,
        });
        return result.value;
    }

    async findFavorite() {
        return await this.find({
            favorite: true
        });
    }

    async deleteAll() {
        const result = await this.contact.deleteAll({});
        return result.deleteCount;
    }

}

module.exports = ContactService;