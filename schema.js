// const axios = require('axios');
const { default: axios } = require('axios');
const {
	GraphQLInt,
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLList,
	GraphQLNonNull,
	GraphQLString,
} = require('graphql');

//hardcoded data
// const customers = [
// 	{
// 		id: '1',
// 		name: 'John Doe',
// 		email: 'johndoe@gmail.com',
// 		age: 35,
// 	},
// 	{
// 		id: '2',
// 		name: 'Brad Traversy',
// 		email: 'bradT@gmail.com',
// 		age: 45,
// 	},
// 	{
// 		id: '3',
// 		name: 'Twisam Stark',
// 		email: 'lennoxstark@gmail.com',
// 		age: 25,
// 	},
// ];

//customer type
const CustomerType = new GraphQLObjectType({
	name: 'Customer',
	fields: () => ({
		id: { type: GraphQLString },
		name: { type: GraphQLString },
		email: { type: GraphQLString },
		age: { type: GraphQLInt },
	}),
});

//root query
const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		customer: {
			type: CustomerType,

			args: {
				id: { type: GraphQLString },
			},
			resolve(parentValue, args) {
				// for (
				// 	let i = 0;
				// 	i < customers.length;
				// 	i++
				// ) {
				// 	if (customers[i].id == args.id) {
				// 		return customers[i];
				// 	}
				// }

				return axios
					.get(
						'http://localhost:3000/customers/' +
							args.id
					)
					.then((response) => response.data);
			},
		},
		customers: {
			type: new GraphQLList(CustomerType),
			resolve(parentValue, args) {
				return axios
					.get('http://localhost:3000/customers/')
					.then((response) => response.data);
			},
		},
	},
});

const mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		addCustomer: {
			type: CustomerType,
			args: {
				name: {
					type: new GraphQLNonNull(GraphQLString),
				},
				email: {
					type: new GraphQLNonNull(GraphQLString),
				},
				age: { type: GraphQLNonNull(GraphQLInt) },
			},
			resolve(parentValue, args) {
				return axios
					.post(
						'http://localhost:3000/customers/',
						{
							name: args.name,
							email: args.email,
							age: args.age,
						}
					)
					.then((res) => res.data);
			},
		},
	},
});

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: mutation,
});
