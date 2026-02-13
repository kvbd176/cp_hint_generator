const output = document.getElementById("output");

document.getElementById("getHint").addEventListener("click", async () => {
    output.innerText = "Generating hint...";

    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.tabs.sendMessage(tab.id, { action: "getHint" }, (response) => {
        if (chrome.runtime.lastError) {
            output.innerText = "Open a supported CP problem page.";
            return;
        }
        output.innerText = response.result;
    });
});

document.getElementById("getCode").addEventListener("click", async () => {
    output.innerText = "Generating code...";

    const language = document.getElementById("language").value;
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.tabs.sendMessage(tab.id, { action: "getCode", language: language }, (response) => {
        if (chrome.runtime.lastError) {
            output.innerText = "Open a supported CP problem page.";
            return;
        }
        output.innerText = response.result;
    });
});
