export function parseDate(date: Date): string {
  let dd = date.getDate()<10?'0'+String(date.getDate()):date.getDate();
  let mm = ('0'+(date.getMonth()+1)).slice(-2);
  return `${date.getFullYear()}-${mm}-${dd}`;
 
}
