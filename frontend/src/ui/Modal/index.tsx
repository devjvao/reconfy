import {
    cloneElement,
    type Dispatch,
    Fragment,
    type FunctionComponent,
    type ReactElement,
    type ReactNode,
    type SetStateAction,
    useMemo,
    useState,
} from 'react';
import ReactModal from 'react-modal';
import {Box} from '../Box';
import {style} from './styles';
import {ReactComponent as CloseIcon} from '../../assets/close.svg';

interface UncontrolledModalProps {
    title: string
    disclosure?: ReactElement
    children?: ReactNode
}

const UncontrolledModal: FunctionComponent<UncontrolledModalProps> = props => {
    const state = useState(false);

    return <ControlledModal state={state} {...props} />;
};

export interface ControlledModalProps extends UncontrolledModalProps {
    state: [boolean, Dispatch<SetStateAction<boolean>>]
}

const ControlledModal: FunctionComponent<ControlledModalProps> = props => {
    const {children, disclosure, title, state} = props;

    const [open, setOpen] = state;

    const main = useMemo(() => document.getElementById('content') as HTMLElement, []);

    return (
        <Fragment>
            {disclosure !== undefined
                ? cloneElement(disclosure, {onClick: (): void => setOpen(true), 'data-open': open})
                : null
            }
            <ReactModal
                isOpen={open}
                appElement={main}
                parentSelector={() => main}
            >
                <Box style={style}>
                    <h2>{title}</h2>
                    <div className="close" onClick={(): void => setOpen(false)}>
                        <CloseIcon />
                    </div>
                </Box>
                <div>
                    {children}
                </div>
            </ReactModal>
        </Fragment>
    );
};

export type ModalProps = UncontrolledModalProps | ControlledModalProps;

export const Modal: FunctionComponent<ModalProps> = props => {
    return 'state' in props
        ? <ControlledModal {...props} />
        : <UncontrolledModal {...props} />;
};
