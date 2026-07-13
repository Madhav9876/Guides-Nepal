export default function Badge({ text, color = "bg-lightBlue/60" }: { text: string; color?: string }) {
  return <span className={`inline-block text-xs px-2 py-1 rounded-full ${color}`}>{text}</span>
}
