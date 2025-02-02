import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import pharmacyImage from '../assets/image/pharmacy.jpg';

const LoginSchema = Yup.object().shape({
  userType: Yup.string().required('Please select user type'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

const Login = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-teal-600 px-4 py-8">
      <div className="flex max-w-4xl w-full p-8 bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-105">
        <div className="w-full md:w-1/2 space-y-6">
          <h2 className="text-4xl font-semibold text-center text-gray-800">Login to Your Account</h2>
          <Formik
            initialValues={{ userType: '', email: '', password: '' }}
            validationSchema={LoginSchema}
            onSubmit={(values, { setSubmitting, setErrors }) => {
              const pharmacistCredentials = { email: 'pharmacist@gmail.com', password: 'pharmacist' };
              const customerCredentials = { email: 'customer@gmail.com', password: 'customer' };

              if (
                (values.userType === 'pharmacist' && values.email === pharmacistCredentials.email && values.password === pharmacistCredentials.password) ||
                (values.userType === 'customer' && values.email === customerCredentials.email && values.password === customerCredentials.password)
              ) {
                console.log('Logged in successfully:', values);
                navigate(values.userType === 'pharmacist' ? '/pharmacist-dashboard' : '/customer-dashboard');
              } else {
                setErrors({ email: 'Invalid email or password' });
              }
              setSubmitting(false);
            }}
          >
            {({ errors, touched }) => (
              <Form className="space-y-6">
                <div className="space-y-4 p-6 rounded-lg border border-gray-300 shadow-md">
                  <div>
                    <Field as="select" name="userType" className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none transition-all duration-200">
                      <option value="">Select User Type</option>
                      <option value="pharmacist">Pharmacist</option>
                      <option value="customer">Customer</option>
                    </Field>
                    {errors.userType && touched.userType && (
                      <div className="text-red-500 text-sm mt-1">{errors.userType}</div>
                    )}
                  </div>
                  <div>
                    <Field name="email" type="email" placeholder="Email Address" className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none transition-all duration-200" />
                    {errors.email && touched.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
                  </div>
                  <div>
                    <Field name="password" type="password" placeholder="Password" className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none transition-all duration-200" />
                    {errors.password && touched.password && <div className="text-red-500 text-sm mt-1">{errors.password}</div>}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <Link to="/forgot-password" className="text-green-500 text-sm hover:underline">Forgot Password?</Link>
                </div>
                <div className="w-full p-4 rounded-lg">
                  <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition duration-300 transform hover:scale-105">
                    Login
                  </button>
                </div>
              </Form>
            )}
          </Formik>
          <p className="mt-6 text-center text-gray-600">Don't have an account? <Link to="/signup" className="text-green-500 hover:underline">Sign Up</Link></p>
        </div>
        <div className="hidden md:block w-1/2 relative group">
          <img src={pharmacyImage} alt="Doctor in Pharmacy" className="w-full h-full object-cover rounded-lg shadow-xl transition-all duration-500 group-hover:scale-105 group-hover:opacity-80" />
          <div className="absolute inset-0 bg-black opacity-40 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;