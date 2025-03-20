interface IChunkProcess<T> {
  data: T[];
  size: number;
  processor: (chunk: T[], index: number) => Promise<void>;
  onProgress?: (progress: number) => void;
  onCompleted?: () => void;
}
export async function chunkProcess<T>({
  data,
  size,
  processor,
  onProgress,
  onCompleted,
}: IChunkProcess<T>): Promise<void> {
  const chunks = chunkArray(data, size);
  const totalChunks = chunks.length;

  for (let i = 0; i < totalChunks; i++) {
    const chunk = chunks[i];

    await processor(chunk, i);

    const progress = Math.round(((i + 1) / totalChunks) * 100);

    onProgress?.(progress);

    if (i === totalChunks - 1) {
      onCompleted?.();
    }
  }
}

// Helper function to chunk data
function chunkArray<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}
