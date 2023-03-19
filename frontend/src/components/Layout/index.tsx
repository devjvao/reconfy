import {type FunctionComponent, type PropsWithChildren} from 'react';
import {Box} from '../../ui/Box';
import {style} from './styles';
import {Navbar} from '../Navbar';

type LayoutProps = PropsWithChildren;

export const Layout: FunctionComponent<LayoutProps> = ({children}) => {
    return (
        <Box style={style}>
            <header>
                <Navbar />
            </header>
            <main>
                {children}
            </main>
        </Box>
    );
};
