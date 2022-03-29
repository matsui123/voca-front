import styled from 'styled-components';
import media from 'styled-media-query';

export const WrapperEditModal = styled.div`
    display: flex;
    justify-content: space-between;
    margin:30px auto;

    ${media.lessThan("small")`
        flex-flow: column;
    `}
`

export const WrapperButton = styled(WrapperEditModal)`
`