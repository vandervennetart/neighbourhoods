async function loadApp() {
    // vervang ./app.js door je eigen startup file
    // kijk naar je start commando
    await import("./server.js");
}

loadApp();
