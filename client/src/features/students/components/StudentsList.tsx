import { useState, useMemo } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
	DataGrid,
	GridRowsProp,
	GridRowParams,
	GridColumns,
	GridToolbar,
	GridActionsCellItem,
} from '@mui/x-data-grid';
import {
	Box,
	Stack,
	Button,
	Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
	deleteStudentFromList,
	getStatus,
	getStudentsList,
	Student
} from '../studentsSlice';
import StudentDialog from './StudentDialog';
import { useNavigate } from 'react-router-dom';

const StudentsList = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const studentsList: GridRowsProp = useAppSelector(getStudentsList);
	const status: string = useAppSelector(getStatus);

	const [studentDialogVisible, setStudentDialogVisible] = useState<boolean>(false);
	const [editingStudent, setEditingStudent] = useState<Student>();

	const onRowEdit = (student: Student) => {
		setEditingStudent(student);
		setStudentDialogVisible(true);
	};

	const columns = useMemo<GridColumns<any>>(
		() => [
			{ field: 'name', headerName: 'Name', type: 'string', flex: 1, headerAlign: 'left' },
			{ field: 'class', headerName: 'Class', type: 'string', flex: 1, headerAlign: 'left' },
			{ field: 'sex', headerName: 'Sex', type: 'singleSelect', valueOptions: ['male', 'female'], flex: 1, headerAlign: 'left' },
			{ field: 'age', headerName: 'Age', type: 'string', flex: 1, headerAlign: 'left' },
			{ field: 'siblings', headerName: 'Siblings', type: 'string', flex: 1, headerAlign: 'left' },
			{ field: 'gpa', headerName: 'GPA', type: 'string', flex: 1, headerAlign: 'left' },
			{
				field: 'actions',
				type: 'actions',
				editable: false,
				getActions: (params: GridRowParams) => {
					return ([
						<GridActionsCellItem
							icon={<EditIcon />}
							label="Edit"
							onClick={() => onRowEdit(params.row)}
						/>,
						<GridActionsCellItem
							icon={<DeleteIcon />}
							label="Delete"
							onClick={() => dispatch(deleteStudentFromList(params.id))}
						/>
					]);
				}
			}
		],
		[dispatch]
	);

	const onAddStudent = () => {
		setStudentDialogVisible(true);
	};

	const closeStudentDialog = () => {
		setStudentDialogVisible(false);
		setEditingStudent(undefined);
	};

	const onStudentSelect = (params: GridRowParams) => {
		navigate(`student/${params.id}`);
	};

	return (
		<Box sx={{ width: '100%' }}>
			<Stack direction="row" spacing={1} justifyContent="space-between" alignItems="center" margin="0 1rem" mt="12vh">
				<Typography variant="h5" color="primary.main">
					Students
				</Typography>
				<Button size="medium" variant="contained" onClick={onAddStudent}>
					Add Student
				</Button>
			</Stack>
			<Box>
				<DataGrid
					rows={studentsList}
					columns={columns}
					getRowId={(row) => row.uuid}
					autoHeight
					hideFooter
					loading={status === 'loading'}
					onRowClick={onStudentSelect}
					components={{
						Toolbar: GridToolbar,
						NoRowsOverlay: () => (
							<Stack height="100%" alignItems="center" justifyContent="center">
								No Student Available
							</Stack>
						),
						NoResultsOverlay: () => (
							<Stack height="100%" alignItems="center" justifyContent="center">
								No Student Found
							</Stack>
						)
					}}
					sx={{
						color: 'secondary.main',
						'.MuiDataGrid-columnSeparator': {
							display: 'none',
						},
						'&.MuiDataGrid-root': {
							border: 'none',
						},
						'& .MuiDataGrid-columnHeaders': {
							backgroundColor: "secondary.main",
							color: "#FFF",
							fontWeight: "bold",
							fontSize: "1.3em"
						},
						'& .MuiDataGrid-cellCenter': {
							justifyContent: "center"
						},
						'& .MuiDataGrid-row': {
							cursor: "pointer"
						}
					}}
					experimentalFeatures={{ newEditingApi: true }}
					disableIgnoreModificationsIfProcessingProps
				/>
			</Box>
			{studentDialogVisible &&
				<StudentDialog
					isVisible={studentDialogVisible}
					closeDialog={closeStudentDialog}
					studentData={editingStudent}
				/>
			}
		</Box>
	);
};

export default StudentsList;