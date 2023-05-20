import {
    createContext,
    type FunctionComponent,
    type PropsWithChildren,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {BACKEND_URL} from '../../utils/constants';

export interface User {
    id: number
    name: string
    email: string
}

interface State {
    updateUser: (token: string, user: User) => void
    logout: () => void
    authenticated: boolean
    user?: User
    token?: string
}

const AuthContext = createContext<State | undefined>(undefined);

export const useAuth = (): State => {
    const state = useContext(AuthContext);

    if (state === undefined) {
        throw Error('The hook "useAuth" cannot be used outside <AuthProvider />.');
    }

    return state;
};

const RECONFY_AUTH_TOKEN = 'reconfy.token';

const UNAUTHENTICATED_ROUTES = ['/signin', '/signup'];

export const AuthProvider: FunctionComponent<PropsWithChildren> = ({children}) => {
    const [authenticated, setAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<User>();
    const [token, setToken] = useState<string>();
    const navigate = useNavigate();
    const {pathname} = useLocation();

    const updateUser = useCallback(
        (token: string, user: User): void => {
            setUser(user);
            setToken(token);
            setAuthenticated(true);
            localStorage.setItem(RECONFY_AUTH_TOKEN, token);
        },
        [setUser, setToken],
    );

    const logout = useCallback(
        () => {
            setUser(undefined);
            setToken(undefined);
            setAuthenticated(false);
            localStorage.removeItem(RECONFY_AUTH_TOKEN);
        },
        [],
    );

    const validateStoredToken = async (storedToken: string): Promise<User> => {
        return await new Promise((resolve, reject) => {
            fetch(`${BACKEND_URL}/api/v1/login/test-token`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${storedToken}`,
                },
            })
                .then(response => {
                    if (response.status !== 200) {
                        reject(Error('The token is invalid.'));

                        return;
                    }

                    resolve(response.json());
                });
        });
    };

    useEffect(
        () => {
            if (authenticated) {
                return;
            }

            const storedToken = localStorage.getItem(RECONFY_AUTH_TOKEN);

            if (storedToken === null) {
                if (!UNAUTHENTICATED_ROUTES.includes(pathname)) {
                    navigate('/signin');
                }

                return;
            }

            validateStoredToken(storedToken)
                .then(authenticatedUser => updateUser(storedToken, authenticatedUser))
                .catch(() => {
                    localStorage.removeItem(RECONFY_AUTH_TOKEN);

                    navigate('/signin');
                });
        },
        [authenticated, navigate, updateUser],
    );

    const value = useMemo(
        () => ({
            user: user,
            token: token,
            authenticated: authenticated,
            logout: logout,
            updateUser: updateUser,
        }),
        [authenticated, user, token, updateUser],
    );

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
