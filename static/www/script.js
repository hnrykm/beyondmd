// Fades the page contents then redirects to the React homepage.
async function begin() {
	const content = document.getElementById('content');
	content.className = 'container hide';
	await new Promise((resolve) => setTimeout(resolve, 3000));
	content.style.display = 'none';
	window.location.href = 'http://localhost:3000/';
}
