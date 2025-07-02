document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ app.js loaded and DOM ready!");

  const startBtn = document.getElementById("start-btn");
  const stopBtn = document.getElementById("stop-btn");

  console.log("✅ Start button found:", startBtn);
  console.log("✅ Stop button found:", stopBtn);

  if (startBtn) {
    startBtn.addEventListener("click", () => {
      console.log("🎉 START BUTTON CLICKED!");
      alert("Start button is working!");
    });
  } else {
    console.log("⚠️ startBtn is null!");
  }

  if (stopBtn) {
    stopBtn.addEventListener("click", () => {
      console.log("🛑 STOP BUTTON CLICKED!");
      alert("Stop button is working!");
    });
  } else {
    console.log("⚠️ stopBtn is null!");
  }
});
