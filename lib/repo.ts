/**
 * Exports whichever Repo implementation is appropriate at runtime.
 */

import type { Repo } from "./types";
import pgRepo from "./postgresRepo";
import memoryRepo from "./memoryRepo";

const repo: Repo = process.env.DATABASE_URL ? pgRepo : memoryRepo;

export default repo;
