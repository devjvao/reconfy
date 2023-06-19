import {Fragment, type FunctionComponent, type RefObject, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Box} from '../../ui/Box';
import {Button} from '../../ui/Button';
import {useFullscreen} from './useFullscreen';
import {ReactComponent as AddIcon} from '../../assets/add.svg';
import {ReactComponent as FullscreenIcon} from '../../assets/fullscreen.svg';
import {style} from './styles';
import {CameraDialog} from '../CameraDialog';
import {useCamerasContext} from '../CamerasProvider';

interface MenuProps {
    fullscreenRef: RefObject<HTMLElement>
}

export const Menu: FunctionComponent<MenuProps> = ({fullscreenRef}) => {
    const {active, exit, enter} = useFullscreen(fullscreenRef);
    const {addCamera} = useCamerasContext();
    const formModalState = useState(false);
    const [, setFormModalOpen] = formModalState;

    const {t} = useTranslation('component', {keyPrefix: 'menu'});

    return (
        <Fragment>
            <Box style={style}>
                <Button
                    variant="neutral"
                    className="control"
                    onClick={() => setFormModalOpen(true)}
                >
                    <AddIcon />
                    {t('option.addCamera')}
                </Button>
                <Button
                    variant="neutral"
                    className="control"
                    onClick={active ? exit : enter}
                >
                    <FullscreenIcon />
                    {t('option.fullscreen')}
                </Button>
            </Box>
            <CameraDialog
                state={formModalState}
                onSuccess={camera => addCamera(camera)}
            />
        </Fragment>
    );
};
