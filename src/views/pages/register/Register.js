
import React ,{  useState } from 'react'
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
import { notify } from 'react-notify-toast'






const Register = () => {
  const [name,setName]=useState("");
  const [role,setRole]=useState("");
  const [password,setPassword]=useState("");
  const [email,setEmail]=useState("");
  const [phone,setPhone]=useState("");
  const [medium,setMedium]=useState("");
 {/* const history=useHistory();*/}

  async function signUp()
  {

    let item ={name,role,password,email,phone,medium}
    console.warn(item)

    let result = await fetch('https://wu89z93mp4.execute-api.us-west-2.amazonaws.com/dev/authentication/signup',{
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

 {/* let result =await fetch('https://pk4hbxqjph.execute-api.us-west-2.amazonaws.com/Dev/authentication/confirm-email-signup',async(req,res,next)=>{
    try{
      const user=await User.findOne({emailToken:req.query.token});
      if(!user){

      req.flash('error','Token is invalid');
      return res.redirect('/register');
    }
    user.emailToken=null;
    user.isVerified = true;
    await user.save();
    await req.login(user,async (err)=>{
      if (err) return next(err);
      req.flash('success','welcome to champ ${user.username}');
      const redirectUrl =req.session.redirectTo || '/';
      delete req.session.redirectTo;
      res.redirect(redirectUrl);
    });
   } catch (error){
    console.log(error);
    req.flash('error','something went wrong');
    req.redirect('/login');
  }
  })*/}

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
                    <CInput type="text"  value={medium} onChange={(e)=>setMedium(e.target.value)} placeholder="Medium" autoComplete="role" />
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
                  <CRow>
                      <CCol xs="6">
                      <CButton className="px-0">
                        <CButton  color="primary" onClick={signUp} className="px-4">Create Account</CButton>
                        </CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CButton className="px-0">
                        <Link to="/login">
                        <CButton  color="primary" className="px-4">Back to Login</CButton>
                           </Link>
                          </CButton>
                      </CCol>
                    </CRow>
                </CForm>
              </CCardBody>
              <CCardFooter className="p-4">
                <CRow>

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







