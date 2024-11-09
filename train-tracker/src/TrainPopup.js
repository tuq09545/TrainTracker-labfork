import ReactDOM from "react-dom";
import {useEffect} from 'react';
import './styles/TrainPopup.css'

function TrainPopup({onClose, children, actionBar}){
    useEffect(() => {
        document.body.classList.add('overflow-hidden');

        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, []);

    return ReactDOM.createPortal(<div>
        <div onClick={onClose} className='overlay' ></div>
        <div className='inner-modal-container'>
            <div className='modal-content'>
                {children}
                <div className='action-bar'>
                    {actionBar}
                </div>     
            </div>  
        </div>
    </div>,
    document.querySelector('.modal-container')
    );
}

export default TrainPopup;