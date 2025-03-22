document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('userForm').addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        const response = await fetch('http://localhost:3000/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, message })
        });

        if (response.ok) {
            alert('Data submitted successfully!');
            document.getElementById('userForm').reset(); // Clear form after submission
        } else {
            alert('Error submitting data.');
        }
    });
});
