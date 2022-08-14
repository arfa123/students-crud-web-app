import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Students } from './features/students/views/Students';
import Student from './features/students/views/Student';
import './App.css';
import { useEffect } from "react";

const theme = createTheme({
	palette: {
		primary: {
			main: "#193A8C",
		},
		secondary: {
			main: "#0467d0"
		}
	},
});

function App() {
	return (
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Students />} />
					<Route path="student">
						<Route index element={<NotFound />}/>
						<Route path=":studentId" element={<Student />} />
					</Route>
					<Route path="*" element={<NotFound />} />
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	);
}

const NotFound = () => {
	const navigate = useNavigate();

	useEffect(() => {
		navigate("/");
	}, [navigate]);

	return <h1>Not Found</h1>;
};

export default App;
