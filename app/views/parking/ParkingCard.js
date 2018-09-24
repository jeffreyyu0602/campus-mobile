import React from 'react'
import { withNavigation } from 'react-navigation'
import ScrollCard from '../common/ScrollCard'
import ParkingOverview from './ParkingOverview'

const ParkingCard = ({
	savedStructures,
	navigation,
	gotoParkingSpotType,
	mySpots,
	lotCount
}) => {
	const extraActions = [
		{
			name: 'Edit Spot Type',
			action: gotoParkingSpotType
		}
	]

	return (
		<ScrollCard
			id="parking"
			title="Parking Availability"
			renderItem={({ item }) => (
				<ParkingOverview
					structureData={item}
					spotsSelected={mySpots}
					lotCount={lotCount}
				/>
			)}
			extraData={mySpots}
			scrollData={savedStructures}
			extraActions={extraActions}
		/>
	)
}


export default withNavigation(ParkingCard)
