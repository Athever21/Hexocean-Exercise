import express, { Response } from "express";
import path from "path";
import { promises as fs } from "fs";

import template from "./template";

const app = express();

const cwd = process.cwd();
let src = '<script src="/build/dist.js"></script>';

if (process.env.NODE_ENV === "production") {
  src = "";
  (async () => {
    const dir = await fs.readdir(path.join(cwd, "build"));
    for (const filename of dir) {
      if (filename.includes("dist") && !filename.includes(".txt")) {
        src += `\n\t<script src="/build/${filename}"></script>`;
      }
    }
  })();
} else {
  require("./devBundle").default(app);
}

app.use("/build/", express.static(path.join(cwd, "build")));
app.get("*", (_, res: Response) => {
  return res.send(template(src));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening at PORT ${PORT}`));
