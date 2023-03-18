import {type FunctionComponent} from 'react';
import {type RouteObject, useRoutes} from 'react-router-dom';

interface RouterProps {
    routes: RouteObject[]
}

export const Router: FunctionComponent<RouterProps> = ({routes}) => useRoutes(routes);
