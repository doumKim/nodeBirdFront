import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Checkbox, Button } from 'antd';

const TextInput = ({ value }) => {
	return <div>{value}</div>;
};

TextInput.propTypes = {
	value: PropTypes.string,
};

const Signup = () => {
	const [passwordCheck, setPasswordCheck] = useState('');
	const [term, setTerm] = useState(false);
	const [passwordError, setPasswordError] = useState(false);
	const [termError, setTermError] = useState(false);

	const onSubmit = useCallback(
		(e) => {
			e.preventDefault();
			if (password !== passwordCheck) {
				return setPasswordError(true);
			}
			if (!term) {
				return setTermError(true);
			}
			console.log({ password, passwordCheck });
		},
		[password, passwordCheck, term],
	);

	const onChangePasswordCheck = useCallback(
		(e) => {
			setPasswordError(e.target.value !== password);
			setPasswordCheck(e.target.value);
		},
		[password, passwordError],
	);
	const onChangeTerm = useCallback((e) => {
		setTermError(false);
		setTerm(e.target.checked);
	}, []);

	const useInput = (initValue = null) => {
		const [value, setter] = useState(initValue);
		const handler = useCallback((e) => {
			setter(e.target.value);
		}, []);
		return [value, handler];
	};

	const [id, onChangeId] = useInput('');
	const [nick, onChangeNick] = useInput('');
	const [password, onChangePassword] = useInput('');

	return (
		<>
			<Form onSubmit={onSubmit} style={{ padding: 10 }}>
				<TextInput value={'135'} />
				<div>
					<label htmlFor="user-id">아이디</label>
					<br />
					<Input name="user-id" value={id} required onChange={onChangeId} />
				</div>
				<div>
					<label htmlFor="user-nick">닉네임</label>
					<br />
					<Input
						name="user-nick"
						value={nick}
						required
						onChange={onChangeNick}
					/>
				</div>
				<div>
					<label htmlFor="user-password">비밀번호</label>
					<br />
					<Input
						name="user-password"
						type="password"
						required
						onChange={onChangePassword}
						value={password}
					/>
				</div>
				<div>
					<label htmlFor="user-password-check">비밀번호 체크</label>
					<br />
					<Input
						name="user-password-check"
						type="password"
						required
						onChange={onChangePasswordCheck}
						value={passwordCheck}
					/>
					{passwordError && (
						<div style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</div>
					)}
				</div>
				<div>
					<Checkbox name="user-term" checked={term} onChange={onChangeTerm}>
						약관에 동의합니다.
					</Checkbox>
					{termError && (
						<div style={{ color: 'red' }}>
							약관에 동의하셔야 가입이 가능합니다.
						</div>
					)}
				</div>
				<div style={{ marginTop: 10 }}>
					<Button type="primary" htmlType="submit">
						가입하기
					</Button>
				</div>
			</Form>
		</>
	);
};

export default Signup;
