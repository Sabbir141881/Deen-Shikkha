import React, { useEffect, useRef } from 'react';

export default function AdBanner() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear previous content to prevent duplicates
    container.innerHTML = '';

    // Create an iframe to isolate the ad script (which likely uses document.write)
    const iframe = document.createElement('iframe');
    iframe.width = '728';
    iframe.height = '90';
    iframe.style.border = 'none';
    iframe.style.overflow = 'hidden';
    iframe.scrolling = 'no';
    
    container.appendChild(iframe);

    // Write the ad script into the iframe
    const doc = iframe.contentWindow?.document;
    if (doc) {
      doc.open();
      doc.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <style>body { margin: 0; padding: 0; overflow: hidden; display: flex; justify-content: center; align-items: center; }</style>
          </head>
          <body>
            <script type="text/javascript">
              atOptions = {
                'key' : 'd6c984c7796a8800586004bbe0bbe6cf',
                'format' : 'iframe',
                'height' : 90,
                'width' : 728,
                'params' : {}
              };
            </script>
            <script type="text/javascript" src="https://www.highperformanceformat.com/d6c984c7796a8800586004bbe0bbe6cf/invoke.js"></script>
          </body>
        </html>
      `);
      doc.close();
    }
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="mx-auto mt-4 w-full max-w-[728px] h-[90px] flex items-center justify-center bg-gray-50 rounded-xl overflow-hidden"
    />
  );
}
