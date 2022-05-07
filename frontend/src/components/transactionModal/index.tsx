import './styles.scss';
import { Button, Modal } from 'react-bootstrap';
import * as yup from 'yup';
import { Formik } from 'formik';
import { Form, Row, Col } from 'react-bootstrap';
import { ITransaction } from '../../@types/transactions';

type Props = {
  action: string;
  actionFunction: (transaction: ITransaction) => void;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  initialState: ITransaction;
};

export default function TransactionModal({
  action,
  actionFunction,
  show,
  setShow,
  initialState,
}: Props) {
  const handleSubmit = (transaction: ITransaction) => {
    actionFunction(transaction);
    setShow(false);
  };

  const schema = yup.object().shape({
    amount: yup
      .number()
      .min(0.01, 'O valor deve ser maior que R$ 0,00')
      .required('O valor da transação é obrigatório'),
    category: yup.string().required('A categoria é obrigatória'),
    date: yup.date().required('A data da transação é obrigatória'),
    description: yup.string().required('Inserir uma descrição'),
  });

  return (
    <>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <h2>{`${action} Registro`}</h2>
        </Modal.Header>
        <Modal.Body>
          <Formik
            validationSchema={schema}
            onSubmit={handleSubmit}
            validateOnChange={false}
            validateOnBlur={false}
            initialValues={initialState}
          >
            {({
              handleSubmit,
              handleChange,
              values,
              touched,
              errors,
              setValues,
            }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Row>
                  <Col className="type-button">
                    <Button
                      className={`credit ${
                        values.type === 'credit' ? 'selected' : ''
                      }`}
                      onClick={() => setValues({ ...values, type: 'credit' })}
                    >
                      Entrada
                    </Button>
                    <Button
                      className={`debit ${
                        values.type === 'debit' ? 'selected' : ''
                      }`}
                      onClick={() => setValues({ ...values, type: 'debit' })}
                    >
                      Saída
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <Form.Group controlId="amountValidation">
                    <Form.Label>Valor</Form.Label>
                    <Form.Control
                      type="number"
                      name="amount"
                      value={values.amount}
                      onChange={handleChange}
                      isValid={touched.amount && !errors.amount}
                      isInvalid={!!errors.amount}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.amount}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group controlId="categoryValidation">
                    <Form.Label>Categoria</Form.Label>
                    <Form.Control
                      type="text"
                      name="category"
                      value={values.category}
                      onChange={handleChange}
                      isValid={touched.category && !errors.category}
                      isInvalid={!!errors.category}
                    />

                    <Form.Control.Feedback type="invalid">
                      {errors.category}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group controlId="dateValidation">
                    <Form.Label>Data</Form.Label>
                    <Form.Control
                      type="date"
                      name="date"
                      value={values.date}
                      onChange={handleChange}
                      isInvalid={!!errors.date}
                    />
                    <Form.Control.Feedback type="invalid">
                      {`O campo data é obrigatório`}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group controlId="descriptionValidation">
                    <Form.Label>Descrição</Form.Label>
                    <Form.Control
                      type="text"
                      name="description"
                      value={values.description}
                      onChange={handleChange}
                      isInvalid={!!errors.description}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.description}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <div className="submit-btn">
                  <Button type="submit">Confirmar</Button>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
}
