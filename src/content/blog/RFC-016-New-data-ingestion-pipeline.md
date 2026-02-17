---
title: '[RFC-016] New data ingestion pipeline'
description: New data ingestion pipeline
pubDate: 2026-02-17T14:32:58.766Z
updatedDate: 2026-02-18T14:33:12.990Z
heroImage: /uploads/editor_design.png
---

| Authors | @Hoai Tran        |
| ------- | ----------------- |
| Status  | DONE              |
| Slack   | *#prj-layerproof* |
| Date    | January 26, 2026  |

## **High-Level Architecture Changes**

### **Old System**

**Component:** `module-document-ingestion`

**Architecture:** Linear document processing pipeline

```
Upload → Parse → Chunk → Embed → Store (document_chunks)
```

**Capabilities:**

* Text-only storage in `document_chunks` table
* Flat document structure (no hierarchy)
* Sequential processing (single-threaded)
* PDF/DOCX support only
* Basic semantic search

**Limitations:**

* No image/video/audio support
* No document structure (TOC, headings)
* No web search integration
* No URL-based ingestion
* Monolithic ingestion workflow

***

### **New System**

**Component:** `module-agent-memory`

**Architecture:** Fan-out agent memory with hierarchical structure

```
Upload → Slice → Fan-out Processing → Build Structure → Vector Index
                ↓
            └→ Media Files (videos, images, URLs)
```

**Capabilities:**

* Multi-modal storage (TEXT, VISUAL\_DESCRIPTION, TRANSCRIPT)
* Hierarchical document structure with depth tracking
* Parallel shard processing (concurrent fan-out)
* Support for PDF, DOCX, Images, Videos, URLs, Audio, Web Search
* Enhanced semantic search with structure navigation
* Reducto webhook integration for async processing

**Advantages:**

* **Multi-modal search**: Query returns text, images, and transcripts together
* **Hierarchical navigation**: TOC-based content exploration
* **Scalable**: Concurrent shard processing
* **Extensible**: Modular slicers for different media types
* **Rich metadata**: Bounding boxes, time ranges, section anchors

### **1. Database Schema**

| Old Tables           | New Tables                       | Purpose                    |
| -------------------- | -------------------------------- | -------------------------- |
| `document_sources`   | `media_sources`                  | Source metadata            |
| `document_chunks`    | `memory_chunks` + `media_shards` | Content storage            |
| `in_progress_chunks` | `in_progress_memory_chunks`      | Staging during ingestion   |
| None                 | `structure_nodes`                | Document hierarchy (TOC)   |
| None                 | `media_files`                    | Store table, figure, video |

### **Workflow Architecture**

### **Old DocumentIngestionWorkflow (master)**

**Flow:**

```kotlin
TriggerDocumentIngestionForFiles
  → DocumentIngestionWorkflow (linear)
    → ParseDocumentActivity
    → ChunkDocumentActivity
    → GenerateEmbeddingsActivity
    → UpdateDocumentSourceStatus
```

**Characteristics:**

* Sequential execution
* Single document type (PDF/DOCX)
* No image/video handling
* Direct embedding generation
* No structure building

### **New MediaIngestionWorkflow (khoa/vibe)**

**Flow:**

```kotlin
TriggerMediaIngestionForFiles
  → MediaIngestionWorkflow (fan-out, async)
    → ValidateSourceActivity
    → SliceIntoShardsActivity (PdfSlicer, VideoSlicer, etc.)
    → Fan-out: ProcessShardActivity (concurrent)
    → BuildStructureIndexActivity (LLM-generated TOC)
    → BackfillNodeIdsActivity (link structure → chunks)
    → CleanupActivity (finalize status)
```

**Characteristics:**

* **Parallel processing**: Shards processed concurrently using latches
* **Async webhooks**: Reducto processing via Svix webhooks
* **Multiple media types**: PDF, DOCX, Images, Videos, URLs, Audio
* **Structure building**: LLM generates TOC/hierarchy
* **Node linking**: Memory chunks linked to structure nodes for navigation

