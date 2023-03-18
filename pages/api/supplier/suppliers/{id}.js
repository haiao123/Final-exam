import { connect, model, models, Schema } from "mongoose"
const connectionString = 'mongodb+srv://user1:o6rmMOMN3GwhBzM1@cluster0.2uil9zm.mongodb.net/supplier'

export default async function handler(req, res) {
    await connect(connectionString);
    console.log("req.method: ", req.method)
    console.log("req.query.id", req.query.id)

    const id = req.query.id
    if (req.method === 'GET') {
        // Get only one document
        const doc = await Suppliers.findOne({ _id: id })
        res.status(200).json(doc)
    } else if (req.method === 'DELETE') {
        const deletedDoc = await Suppliers.deleteOne({ _id: id })
        res.status(200).json(deletedDoc)
    } else {
        res.setHeader('Allow', ['GET', 'DELETE'])
        res.status(405).end(`Method ${req.method} Not Allowed`)

    }
}



const suppliersSchema = new Schema({
    Name: String,
    Adderss: String,
    time : String
});

console.log("Mongoose Models", models)
const Suppliers = models?.suppliers || model('suppliers', suppliersSchema);

