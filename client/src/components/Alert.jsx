import { Alert } from 'flowbite-react';
import { HiInformationCircle } from 'react-icons/hi';

const AlertComponent = ({ color, onDismiss, alertMessage }) => {
  return (
    <>
      <Alert
        color={color}
        onDismiss={onDismiss}
        icon={HiInformationCircle}
      >
        <span>
          <p>
            {alertMessage}
          </p>
        </span>
      </Alert>
    </>
  )
}

export default AlertComponent