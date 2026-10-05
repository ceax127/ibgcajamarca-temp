import { BlobServiceClient } from '@azure/storage-blob'

export interface EventFlyer {
  id: string
  title: string
  link: string
  // Free text shown next to the image on the homepage. Optional so flyers
  // created before this field existed keep working.
  details?: string
  // Inclusive, "YYYY-MM-DD", compared against the current date in Lima.
  startDate: string
  endDate: string
  createdAt: string
  // Changes whenever the flyer is edited; used to bust the browser cache of
  // the (otherwise long-cached) image URL.
  updatedAt?: string
}

const CONTAINER_NAME = 'event-flyers'
const INDEX_BLOB = 'events.json'

function getContainerClient() {
  const connectionString = process.env.AzureWebJobsStorage
  if (!connectionString) {
    throw new Error('AzureWebJobsStorage is not set — required to store event flyers.')
  }
  return BlobServiceClient.fromConnectionString(connectionString).getContainerClient(CONTAINER_NAME)
}

export async function readFlyers(): Promise<EventFlyer[]> {
  const container = getContainerClient()
  const blob = container.getBlockBlobClient(INDEX_BLOB)
  if (!(await blob.exists())) return []
  const buffer = await blob.downloadToBuffer()
  return JSON.parse(buffer.toString('utf-8')) as EventFlyer[]
}

async function writeFlyers(flyers: EventFlyer[]): Promise<void> {
  const container = getContainerClient()
  await container.createIfNotExists()
  const content = JSON.stringify(flyers)
  await container.getBlockBlobClient(INDEX_BLOB).upload(content, Buffer.byteLength(content), {
    blobHTTPHeaders: { blobContentType: 'application/json' },
  })
}

export async function addFlyer(flyer: EventFlyer, image: Buffer): Promise<void> {
  const container = getContainerClient()
  await container.createIfNotExists()
  await container.getBlockBlobClient(`${flyer.id}.jpg`).upload(image, image.length, {
    blobHTTPHeaders: { blobContentType: 'image/jpeg' },
  })
  const flyers = await readFlyers()
  await writeFlyers([...flyers, flyer])
}

/** Applies edits to an existing flyer; returns null if it doesn't exist. */
export async function updateFlyer(
  id: string,
  fields: Pick<EventFlyer, 'title' | 'link' | 'details' | 'startDate' | 'endDate'>,
  image: Buffer | null,
): Promise<EventFlyer | null> {
  const flyers = await readFlyers()
  const existing = flyers.find((f) => f.id === id)
  if (!existing) return null

  if (image) {
    await getContainerClient().getBlockBlobClient(`${id}.jpg`).upload(image, image.length, {
      blobHTTPHeaders: { blobContentType: 'image/jpeg' },
    })
  }
  const updated: EventFlyer = { ...existing, ...fields, updatedAt: new Date().toISOString() }
  await writeFlyers(flyers.map((f) => (f.id === id ? updated : f)))
  return updated
}

export async function removeFlyer(id: string): Promise<boolean> {
  const flyers = await readFlyers()
  if (!flyers.some((f) => f.id === id)) return false
  await writeFlyers(flyers.filter((f) => f.id !== id))
  await getContainerClient().getBlockBlobClient(`${id}.jpg`).deleteIfExists()
  return true
}

export async function readFlyerImage(id: string): Promise<Buffer | null> {
  const blob = getContainerClient().getBlockBlobClient(`${id}.jpg`)
  if (!(await blob.exists())) return null
  return blob.downloadToBuffer()
}

// Cajamarca is UTC-5 year-round (see schedule.ts), so "today" for the
// start/end dates is the Lima calendar date, not the server's UTC date.
export function todayInLima(now: Date = new Date()): string {
  return new Date(now.getTime() - 5 * 60 * 60 * 1000).toISOString().slice(0, 10)
}

export function isActive(flyer: EventFlyer, today: string = todayInLima()): boolean {
  return flyer.startDate <= today && today <= flyer.endDate
}
