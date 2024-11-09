import { useState } from "react";
import TrainPopup from "./TrainPopup";

function PopupPage(){
    const [showModal, setShowModal] = useState(false);

    const handleClick = () => {
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
    };

    const actionBar = (<div>
        <button onClick={handleClose}>Close</button>
    </div>);

    const modal = <TrainPopup onClose={handleClose} actionBar={actionBar}>
        <p>Here is a modal.</p>
    </TrainPopup>

    return <div>
        <button onClick={handleClick}>Open Modal</button>
        {showModal && modal}
    </div>
}

export default PopupPage;