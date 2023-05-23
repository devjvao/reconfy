import {
    cloneElement,
    type Dispatch,
    Fragment,
    type FunctionComponent,
    type ReactElement,
    type ReactNode,
    type SetStateAction,
    useRef,
    useState,
} from 'react';
import BaseModal from 'react-modal';
import {Box} from '../../ui/Box';
import {style} from './styles';
import {ReactComponent as CloseIcon} from '../../assets/close.svg';

interface UncontrolledModalProps {
    title: string
    disclosure: ReactElement
    children?: ReactNode
}

const UncontrolledModal: FunctionComponent<UncontrolledModalProps> = props => {
    const state = useState(false);

    return <ControlledModal state={state} {...props} />;
};

interface ControlledModalProps extends UncontrolledModalProps {
    state: [boolean, Dispatch<SetStateAction<boolean>>]
}

const ControlledModal: FunctionComponent<ControlledModalProps> = props => {
    const {children, disclosure, title, state} = props;

    const [open, setOpen] = state;

    const ref = useRef<HTMLDivElement>(null);

    return (
        <Fragment>
            {cloneElement(disclosure, {onClick: (): void => setOpen(true)})}
            <div ref={ref}>
                <Box
                    as={BaseModal}
                    isOpen={open}
                    style={style}
                    // @todo Add `aria-hidden` to the root app to improve accessibility
                    ariaHideApp={false}
                    // Allow the backdrop to be visible on fullscreen by rendering the modal
                    // inside the main content
                    {...(ref.current !== null ? {parentSelector: () => ref.current!} : {})}
                >
                    <div className="header">
                        <h2>{title}</h2>
                        <div className="close" onClick={(): void => setOpen(false)}>
                            <CloseIcon />
                        </div>
                    </div>
                    <div className="content">
                        {children}
                    </div>
                </Box>
            </div>
        </Fragment>
    );
};

export type ModalProps = UncontrolledModalProps | ControlledModalProps;

export const Modal: FunctionComponent<ModalProps> = props => {
    return 'state' in props
        ? <ControlledModal {...props} />
        : <UncontrolledModal {...props} />;
};
