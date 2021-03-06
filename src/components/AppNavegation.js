import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, SafeAreaView } from 'react-native';

import { checkLogin } from '../redux/actions/loginActions';
import { connect } from 'react-redux';

import createRootNavigation from './NavigationTree';
import SplashScreen from '../screens/SplashScreen';

class AppNavegation extends Component {

	constructor(props) {
		super(props);
		this.state = { isLoading: true }
		props.checkLogin();
	}

	performTimeConsumingTask = async () => {
		return new Promise((resolve) =>
			setTimeout(
				() => { resolve('result') },
				5000
			)
		);
	}

	async componentDidMount() {
		const data = await this.performTimeConsumingTask();
		if (data !== null) {
			this.setState({ isLoading: false });
		}
	}
	
	render() {
		if (this.state.isLoading) {
			return <SplashScreen />;
		}		
		// get Authentication Check and Authentication state from AppReducer.js
        const { already_logged, auth_checked } = this.props.appState;
		console.log(already_logged + '  '+ auth_checked);
        //Get base Component for render
        const BaseView = auth_checked ? createRootNavigation(already_logged) : _renderLoader();
        return BaseView

	}
}



const _renderLoader = () => <ActivityIndicator size="large" />

const mapStateToProps = (state) => ({
	appState: state.appState
});

AppNavegation.propTypes ={
    checkLogin: PropTypes.func.isRequired
};


export default connect(mapStateToProps,{ checkLogin })(AppNavegation);