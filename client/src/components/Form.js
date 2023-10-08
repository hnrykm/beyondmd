// const Form = ({formData}) => {
// e.preventDefault();
// 		const symptoms = formData.symptom_2
// 			? `[${formData.symptom_1},${formData.symptom_2}]`
// 			: `[${formData.symptom_1}]`;
// 		const gender = JSON.parse(formData.is_male) ? 'male' : 'female';
// 		const birth_year = formData.birth_year;
// 		const api_medic_token =
// 			'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImhucnlrbUBnbWFpbC5jb20iLCJyb2xlIjoiVXNlciIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL3NpZCI6IjEyOTI5IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy92ZXJzaW9uIjoiMjAwIiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9saW1pdCI6Ijk5OTk5OTk5OSIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbWVtYmVyc2hpcCI6IlByZW1pdW0iLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL2xhbmd1YWdlIjoiZW4tZ2IiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL2V4cGlyYXRpb24iOiIyMDk5LTEyLTMxIiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9tZW1iZXJzaGlwc3RhcnQiOiIyMDIzLTA5LTIxIiwiaXNzIjoiaHR0cHM6Ly9zYW5kYm94LWF1dGhzZXJ2aWNlLnByaWFpZC5jaCIsImF1ZCI6Imh0dHBzOi8vaGVhbHRoc2VydmljZS5wcmlhaWQuY2giLCJleHAiOjE2OTY3ODA2NzgsIm5iZiI6MTY5Njc3MzQ3OH0.JZxhkWi3eclL4xmiT0FcPfHOUxoomHorJv2Ta0_-Iyg';
// 		const url = `https://sandbox-healthservice.priaid.ch/diagnosis?symptoms=${symptoms}&gender=${gender}&year_of_birth=${birth_year}&token=${api_medic_token}&format=json&language=en-gb`;
// 		const response = await fetch(url);
// 		if (response.ok) {
// 			const data = await response.json();
// 			const diagnoses = data.map((diagnosis) => diagnosis.Issue.ProfName);

// 			const postData = {};
// 			postData.exam_date = dayjs(formData.exam_date)
// 				.format('YYYY-MM-DD')
// 				.toString();
// 			postData.first_name = formData.first_name;
// 			postData.last_name = formData.last_name;
// 			postData.birth_year = Number(formData.birth_year);
// 			postData.is_male = formData.is_male === 'true' ? true : false;
// 			postData.symptom_1 = symptom1;
// 			postData.symptom_2 = symptom2;
// 			postData.diagnosis = diagnoses.join(', ');
//         }

//         export default Form;
