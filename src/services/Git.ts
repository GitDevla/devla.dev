import { exec } from "child_process";

export interface GitHistory {
  date: string;
  changes: string[];
  deletions: string[];
  additions: string[];
}

export async function getHistory(filenamePath: String): Promise<GitHistory[]> {
  return new Promise((resolve) => {
    exec(
      `git log --pretty=format:'%ad' --date=short -p --word-diff -- ${filenamePath}`,
      {
        cwd: process.env.STATIC_PATH + "/blogs/",
      },
      function (error, stdout, _) {
        if (error) {
          console.log(`error: ${error.message}`);
          return;
        }
        let changeDetectionRegex = new RegExp(
          "(diff|---|\\+\\+\\+|@@|diff|index|new file mode).*",
          "gm",
        );
        let filtered = stdout.replace(changeDetectionRegex, "");
        const addedRegex = /{\+.*\+}/;
        const deletedRegex = /\[-.*-\]/;
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/g;

        let changesPerDate = [] as GitHistory[];

        let current: GitHistory = {
          date: "",
          changes: [],
          deletions: [],
          additions: [],
        };

        for (let i of filtered.split("\n")) {
          if (i === "") continue;
          if (dateRegex.test(i)) {
            if (current.date !== i.replace(/'/g, "")) {
              if (current.date !== "") changesPerDate.push(current);
              current = {
                date: i.replace(/'/g, ""),
                changes: [],
                deletions: [],
                additions: [],
              };
            }
          } else {
            if (addedRegex.test(i) && deletedRegex.test(i)) {
              let temp = i.replace("{+", "(").replace("+}", ")");
              temp = temp.replace("[-", "(").replace("-]", ") => ");
              current.changes.push(temp);
            } else if (addedRegex.test(i)) {
              let temp = i.replace("{+", "").replace("+}", "");
              current.additions.push(temp);
            } else if (deletedRegex.test(i)) {
              let temp = i.replace("[-", "").replace("-]", "");
              current.deletions.push(temp);
            }
          }
        }
        if (current.date !== "") changesPerDate.push(current);
        if (changesPerDate.length > 0) changesPerDate.pop(); // hide initial commit
        resolve(changesPerDate);
      },
    );
  });
}
