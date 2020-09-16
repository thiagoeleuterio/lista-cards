import React from "react"
import { Query } from "react-apollo"
import { gql } from "apollo-boost"

const GET_COUNTRIES = gql`
	{
		Country {
			numericCode
			name
			capital    
			flag {
				emoji
				emojiUnicode
				svgFile
			}
		}
	}
`

class CountrySelect extends React.Component {
	state = {
		country: "Brazil",
		capital: ""
	}

	// set the selected country to the new input value
	onCountryChange = event => {
		this.setState({ 
			country: event.target.value
		})
	}

	render() {
		return (
			<Query query={GET_COUNTRIES}>
				{({ loading, error, data }) => {
					if (loading) return <p>Loading...</p>
					if (error) return <p>{error.message}</p>
					return (
						<div>
							<select
								value={this.state.country}
								onChange={this.onCountryChange}
								style={{ marginTop: "30px", height: "50px", fontSize: "20px" }}
							>
								{data.Country.map(({ numericCode, name, capital, flag }) => (
									<option key={numericCode} value={name}>
										{name} 
									</option>
								))}
							</select>
							<h2>País: {this.state.country}</h2>

							{data.Country.map(({ numericCode, name, capital, flag }) => {
								if (name === this.state.country) return (
									<div>
										<h3>Capital: {capital}</h3>
										<img src={flag.svgFile} />
									</div>
								)
							})}
							

						</div>
					)
				}}
			</Query>
		)
	}
}

export default CountrySelect
