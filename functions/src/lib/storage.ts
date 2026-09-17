import { BlobServiceClient } from '@azure/storage-blob'
import { emptySermonsData, type SermonsData } from './types'

const CONTAINER_NAME = 'sermons-cache'
const BLOB_NAME = 'latest.json'

// Reuses the storage account every Function App already has for its own
// runtime (AzureWebJobsStorage) — no second storage account needed just to
// cache ~a few KB of JSON.
function getContainerClient() {
  const connectionString = process.env.AzureWebJobsStorage
  if (!connectionString) {
    throw new Error('AzureWebJobsStorage is not set — required to read/write the sermons cache.')
  }
  const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString)
  return blobServiceClient.getContainerClient(CONTAINER_NAME)
}

export async function writeSermonsCache(data: SermonsData): Promise<void> {
  const container = getContainerClient()
  await container.createIfNotExists()
  const blockBlobClient = container.getBlockBlobClient(BLOB_NAME)
  const content = JSON.stringify(data)
  await blockBlobClient.upload(content, Buffer.byteLength(content), {
    blobHTTPHeaders: { blobContentType: 'application/json' },
  })
}

export async function readSermonsCache(): Promise<SermonsData | null> {
  const container = getContainerClient()
  const blockBlobClient = container.getBlockBlobClient(BLOB_NAME)
  const exists = await blockBlobClient.exists()
  if (!exists) return null

  const downloaded = await blockBlobClient.downloadToBuffer()
  return JSON.parse(downloaded.toString('utf-8')) as SermonsData
}

/**
 * Reads the current cache, merges in the given fields, and writes it back —
 * used because two separate timers (live status, playlists) update this
 * same cache on different schedules and must not clobber each other's data.
 */
export async function updateSermonsCache(patch: Partial<SermonsData>): Promise<void> {
  const current = (await readSermonsCache()) ?? emptySermonsData
  await writeSermonsCache({ ...current, ...patch, updatedAt: new Date().toISOString() })
}
