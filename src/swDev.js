export default function swDev() {
  let swUrl = `${process.env.PUBLIC_URL}/serviceWorker.js`;
  navigator.serviceWorker.register(swUrl).then((response) => {
    console.warn("response", response);
    navigator.serviceWorker.ready.then(function (swRegistration) {
      console.log("Sync Registered");
      return swRegistration.sync.register("myFirstSync");
    });
  });
}
