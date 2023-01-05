window.addEventListener("pageshow", (event) => {
  if (event.persisted) {
    console.log(event.target.title, "=> bfcache");
  } else {
    console.log(event.target.title, "=> ordinary");
  }
});
