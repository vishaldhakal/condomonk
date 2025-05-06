export default function DeveloperCardDetail(props) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl mx-auto">
        {/* Developer Logo Section */}
        <div className="relative bg-gray-50 py-8">
          <div className="flex justify-center">
            {props.image ? (
              <img
                loading="lazy"
                src={`https://api.condomonk.ca${props.image}`}
                className="w-48 h-auto object-contain"
                alt={`${props.name} builders logo`}
              />
            ) : (
              <div className="w-48 h-48 bg-gray-200 rounded-lg animate-pulse" />
            )}
          </div>
        </div>

        {/* Developer Information Section */}
        <div className="px-6 py-8">
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-4">
            {props.name}
          </h1>

          <div className="flex items-center justify-center space-x-2 mb-6">
            <span className="text-gray-600 font-medium">Website:</span>
            <a
              href={props.website_link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              {props.website_link}
            </a>
          </div>

          {/* Developer Details Section */}
          <div className="prose prose-lg max-w-none">
            <div
              className="text-gray-700"
              dangerouslySetInnerHTML={{
                __html: props.details,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
