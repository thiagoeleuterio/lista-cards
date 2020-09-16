import React from "react"
import { Query } from "react-apollo"
import { gql } from "apollo-boost"

const GET_ALL_COUNTRIES = gql`
	{
	Country {
		name
		numericCode
	}
}
`

const List = () => (
	<Query query={GET_ALL_COUNTRIES}>
		{({ loading, error, data }) => {
			if (loading) return <h1>Loading...</h1>
			if (error) return <h2>404. Looks like API is down!</h2>

			return data.countries.map(({ name, numericCode }) => (
				<div key={numericCode}>
					<p>Name: {name}</p>
					<p>Flag:</p>
					<hr />
				</div>
			))
		}}
	</Query>
)

export default List