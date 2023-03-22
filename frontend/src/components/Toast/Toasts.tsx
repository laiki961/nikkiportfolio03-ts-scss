import { useState } from "react";
import Toast from "react-bootstrap/Toast";

function ToastComponent() {
  const [showA, setShowA] = useState(true);
  const toggleShowA = () => setShowA(!showA);

  return (
    <Toast show={showA} onClose={toggleShowA}>
      <Toast.Header>
        <img src='holder.js/20x20?text=%20' className='rounded me-2' alt='' />
        <strong className='me-auto'>Thai Awesome</strong>
        {/* <small>11 mins ago</small> */}
      </Toast.Header>
      <Toast.Body>You have add an item to the cart!</Toast.Body>
    </Toast>
  );
}

export default ToastComponent;
