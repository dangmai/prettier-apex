#!/usr/bin/env -S tsx

import { fs } from "zx";
import {
  NATIVE_EXECUTABLE_NAME,
  NATIVE_PACKAGES,
} from "../packages/prettier-plugin-apex/src/util.js"; // eslint-disable-line import/no-unresolved

await fs.copyFile(
  `packages/apex-ast-serializer/parser/build/native/nativeCompile/apex-ast-serializer${process.platform === "win32" ? ".exe" : ""}`,
  `packages/${NATIVE_PACKAGES[`${process.platform}-${process.arch}`]}/${NATIVE_EXECUTABLE_NAME}`,
);
