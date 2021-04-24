
import React ,{  useState, useRef } from 'react'
import CheckButton from "react-validation/build/button";
import Form from "react-validation/build/form";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {useHistory} from 'react-router-dom'
import User from 'src/views/users/User'
import { Link } from 'react-router-dom'
import { isEmail } from "validator";
import { notify } from 'react-notify-toast'
import AuthService from "../services/auth.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert " role="alert">
        This field is required!
      </div>
    );
  }
};


const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert " role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vname = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert " role="alert">
        The name must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert " role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};






const Register = (props) => {
  const form = useRef();
  const checkBtn = useRef();
  const history = useHistory();

  const [name, setName] = useState({});
  const [medium, setMedium] = useState({});
  const [emailOrPhone, setEmailOrPhone] = useState({});
  const [password, setPassword] = useState({});
  const [role, setRole] = useState({});
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState({});
  const professions = ["email", "phone"];
  const [myProfession, setMyProfession] = useState("");
  const [loading, setLoading] = useState(false);

  const onChangeName = (e) => {
    const name = e.target.value;
    setName(name);
  };

   const onChangeMedium = (e) => {
    const medium = e.target.value;
    setMedium(medium);
  };

  const onChangeEmailOrPhone = (e) => {
    const emailOrPhone = e.target.value;
    setEmailOrPhone(emailOrPhone);
  };



  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

   const onChangeRole = (e) => {
    const role = e.target.value;
    setRole(role);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(name, medium, emailOrPhone, password, role)

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.register(name, medium, emailOrPhone, password, role).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
          history.push({pathname:'confirmcode', state:{medium, emailOrPhone}})
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
            setLoading(false);

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };


  return (
    <div className="c-app c-default-layout flex-row align-items-center">

      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <Form onSubmit={handleRegister} ref={form}>

                {!successful && (
                 <div>
                  <h1>Register</h1>
                  <p className="text-muted">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text" name="name" value={name} onChange={onChangeName} validations={[required]} placeholder="Username"/>

                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>@</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text" name="emailOrPhone" value={emailOrPhone} onChange={onChangeEmailOrPhone} validation ={[required]} placeholder="Email Or Phone" />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>@</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="password"  value={password} onChange={onChangePassword} validations={[required]} placeholder="Password" />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>@</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text" name="role" value={role} onChange={onChangeRole} placeholder="Role"/>
                  </CInputGroup>


                  <CRow>
                      <CCol xs="6">
                      <CButton className="px-0">
                        <CButton  color="primary" disabled={loading} className="px-4">
                          {loading && (
                             <span className="spinner-border spinner-border-sm"></span>
                             )}
                             <span>Sign Up</span>

                          </CButton>
                        </CButton>
                      </CCol>

                    </CRow>
                    </div>
                    )}
                    {message && (
            <div className="form-group">
              <div
                className={
                  successful ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
                </Form>

              </CCardBody>

              <CCardFooter className="p-4">
                <CRow>
                <CCol xs="6" className="text-right">
                        <CButton className="px-0">
                        <Link to="/login">
                        <CButton  color="primary" className="px-4">Back to Login</CButton>
                           </Link>
                          </CButton>
                      </CCol>
                </CRow>
              </CCardFooter>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}


export default Register







