async function begin() {
	const content = document.getElementById('content');
	content.className = 'container hide';
	await new Promise((resolve) => setTimeout(resolve, 1800));
	window.location.href = 'http://beyondmd.care';
}
