import {type FunctionComponent} from 'react';
import {ReactComponent as Logo} from '../../assets/logo.svg';
import {Link} from 'react-router-dom';
import {Box} from '../../ui/Box';
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
