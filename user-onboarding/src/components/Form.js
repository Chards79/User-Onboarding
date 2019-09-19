import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const MyForm = ({ values, errors, touched, status }) => {
	// console.log(MyForm);
	const [users, setUsers] = useState([]);
	useEffect(() => {
		if (status) {
			setUsers([...users, status]);
		}
	}, [status]);

	return (
		<div className="user-form">
			<Form>
				<Field type="text" name="name" placeholder="Name" />
				{touched.name && errors.name && <p className="error">{errors.name}</p>}
				<Field type="text" name="email" placeholder="Email" />
				{touched.email && errors.email && (
					<p className="error">{errors.email}</p>
				)}
				<Field type="password" name="password" placeholder="Password" />
				{touched.password && errors.password && (
					<p className="error">{errors.password}</p>
				)}
				<label>
					Terms Of Service
					<Field type="checkbox" name="terms" checked={values.terms} />
				</label>
				<button>Submit</button>
			</Form>
			{users.map(user => (
				<ul key={user.id}>
					<li>Name: {user.name}</li>
					<li>Email: {user.email}</li>
					<li>Password: {user.password}</li>
				</ul>
			))}
		</div>
	);
};

const FormikMyForm = withFormik({
	mapPropsToValues({ name, email, password, terms }) {
		return {
			name: name || "",
			email: email || "",
			password: password || "",
			terms: terms || false
		};
	},
	validationSchema: Yup.object().shape({
		name: Yup.string().required("Must Enter A Name"),
		email: Yup.string().required("Must Enter An Email"),
		password: Yup.string().required("Must Enter A Password")
	}),
	handleSubmit(values, { setStatus }) {
		axios
			.post("https://reqres.in/api/users", values)
			.then(res => {
				setStatus(res.data);
				console.log(res.data);
			})
			.catch(err => console.log(err.res));
	}
})(MyForm);

export default FormikMyForm;
