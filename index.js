let zIndexCounter = 1;

//for time

setInterval(() => {
    const now = new Date();
    document.getElementById("time").innerText = now.toLocaleTimeString();
}, 1000);

// Open App
function openApp(id) {
    const app = document.getElementById(id);
    app.style.display = "block";
    app.style.zIndex = ++zIndexCounter;

    // Load saved notes
    if (id === "notes") {
        document.getElementById("notesContent").value = localStorage.getItem("notes")  ;
    }

    // Calculator loadV
    
    if (id === "calculator") {
        document.getElementById("box").value = localStorage.getItem("calc")  ;
    }
}


// Close App
function closeApp(id) {
    document.getElementById(id).style.display = "none";
}

// Save notes in localStorage
document.getElementById("notesContent").addEventListener("input", function () {
    localStorage.setItem("notes", this.value);
});

const box = document.getElementById("box");

// Calculator logic
// put value
function press(val) {
  box.value += val;
  localStorage.setItem("calc", box.value);
}
// for  calculation
function calculate() {
  try {
    box.value = eval(box.value); // result निकालो
    localStorage.setItem("calc", box.value);
  } catch {
    box.value = "Error"; // गलत expression हो तो error दिखाओ
  }
}

// C press = clear
function clearBox() {
  box.value = "";
  localStorage.setItem("calc", "");
}

// Dragging logic
document.querySelectorAll(".window").forEach(win => {
    const titlebar = win.querySelector(".titlebar");
    let isDragging = false, offsetX, offsetY;

    titlebar.addEventListener("mousedown", (e) => {
        isDragging = true;
        offsetX = e.clientX - win.offsetLeft;
        offsetY = e.clientY - win.offsetTop;
        win.style.zIndex = ++zIndexCounter;
    });

    document.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        win.style.left = e.clientX - offsetX + "px";
        win.style.top = e.clientY - offsetY + "px";
    });

    document.addEventListener("mouseup", () => isDragging = false);
});

function toggleApp(id) {
  const app = document.getElementById(id);
  const dot = document.getElementById("dot-" + id);

  if (app.style.display === "block") {
    app.style.display = "none";
    dot.style.display = "none"; // red dot chhupao
  } else {
    app.style.display = "block";
    app.style.zIndex = ++zIndexCounter;
    dot.style.display = "block"; // red dot dikhao
  }
}

// for dot process- Function to open app
function openApp(appId) {
  const app = document.getElementById(appId);
  const btn = document.querySelector(`#bar button[onclick="openApp('${appId}')"]`);

  app.style.display = "block";          // show window
  btn.classList.add("active");          // add active dot
}

// Function to close app
function closeApp(appId) {
  const app = document.getElementById(appId);
  const btn = document.querySelector(`#bar button[onclick="openApp('${appId}')"]`);

  app.style.display = "none";           // hide window
  btn.classList.remove("active");       // remove dot
}

 