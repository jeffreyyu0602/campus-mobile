/**
 * View for Welcome Week events
 * Triggered by onPress from Special Events Card in Home.js
**/

import React, { Component } from 'react';
import {
	ListView,
	Text,
	View,
	TouchableOpacity,
	StyleSheet,
	ScrollView,
	TouchableHighlight,
	InteractionManager,
	RefreshControl,
	ActivityIndicator,
	TextInput
} from 'react-native';

import css from '../styles/css';
import Card from './card/Card';

const logger = require('../util/logger');

export default class FeedbackView extends Component {
	
	/**
	 * Represents view for Welcome Week events
	 * @param { Object[] } props - An array of properties passed in
	**/
	constructor(props) {
		super(props);
		this.state = {
			commentsText: "",
			nameText: "",
			emailText: "",
			loaded: false,
			submit: false
		};
	}

	/**
	 * Invoked before render
	**/
	componentWillMount() {

	}

	/**
	 * Invoked after render
	**/
	componentDidMount() {
		InteractionManager.runAfterInteractions(() => {
			this.setState({ loaded: true });
		});
	}

	/**
	 * Called after state change
	 * @return bool whether the component should re-render.
	**/
	shouldComponentUpdate(nextProps, nextState) {
		logger.ga("View Loaded: Feedback");
		return true;
	}

	/**
	 * Invoked before component is unmounted from DOM
	**/
	componentWillUnmount() {

	}

	render() {
		if (!this.state.loaded) {
			return this.renderLoadingView();
		} 
		else if(!this.state.submit) {
			return this.renderFormView();
		}
		else {
			return this.renderSubmitView();
		}
	}

	renderLoadingView() {
		return (
			<View style={css.main_container}>
				<ActivityIndicator
					animating={this.state.animating}
					style={css.welcome_ai}
					size="large"
				/>
			</View>
		);
	}

	renderFormView() {
		return (
			<View style={css.main_container}>
				<Card title="Your thoughts matter!">
					<View style={css.feedback_container}>

						<Text style={css.feedback_label}>Comments*</Text>
						<TextInput 
							multiline={true}
							onChangeText={(text) => this.setState({commentsText: text})}
							placeholder="Please tell us what you think."
							placeholderTextColor={
								(this.state.commentsText == "") ? "grey" : null
							}
						/>

						<Text style={css.feedback_label}>Name</Text>
						<TextInput 
							onChangeText={(text) => this.setState({nameText: text})}
						/>
						
						<Text style={css.feedback_label}>Email</Text>
						<TextInput 
							onChangeText={(text) => this.setState({emailText: text})}
						/>

						<TouchableHighlight underlayColor={'rgba(200,200,200,.1)'} onPress={() => this.postFeedback()}>
							<View style={css.eventdetail_readmore_container}>
								<Text style={css.eventdetail_readmore_text}>Submit</Text>
							</View>
						</TouchableHighlight>
					</View>
				</Card>
			</View>
		);
	}

	renderSubmitView() {
		return (
			<View style={css.main_container}>
				<Text style={css.feedback_submit}>Thank you for your feedback!</Text>
			</View>
		);
	}

	postFeedback() {

		var formData  = new FormData();
		formData.append('element_1', this.state.commentsText);
		formData.append('element_2', this.state.nameText);
		formData.append('element_3', this.state.emailText);
		formData.append('form_id','175631');
		formData.append('submit_form','1');
		formData.append('page_number','1');
		formData.append('submit_form','Submit');

		fetch('https://eforms.ucsd.edu/view.php?id=175631', {
			method: 'POST',
			body: formData
		})
		.then((response) => {
			this.setState({ submit: true });
		})
		.then((responseJson) => {
			//console.log(responseJson);
		})
		.catch((error) => {
			//console.error(error);
		});
	}

}