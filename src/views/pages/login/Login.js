import React ,{ useState } from 'react'
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
import FacebookLogin from 'react-facebook-login'
import GoogleLogin from 'react-google-login'
import {useHistory} from 'react-router-dom'

const responseGoogle=(response)=>{
  console.log(response);


}

const responseFacebook =(response)=>{
  console.log(response);
}


const Login = () => {
  const [email,setEmail]=useState("");
  const [phone,setPhone]=useState("");
  const [password,setPassword]=useState("");
  const [medium,setMedium]=useState("");
  const history=useHistory();

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
   {/* history.push("/dashboard")*/}
  }

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text"  value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" autoComplete="email" />
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
                      <CInput type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" autoComplete="password" />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>@</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text"  value={medium} onChange={(e)=>setMedium(e.target.value)} placeholder="Medium" autoComplete="medium" />
                  </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton onClick={signIn} color="primary" className="px-4">Login</CButton>
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

                    <a href="https://demo-auth-nested-stack.auth.us-west-2.amazoncognito.com/oauth2/authorize?identity_provider=Google&redirect_uri=http://localhost:4200/dashboard/&response_type=TOKEN&client_id=67vp1iechhld9q72mupp6ctshr&scope=email openid profile">login with Google</a>


                  </CCol>

                  <CCol xs="12" sm="6">

                  <a href="https://demo-auth-nested-stack.auth.us-west-2.amazoncognito.com/oauth2/authorize?identity_provider=Facebook&redirect_uri=http://localhost:4200/dashboard/&response_type=TOKEN&client_id=67vp1iechhld9q72mupp6ctshr">Signin with facebook</a>
                  </CCol>
                </CRow>
              </CCardFooter>
              </CCard>
              <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua.</p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>Register Now!</CButton>
                    </Link>
                  </div>
                </CCardBody>

              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login





