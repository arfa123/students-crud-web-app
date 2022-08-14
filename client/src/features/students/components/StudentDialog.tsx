import { useState, useEffect } from 'react';
import {
	Button,
	Dialog,
	MenuItem,
	TextField,
	DialogTitle,
	DialogActions,
	DialogContent,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { addNewStudent, getStatus, saveStudent, Student } from '../studentsSlice';

const sexTypes = [
	{ label: "Male", value: "male" },
	{ label: "Female", value: "female" }
];

interface Props {
	isVisible: boolean;
	closeDialog: () => void;
	studentData: Student | undefined;
} 

const StudentDialog = (props: Props) => {
	const {
		isVisible,
		closeDialog,
		studentData
	} = props;

	const dispatch = useAppDispatch();

	const status: string = useAppSelector(getStatus);

	const [name, setName] = useState<string>(studentData?.name || "");
	const [stdClass, setStdClass] = useState<number>(studentData?.class || 0);
	const [sex, setSex] = useState<string>(studentData?.sex || "");
	const [age, setAge] = useState<number>(studentData?.age || 0);
	const [siblings, setSiblings] = useState<number>(studentData?.siblings || 0);
	const [gpa, setGpa] = useState<string>(studentData?.gpa || "");
	const [addButtonPresses, setAddButtonPresses] = useState<boolean>(false);

	const onAddStudent = () => {
		const student: Student = {
			name, sex, age, siblings, gpa,
			class: stdClass, uuid: 0
		};
		dispatch(addNewStudent(student));
		setAddButtonPresses(true);
	};

	const onUpdateStudent = () => {
		if (studentData?.uuid) {
			const student: Student = {
				name, sex, age, siblings, gpa,
				class: stdClass, uuid: studentData.uuid
			};
			dispatch(saveStudent(student));
			setAddButtonPresses(true);
		}
	};

	useEffect(() => {
		if (status === "idle" && addButtonPresses) closeDialog();
	}, [status, closeDialog, addButtonPresses]);

	return (
		<Dialog open={isVisible} onClose={closeDialog}>
			<DialogTitle>{`${studentData?.uuid ? "Update" : "Add"} Student`}</DialogTitle>
			<DialogContent>
				<TextField
					autoFocus
					margin="dense"
					id="name"
					label="Name"
					value={name}
					onChange={(e) => setName(e.target.value)}
					type="text"
					fullWidth
					variant="standard"
				/>
				<TextField
					margin="dense"
					id="class"
					label="Class"
					value={stdClass}
					onChange={(e) => setStdClass(Number(e.target.value))}
					type="number"
					fullWidth
					variant="standard"
				/>
				<TextField
					id="sex"
					select
					label="Sex"
					value={sex}
					defaultValue=""
					onChange={(e) => setSex(e.target.value)}
					fullWidth
					variant="standard"
				>
					{sexTypes.map(type => (
						<MenuItem key={type.value} value={type.value}>
							{type.label}
						</MenuItem>
					))}
				</TextField>
				<TextField
					margin="dense"
					id="age"
					label="Age"
					value={age}
					onChange={(e) => setAge(Number(e.target.value))}
					type="number"
					fullWidth
					variant="standard"
				/>
				<TextField
					margin="dense"
					id="siblings"
					label="Siblings"
					value={siblings}
					onChange={(e) => setSiblings(Number(e.target.value))}
					type="number"
					fullWidth
					variant="standard"
				/>
				<TextField
					margin="dense"
					id="gpa"
					label="GPA"
					value={gpa}
					onChange={(e) => setGpa(e.target.value)}
					type="text"
					fullWidth
					variant="standard"
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={closeDialog}>Cancel</Button>
				<LoadingButton
					onClick={studentData?.uuid ? onUpdateStudent : onAddStudent}
					disabled={!name || !stdClass || !sex || !age || !siblings || !gpa}
					loading={status === 'loading'}
					variant="contained"
				>
					{`${studentData?.uuid ? "Update" : "Add"} Student`}
				</LoadingButton>
			</DialogActions>
		</Dialog>
	);
};

export default StudentDialog;