import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import {
	fetchStudents,
	createStudent,
	deleteStudent,
	updateStudent,
	fetchStudent
} from './studentsAPI';

export interface Student {
	uuid: number;
	class: number;
	name: string;
	sex: string;
	age: number;
	siblings: number;
	gpa: string;
};

export interface StudentsState {
	studentsList: Student[];
	status: 'idle' | 'loading' | 'failed';
	student?: Student;
};

const initialState: StudentsState = {
	studentsList: [],
	status: 'idle',
	student: undefined
};

export const fetchAllStudents: any = createAsyncThunk(
	'students/fetchStudents',
	async () => {
		const response = await fetchStudents();
		// The value we return becomes the `fulfilled` action payload
		return response.data;
	}
);

export const getStudent: any = createAsyncThunk(
	'students/fetchStudent',
	async (studentId: number, { rejectWithValue }) => {
		const response = await fetchStudent(studentId);
		// The value we return becomes the `fulfilled` action payload
		if (response?.success) {
			return response.student;
		} else return rejectWithValue(false);
	}
);

export const addNewStudent : any = createAsyncThunk(
	'students/createStudent',
	async (student: Student, { rejectWithValue }) => {
		const response = await createStudent(student);
		// The value we return becomes the `fulfilled` action payload
		if (response?.success) {
			return response.student;
		} else return rejectWithValue(false);
	}
);

export const saveStudent: any = createAsyncThunk(
	'students/updateStudent',
	async (student: Student, { rejectWithValue }) => {
		const response = await updateStudent(student);
		// The value we return becomes the `fulfilled` action payload
		if (response?.success) {
			return response.student;
		} else return rejectWithValue(false);
	}
);

export const deleteStudentFromList: any = createAsyncThunk(
	'students/deleteStudent',
	async (studentId: number, { rejectWithValue }) => {
		const response = await deleteStudent(studentId);
		// The value we return becomes the `fulfilled` action payload
		if (response?.success) {
			return response.studentId;
		} else return rejectWithValue(false);
	}
);

export const studentsSlice = createSlice({
	name: 'students',
	initialState,
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: {
		
	},
	extraReducers: {
		// Get All Studentss
		[fetchAllStudents.pending]: (state) => {
			state.status = 'loading';
		},
		[fetchAllStudents.fulfilled]: (state, action) => {
			state.studentsList = action.payload;
			state.status = 'idle';
		},
		[fetchAllStudents.rejected]: (state) => {
			state.status = 'failed';
		},
		// Get Student
		[getStudent.pending]: (state) => {
			state.status = 'loading';
		},
		[getStudent.fulfilled]: (state, action) => {
			state.student = action.payload;
			state.status = 'idle';
		},
		[getStudent.rejected]: (state) => {
			state.status = 'failed';
		},
		// Create Student
		[addNewStudent.pending]: (state) => {
			state.status = 'loading';
		},
		[addNewStudent.fulfilled]: (state, action) => {
			const students = [...state.studentsList];
			students.push(action.payload);
			state.studentsList = students;
			state.status = 'idle';
		},
		[addNewStudent.rejected]: (state) => {
			state.status = 'failed';
		},
		// Update Student
		[saveStudent.pending]: (state) => {
			state.status = 'loading';
		},
		[saveStudent.fulfilled]: (state, action) => {
			const students = [...state.studentsList];
			const index = students.findIndex(student => student.uuid === action.payload.uuid);
			if (index !== -1) {
				students[index] = action.payload;
			}
			state.studentsList = students;
			state.status = 'idle';
		},
		[saveStudent.rejected]: (state) => {
			state.status = 'failed';
		},
		// Delete student
		[deleteStudentFromList.pending]: (state) => {
			state.status = 'loading';
		},
		[deleteStudentFromList.fulfilled]: (state, action) => {
			state.studentsList = state.studentsList.filter(student => student.uuid !== action.payload);
			state.status = 'idle';
		},
		[deleteStudentFromList.rejected]: (state) => {
			state.status = 'failed';
		}
	}
});

// export const { } = studentsSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.students.value)`
export const getStudentsList = (state: RootState) => state.students.studentsList;
export const getStatus = (state: RootState) => state.students.status;
export const getSelectedStudent = (state: RootState) => state.students.student;

export default studentsSlice.reducer;