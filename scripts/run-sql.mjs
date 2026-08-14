import { execSync } from "node:child_process";
import fs from "node:fs";

const sql = fs.readFileSync("scripts/storage-policies.sql", "utf-8");
const statements = sql
  .split(";")
  .map((s) => s.trim())
  .filter((s) => s.length > 0 && !s.startsWith("--"));

for (const stmt of statements) {
  try {
    console.log(`Running: ${stmt.slice(0, 60)}...`);
    const cleanStmt = stmt.replace(/\r?\n/g, " ");
    const out = execSync(`insforge db query "${cleanStmt.replace(/"/g, '\\"')}"`, {
      encoding: "utf-8",
    });
    console.log("Output:", out.trim());
  } catch (err) {
    console.error("Error executing:", err.message || err);
  }
}
