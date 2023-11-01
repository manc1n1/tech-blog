const passwordTextArea = document.querySelector('#password-signup');
const characterCounter = document.getElementById('char_count');
const maxNumOfChars = 8;

const signupFormHandler = async (event) => {
	event.preventDefault();

	const username = document.querySelector('#username-signup').value.trim();
	const password = document.querySelector('#password-signup').value.trim();

	if (username && password) {
		const response = await fetch('/api/user/signup', {
			method: 'POST',
			body: JSON.stringify({ username, password }),
			headers: { 'Content-Type': 'application/json' },
		});

		if (response.ok) {
			document.location.replace('/login');
		} else {
			alert('Failed to sign up');
		}
	}
};

const countCharacters = () => {
	let numOfEnteredChars = passwordTextArea.value.length;
	let counter = maxNumOfChars - numOfEnteredChars;
	characterCounter.textContent = counter;

	if (counter <= 0) {
		characterCounter.style.color = '#a6e3a1';
		characterCounter.textContent = 0;
	} else if (counter <= 2) {
		characterCounter.style.color = '#f9e2af	';
	} else if (counter <= 4) {
		characterCounter.style.color = '#fab387	';
	} else if (counter <= 6) {
		characterCounter.style.color = '#eba0ac	';
	} else {
		characterCounter.style.color = '#f38ba8';
	}
};

passwordTextArea.addEventListener('input', countCharacters);

document
	.querySelector('.signup-form')
	.addEventListener('submit', signupFormHandler);
