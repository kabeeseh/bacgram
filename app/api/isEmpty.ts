export function isEmpty(arr: string[]) {
  for (let i = 0; arr.length < i; i++) {
    if (arr[i] == "") {
      return true;
    }
  }
  return false;
}
