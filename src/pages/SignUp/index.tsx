import { Link, useNavigate } from 'react-router-dom'
import Input from '../../components/Input/Input'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { http } from '../../service/api'
import { IUserSignUp } from '../../types/IUserSignUp'

interface SignUpForm {
  userName: string
  email: string
  password: string
}
export default function SignUp() {
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm<SignUpForm>()
  const [errorSignUp, setErrorSignUp] = useState(false)
  function navigateToAuthWithSuccess() {
    navigate('/')
  }

  async function createUser(user: SignUpForm) {
    const promise = await http.post<IUserSignUp>('/users', {
      userName: user.userName,
      email: user.email,
      password: user.password
    })
    return promise.data
  }
  function onSubmit({ userName, password, email }: SignUpForm) {
    const user = {
      userName: userName,
      email: email,
      password: password
    }
    const response = createUser(user)
    response
      .then((data) => navigateToAuthWithSuccess())
      .catch((err) => {
        setErrorSignUp(true)
        console.log()
      })
  }

  return (
    <div className="container">
      <div className="card o-hidden border-0 shadow-lg my-5">
        <div className="card-body p-0">
          <div className="row">
            <div className="col-lg-5 d-none d-lg-block bg-register-image"></div>
            <div className="col-lg-7">
              <div className="p-5">
                <div className="text-center">
                  <h1 className="h4 text-gray-900 mb-4">Create an Account</h1>
                  {errorSignUp && <h1 className="h4 text-gray-900 mb-4">Error for SingUp !!</h1>}
                </div>
                <form className="user" onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-group">
                    <Input register={register} name="userName" type="text" className="form-control form-control-user" id="exampleFirstName" placeholder="Username" />
                  </div>
                  <div className="form-group">
                    <Input register={register} name="email" type="email" className="form-control form-control-user" id="exampleInputEmail" placeholder="Email Address" />
                  </div>
                  <div className="form-group">
                    <Input register={register} name="password" type="password" className="form-control form-control-user" id="exampleInputPassword" placeholder="Password" />
                  </div>
                  <button type="submit" className="btn btn-primary btn-user btn-block">
                    Register Account
                  </button>
                </form>
                <hr />
                <div className="text-center">
                  <Link to="/auth/login">Already have an account? Login!</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
