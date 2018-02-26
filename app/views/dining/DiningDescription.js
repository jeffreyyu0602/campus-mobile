import React from 'react';
import {
	View,
	Text,
} from 'react-native';
import moment from 'moment';
import DiningHours from './DiningHours';

import css from '../../styles/css';

const dining = require('../../util/dining');

const DiningDescription = ({
	name, description, regularHours, specialHours, paymentOptions
}) => {
	const hoursStatus = dining.getOpenStatus(regularHours, specialHours);

	let paymentOptionsText = null;
	if (paymentOptions) {
		paymentOptions.forEach((option) => {
			if (!paymentOptionsText) {
				paymentOptionsText = option;
			} else {
				paymentOptionsText += `, ${option}`;
			}
		});
	}

	return (
		<View style={css.dd_description_container}>
			<Text style={css.dd_description_nametext}>{name}</Text>
			{description
				? <Text style={css.dd_description_subtext}>{description}</Text>
				: null
			}

			<Text style={css.dd_description_subtext}>Hours:</Text>
			<DiningHours
				hours={regularHours}
				status={hoursStatus}
			/>

			{(specialHours && specialHours[moment().format('MM/DD/YYYY')]) ?
				(
					<View>
						<Text style={css.dd_description_subtext}>
							Special hours:
						</Text>
						<DiningHours
							hours={specialHours}
							status={hoursStatus}
							specialHours
						/>
					</View>
				) : null
			}

			{paymentOptionsText
				?
				(
					<View>
						<Text style={css.dd_description_subtext}>Payment Options:</Text>
						<Text>{paymentOptionsText}</Text>
					</View>
				)
				: null
			}
		</View>
	);
};

export default DiningDescription;
