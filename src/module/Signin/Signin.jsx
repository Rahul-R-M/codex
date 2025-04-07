import { useFormik } from 'formik'
import React from 'react'
import { Link, useNavigate } from 'react-router'
import * as Yup from 'yup'
import { RouteConstant } from '../../router/RouteConstant'
import { toast } from 'react-toastify'

const Signup = () => {
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    password: Yup.string().required('Password is required')
  })
  const onSubmit = (values) => {
    const Signupdata = JSON.parse(localStorage.getItem('Signupdata')) || [];
    if (Signupdata?.length) {
      Signupdata?.map(item => {
        if (item.name === values.name) {
          toast.error('Please try with different name')
        }
        else {
          localStorage.setItem('Signupdata', JSON.stringify([...Signupdata, values]))
          navigate(RouteConstant.LOGIN);
        }
      })
    }
    else {
      localStorage.setItem('Signupdata', JSON.stringify([...Signupdata, values]))
      navigate(RouteConstant.LOGIN);
    }
  }

  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    validationSchema,
    initialValues: {
      name: '',
      password: '',
      role: '1',
      id: Math.floor(Math.random() * 1000),
      task: []
    },
    onSubmit
  })
  return (
    <>
      <div className="container h-100 d-flex justify-content-center flex-column">
        <div className="row text-center">
          <h1>Sign up</h1>
        </div>
        <div className="box d-flex justify-content-center align-items-center ">
          <form onSubmit={handleSubmit} className='w-25'>
            <div className="signupform d-flex flex-column gap-2">

              <div className="row gap-1">
                <label htmlFor="" className='p-0'>Name</label>
                <input type="text" name="name" id="" className='form-control' placeholder='Enter your name' value={values.name} onChange={handleChange} />
                {errors.name && touched.name && <p className='text-danger p-0'>{errors.name}</p>}
              </div>
              <div className="row gap-1">
                <label htmlFor="" className='p-0'>Password</label>
                <input type="password" name="password" id="" className='form-control' placeholder='Enter your password' value={values.password} onChange={handleChange} />
                {errors.password && touched.password && <p className='text-danger p-0'>{errors.password}</p>}
              </div>
              <div className="row gap-1">
                <label htmlFor="" className='p-0'>Role</label>
                <select name="role" id="" className='form-control' value={values.role} onChange={handleChange}>
                  <option value="1">Admin</option>
                  <option value="2">User</option>
                </select>
              </div>
              <div className="row gap-1">
                <div className='p-0'>Already have an account? <span><Link to={RouteConstant.LOGIN}>Login</Link></span></div>
              </div>
              <div className="row mt-3 w-50 align-self-center">
                <button type='submit' className='btn btn-primary p-2'>Sign Up</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Signup