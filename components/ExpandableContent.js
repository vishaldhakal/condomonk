export default function ExpandableContent({ content }) {
  return (
    <div className="relative">
      <div className={`prose max-w-none leading-relaxed`}>
        <div
          className="text-gray-700"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
}
