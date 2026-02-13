
function getProblemText() {
    const description = document.querySelector('[data-track-load="description_content"]');
    if (description) return description.innerText.slice(0, 5000);
    return document.body.innerText.slice(0, 5000);
}

async function callBackend(payload) {
    try {
        const response = await fetch("http://localhost:5000/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });
        const data = await response.json();

        if (typeof data === "string") return data;
        if (data.result) return data.result;
        return JSON.stringify(data); 

    } catch (err) {
        console.error("Backend fetch error:", err);
        return "Error generating response.";
    }
}

async function getHintByLevel(problemText, level) {
    const levels = {
        1: "Give a subtle hint, slightly challenging.",
        2: "Give a clearer hint, easier than Hint 1.",
        3: "Give a full hint, almost a complete solution."
    };
    const hintPrompt = levels[level] || levels[1];

    return await callBackend({ problem: problemText, step: "hint", level, hintPrompt });
}

function addFloatingHintButton() {
    if (document.getElementById("cpHintFloatingBtn")) return;

    const container = document.createElement("div");
    container.id = "cpHintFloatingBtn";
    container.style.position = "fixed";
    container.style.bottom = "20px";
    container.style.right = "20px";
    container.style.width = "220px";
    container.style.backgroundColor = "#2e7d32";
    container.style.color = "#fff";
    container.style.borderRadius = "8px";
    container.style.padding = "10px";
    container.style.zIndex = "9999";
    container.style.boxShadow = "0px 2px 10px rgba(0,0,0,0.3)";
    container.style.fontFamily = "Arial, sans-serif";

    container.innerHTML = `
        <div style="text-align:center; font-weight:bold; margin-bottom:5px;">CP Hint</div>
        <select id="cpHintLang" style="width:100%; margin-bottom:5px; padding:3px;">
            <option value="python">Python</option>
            <option value="cpp">C++</option>
            <option value="java">Java</option>
        </select>
        <button id="hint1Btn" style="width:100%; margin-bottom:3px;">Hint 1</button>
        <button id="hint2Btn" style="width:100%; margin-bottom:3px;">Hint 2</button>
        <button id="hint3Btn" style="width:100%; margin-bottom:3px;">Hint 3</button>
        <button id="getCodeBtn" style="width:100%; padding:5px;">Get Code</button>
        <pre id="cpHintOutput" style="max-height:250px; overflow-y:auto; background:#fff; color:#000; padding:5px; border-radius:4px; margin-top:5px; white-space:pre-wrap;"></pre>
    `;

    document.body.appendChild(container);
    const output = document.getElementById("cpHintOutput");
    const problemText = getProblemText();

    document.getElementById("hint1Btn").addEventListener("click", async () => {
        if (!problemText) { output.innerText = "Problem not detected."; return; }
        output.innerText = "Generating Hint 1...";
        output.innerText = await getHintByLevel(problemText, 1);
    });
    document.getElementById("hint2Btn").addEventListener("click", async () => {
        if (!problemText) { output.innerText = "Problem not detected."; return; }
        output.innerText = "Generating Hint 2...";
        output.innerText = await getHintByLevel(problemText, 2);
    });
    document.getElementById("hint3Btn").addEventListener("click", async () => {
        if (!problemText) { output.innerText = "Problem not detected."; return; }
        output.innerText = "Generating Hint 3...";
        output.innerText = await getHintByLevel(problemText, 3);
    });

    document.getElementById("getCodeBtn").addEventListener("click", async () => {
        if (!problemText) { output.innerText = "Problem not detected."; return; }
        const language = document.getElementById("cpHintLang").value;
        output.innerText = "Generating code...";
        const result = await callBackend({ problem: problemText, step: "code", language });
        output.innerText = typeof result === "string" ? result : JSON.stringify(result, null, 2);
    });
}

window.addEventListener("load", () => {
    setTimeout(addFloatingHintButton, 1500);
});
