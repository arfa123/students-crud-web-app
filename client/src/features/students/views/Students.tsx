import { useEffect } from 'react';
import {
	AppBar,
} from '@mui/material';
import { useAppDispatch } from '../../../app/hooks';
import {
	fetchAllStudents
} from '../studentsSlice';
import styles from './Students.module.css';
import safePayLogoWhite from '../../../assests/1/Safepay-logo-01_white.svg';
import StudentsList from '../components/StudentsList';

export function Students() {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchAllStudents());
	}, [dispatch]);

	return (
		<div>
			<AppBar>
				<img src={safePayLogoWhite} className={styles.headerLogo} alt="safepay-logo-white" />
			</AppBar>
			<div className={styles.contentContainer}>
				<StudentsList />
			</div>
		</div>
	);
}
