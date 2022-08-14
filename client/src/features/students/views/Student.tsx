import {
	Box,
	Stack,
	Paper,
	AppBar,
	Button,
	Container,
	Typography,
	CircularProgress
} from "@mui/material";
import ArrowBack from '@mui/icons-material/ArrowBack';
import safePayLogoWhite from '../../../assests/1/Safepay-logo-01_white.svg';
import styles from './Students.module.css';
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getSelectedStudent, getStatus, getStudent, Student as StudentType } from "../studentsSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";

const Student = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const params = useParams();

	const status: string = useAppSelector(getStatus);
	const student: StudentType | undefined = useAppSelector(getSelectedStudent);

	useEffect(() => {
		dispatch(getStudent(params.studentId));
	}, [dispatch, params.studentId]);

	return (
		<div>
			<AppBar>
				<img src={safePayLogoWhite} className={styles.headerLogo} alt="safepay-logo-white" />
			</AppBar>
			<div className={styles.contentContainer}>
				<Stack direction="row" spacing={1} justifyContent="space-between" alignItems="center" margin="0 1rem" mt="12vh">
					<Button variant="contained" startIcon={<ArrowBack />} onClick={() => navigate("/")}>
						Back
					</Button>
				</Stack>
				<Container maxWidth="sm">
					{student?.uuid && status === 'idle'
						?
							<Paper
								elevation={3}
								sx={{
									padding: "1rem",
									margin: "1rem"
								}}
							>
								<Typography variant="h5" color="primary.main">
									Name: {student.name}
								</Typography>
								<Typography variant="h5" color="primary.main">
									Class: {student.class}
								</Typography>
								<Typography variant="h5" color="primary.main">
									Sex: {student.sex}
								</Typography>
								<Typography variant="h5" color="primary.main">
									Age: {student.age}
								</Typography>
								<Typography variant="h5" color="primary.main">
									Siblings: {student.siblings}
								</Typography>
								<Typography variant="h5" color="primary.main">
									GPA: {student.gpa}
								</Typography>
							</Paper>
						: status === 'loading'
							?
								<Box
									sx={{
										display: "flex",
										justifyContent: "center",
										alignItems: "center"
									}}
								>
									<CircularProgress color="secondary" />
								</Box>
							:
								<Paper
									elevation={3}
									sx={{
										padding: "1rem",
										margin: "1rem"
									}}
								>
									<Typography variant="h5" color="primary.main">
										No Student Found
									</Typography>
								</Paper>
					}
				</Container>
			</div>
		</div>
	);
};

export default Student;