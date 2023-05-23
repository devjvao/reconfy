import {type FunctionComponent, type RefObject} from 'react';
import {useTranslation} from 'react-i18next';
import {Box} from '../../ui/Box';
import {Button} from '../../ui/Button';
import {useFullscreen} from './useFullscreen';
import {ReactComponent as AddIcon} from '../../assets/add.svg';
import {ReactComponent as FullscreenIcon} from '../../assets/fullscreen.svg';
import {style} from './styles';
import {NewCameraDialog} from '../NewCameraDialog';

interface MenuProps {
    fullscreenRef: RefObject<HTMLElement>
}

export const Menu: FunctionComponent<MenuProps> = ({fullscreenRef}) => {
    const {active, exit, enter} = useFullscreen(fullscreenRef);

    const {t} = useTranslation('component', {keyPrefix: 'menu'});

    return (
        <Box style={style}>
            <NewCameraDialog
                disclosure={(
                    <Button
                        variant="neutral"
                        className="control"
                    >
                        <AddIcon />
                        {t('option.addCamera')}
                    </Button>
                )}
            />
            <Button
                variant="neutral"
                className="control"
                onClick={active ? exit : enter}
            >
                <FullscreenIcon />
                {t('option.fullscreen')}
            </Button>
        </Box>
    );
};
