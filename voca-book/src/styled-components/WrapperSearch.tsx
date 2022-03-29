import styled,{css} from 'styled-components'

const WrapperSearch = styled.div<{toggle : boolean}>`
    margin: 10px 0!important;
    display: ${({toggle}) => toggle ? 'block' : 'none' }
`;

export default WrapperSearch;