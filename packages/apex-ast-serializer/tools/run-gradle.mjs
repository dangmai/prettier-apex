#!/usr/bin/env zx
import { $, usePowerShell } from "zx";
$.verbose = false;

// This script runs Gradle with the given arguments in a cross-platform way.
// It's meant to be called from nx run-commands.

let command = "./gradlew";

if (process.platform === "win32") {
  usePowerShell();
  $.prefix = "";
  command += ".bat";
}
const args = process.argv.slice(2);
await $`${command} ${args}`.pipe(process.stdout);
