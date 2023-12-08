import React from 'react';
import ReactDOM from 'react-dom';
import 'assets/css/App.css';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import AuthLayout from 'layouts/auth';
import AdminLayout from 'layouts/admin';
import RtlLayout from 'layouts/rtl';
import { ChakraProvider } from '@chakra-ui/react';
import theme from 'theme/theme';
import store from "./store";
import { Provider } from 'redux';
import { ThemeEditorProvider } from '@hypertheme-editor/chakra-ui';
import PrivateRoute from 'privateRoute';
import LoggedInRoute from 'loggedInRoute'

ReactDOM.render(
	// <Provider store={store}>
	<ChakraProvider theme={theme}>
		<React.StrictMode>
			<ThemeEditorProvider>
				<HashRouter>
					<Switch>
						<LoggedInRoute path={`/auth`} component={AuthLayout} />
						<PrivateRoute path={`/admin`} component={AdminLayout} />
						<LoggedInRoute path={`/rtl`} component={RtlLayout} />
						<Redirect from='/' to='/admin' />
					</Switch>
				</HashRouter>
			</ThemeEditorProvider>
		</React.StrictMode>
	</ChakraProvider>,
	document.getElementById('root')
);
