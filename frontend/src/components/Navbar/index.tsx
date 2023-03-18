import {type FunctionComponent} from 'react';
import {ReactComponent as Logo} from '../../assets/logo.svg';
import {Box} from '../../ui/Box';
import {Link} from '../../ui/Link';
import {style} from './styles';

export const Navbar: FunctionComponent = () => {
    return (
        <Box style={style}>
            <nav>
                <Link to="/" className="home">
                    <Logo className="logo" />
                </Link>
            </nav>
        </Box>
    );
};
