import React, { useState, useEffect } from 'react';

const WeatherMap = () => {
  const [imageSrc, setImageSrc] = useState([]);
  var [imagesLoaded, setImagesLoaded] = useState(0);
  
  useEffect(() => {
    const fetchData = async (z, y, x) => {
      try {
        const response = await fetch(`https://fathym-cloud-prd.azure-api.net/habistack/weather/ground/api/v0/maptile-fetch/Temperature_2Meters/1691956800/${z}/${y}/${x}`, {
          headers: {
            'lcu-subscription-key': '719acd2551c346a78b7d74cfed6263e7'
          }
        });

        if (response.ok) {
          const data = await response.blob();
          const imageUrl = URL.createObjectURL(data);
          setImageSrc(prevImageSrc => [...prevImageSrc, imageUrl]);
          setImagesLoaded((imagesLoaded) = imagesLoaded + 1);
        } else {
          console.error('Failed to fetch weather map');
        }
      } catch (error) {
        console.error('Error fetching weather map:', error);
      }
    };

    const fetchDataForMaps = async () => {
      const mapsConfig = [
        [1, 0, 0],
        [1, 1, 0],
        [1, 0, 1],
        [1, 1, 1]
      ];

      try {
        for (const [z, y, x] of mapsConfig) {
            if (imagesLoaded < mapsConfig.length) {
            await fetchData(z, y, x);
            }
        }
      } catch (error) {
        console.error('Error fetching weather maps:', error);
      }
    };

    fetchDataForMaps();
  }, []);

  return (
    <div>
      {imageSrc.length > 0 ? (
        imageSrc.map((src, index) => (
          <img key={index} src={src} alt={`Weather Map ${index}`} />
        ))
      ) : (
        <p>Loading weather map...</p>
      )}
    </div>
  );
};

export default WeatherMap;