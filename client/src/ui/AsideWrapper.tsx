import styled, { keyframes } from 'styled-components';
import { NavLink } from 'react-router-dom';
import { LiaBedSolid } from 'react-icons/lia';
import { IoCarOutline } from 'react-icons/io5';
import { PiTrain } from 'react-icons/pi';
import { FaRegUserCircle } from 'react-icons/fa';
import { BiWorld } from 'react-icons/bi';
import { useAsideContext } from '../hooks/useAsideContext';
import Modal from '../context/ModalContext';
import AuthSlider from './AuthSlider';

interface StyledAsideProps {
     $mode?: boolean;
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const StyledAside = styled.aside<StyledAsideProps>`
     padding: 0 10px;
     border-right: 1px solid var(--tertiary-blue-950);
     width: ${(props) => (props.$mode ? '75px' : '250px')};

     @media screen and (max-width: 764px) {
          position: absolute;
          bottom: 0;
          top: 0;
          background: var(--tertiary-blue-950);
          left: 0;
          width: 250px;
          transform: ${(props) =>
               props.$mode ? 'translateX(0)' : 'translateX(-900px)'};
     }

     @media screen and (max-width: 640px) {
          width: 100%;
     }

     .aside_container {
          display: flex;
          flex-direction: column;

          .item {
               border-bottom: 0.5px solid var(--tertiary-blue-950);

               .items__lists {
                    padding-left: 0;
               }

               @media screen and (max-width: 764px) {
                    border-bottom: 0.5px solid var(--tertiary-blue-800);
               }
          }

          .item_content {
               width: 100%;
               text-decoration: none;
               margin: 10px 0;

               display: flex;
               align-items: center;
               justify-content: ${(props) => (props.$mode ? 'center' : '')};
               gap: 10px;
               color: var(--primary-blue-300);
               padding: 0.5rem;
               border-radius: var(--border-radius);

               span {
                    font-size: 12px;
                    display: ${(props) => (props.$mode ? 'none' : 'block')};
                    animation: ${fadeIn} 1.5s ease-in-out;

                    @media screen and (max-width: 764px) {
                         display: block;
                         animation: ${fadeIn} 1.5s ease-in-out;
                    }
               }

               &:hover {
                    span {
                         color: var(--tertiary-blue-900) !important;
                    }

                    background-color: var(--primary-blue-50);
                    cursor: pointer;
               }

               @media screen and (max-width: 764px) {
                    justify-content: flex-start;
               }
          }

          .item_content--icons {
               width: 20px;
               height: 20px;
               color: var(--tertiary-blue-950);

               @media screen and (max-width: 764px) {
                    color: var(--tertiary-blue-800);
               }
          }

          .active {
               width: 100%;
               text-decoration: none;
               margin: 10px 0;

               display: flex;
               align-items: center;
               gap: 20px;
               color: var(--tertiary-blue-950);
               border-radius: var(--border-radius);
               background-color: var(--primary-blue-50);

               h1 {
                    color: var(--tertiary-blue-900) !important;
               }
          }
     }
`;

const AsideWrapper = () => {
     const { mode } = useAsideContext();

     return (
          <StyledAside $mode={mode}>
               <div className='aside_container'>
                    <div className='item'>
                         <ul className='items__lists'>
                              <li>
                                   <NavLink
                                        to='/stays'
                                        className={({ isActive }) =>
                                             (isActive
                                                  ? 'active'
                                                  : 'inactive') +
                                             ' item_content'
                                        }
                                   >
                                        <LiaBedSolid className='item_content--icons' />{' '}
                                        <span>Stays</span>
                                   </NavLink>
                              </li>

                              <li>
                                   <NavLink
                                        to='/car-rental'
                                        className='item_content'
                                   >
                                        <IoCarOutline className='item_content--icons' />
                                        <span>Car Rentals</span>
                                   </NavLink>
                              </li>

                              <li>
                                   <NavLink
                                        to='/trains-buses'
                                        className='item_content'
                                   >
                                        <PiTrain className='item_content--icons' />
                                        <span>Trains and Buses</span>
                                   </NavLink>
                              </li>
                         </ul>
                    </div>

                    <div className='item'>
                         <NavLink to='/explore' className='item_content'>
                              <BiWorld className='item_content--icons' />{' '}
                              <span>Explore</span>
                         </NavLink>
                    </div>

                    <div className='item'>
                         <Modal>
                              <Modal.Button name='authTab'>
                                   <button className='item_content'>
                                        <FaRegUserCircle className='item_content--icons' />
                                        <span>Sign in</span>
                                   </button>
                              </Modal.Button>

                              <Modal.Body windowName='authTab'>
                                   <AuthSlider />
                              </Modal.Body>
                         </Modal>
                    </div>
                    {/* <div className='item'>
                         <NavLink to='/feedback' className='item_content'>
                              <RiFeedbackLine className='item_content--icons' />{' '}
                              <span>Feedback</span>
                         </NavLink>
                    </div> */}

                    {/* <div className='item'>
                         <NavLink to='/trips' className='item_content'>
                              <AiOutlineHeart className='item_content--icons' />{' '}
                              <span>Trips</span>
                         </NavLink>
                    </div> */}
               </div>
          </StyledAside>
     );
};

export default AsideWrapper;
