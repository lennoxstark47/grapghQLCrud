const express = require('express');
const expressGraphQL =
	require('express-graphql').graphqlHTTP;
const schema = require('./schema');
const app = express();

const port = process.env.PORT || 5000;

app.use(
	'/graphql',
	expressGraphQL({
		schema: schema,
		graphiql: true,
	})
);

app.listen(port, () => {
	console.log(`App is running on port ${port}`);
});
