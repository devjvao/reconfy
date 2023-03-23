import {type FunctionComponent} from 'react';
import {ReactComponent as LogoIcon} from '../../assets/logo.svg';
import {ReactComponent as ArrowRightIcon} from '../../assets/arrow-right.svg';
import {Box} from '../../ui/Box';
import {Link} from '../../ui/Link';
import {style} from './styles';
import {useAuth} from '../AuthProvider';

export const Navbar: FunctionComponent = () => {
    const {authenticated, logout} = useAuth();

    return (
        <Box style={style}>
            <nav>
                <Link to="/" className="home">
                    <LogoIcon className="logo" />
                </Link>
                {authenticated && (
                    <Link to="/signin" className="menu-item" onClick={logout}>
                        <ArrowRightIcon />
                        Logout
                    </Link>
                )}
            </nav>
        </Box>
    );
};
