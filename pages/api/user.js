import clientPromise from '../../lib/mongodb'

export default async (req, res) => {
	const client = await clientPromise
	const db = await client.db('MetaTeds')

	const collection = 'MetaTedsDB'

	switch (req.method) {
		// READ ALL
		case 'GET':
			try {
				let users = await db.collection(collection).find({}).limit(20).toArray()
				res.json(users)
			} catch (error) {
				res.json(error)
			}
			break

		// CREATE
		case 'POST':
			try {
				let bodyObject = req.body
				let newUser = await db.collection(collection).insertOne(bodyObject)
				res.json(newUser)
			} catch (error) {
				res.json(error)
			}
			break

		// UPDATE   ----  NOT WORKING ----
		case 'PUT':
			try {
				const updateResult = await collection.updateOne(
					{ username: req.body.username },
					{ $set: { username: req.body.newUsername } }
				)
				res.json(updateResult)
			} catch (error) {
				res.json(error)
			}
			break

		// DELETE   ----  NOT WORKING ----
		case 'DELETE':
			try {
				const deleteResult = await collection(collection).deleteMany({
					username: req.body.id
				})
				res.json(deleteResult)
			} catch (error) {
				res.json(error)
			}
			break

		default:
			res.json('error')
	}
}
