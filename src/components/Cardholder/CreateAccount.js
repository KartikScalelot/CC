import React, { useState, useCallback } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { baseurl } from '../../api/baseurl';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

function CreateAccount() {

	const navigate = useNavigate();
	// const dispatch = useDispatch();

	const token = localStorage.getItem("Token");
	const header = {
		'Authorization': `Bearer ${token}`,
		'Content-Type': 'multipart/form-data'
	}
	const [loading, setLoading] = useState(false);
	const [isCheck, setIsCheck] = useState(false)

	const initialState = {
		first_name: "",
		last_name: "",
		password: "",
		password2: "",
		email: "",
		phone_no: "",
		aadhar: "",
		pan: "",
		cheque: "",
		refer_code: "",
		tc: ""
	}

	const ValidationSchema = Yup.object().shape({
		first_name: Yup.string().required('First name is required*'),
		last_name: Yup.string().required('Last name is required*'),
		// password: Yup.string().test('len', 'Must be exactly 12 characters', val => val.length === 12).required('Card number is required*'),
		password: Yup.string().required('Password is required*'),
		password2: Yup.string().required('Confirm Password is required*'),
		email: Yup.string().required('Email is required'),
		phone_no: Yup.number().required('Phone no is required')
			.typeError("Phone no must be a digit")
			.integer()
			.positive("Phone no must be a positive"),
		phone_no: Yup.string().required('Phone no is required')
			.matches(/^[0-9]*$/, "Phone number must be a digit")
			.min(10, "Phone number must be 10 digits long")
			.max(10, "Phone number must be 10 digits long"),
		aadhar: Yup.string().required('Aadhar is required'),
		pan: Yup.string().required('Pan is required'),
		cheque: Yup.string().required('Cheque is required'),
		tc: Yup.string().required('Accept terms and condition'),
	});

	const clickNextHandler = async (values) => {
		setLoading(true);
		const requestObj = { ...values };
		try {
			const response = await axios.post(`${baseurl}/api/user/create-account`, requestObj, { headers: header });
			console.log("response", response);
			if (response.data.IsSuccess) {
				toast.success(response.data.Message);
				// dispatch(increment());
				setTimeout(() => {
					navigate(`../`);
				}, 1000);
			} else {
				toast.error(response.data.Message);
				// toast.error(response.data.Message);
			}
			setLoading(false);
		} catch (error) {
			toast.error("Something Went Wrong!!");
			// navigate(`/auth/login`);
			setLoading(false);
			console.log(error);
		}
	}

	const formik = useFormik({
		initialValues: initialState,
		validationSchema: ValidationSchema,
		onSubmit: clickNextHandler,
	});

	const setInputValue = useCallback(
		(key, value) =>
			formik.setValues({
				...formik.values,
				[key]: value,
			}),
		[formik]
	);
	return (
		<div className="wrapper min-h-full">
			<div className="flex items-center cursor-pointer">
				<svg onClick={() => navigate("../")} width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M7.65995 2.41586C8.0277 2.05138 8.03034 1.4578 7.66586 1.09005C7.30139 0.722305 6.7078 0.719657 6.34005 1.08414L4.09664 3.30762C3.25167 4.14505 2.56108 4.82949 2.07132 5.43932C1.56203 6.07348 1.19337 6.71716 1.09489 7.4898C1.0517 7.82858 1.0517 8.17142 1.09489 8.5102C1.19337 9.28284 1.56203 9.92652 2.07132 10.5607C2.56108 11.1705 3.25167 11.855 4.09665 12.6924L6.34005 14.9159C6.7078 15.2803 7.30138 15.2777 7.66586 14.9099C8.03034 14.5422 8.02769 13.9486 7.65995 13.5841L5.45624 11.4C4.56187 10.5136 3.94837 9.90353 3.53324 9.38662C3.39833 9.21863 3.29307 9.07075 3.21135 8.9375H22C22.5178 8.9375 22.9375 8.51777 22.9375 8C22.9375 7.48223 22.5178 7.0625 22 7.0625H3.21135C3.29308 6.92925 3.39833 6.78137 3.53324 6.61338C3.94837 6.09647 4.56187 5.48642 5.45624 4.6L7.65995 2.41586Z" fill="#0F172A" stroke="#0F172A" strokeLinecap="round" />
				</svg>
				<h3 className="text-yankeesBlue leading-8 pl-7">Create account</h3>
			</div>
			<form className='pt-7' onSubmit={formik.handleSubmit} >
				<div className='w-full flex flex-wrap sm:flex-nowrap sm:space-x-6'>
					<div className='w-full sm:w-1/2 mb-4'>
						<label htmlFor="" className="input-title2">First name</label>
						<input type="text" name="first_name" className="input_box2 placeholder:text-[#94A3B8] placeholder:text-sm sm:placeholder:text-xl" placeholder='Enter first name' required onChange={(e) => setInputValue("first_name", e.target.value)} />
						<small className="text-red-500 text-xs">{formik.errors.first_name}</small>
					</div>
					<div className='w-full sm:w-1/2 mb-4'>
						<label htmlFor="" className="input-title2">Last name</label>
						<input type="text" name="last_name" className="input_box2 placeholder:text-[#94A3B8] placeholder:text-sm sm:placeholder:text-xl" placeholder='Enter last name' required onChange={(e) => setInputValue("last_name", e.target.value)} />
						<small className="text-red-500 text-xs">{formik.errors.last_name}</small>
					</div>
				</div>
				<div className='w-full flex flex-wrap sm:flex-nowrap sm:space-x-6'>
					<div className='w-full sm:w-1/2 mb-4'>
						<label htmlFor="" className="input-title2">Email</label>
						<input type="email" name="email" className="input_box2 placeholder:text-[#94A3B8] placeholder:text-sm sm:placeholder:text-xl" placeholder='Enter email ' required onChange={(e) => setInputValue("email", e.target.value)} />
						<small className="text-red-500 text-xs">{formik.errors.email}</small>
					</div>
					<div className='w-full sm:w-1/2 mb-4'>
						<label htmlFor="" className="input-title2">Phone number</label>
						<input type="tel" name="phone_no" maxLength={10} className="input_box2 placeholder:text-[#94A3B8] placeholder:text-sm sm:placeholder:text-xl" placeholder='Enter phone number' required onChange={(e) => setInputValue("phone_no", e.target.value)} />
						<small className="text-red-500 text-xs">{formik.errors.phone_no}</small>
					</div>
				</div>
				<div className='w-full flex flex-wrap sm:flex-nowrap sm:space-x-6'>
					<div className='w-full sm:w-1/2 mb-4'>
						<label htmlFor="" className="input-title2">Upload Adhar card</label>
						<label className='input_box2 flex items-center border-dashed justify-start sm:justify-center' htmlFor='AdharCard-photo'>
							<svg width="22" height="17" viewBox="0 0 22 17" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path fillRule="evenodd" clipRule="evenodd" d="M10.4444 1.75C7.65101 1.75 5.35585 3.88704 5.10594 6.6149C5.07 7.0073 4.74063 7.306 4.34837 7.3056C2.9362 7.3044 1.75 8.4797 1.75 9.8889C1.75 11.3156 2.9066 12.4722 4.33333 12.4722H5C5.41421 12.4722 5.75 12.808 5.75 13.2222C5.75 13.6364 5.41421 13.9722 5 13.9722H4.33333C2.07817 13.9722 0.25 12.1441 0.25 9.8889C0.25 7.8644 1.76567 6.1724 3.69762 5.858C4.28682 2.66679 7.08302 0.25 10.4444 0.25C12.947 0.25 15.1354 1.5899 16.3334 3.58865C19.2024 3.47555 21.75 5.8223 21.75 8.7778C21.75 11.4717 19.6998 13.6859 17.0741 13.9466C16.6619 13.9875 16.2946 13.6866 16.2537 13.2744C16.2127 12.8622 16.5137 12.4949 16.9259 12.4539C18.792 12.2687 20.25 10.693 20.25 8.7778C20.25 6.565 18.2032 4.80912 16.0261 5.1209C15.7057 5.1668 15.3871 5.0044 15.239 4.70953C14.3572 2.95291 12.5406 1.75 10.4444 1.75Z" fill="#94A3B8" />
								<path fillRule="evenodd" clipRule="evenodd" d="M11 10.0606L12.9696 12.0302C13.2625 12.3231 13.7374 12.3231 14.0303 12.0302C14.3232 11.7373 14.3232 11.2625 14.0303 10.9696L11.8839 8.82311C11.3957 8.33501 10.6043 8.33501 10.1161 8.82311L7.96967 10.9696C7.67678 11.2625 7.67678 11.7373 7.96967 12.0302C8.26256 12.3231 8.73744 12.3231 9.0303 12.0302L11 10.0606Z" fill="#94A3B8" />
								<path fillRule="evenodd" clipRule="evenodd" d="M11 16.75C11.4142 16.75 11.75 16.4142 11.75 16V10C11.75 9.5858 11.4142 9.25 11 9.25C10.5858 9.25 10.25 9.5858 10.25 10V16C10.25 16.4142 10.5858 16.75 11 16.75Z" fill="#94A3B8" />
							</svg>
							<span className="text-[#94A3B8] font-normal text-sm sm:text-xl pl-4">
								{formik.values.aadhar && formik.values.aadhar !== "" ?
									formik.values.aadhar.name
									:
									"Upload Aadhar"
								}
							</span>
						</label>
						<input type="file" name="aadhar" id='AdharCard-photo' className="input_box2 placeholder:text-[#94A3B8] placeholder:text-base hidden" placeholder='Card photo upload' accept='image/*' required onChange={(e) => setInputValue("aadhar", e.currentTarget.files[0])} /><small className="text-red-500 text-xs">{formik.errors.aadhar}</small>
					</div>
					<div className='w-full sm:w-1/2 mb-4'>
						<label htmlFor="" className="input-title2">Upload pan-card</label>
						<label className='input_box2 flex items-center border-dashed justify-start sm:justify-center' htmlFor='panCard-photo'>
							<svg width="22" height="17" viewBox="0 0 22 17" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path fillRule="evenodd" clipRule="evenodd" d="M10.4444 1.75C7.65101 1.75 5.35585 3.88704 5.10594 6.6149C5.07 7.0073 4.74063 7.306 4.34837 7.3056C2.9362 7.3044 1.75 8.4797 1.75 9.8889C1.75 11.3156 2.9066 12.4722 4.33333 12.4722H5C5.41421 12.4722 5.75 12.808 5.75 13.2222C5.75 13.6364 5.41421 13.9722 5 13.9722H4.33333C2.07817 13.9722 0.25 12.1441 0.25 9.8889C0.25 7.8644 1.76567 6.1724 3.69762 5.858C4.28682 2.66679 7.08302 0.25 10.4444 0.25C12.947 0.25 15.1354 1.5899 16.3334 3.58865C19.2024 3.47555 21.75 5.8223 21.75 8.7778C21.75 11.4717 19.6998 13.6859 17.0741 13.9466C16.6619 13.9875 16.2946 13.6866 16.2537 13.2744C16.2127 12.8622 16.5137 12.4949 16.9259 12.4539C18.792 12.2687 20.25 10.693 20.25 8.7778C20.25 6.565 18.2032 4.80912 16.0261 5.1209C15.7057 5.1668 15.3871 5.0044 15.239 4.70953C14.3572 2.95291 12.5406 1.75 10.4444 1.75Z" fill="#94A3B8" />
								<path fillRule="evenodd" clipRule="evenodd" d="M11 10.0606L12.9696 12.0302C13.2625 12.3231 13.7374 12.3231 14.0303 12.0302C14.3232 11.7373 14.3232 11.2625 14.0303 10.9696L11.8839 8.82311C11.3957 8.33501 10.6043 8.33501 10.1161 8.82311L7.96967 10.9696C7.67678 11.2625 7.67678 11.7373 7.96967 12.0302C8.26256 12.3231 8.73744 12.3231 9.0303 12.0302L11 10.0606Z" fill="#94A3B8" />
								<path fillRule="evenodd" clipRule="evenodd" d="M11 16.75C11.4142 16.75 11.75 16.4142 11.75 16V10C11.75 9.5858 11.4142 9.25 11 9.25C10.5858 9.25 10.25 9.5858 10.25 10V16C10.25 16.4142 10.5858 16.75 11 16.75Z" fill="#94A3B8" />
							</svg>
							<span className="text-[#94A3B8] font-normal text-sm sm:text-xl pl-4">
								{formik.values.pan && formik.values.pan !== "" ?
									formik.values.pan.name
									:
									"Upload pan-card"
								}
							</span>
						</label>
						<input type="file" name="pan" id='panCard-photo' className="input_box2 placeholder:text-[#94A3B8] placeholder:text-base hidden" placeholder='Card photo upload' accept='image/*' required onChange={(e) => setInputValue("pan", e.currentTarget.files[0])} />
						<small className="text-red-500 text-xs">{formik.errors.pan}</small>
					</div>
				</div>
				<div className='w-full flex flex-wrap sm:flex-nowrap sm:space-x-6'>
					<div className='w-full sm:w-1/2 mb-4'>
						<label htmlFor="" className="input-title2">Upload cheque photo </label>
						<label className='input_box2 flex items-center border-dashed justify-start sm:justify-center' htmlFor='cheque-photo'>
							<svg width="22" height="17" viewBox="0 0 22 17" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path fillRule="evenodd" clipRule="evenodd" d="M10.4444 1.75C7.65101 1.75 5.35585 3.88704 5.10594 6.6149C5.07 7.0073 4.74063 7.306 4.34837 7.3056C2.9362 7.3044 1.75 8.4797 1.75 9.8889C1.75 11.3156 2.9066 12.4722 4.33333 12.4722H5C5.41421 12.4722 5.75 12.808 5.75 13.2222C5.75 13.6364 5.41421 13.9722 5 13.9722H4.33333C2.07817 13.9722 0.25 12.1441 0.25 9.8889C0.25 7.8644 1.76567 6.1724 3.69762 5.858C4.28682 2.66679 7.08302 0.25 10.4444 0.25C12.947 0.25 15.1354 1.5899 16.3334 3.58865C19.2024 3.47555 21.75 5.8223 21.75 8.7778C21.75 11.4717 19.6998 13.6859 17.0741 13.9466C16.6619 13.9875 16.2946 13.6866 16.2537 13.2744C16.2127 12.8622 16.5137 12.4949 16.9259 12.4539C18.792 12.2687 20.25 10.693 20.25 8.7778C20.25 6.565 18.2032 4.80912 16.0261 5.1209C15.7057 5.1668 15.3871 5.0044 15.239 4.70953C14.3572 2.95291 12.5406 1.75 10.4444 1.75Z" fill="#94A3B8" />
								<path fillRule="evenodd" clipRule="evenodd" d="M11 10.0606L12.9696 12.0302C13.2625 12.3231 13.7374 12.3231 14.0303 12.0302C14.3232 11.7373 14.3232 11.2625 14.0303 10.9696L11.8839 8.82311C11.3957 8.33501 10.6043 8.33501 10.1161 8.82311L7.96967 10.9696C7.67678 11.2625 7.67678 11.7373 7.96967 12.0302C8.26256 12.3231 8.73744 12.3231 9.0303 12.0302L11 10.0606Z" fill="#94A3B8" />
								<path fillRule="evenodd" clipRule="evenodd" d="M11 16.75C11.4142 16.75 11.75 16.4142 11.75 16V10C11.75 9.5858 11.4142 9.25 11 9.25C10.5858 9.25 10.25 9.5858 10.25 10V16C10.25 16.4142 10.5858 16.75 11 16.75Z" fill="#94A3B8" />
							</svg>
							<span className="text-[#94A3B8] font-normal text-sm sm:text-xl pl-4">
								{formik.values.cheque && formik.values.cheque !== "" ?
									formik.values.cheque.name
									:
									"Upload cheque photo"
								}
							</span>
						</label>
						<input type="file" name="cheque" id='cheque-photo' className="input_box2 placeholder:text-[#94A3B8] placeholder:text-base hidden" placeholder='Card photo upload' accept='image/*' required onChange={(e) => setInputValue("cheque", e.currentTarget.files[0])} />
						<small className="text-red-500 text-xs">{formik.errors.cheque}</small>
					</div>
					<div className='w-full sm:w-1/2 mb-4'>
						<label htmlFor="refer_code" className="input-title2">Refer Code (Optional)</label>
						<input type="text" name="refer_code" className="input_box2 placeholder:text-[#94A3B8] placeholder:text-sm sm:placeholder:text-xl" placeholder='Enter refer code' onChange={(e) => setInputValue("refer_code", e.target.value)} />
						<small className="text-red-500 text-xs">{formik.errors.refer_code}</small>
					</div>
				</div>
				<div className='w-full flex flex-wrap sm:flex-nowrap sm:space-x-6'>
					<div className='w-full sm:w-1/2 mb-4'>
						<label htmlFor="" className="input-title2">Password</label>
						<input type="password" name="password" className="input_box2 placeholder:text-[#94A3B8] placeholder:text-sm sm:placeholder:text-xl" placeholder='Enter password' required onChange={(e) => setInputValue("password", e.target.value)} />
						<small className="text-red-500 text-xs">{formik.errors.password}</small>
					</div>
					<div className='w-full sm:w-1/2 mb-4'>
						<label htmlFor="" className="input-title2">Confirm password</label>
						<input type="password" name="password2" className="input_box2 placeholder:text-[#94A3B8] placeholder:text-sm sm:placeholder:text-xl" placeholder='Enter confirm password' required onChange={(e) => setInputValue("password2", e.target.value)} />
						<small className="text-red-500 text-xs">{formik.errors.password2}</small>
					</div>
				</div>
				<div className='w-full flex flex-wrap sm:flex-nowrap sm:space-x-6'>
					<div className="flex items-start sm:items-center">
						<label className="checkbox w-5 mr-2"><input type="checkbox" name="tc" className="bg-white"
							defaultChecked={isCheck} onClick={(e) => { setInputValue("tc", !isCheck); setIsCheck(!isCheck); }}
						/><i className="icon-right"></i></label>
						<span className="text-sm leading-5 text-[#64748B] font-bold">I have read and accept <Link className='font-bold text-yankeesBlue'>Terms and condition</Link></span>
						<small className="text-red-500 text-xs ml-5">{formik.errors.tc}</small>
					</div>
				</div>
				<div className="w-full flex space-x-6 mt-7">
					{loading ?
						<button type="button" class="flex items-center justify-center btn-secondary w-full mt-5 sm:mt-0" disabled="">
							<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
								<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
								<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
							</svg>
							Processing...
						</button>
						:
						<button type="submit" className="btn-secondary w-full mt-5 sm:mt-0">Create account</button>
					}
				</div>
			</form>
			<ToastContainer
				position="bottom-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="colored"
			/>
		</div>
	)
}

export default CreateAccount