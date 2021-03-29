
import React ,{ useState } from 'react'
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
import { render } from 'enzyme/build'
import { object } from 'prop-types'



const Register = () => {
  const [name,setName]=useState("");
 {/* const [nameAvailable,setNameAvailable]=useState(null);*/}
  const [role,setRole]=useState("");
  const [password,setPassword]=useState("");
  const [email,setEmail]=useState("");
  const [phone,setPhone]=useState("");
  const history=useHistory();

  async function signUp()
  {
 {/* {
    try{
      const response =await APIUtility.isNameAvailable(name);
      const{data=null }=response;
      if(data){
        setNameAvailable(data);
      }
    }
    catch(error){
      setNameAvailable(null);
    }
    }*/}
    let item ={name,role,password,email,phone}
    console.warn(item)

    let result = await fetch('https://ljgzpa60g0.execute-api.us-west-2.amazonaws.com/Dev/authentication/signup',{
      method:'POST',
      body:JSON.stringify(item),
      headers:{
        "Content-Type":"json",
        "Accept":"json"
      },


    });

    result=await result.json();
    localStorage.setItem ("user-info",JSON.stringify(result))



  };

  {/*400;(response)=>{
    this.item.setMessage((response.errors))
  }
  renderAlert(message);{
    if(!message) return null;
    return(
      <div>
          {object.keys(message).map(item=>
          <dl key={item}>
            <dt>{item}</dt>
            {message[item].map(error =>
              <dd>{error}</dd>
              )}
          </dl>
          )}
      </div>
    );
  }

  render();{

  const{message} =this.item;*/}
  return (
    <div className="c-app c-default-layout flex-row align-items-center">

      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-muted">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text" required value={name} onChange={(e)=>setName(e.target.value)} placeholder="Username" autoComplete="username" />
                   {/* {nameAvailable && <span>Name already taken</span>}*/}
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>@</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text"  value={role} onChange={(e)=>setRole(e.target.value)} placeholder="Role" autoComplete="role" />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>@</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text" required value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" autoComplete="email" />
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="password"  value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" autoComplete="new-password" />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="phone"  value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="Enter-your-phone" autoComplete="new-password" />
                  </CInputGroup>
                  <CButton onClick={signUp} color="success" block>Create Account</CButton>
                </CForm>
              </CCardBody>
              <CCardFooter className="p-4">
                <CRow>
                  <CCol xs="12" sm="6">
                    <CButton className="btn-facebook mb-1" block><span>facebook</span></CButton>
                  </CCol>
                  <CCol xs="12" sm="6">
                      <CButton className="btn-twitter mb-1" block><span>Google</span></CButton>
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







