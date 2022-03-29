import styled from 'styled-components'
import media from 'styled-media-query'
//.flex
const WrapperInput = styled.div`
    display: flex;
    justify-content: space-between;

    ${media.lessThan("small")`
        flex-flow: column;
    `}
}
`;
export default WrapperInput;