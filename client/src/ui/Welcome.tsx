import styled from 'styled-components';
import Header from '../ui/Header';
import OfferBox from '../ui/OfferBox';
import { FC } from 'react';
import SearchComponent from './SearchComponent';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface IOffer {
     image: string;
     header: string;
     text: string;
}

interface IWelcome {
     welcome: string;
     data: IOffer[];
}

const StyledWelcome = styled.section`
     display: flex;
     flex-direction: column;
     row-gap: 30px;
     padding: 0 20px;

     @media screen and (max-width: 764px) {
          padding: 0px 50px;
     }

     .search_container {
          display: flex;
          justify-content: center;
          align-items: center;
     }

     .welcome_text {
          font-size: 20px;
     }

     p {
          font-size: 12.5px;
          color: var(--primary-gray-300);
     }

     .welcome_grid {
          display: grid;
          gap: 20px;
          grid-template-columns: repeat(4, minmax(0, 1fr));

          @media screen and (max-width: 764px) {
               grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          @media screen and (max-width: 560px) {
               grid-template-columns: repeat(1, minmax(0, 1fr));
          }
     }
`;

const Welcome: FC<IWelcome> = ({ welcome, data }) => {
     // execute intersection observer
     useIntersectionObserver('offers');

     return (
          <StyledWelcome className='offers'>
               <Header>{welcome}</Header>

               <div className='search_container'>
                    <SearchComponent />
               </div>

               <p className='welcome_text'>What we offers.</p>

               <div className='welcome_grid'>
                    {data.map((d, i) => (
                         <OfferBox key={i + 1} header={d.header} icon={d.image}>
                              {d.text}
                         </OfferBox>
                    ))}
               </div>
          </StyledWelcome>
     );
};

export default Welcome;
