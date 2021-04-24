import React ,{ useState,useRef } from 'react'
import { Link } from 'react-router-dom'
import Form from "react-validation/build/form";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
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
import CheckButton from "react-validation/build/button";




import AuthService from "../services/auth.service";


const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};


const Login = (props) => {

const form = useRef();
const checkBtn = useRef();


const [medium, setMedium] = useState({});
const [emailOrPhone, setEmailOrPhone] = useState({});
const [password, setPassword] = useState({});
const [loading, setLoading] = useState(false);
const [message, setMessage] = useState({});
const professions = ["email", "phone"];
const [myProfession, setMyProfession] = useState("");


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


const handleLogin = (e) => {
  e.preventDefault();

  setMessage("");
  setLoading(true);

  form.current.validateAll();


  if (checkBtn.current.context._errors.length === 0) {
    AuthService.login(medium, emailOrPhone, password).then(data => {
      console.log(data);
        props.history.push("/dashboard");

        window.location.reload();
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
      }
    );



  } else {
    setLoading(false);
  }
};





  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <Form  onSubmit={handleLogin} ref={form} >
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <h4>Signin With</h4>
                     <input type="checkbox" name="Email" /> Email <br/>
                     <input type="checkbox" name="Phone"/> Phone

                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text"  name="emailOrPhone"  value={emailOrPhone} onChange={onChangeEmailOrPhone} validations={[required]} placeholder="Email" />
                    </CInputGroup>


                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" name="password"  value={password} onChange={onChangePassword} validations={[required]} placeholder="Phone" />
                    </CInputGroup>

                    <CRow>
                      <CCol xs="6">
                        <CButton disable={loading}>
                          {loading && (
                            <span className="spinner-border spinner-border-sm"></span>
                            )}
                            <span>Login</span>
                          </CButton>
                      </CCol>
                      <CCol xs="6" className="text-right" disabled={loading}>
                        <CButton className="px-0">
                        <Link style={{textDecoration: 'none', color: 'white'}} to="/forgetpassword">
                          Forget Password? </Link>
                          </CButton>
                      </CCol>
                    </CRow>
                    <hr/>
                    {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
                  </Form>
                </CCardBody>
                <CCardFooter className="p-4">
                <CRow>
                <CCol>
                <p>signup your account</p>
                </CCol>
                <CCol>
                <button className="btn btn-primary btn-block">
                        <Link style={{ textDecoration: 'none', color: 'white' }} to="/register">
                          signup </Link>
                          </button>
                </CCol>
                </CRow>

              </CCardFooter>
              </CCard>



            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
            }


export default Login




