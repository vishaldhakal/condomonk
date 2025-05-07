const Neighbourhood = ({ projectName, street_map }) => {
  const streetViewSrc = `https://www.google.com/maps/embed?pb=!4v1!3m1!1s0x0:0x0!5m1!1e1!8m2!3d0!4d0!2m3!1e0!2sm!3i${encodeURIComponent(
    street_map
  )}!2m0!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z${encodeURIComponent(
    street_map
  )}!5e0!3m2!1sen!2sus!4v1`;

  return (
    <div className="py-6">
      <h2 className="text-xl md:text-3xl font-extrabold mb-2">
        Walk Around the Neighbourhood
      </h2>
      <div className="bg-white p-1 rounded-md">
        <div className="map-responsive">
          <iframe
            title={`Google Street Map View for ${projectName}`}
            src={streetViewSrc}
            width="100%"
            height="400"
            className="border-0 rounded-lg"
            allowFullScreen={true}
            loading="lazy"
          ></iframe>
        </div>
      </div>
      <p className="text-xs text-gray-500 mb-2 mt-1">
        Note : The exact location of the project may vary from the street view
        shown here
      </p>
    </div>
  );
};

export default Neighbourhood;
