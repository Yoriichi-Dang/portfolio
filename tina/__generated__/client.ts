import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: 'b35685ce26c85a8cd9c937eb788299e3f169e8fe', queries,  });
export default client;
  