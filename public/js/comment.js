const newCommentFormHandler = async (event) => {
	event.preventDefault();

	const comment = document.querySelector('#comment').value.trim();

	const post_id = document
		.getElementById('btn-comment')
		.getAttribute('data-id');

	if (comment) {
		const response = await fetch(`/api/comment/${post_id}`, {
			method: 'POST',
			body: JSON.stringify({ comment }),
			headers: { 'Content-Type': 'application/json' },
		});

		if (response.ok) {
			document.location.replace(`/post/${post_id}`);
		} else {
			alert('Failed to create new post');
		}
	}
};

document
	.querySelector('.comment-form')
	.addEventListener('submit', newCommentFormHandler);
