#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";

const REQUIRED_PACKAGE_SCRIPTS = [
  "build",
  "typecheck",
  "lint",
  "lint:fast",
  "knip",
  "test",
  "format:check",
  "verify:fast",
  "verify:full",
];

function parseArgs(argv) {
  return {
    command: argv.find((arg) => !arg.startsWith("-")) ?? "doctor",
    json: argv.includes("--json"),
    strict: argv.includes("--strict"),
  };
}

function resolveExecutable(command) {
  if (process.platform !== "win32") {
    return command;
  }

  const result = spawnSync("where.exe", [command], {
    encoding: "utf8",
    windowsHide: true,
  });
  const matches = result.stdout?.split(/\r?\n/).filter(Boolean) ?? [];
  const firstMatch =
    matches.find((match) => /\.(?:cmd|exe|bat)$/i.test(match)) ?? matches[0];

  return firstMatch ?? command;
}

function run(command, args) {
  const executable = resolveExecutable(command);
  const runArgs = [...args];

  if (process.platform === "win32" && command === "pnpm") {
    const pnpmScript = join(
      dirname(executable),
      "node_modules",
      "corepack",
      "dist",
      "pnpm.js",
    );
    if (existsSync(pnpmScript)) {
      runArgs.unshift(pnpmScript);
    }
  }

  const result = spawnSync(
    command === "pnpm" ? resolveExecutable("node") : executable,
    runArgs,
    {
      encoding: "utf8",
      windowsHide: true,
    },
  );

  const output = `${result.stdout ?? ""}${result.stderr ?? ""}`.trim();
  return {
    command: [command, ...args].join(" "),
    ok: result.status === 0,
    status: result.status,
    output,
  };
}

async function readPackageJson() {
  const packageJson = await import("../package.json", {
    with: { type: "json" },
  });
  return packageJson.default;
}

function summarizeTool(name, probe) {
  const firstLine = probe.output.split(/\r?\n/).find(Boolean) ?? "";
  return {
    name,
    ok: probe.ok,
    command: probe.command,
    version: firstLine,
  };
}

async function doctor({ json, strict }) {
  const packageJson = await readPackageJson();
  const scripts = packageJson.scripts ?? {};

  const tools = [
    summarizeTool("node", run("node", ["--version"])),
    summarizeTool("pnpm", run("pnpm", ["--version"])),
    summarizeTool("rg", run("rg", ["--version"])),
  ];

  const packageScripts = REQUIRED_PACKAGE_SCRIPTS.map((name) => ({
    name,
    ok: typeof scripts[name] === "string" && scripts[name].length > 0,
  }));

  const checks = [
    ...tools.map((tool) => ({ name: `tool:${tool.name}`, ok: tool.ok })),
    ...packageScripts.map((script) => ({
      name: `script:${script.name}`,
      ok: script.ok,
    })),
    {
      name: "packageManager:pnpm",
      ok: packageJson.packageManager?.startsWith("pnpm@") ?? false,
    },
  ];

  const ok = checks.every((check) => check.ok);
  const report = {
    ok,
    strict,
    tools,
    packageScripts,
    packageManager: packageJson.packageManager,
  };

  if (json) {
    console.log(JSON.stringify(report, null, 2));
  } else {
    console.log(`Martindale tooling doctor: ${ok ? "ok" : "failed"}`);
    for (const tool of tools) {
      console.log(`- ${tool.name}: ${tool.ok ? tool.version : "missing"}`);
    }
    for (const script of packageScripts) {
      console.log(`- script ${script.name}: ${script.ok ? "ok" : "missing"}`);
    }
    console.log(`- packageManager: ${packageJson.packageManager ?? "missing"}`);
  }

  if (!ok && strict) {
    process.exitCode = 1;
  }
}

const options = parseArgs(process.argv.slice(2));

if (options.command !== "doctor") {
  console.error(`Unknown tools command: ${options.command}`);
  process.exit(1);
}

await doctor(options);
