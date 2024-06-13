import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../store/authSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm password is required'),
});

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.auth);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        dispatch(registerUser({
            name: data.name,
            email: data.email,
            password: data.password
        })).then((response) => {
            if (response.error) {
                toast.error(response.error.message);
                navigate('/login')
            } else {
                toast.success('Registration successful');
            }
        });
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-5">Register</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        {...register('name')}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                    />
                    {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                </div>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        {...register('email')}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                    />
                    {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        {...register('password')}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                    />
                    {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                </div>
                <div>
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        {...register('confirmPassword')}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                    />
                    {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
                >
                    {loading ? 'Loading...' : 'Register'}
                </button>
            </form>
            {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
    );
};

export default Register;