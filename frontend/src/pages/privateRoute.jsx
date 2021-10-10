import React, { useCallback } from 'react';
import { Route } from 'react-router-dom';
import DefaultLayout from './layouts/defaultLayout';

const PrivateRoute = ({
	component: PrivateComponent,
	location,
	...rest
}) => {
	const renderedComponent = useCallback(
		(prop) => <PrivateComponent {...prop}/>,
		[]);
	return (
		<DefaultLayout>
			<Route
				exact
				{...rest}
				component={renderedComponent}
			/>
		</DefaultLayout>
	);
};

export default PrivateRoute;
