import {type FunctionComponent, type PropsWithChildren, useRef} from 'react';
import {Box} from '../../ui/Box';
import {style} from './styles';
import {Navbar} from '../Navbar';
import {Menu} from '../Menu';
import {useAuth} from '../AuthProvider';
import {CamerasProvider} from '../CamerasProvider';

type LayoutProps = PropsWithChildren;

export const Layout: FunctionComponent<LayoutProps> = ({children}) => {
    const fullscreenRef = useRef<HTMLElement>(null);
    const {authenticated} = useAuth();

    return (
        <Box style={style}>
            <header>
                <Navbar />
            </header>
            <main ref={fullscreenRef}>
                {authenticated
                    ? (
                        <CamerasProvider>
                            <Menu fullscreenRef={fullscreenRef} />
                            {children}
                        </CamerasProvider>
                    )
                    : children
                }
                {children}
            </main>
        </Box>
    );
};
