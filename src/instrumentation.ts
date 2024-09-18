import { revalidatePath } from "next/cache";
import { poorMansCron } from "./utils/Cron";

export function register() {
  if (process.env.NODE_ENV === "production") {
    runOnMonday();
  }
}

function runOnMonday() {
  const now = new Date();
  const nextMonday = new Date(now);
  const dayOfWeek = nextMonday.getDay();

  const daysUntilNextMonday = (1 + 7 - dayOfWeek) % 7 || 7;
  nextMonday.setDate(now.getDate() + daysUntilNextMonday);
  nextMonday.setHours(5, 0, 0, 0);

  poorMansCron(nextMonday.getTime(), 7 * 24 * 60 * 60 * 1000, revalidateMusic);
}

function revalidateMusic() {
  console.log("Music revalidation started");
  revalidatePath("/music");
  fetch("http://localhost:3000/music"); // actually generate the site
}
