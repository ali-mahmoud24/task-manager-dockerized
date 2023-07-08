import Alert from 'react-bootstrap/Alert';

interface AlertDangerProps {
  message: string;
  show: boolean;
  setShow: (val: boolean) => void;
}

function AlertDanger({ message, show, setShow }: AlertDangerProps) {
  if (show) {
    return (
      <div style={{ width: '40%', margin: 'auto' }}>
        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
          <h5 className="text-center">{message}</h5>
        </Alert>
      </div>
    );
  }
}

export default AlertDanger;
