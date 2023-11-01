const delButtonHandler = async (event) => {
	if (event.target.hasAttribute('data-did')) {
		const id = event.target.getAttribute('data-did');

		const response = await fetch(`/api/post/delete/${id}`, {
			method: 'DELETE',
		});

		if (response.ok) {
			document.location.replace('/profile');
		} else {
			alert('Failed to delete post');
		}
	}
};

const postList = document.querySelector('.post-list') !== null;
if (postList) {
	document
		.querySelector('.post-list')
		.addEventListener('click', delButtonHandler);
}
