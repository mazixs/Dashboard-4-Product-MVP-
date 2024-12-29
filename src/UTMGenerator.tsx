import React, { useState } from 'react';

const UTMGenerator: React.FC = () => {
  const [url, setUrl] = useState('');
  const [source, setSource] = useState('');
  const [medium, setMedium] = useState('');
  const [campaign, setCampaign] = useState('');
  const [generatedUrl, setGeneratedUrl] = useState('');

  const generateUTM = () => {
    const utmParams = new URLSearchParams({
      utm_source: source,
      utm_medium: medium,
      utm_campaign: campaign
    });
    setGeneratedUrl(`${url}?${utmParams.toString()}`);
  };

  return (
    <div className="utm-form">
      <input
        type="text"
        placeholder="Enter URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <input
        type="text"
        placeholder="Source"
        value={source}
        onChange={(e) => setSource(e.target.value)}
      />
      <input
        type="text"
        placeholder="Medium"
        value={medium}
        onChange={(e) => setMedium(e.target.value)}
      />
      <input
        type="text"
        placeholder="Campaign"
        value={campaign}
        onChange={(e) => setCampaign(e.target.value)}
      />
      <button onClick={generateUTM}>Generate UTM Link</button>
      {generatedUrl && (
        <div className="generated-url">
          <strong>Generated URL:</strong>
          <p>{generatedUrl}</p>
        </div>
      )}
    </div>
  );
};

export default UTMGenerator;

