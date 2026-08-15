import { spawnSync } from "node:child_process";
import fs from "node:fs";

const sql = fs.readFileSync("scripts/storage-policies.sql", "utf-8");
const statements = sql
  .split(";")
  .map((s) => s.trim())
  .filter((s) => s.length > 0 && !s.startsWith("--"));

for (const stmt of statements) {
  try {
    console.log(`Running: ${stmt.slice(0, 60)}...`);
    const res = spawnSync("cmd.exe", ["/c", "npx", "insforge", "db", "query", `"${stmt.replace(/"/g, '""')}"`], {
      encoding: "utf-8",
      windowsVerbatimArguments: true,
    });
    if (res.error) console.error("Spawn error:", res.error);
    if (res.stdout) console.log("Output:", res.stdout.trim());
    if (res.stderr) console.log("Stderr:", res.stderr.trim());
  } catch (err) {
    console.error("Error executing:", err.message || err);
  }
}


