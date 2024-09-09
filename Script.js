document.getElementById("toggleImage").addEventListener("click", function() {
    var block = document.getElementById("box");
    if (block.style.display === "block") {
        block.style.display = "none";
    } else {
        block.style.display = "block";
    }
});

const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const submitBtn = document.getElementById('send');
const refreshBtn = document.getElementById('refBtn');

const flowChart = {
    start: {
        message: ["Please select an option..What are you looking for?"],
        options: {
            1: "Colleges",
            2: "Schools",
            3: "Hospitals",
            0: "Back",
            4:"help",
            5: "link",
            10:"test"
        }
    },
    test: {
        message: [" do you like to check?"],
        options: {
            1: "yes",
            2: "no",
            3: "e",
            0: "Back"
        }
    },
    Colleges: {
        message: ["Which would you like to check?"],
        options: {
            1: "Govt",
            2: "Private",
            3: "Aided",
            0: "Back"
        }
    },
    Schools: {
        message: ["Which would you like to check?"],
        options: {
            1: "Kannada Medium",
            2: "English Medium",
            3: "Urdu Medium",
            0: "Back"
        }
    },
    Hospitals: {
        message: ["Which would you like to check?"],
        options: {
            1: "Goverment",
            2: "Private",
            0: "Back"
        }
    },
    Govt: {
        message: "For which course",
        options: {
            1: "Science",
            2: "Commerce",
            3: "Arts",
            0: "Back"
        }
    },
    link:{
        message: "You can visit this",
        options: {
            more: "https://en.wikipedia.org/wiki/Nature"
        }
    },
    Private: {
        message: "For which course",
        options: {
            1: "Science",
            2: "Commerce",
            3: "Arts",
            0: "Back"
        }
    },
    Science: {
        message: "Here are some colleges",
        options: {
            1: "Gss college",
            2: "Kle college",
            3: "Saraswati",
            4: "Jain",
            5: "Kls",
            0: "Back"
        }
    },
    KannadaMedium: {
        message: "Here you go",
        options: {
            1: "School no 1",
            2: "School no 2",
            3: "Vidya niketana",
            4: "Jain kannada",
            5: "Kls kannada ",
            0: "Back",
            6 : "Thank you here ends my Service"
        }
    },
    help: {
        message: "How can we assist you?\n1. Reset Password\n2. Contact Support",
        options: {
            1: "resetPassword",
            2: "contactSupport",
            0: "Back"
        }
    },
    Goverment: {
        message: "These may help you.",
        options: {
            1: "Civil hospital",
            2: "Vadagaon hospital",
            4: "Mahantesh nagar hospital",
            0:"Back"
        }
    },
    contactSupport: {
        message: "You can reach us at 1-800-123-4567.",
        options: {}
    }

};

let parent = flowChart.start;
const history = [];

function displayMessage(message, options) {
    const messageElement = document.createElement('p');
    messageElement.textContent = message;
    messageElement.classList.add('chatbot-msg');
    chatBox.appendChild(messageElement);

    for (const key in options) {
        if (options.hasOwnProperty(key)) {
            const optionElement = document.createElement('div');
            optionElement.textContent = `${key}: ${options[key]}`;
            optionElement.classList.add('opts');
            optionElement.setAttribute("data-key", key);
            optionElement.addEventListener('click', handleOptionClick);
            chatBox.appendChild(optionElement);
        }
    }

    chatBox.scrollTop = chatBox.scrollHeight;
    requestAnimationFrame(() => {
        chatBox.scrollTop = chatBox.scrollHeight;
    });
}

function handleOptionClick(event) {
    const key = event.target.getAttribute("data-key"); 
    userInput.value = key;
    startChat();
}

userInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        startChat();
    }
});

submitBtn.addEventListener('click', function () {
    startChat();
});

refreshBtn.addEventListener('click', function() {
    chatBox.innerHTML = '';
    parent = flowChart.start;
    history.length = 0;
    displayMessage(parent.message, parent.options);
});

function startChat() {
    const input = userInput.value.trim();
    if (input === '') {
        alert("Please enter a valid option.");
        return;
    }
    

    if (input === "0") {
        if (history.length > 0) {
            parent = history.pop();
            displayMsg("Back");
            displayMessage(parent.message, parent.options);
        } else {
            alert("You are at the start. No previous options available.");
        }
    } else {
        if (parent && parent.options) {
            const children = parent.options ? parent.options[input] : "";
            if (children) {
                history.push(parent);
                parent = flowChart[children];
                displayMsg(input);
                // displayMessage(parent.message, parent.options);
                if (parent.message) {
                    displayMessage(parent.message, parent.options);
                }
                 else {
                    // displayMessage("No more options available.", null);
                    endChat();
                }
                
            }
            
        } else {
            displayMsg(input);
            const err = document.createElement('p');
            err.textContent = "Please enter a valid option.";
            err.classList.add('chatbot-msg');
            chatBox.appendChild(err);
            chatBox.scrollTop = chatBox.scrollHeight;
        }
    }

    userInput.value = '';
}

function displayMsg(ip) {
    const ele = document.createElement('p');
    ele.textContent = ip;
    ele.classList.add('user-msg');
    chatBox.appendChild(ele);
    requestAnimationFrame(() => {
        chatBox.scrollTop = chatBox.scrollHeight;
    });
}

function endChat() {
    const endMessage = document.createElement('p');
    endMessage.textContent = "Thank you for using our service.";
    endMessage.classList.add('chatbot-msg');
    chatBox.appendChild(endMessage);
    chatBox.scrollTop = chatBox.scrollHeight;
    userInput.disabled = true;
    
}

displayMessage(parent.message, parent.options);
