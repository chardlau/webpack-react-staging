import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../../model/actions';

class ReduxDemo extends React.Component {
    static propTypes = {
        isLoading: PropTypes.bool,
        loginUserName: PropTypes.string,
        loginError: PropTypes.string
    };
    componentDidMount() {
        console.log('login');
        this.props.login();
    }
    render() {
        if (this.props.isLoading) {
            return (<p> loading... </p>);
        }
        if (this.props.loginUserName) {
            return (<p>{this.props.loginUserName}</p>)
        }
        if (this.props.loginError) {
            return (<p>{this.props.loginError}</p>)
        }
        return null;
    }
}

const mapStateToProps = (state, ownProps) => ({
    isLoading: state.loginPageData.loading,
    loginUserName: state.entities.loginUser && state.entities.loginUser.name || null,
    loginError: state.loginPageData.error && state.loginPageData.error.toString() || null
});

const mapDispatchToProps = {
    login
};

export default connect(mapStateToProps, mapDispatchToProps)(ReduxDemo);