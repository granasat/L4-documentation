

import React, { useState, useRef, useEffect } from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack5';

const options = {
  // cMapUrl: 'cmaps/',
  // cMapPacked: true,
  // standardFontDataUrl: 'standard_fonts/',
};

export default function PdfViewer({url}) {
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [outerDivWidth, setOuterDivWidth] = useState(400)
  const outerDivRef = useRef(null)

  function onDocumentLoadSuccess({ numPages }) {
    console.log(url)
    setNumPages(numPages)
  }

  function changePage(offset) {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }

  useEffect(() => {
    if (outerDivRef && outerDivRef.current) {
      setOuterDivWidth(outerDivRef.current.clientWidth*0.8)
    }
  }, [])


  function btns() {
    return (
      <div
        className='flex items-center justify-center w-12/12 ml-60 mb-10 absolute '
        style={{bottom: '10px'}}
      >
        <div
            onClick={() => changePage(-1)}
            className='h-12/12 flex flex-col items-center justify-center rounded-full border-black cursor-pointer'
          >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
        </div>
        <div className='my-auto px-10'>
          <div className='flex flex-col justify-center align-text-top'>
            <div className='align-text-top font-light text-2xl'>
              Pag {pageNumber} de {numPages}
            </div>
          </div>
        </div>
        <div
            onClick={() => changePage(1)}
            className='p-1 flex flex-col items-center justify-center rounded-xl cursor-pointer bg-gray-600 hover:bg-gray-400'
          >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
        </div>
    </div>)
  }

  return (
    <div className='p-10 flex justify-center mx-auto' style={{borderStyle:'solid', borderWidth:'0px', maxWidth:'1110px'}} ref={outerDivRef}>
      
      {/* <div > */}
        <Document
          options={options}
          width={outerDivWidth}
          file={url}
          onLoadSuccess={onDocumentLoadSuccess}
          className='relative max-w-full border-y-72 border-solid'
        >
          {/* {(Array(numPages).fill(0).map((_, i) => (
            <div className='mb-1'>
              <Page key={i} pageNumber={i+1}  />
            </div>
          )))} */}
          {/* <div className='mb-1 rounded-3xl py-5 mx-auto' style={{ width:`${outerDivWidth+5}px`, borderStyle:'solid', borderWidth:'1px'}}>
          </div> */}
          <Page
            pageNumber={pageNumber} 
            className='relative'
            width={outerDivWidth}
            renderAnnotationLayer={false}
             />
          {btns()}
          
        </Document>  
      {/* </div> */}
    </div>
  );
}