**Key Difference:**

```kotlin
// OLD: Sequential, single-threaded
val chunks = parseDocument(source)
  .let { chunkText(it) }
  .let { generateEmbeddings(it) }
  .chunked(100)
  .forEach { insert(it) }

// NEW: Fan-out, concurrent, async
val shardIds = sliceSource(source)
val latch = createLatch(shardIds.map { shardId ->
  LatchActivityRequest(
    activityName = PROCESS_SHARD,
    input = ProcessShardActivity.Input(sourceId, shardId)
  )
})
val results = latch.await()  // Parallel execution
buildStructureIndex(sourceId)  // LLM-generated hierarchy
backfillNodeIds(sourceId)    // Link structure to chunks
```

### **4. Generation Workflow Impact**

All slide generation workflows now integrate with the new agent memory system:

### **SlideOutlineGenerationWorkflow**

**Before (master):**

```kotlin
DocumentPreparationHelper.prepareDocumentsAsync(
  → TriggerDocumentIngestionForFilesActivity (old system)
)
```

**After (khoa/vibe):**

```kotlin
DocumentPreparationHelper.prepareDocumentsAsync(
  → TriggerMediaIngestionForFilesActivity (new system)
    → MediaIngestionWorkflow (fan-out, async)
)
```

**Impact:**

* Faster document processing (parallel shard processing)
* Better structured content (TOC navigation available)
* Multi-modal support (can retrieve images + text together)

### **SlideImageGenerationWorkflow**

**Changes:**

```kotlin
// NEW: Ingest PDF images into agent memory
val imageIngestionResult = context.run(
  activityName = INGEST_PDF_IMAGES,
  input = IngestPdfImagesActivity.Input(
    sourceId = sourceId,
    projectId = projectId,
    images = extractResult.imageUrls,  // PDF figures/tables
    fileName = fileName
  ),
  clazz = Output::class
).await()

// Images stored as VISUAL_DESCRIPTION modality
// Can be retrieved via semantic search
```

**Impact:**

* PDF figures/tables indexed and searchable
* Image descriptions embedded with content
* Multi-modal retrieval (text + images together)

### **SlideTranscriptGenerationWorkflow**

**Changes:**

```kotlin
// NEW: Use AgentMemorySearchActivity
val retrievedChunks = context.run(
  activityName = RETRIEVE_RELEVANT_DOCUMENT_CHUNKS,
  input = AgentMemorySearchActivity.Input(
    projectId = input.projectId,
    query = section.content,
    topK = 10,
    similarityThreshold = 0.5f
  ),
  clazz = Output::class
).await()

// Search returns ALL modalities (text + visual descriptions)
```

**Impact:**

* Retrieves relevant text chunks
* Retrieves relevant image descriptions
* Multi-modal context for transcript generation

### **Web Search Integration**

**New Components:**

* `GetWebSearchSourcesActivity` - Read web search results
* `DownloadImageFromWebSearchActivity` - Download images to S3
* `ReadWebSearchResultsActivity` - Format web content

**Integration:**

```kotlin
WebSearchHelper.prepareWebSearchContent(
  → ReadWebSearchResultsActivity
)

// Web search content injected into generation prompts
```

### **5. Agent Tools Integration**

### **retrieve\_documents Tool**

**Before:**

```kotlin
RetrieveDocumentsToolExecutor(
  chunkRepository: DocumentChunkRepository,  // Old system
  sourceRepository: DocumentSourceRepository
)

// Search returns: DocumentChunkEntity (text only)
```

**After:**

```kotlin
RetrieveDocumentsToolExecutor(
  memoryChunkRepository: MemoryChunkRepository,  // New system
  mediaSourceRepository: MediaSourceRepository
)

// Search returns: MemoryChunk (multi-modal)
// Modalities: TEXT, VISUAL_DESCRIPTION, TRANSCRIPT
```

**Impact:**

* Single search returns all relevant content types
* Better context for generation tasks
