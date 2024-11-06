import cron from "node-cron";

export function register() {
   if (process.env.NODE_ENV === "production") {
    cron.schedule("0 5 * * 1", revalidateMusic);
 }
}

function revalidateMusic() {
  console.log("Music revalidation started");
  fetch("http://localhost:3000/revalidate?type=music").then(() => {
    fetch("http://localhost:3000/music");
  });
}
