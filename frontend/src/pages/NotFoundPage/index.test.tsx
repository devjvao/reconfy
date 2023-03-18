import {screen} from '@testing-library/react';
import {NotFoundPage} from './index';
import {type PartialTranslation, render} from '../../utils/testing/render';

const translation: PartialTranslation = {
    page: {
        notFoundPage: {
            title: 'title',
            description: 'description <1>homepage</1>',
        },
    },
};

describe('<NotFoundPage />', () => {
    it('should render the page', () => {
        render({
            component: <NotFoundPage />,
            translation: translation,
        });

        expect(screen.getByRole('heading', {name: 'title', level: 1})).toBeInTheDocument();

        expect(screen.getByText('description')).toBeInTheDocument();

        expect(screen.getByRole('link', {name: 'homepage'})).toBeInTheDocument();
    });
});
