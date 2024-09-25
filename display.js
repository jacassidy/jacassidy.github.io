// display.js

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const fileName = urlParams.get('file');

    if (fileName) {
        document.getElementById('code-title').textContent = fileName;

        fetch(`code/${fileName}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not OK');
                }
                return response.text();
            })
            .then(code => {
                const codeContent = document.getElementById('code-content');
                codeContent.textContent = code;

                // Copy button functionality
                const copyButton = document.getElementById('copy-button');
                copyButton.addEventListener('click', () => {
                    navigator.clipboard.writeText(code).then(() => {
                        alert('Code copied to clipboard!');
                    }).catch(err => {
                        console.error('Could not copy text: ', err);
                    });
                });
            })
            .catch(error => {
                console.error('Error loading code file:', error);
                document.getElementById('code-content').textContent = 'Error loading code file.';
            });
    } else {
        document.getElementById('code-content').textContent = 'No code file specified.';
    }
});
