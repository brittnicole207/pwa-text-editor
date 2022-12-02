const butInstall = document.getElementById("buttonInstall");

// Logic for installing the PWA
window.addEventListener("beforeinstallprompt", (event) => {
  console.log("hit");
  console.log("event" + event);
  event.preventDefault();
  //Store the triggered events
  window.deferredPrompt = event;

  //Remove the hidden class from the button.
  butInstall.classList.toggle("hidden", false);
});

butInstall.addEventListener("click", async () => {
  const promptEvent = window.deferredPrompt;
  if (!promptEvent) {
    return;
  }

  //Show the prompt
  promptEvent.prompt();

  window.defferedPrompt = null;

  butInstall.classList.toggle("hidden", true);
});

window.addEventListener("appinstalled", (event) => {
  //Clears prompt
  console.log("install hit");
  window.deferredPrompt = null;
});
