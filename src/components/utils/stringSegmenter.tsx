// 将字符串按指定长度分片，返回字符串数组
const segmentString = (originalString: string, maxSegmentLength: number): string[] => {
  const segments: string[] = [];
  for (let i = 0; i < originalString.length; i += maxSegmentLength) {
    segments.push(originalString.substring(i, i + maxSegmentLength));
  }
  return segments;
};

export default segmentString;
