import ReactDOM from "react-dom";
import {useEffect} from 'react';
import './styles/TrainPopup.css'
import TrainInfo from "./TrainInfo";

/**
 * Component which creates a modal in which to show train-specific information.
 * @component
 * @module TrainPopup
 * @param {function} onClose - The function that handles closing the popup.
 * @param {JSX.Element[]} children - The list of children to include in the popup.
 * @param {JSX.Element} actionBar - The component allowing user interaction, in this case the close button.
 * @param {object} train - The specific train object to display.
 * @returns {JSX.Element} The train popup component.
 */
function TrainPopup({onClose, children, actionBar, train}){

    useEffect(() => {
        document.body.classList.add('overflow-hidden');

        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, []);


    return ReactDOM.createPortal(<div>
        <div onClick={onClose} className='overlay' ></div> 
        <div className='inner-modal-container'>
        <div className='action-bar'>
            {actionBar}
        </div> 
            <div className='modal-content'>
                {children}
                <TrainInfo train={train}/>   
            </div>  
        </div>
    </div>,
    document.querySelector('.modal-container')
    );
}
export default TrainPopup;