export default function ContributionCalendarSkeleton() {
    return (
        <div>
            <div
                className={
                    "grid grid-cols-[auto_1fr] grid-rows-[auto_1fr] gap-2 overflow-x-scroll md:overflow-visible animate-pulse"
                }
            >
                <div />
                <div className={"flex justify-evenly"}>
                    {[...Array(12)].map((_, index) => (
                        <div key={index} className={"text-xs text-secondaryText"}>
                            {new Date(`1980.${index + 1}.01`).toLocaleString("default", {
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
                    {[...Array(365)].map((_, i) => (
                        <div
                            key={i}
                            className={"aspect-square size-full rounded-sm bg-accentbackground"}
                        />
                    ))}
                </div>
            </div>
            <div
                className={
                    "flex items-center justify-between pt-2 text-sm text-secondaryText"
                }
            >
                <div>{100} contributions in the last year</div>
                <div className={"flex items-center gap-1"}>
                    <span>Less</span>
                    {[0, 25, 50, 75, 100].map((percent) => (
                        <div
                            key={percent}
                            className={"aspect-square size-3 rounded-sm"}
                            style={{
                                backgroundColor: `color-mix(in hsl, rgb(var(--accentbackground)), rgb(var(--highlight)) ${percent}%)`,
                            }}
                        />
                    ))}
                    <span>More</span>
                </div>
            </div>
        </div>
    );
}