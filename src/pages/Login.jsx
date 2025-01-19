import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import pharmacyImage from '../assets/image/pharmacy.jpg'; // Ensure you have this image path correctly

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-teal-600 px-4 py-8">
      <div className="flex max-w-4xl w-full p-8 bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-105">
        {/* Container for Form Section */}
        <div className="w-full md:w-1/2 space-y-6">
          <h2 className="text-4xl font-semibold text-center text-gray-800">Login to Your Account</h2>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={LoginSchema}
            onSubmit={(values, { setSubmitting, setErrors }) => {
              const mockEmail = 'saswotsubedi706@gmail.com';
              const mockPassword = 'admin';

              if (values.email === mockEmail && values.password === mockPassword) {
                console.log('Logged in successfully:', values);
                navigate('/dashboard');
              } else {
                setErrors({ email: 'Invalid email or password' });
              }
              setSubmitting(false);
            }}
          >
            {({ errors, touched }) => (
              <Form className="space-y-6">
                {/* Container for Inputs */}
                <div className="space-y-4 p-6 rounded-lg border border-gray-300 shadow-md">
                  {/* Email Field */}
                  <div>
                    <Field
                      name="email"
                      type="email"
                      placeholder="Email Address"
                      className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none transition-all duration-200"
                    />
                    {errors.email && touched.email && (
                      <div className="text-red-500 text-sm mt-1">{errors.email}</div>
                    )}
                  </div>

                  {/* Password Field */}
                  <div>
                    <Field
                      name="password"
                      type="password"
                      placeholder="Password"
                      className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none transition-all duration-200"
                    />
                    {errors.password && touched.password && (
                      <div className="text-red-500 text-sm mt-1">{errors.password}</div>
                    )}
                    {errors.email && !touched.password && (
                      <div className="text-red-500 text-sm mt-1">{errors.email}</div>
                    )}
                  </div>
                </div>

                {/* Forgot Password Link */}
                <div className="flex justify-between items-center">
                  <Link
                    to="/forgot-password"
                    className="text-green-500 text-sm hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>

                {/* Submit Button */}
                <div className="w-full p-4 rounded-lg">
                  <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition duration-300 transform hover:scale-105"
                  >
                    Login
                  </button>
                </div>
              </Form>
            )}
          </Formik>
          <p className="mt-6 text-center text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-green-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>

        {/* Image Section */}
        <div className="hidden md:block w-1/2 relative group">
          <img
            src={pharmacyImage}
            alt="Doctor in Pharmacy"
            className="w-full h-full object-cover rounded-lg shadow-xl transition-all duration-500 group-hover:scale-105 group-hover:opacity-80"
          />
          <div className="absolute inset-0 bg-black opacity-40 rounded-lg"></div> {/* Overlay for better readability */}
        </div>
      </div>
    </div>
  );
};

export default Login;
