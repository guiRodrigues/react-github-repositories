// stateless styled functional component
import styled from 'styled-components';

const Container = styled.div`
  max-width: 700px;
  background: #fff;
  padding: 30px;
  margin: 80px auto;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);

  h1 {
    font-size: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;

    svg {
      margin-right: 10px;
    }
  }
`;

export default Container;
