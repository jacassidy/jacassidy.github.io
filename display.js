// display.js

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const fileName = urlParams.get('file');

    if (fileName) {
        document.getElementById('code-title').textContent = fileName;

        fetch(`code/${fileName}`)
            .then(response => response.text())
            .then(code => {
                const codeContent = document.getElementById('code-content');
                codeContent.textContent = code;

                // Initialize syntax highlighting if you use any
                // e.g., Prism.highlightAll();

                // Copy button functionality
                const copyButton = document.getElementById('copy-button');
                copyButton.addEventListener('click', () => {
                    navigator.clipboard.writeText(code).then(() => {
                        alert('Code copied to clipboard');
                    }, err => {
                        console.error('Failed to copy code:', err);
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
