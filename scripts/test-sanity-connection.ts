import * as dotenv from "dotenv"
dotenv.config()

import { createClient } from "next-sanity"
import fs from "fs"
import path from "path"

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "gnfni9vb"
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-03-01"
const token = process.env.SANITY_API_WRITE_TOKEN 
 

if (!token) {
  console.error("Missing SANITY_API_WRITE_TOKEN in environment")
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,
})

async function testConnection() {
  console.log("Testing Sanity connection with write token...")
  const result = await client.fetch(`*[_type == "post"][0...3]._id`)
  console.log("Current post IDs in dataset:", result)
}

testConnection().catch(console.error)
