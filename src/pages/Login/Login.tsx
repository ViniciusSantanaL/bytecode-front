import { useForm } from 'react-hook-form'
import Input from '../../components/Input/Input'
import { UserForm } from './form/UserForm'
import { useAuth } from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import './Login.scss'
const Login = () => {
  const { handleLogin } = useAuth()
  const navigate = useNavigate()

  const { handleSubmit, register } = useForm<UserForm>()

  async function onSubmit({ username, password }: UserForm) {
    await handleLogin(username, password)
    navigate('/')
  }

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-10 col-lg-12 col-md-9">
            <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body p-5">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="p-5">
                      <div className="text-center">
                        <h1 className="h1 text-gray-900 mb-4">Welcome Back!</h1>
                      </div>
                      <form className="user" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                          <Input register={register} type="text" name="username" className="form-control form-control-user" aria-describedby="emailHelp" placeholder="Enter Username..." />
                        </div>
                        <div className="form-group">
                          <Input register={register} type="password" name="password" className="form-control form-control-user" placeholder="Password" />
                        </div>

                        <button type="submit" className="btn btn-primary btn-user btn-block">
                          Login
                        </button>
                        <hr />
                        <button onClick={() => navigate('/auth/sign-up')} className="btn btn-danger btn-user btn-block">
                          Create account
                        </button>
                      </form>
                      <br />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
