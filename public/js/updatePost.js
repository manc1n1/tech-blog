const updatePostFormHandler = async (event) => {
	event.preventDefault();

	const title = document.querySelector('#title-update-post').value.trim();
	const content = document.querySelector('#content-update-post').value.trim();

	const id = document.getElementById('btn-update').getAttribute('data-uid');

	const response = await fetch(`/api/post/update/${id}`, {
		method: 'PUT',
		body: JSON.stringify({ title, content }),
		headers: { 'Content-Type': 'application/json' },
	});

	if (response.ok) {
		document.location.replace('/profile');
	} else {
		alert('Failed to update post');
	}
};

document
	.querySelector('.update-form')
	.addEventListener('submit', updatePostFormHandler);
