import { connect, model, models, Schema } from "mongoose"
const connectionString = 'mongodb+srv://user1:o6rmMOMN3GwhBzM1@cluster0.2uil9zm.mongodb.net/supplier'

export default async function handler(req, res) {
    await connect(connectionString);
    console.log("req.method: ", req.method)

    if (req.method === 'GET') {
        const docs = await Suppliers.find()
        res.status(200).json(docs)
    } else if (req.method === 'POST') {
        console.log(typeof(req.body))
        // res.status(200).json(req.body)
        const doc = await Suppliers.create(req.body)
        res.status(201).json(doc)
    } else {
        res.setHeader('Allow', ['GET', 'POST'])
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
