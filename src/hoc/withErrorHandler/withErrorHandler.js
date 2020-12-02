import React, { Component } from "react";
import Modal from "../../components/UI/Modal/Modal";
import Auxiliary from "../Auxiliary/Auxiliary";

const withErrorHandler = (WrappedComponent, axios) => {
	return class extends Component {
		state = {
			error: null,
		};

		constructor(props) {
			super(props);
			console.log("[withErrorHandler.js] constructor");
			this.reqInterceptor = axios.interceptors.request.use(
				(request) => {
					this.setState({ error: null });
					console.log(
						"[withErrorHandler.js] interceptors response - success:",
						request
					);
					return request;
				},
				(error) => {
					console.log(
						"[withErrorHandler.js] interceptors request - error:",
						error
					);
					this.setState({ error: error });
					// return Promise.reject(error);
				}
			);
			this.resInterceptor = axios.interceptors.response.use(
				(response) => {
					console.log(
						"[withErrorHandler.js] interceptors response - success:",
						response
					);
					return Promise.resolve(response);
				},
				(error) => {
					console.log(
						"[withErrorHandler.js] interceptors response - error:",
						error
					);
					this.setState({ error: error });
					return Promise.reject(error);
				}
			);
		}

		componentDidMount() {
			console.log("[withErrorHandler.js] componentDidMount");
		}

		componentWillUnmount() {
			console.log("[withErrorHandling.js] componentWillUnmount", this.reqInterceptor, this.resInterceptor);
			axios.interceptors.request.eject(this.reqInterceptor);
			axios.interceptors.response.eject(this.resInterceptor);
		}

		errorConfirmedHandler = () => {
			console.log("[withErrorHandler.js] errorConfirmedHandler");
			this.setState({ error: null });
		};

		render() {
			return (
				<Auxiliary>
					<Modal
						show={this.state.error}
						modalClosed={this.errorConfirmedHandler}
					>
						{this.state.error ? this.state.error.message : null}
					</Modal>
					<WrappedComponent {...this.props} />
				</Auxiliary>
			);
		}
	};
};

export default withErrorHandler;
