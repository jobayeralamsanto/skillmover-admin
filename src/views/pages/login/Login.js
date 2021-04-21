import React ,{ useState,useRef } from 'react'
import { Link } from 'react-router-dom'
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
import { render } from 'enzyme/build';


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

const [email,setEmail]=useState("");
const [phone,setPhone]=useState("");
const [password,setPassword]=useState("");
const [medium,setMedium]=useState("");
const [loading, setLoading] = useState(false);
const [message, setMessage] = useState("");



async function signIn()
{
  let item ={ email,phone,password,medium}

  let result = await fetch('https://wu89z93mp4.execute-api.us-west-2.amazonaws.com/dev/authentication/signin',{
    method:'POST',
    headers:{
      "Content-Type":"json",
      "Accept":"json"
    },
    body:JSON.stringify(item)

  });
  result=await result.json();
  localStorage.setItem ("user-info",JSON.stringify(result))

}




  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);



    if (checkBtn.current.context._errors.length === 0) {
      signIn(medium,phone,email,password).then(
        () => {
          props.history.push("/profile");
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
                  <CForm   ref={form} >
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
                      <CInput type="text"   value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" autoComplete="email" validations={[required]} />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text"  value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="Phone" autoComplete="phone" />
                    </CInputGroup>


                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" validations={[required]} value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" autoComplete="password" />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>@</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text" validations={[required]}  value={medium} onChange={(e)=>setMedium(e.target.value)} placeholder="Medium" autoComplete="medium" />
                  </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton onClick={signIn}  onClick={handleLogin} color="primary" className="px-4">Login</CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CButton className="px-0">
                        <Link to="/forgetpassword">
                          Forget Password? </Link>
                          </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
                <CCardFooter className="p-4">
                <CRow>
                  <CCol xs="12" sm="6">

                    <a href="https://ct-test-auth-stack-dev.auth.us-west-2.amazoncognito.com/oauth2/authorize?identity_provider=Google&redirect_uri=http://localhost:4200/dashboard/&response_type=TOKEN&client_id=5n8dl6kq08gt38phmj3sfgl9cc&scope=email openid profile">Login with Google</a>


                  </CCol>

                  <CCol xs="12" sm="6">

                  <a href="https://ct-test-auth-stack-dev.auth.us-west-2.amazoncognito.com/oauth2/authorize?identity_provider=Facebook&redirect_uri=http://localhost:4200/dashboard/&response_type=TOKEN&client_id=5n8dl6kq08gt38phmj3sfgl9cc">Login with facebook</a>
                  </CCol>
                </CRow>
              </CCardFooter>
              </CCard>
              <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>If you are not complate the registration .Then plase complate your registration </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>Register Now!</CButton>
                    </Link>
                  </div>
                </CCardBody>

              </CCard>
              {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
             )}
             <CButton style={{ display: "none" }} ref={checkBtn} />
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
            }


export default Login




{/*state={
  Colornames:{
    Email:false,
    Phone:false
  }
}

 chkclick=(e)=>{
  var{name,checked}=e.target;
  this.setState((e)=>{
    var Selectedsport=e.Colornames;
    return Selectedsport[name]=checked;
  });
};

}

render()
{
var displaysports=Object.keys(this.state.Colornames).filter((x)=>this.stateColornames[x]);
*/}
