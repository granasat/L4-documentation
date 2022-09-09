import React, { useRef, useEffect } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import './index.css'

export default function PdfViewer({url}) {
  const viewerUrl = useBaseUrl('/pdfjs/web/viewer.html');

  const divRef = useRef(null);
  const iframeRef = useRef(null);

  useEffect( () => {
    if (iframeRef != null && iframeRef.current) {
      let src = `${viewerUrl}?file=${url}`
      console.log({src})
      if (iframeRef.current.src != src) {
        iframeRef.current.src = src
      }
      console.log('divref', divRef.current)
      if (divRef && divRef.current) {
        iframeRef.current.width = divRef.current.clientWidth
        iframeRef.current.height = divRef.current.clientHeight
        console.log({'height': iframeRef.current.height})
      } else {
        iframeRef.current.width = '100%'
        iframeRef.current.height = '100%'
      }
    }
  }, [])

  // const measuredRef = useCallback(node => {
  //   if (node !== null) {
  //     setHeight(node.getBoundingClientRect().height);
  //   }
  // }, []);

  return (
    <div className='pdf-container flex items-center justify-center' ref={divRef}>
      <iframe ref={iframeRef}>
      </iframe>

    </div>
  )
}