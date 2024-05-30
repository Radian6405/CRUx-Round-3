export function SplitBar() {
  return <div className="border-2 border-gray my-4" />;
}

export function Header({ text }: { text: string }) {
  return <div className="text-4xl font-bold">{text}</div>;
}
