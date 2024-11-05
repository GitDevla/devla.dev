import { pullGithubContributions } from "@/services/Github";
import Hover from "./Hover";

export default async function ContributionCalendar() {
  let githubContributions = await pullGithubContributions();

  // Start from the first Sunday
  while (true) {
    let current = githubContributions[0].date;
    let date = new Date(current);
    if (date.getDay() == 0) {
      //Sunday
      break;
    } else {
      githubContributions.shift();
    }
  }

  const highestCount = Math.max(
    ...githubContributions.map((day: any) => day.contributionCount),
  );
  const totalContributions = githubContributions.reduce(
    (acc: number, day: any) => acc + day.contributionCount,
    0,
  );

  return (
    <div>
      <div
        className={
          "grid grid-cols-[auto_1fr] grid-rows-[auto_1fr] gap-2 overflow-x-scroll md:overflow-visible"
        }
      >
        <div></div>
        <div className={"flex justify-evenly"}>
          {githubContributions
            .filter((d: any) => d.date.split("-")[2] == "01")
            .map((day: any, index: any) => (
              <div key={index} className={"text-xs text-secondaryText"}>
                {new Date(day.date).toLocaleString("default", {
                  month: "short",
                })}
              </div>
            ))}
        </div>
        <div
          className={"flex flex-col justify-evenly text-sm text-secondaryText"}
        >
          <span>Mon</span>
          <span>Wed</span>
          <span>Fri</span>
        </div>
        <div className={"grid w-full grid-flow-col grid-rows-7 gap-1"}>
          {githubContributions.map((day: any, index: any) => (
            <div
              key={index}
              className={"aspect-square size-full rounded-sm"}
              style={{
                backgroundColor: `color-mix(in hsl, rgb(var(--accentbackground)), rgb(var(--highlight)) ${(day.contributionCount / highestCount) * 100}%)`,
              }}
            >
              <Hover
                className={"!block size-full"}
                hoverText={`${day.contributionCount == 0 ? "No" : day.contributionCount} contributions on ${day.date}`}
              >
                <div className={"size-full"}></div>
              </Hover>
            </div>
          ))}
        </div>
      </div>
      <div
        className={
          "flex items-center justify-between pt-2 text-sm text-secondaryText"
        }
      >
        <div>{totalContributions} contributions in the last year</div>
        <div className={"flex items-center gap-1"}>
          <span>Less</span>
          {[0, 25, 50, 75, 100].map((percent) => (
            <div
              key={percent}
              className={"aspect-square size-3 rounded-sm"}
              style={{
                backgroundColor: `color-mix(in hsl, rgb(var(--accentbackground)), rgb(var(--highlight)) ${percent}%)`,
              }}
            ></div>
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
