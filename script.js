document.addEventListener('DOMContentLoaded', function() {
    const userInput = document.getElementById('userInput');
    const output = document.querySelector('.output');
    const terminalBody = document.querySelector('.terminal-body');
    let awaitingPassword = false; // Flag for password prompt
    let riddleStep = 0; // Track progress in the riddle puzzle
    const secretPassword = 'opensecret'; // Final password

    // Function to focus on userInput field
    function focusUserInput() {
        userInput.focus();
    }

    // Initial focus on page load
    focusUserInput();

    userInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            const command = userInput.value.trim();
            const response = processCommand(command);

            if (command) {
                // Create a new div element for the command entered
                const commandOutput = document.createElement('div');
                commandOutput.classList.add('command-line');
                commandOutput.textContent = `> ${command}`;
                output.appendChild(commandOutput); // Append command to output
            }

            userInput.value = '';
            focusUserInput(); // Keep focus on input field after enter

            if (response) {
                // Create a new div element for the response
                const responseOutput = document.createElement('div');
                responseOutput.classList.add('response-line');
                output.appendChild(responseOutput); // Append response to output
                animateTypeOut(responseOutput, response); // Trigger typing animation for response
            }

            // Scroll to the bottom after each command and response
            setTimeout(() => {
                terminalBody.scrollTop = terminalBody.scrollHeight;
            }, 50);
        }
    });

    function processCommand(command) {
        const cmd = command.toLowerCase();

        // If awaiting password for secret, handle password input
        if (awaitingPassword) {
            awaitingPassword = false; // Reset flag
            if (cmd === secretPassword) {
                return ' You solved the puzzle and unlocked the secret easter egg, congratulations!';
            } else {
                return 'Incorrect password. Something’s missing... Try again!';
            }
        }

        // Handle riddle steps
        if (riddleStep > 0) {
            return handleRiddleSteps(cmd);
        }

        // Handle different commands
        switch (cmd) {
            case 'whois':
                return 'Hey there! My name is Nikolas, and I am a Software Developer!!';
            case 'about':
                return 'This is a Terminal Website that functions like a terminal with its own commands. Pretty cool, right?';
            case 'help':
                return 'Types of commands:\n<div class="help-text-container"><pre class="help-text">whois\nhelp\nabout\ncontact\nclear\necho\nproblem\nsecret</pre></div>';
            case 'contact':
                return 'You can reach me via email at "nikolas.opedal@gmail.com".';
            case 'problem':
                return 'If you cannot see the input field, that’s fine. But if you dig deeper, you may uncover a mystery...';
            case 'clear':
                clearTerminal();
                return ''; // Return empty string after clearing terminal
            case 'secret':
                // Give a fake error with a hidden clue
                return `Error 403: Access Denied. HINT: Maybe try exploring deeper with "unlock"?`;
            case 'unlock':
                // Trigger the start of the riddle
                riddleStep = 1;
                return 'The path to the secret lies in riddles. Here\'s your first one:\n"I speak without a mouth and hear without ears. I have no body, but I come alive with the wind." (Type your answer)';
            default:
                if (cmd.startsWith('echo ')) {
                    return cmd.substring(5); // Echo back the text after 'echo '
                }
                return `Command not found: ${command}`;
        }
    }

    function handleRiddleSteps(cmd) {
        switch (riddleStep) {
            case 1:
                if (cmd === 'echo') {
                    riddleStep = 2;
                    return 'Correct! Next riddle:\n"I’m tall when I’m young, and I’m short when I’m old. What am I?" (Type your answer)';
                } else {
                    return 'Wrong answer! Try again: "I speak without a mouth and hear without ears. I have no body, but I come alive with the wind."';
                }
            case 2:
                if (cmd === 'candle') {
                    riddleStep = 3;
                    return 'Correct! Final challenge: Type the command "secret" to continue.';
                } else {
                    return 'Wrong answer! Try again: "I’m tall when I’m young, and I’m short when I’m old."';
                }
            case 3:
                if (cmd === 'secret') {
                    awaitingPassword = true; // Now await password
                    riddleStep = 0; // Reset riddle steps
                    return 'Almost there! Enter the password to unlock the final secret:';
                }
                break;
            default:
                return 'You are lost... Maybe try "help"?';
        }
    }

    function clearTerminal() {
        output.innerHTML = ''; // Clear the output content
        // Scroll to the top after clearing
        terminalBody.scrollTop = 0;
    }

    // Ensure userInput remains focused when clicking away
    document.addEventListener('click', function(event) {
        if (!userInput.contains(event.target)) {
            focusUserInput();
        }
    });

    function animateTypeOut(element, text) {
        element.innerHTML = ''; // Clear existing text
        let i = 0;

        function type() {
            if (i < text.length) {
                let currentChar = text.charAt(i);
                if (currentChar === '<') {
                    const endTagIndex = text.indexOf('>', i);
                    if (endTagIndex !== -1) {
                        element.innerHTML += text.substring(i, endTagIndex + 1);
                        i = endTagIndex + 1;
                    }
                } else {
                    element.innerHTML += currentChar;
                    i++;
                }
                setTimeout(type, 50); // Adjust typing speed here
            }
        }

        type();
    }
});
