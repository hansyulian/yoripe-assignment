export function extractor<DataType>(keys: string[]) {
  function extractFunction(obj: any): DataType {
    const result: any = {};
    for (const key of keys) {
      result[key] = obj[key];
    }
    return result as DataType;
  }

  return (obj: any) => {
    if (Array.isArray(obj)) {
      const result = [];
      for (const record of obj) {
        result.push(extractFunction(record));
      }
      return result;
    }
    return extractFunction(obj);
  };
}
