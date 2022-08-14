import { Student } from "./studentsSlice";

// A mock function to mimic making an async request for data
export function fetchStudents() {
	return new Promise<{ data: any[] }>(async(resolve) => {
		try {
			const res = await fetch("http://localhost:5000/students");
			const data = await res.json();
			resolve({ data });
		} catch (e) {
			console.error("Failed to fetch students: ", e);
			resolve({ data: [] });
		}
	});
}

export function fetchStudent(studentId: number) {
	return new Promise<{ success: boolean; student?: Student }>(async (resolve) => {
		try {
			const res = await fetch(`http://localhost:5000/student/${studentId}`);
			const data = await res.json();
			if (data) {
				resolve({ success: true, student: data });
			} else resolve({ success: false });
		} catch (e) {
			console.error("Failed to fetch student: ", e);
			resolve({ success: false });
		}
	});
}

export function createStudent(student: Student) {
	return new Promise<{ success: boolean; student?: Student }>(async (resolve) => {
		try {
			const res = await fetch(`http://localhost:5000/student`, {
				method: "POST",
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(student)
			});
			const data = await res.json();
			if (data?.uuid) {
				student.uuid = data.uuid;
				resolve({ success: true, student });
			} else resolve({ success: false });
		} catch (e) {
			console.error("Failed to create student: ", e);
			resolve({ success: false });
		}
	});
}

export function updateStudent(student: Student) {
	return new Promise<{ success: boolean; student?: Student}>(async (resolve) => {
		try {
			const res = await fetch(`http://localhost:5000/student/${student.uuid}`, {
				method: "PUT",
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(student)
			});
			const data = await res.json();
			if (data?.success) {
				resolve({ success: true, student });
			} else resolve({ success: false });
		} catch (e) {
			console.error("Failed to update student: ", e);
			resolve({ success: false });
		}
	});
}

export function deleteStudent(studentId: number) {
	return new Promise<{ success: boolean; studentId?: number }>(async (resolve) => {
		try {
			const res = await fetch(`http://localhost:5000/student/${studentId}`, { method: "DELETE" });
			const data = await res.json();
			if (data?.success) {
				resolve({ success: data.success, studentId });
			} else resolve({ success: false });
		} catch (e) {
			console.error("Failed to delete students: ", e);
			resolve({ success: false });
		}
	});
}
