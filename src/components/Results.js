import React, { memo, useRef } from 'react';

//@dev Text/css called on iframe load.

const hideLoader = () => {
        var snackbar = document.getElementById("snackbar");
        snackbar.innerText = "Search complete 👍 Click me to reset.";
        snackbar.className = "show";
        snackbar.style.right = "40%";
        setTimeout(function() {
            snackbar.className = snackbar.className.replace("show", "");
            snackbar.style.right = snackbar.style.right.replace("40%", "60%");
        }, 1500);
    }

//@dev Encapsulates the iframe to be shown or not depending on state (see SourceInput.js showResults).

function Results({URL}) {
  const ref = useRef(null); //@dev Used in use effect to designate the iframe as the ref so no new tab/window opens on link click in iframe.  
  
  return (
        <div id="results" className="search-results">
      <iframe id="showFrame" ref={ref} src={URL} height="300" width="500" title="blockscan" target="_parent" onLoad={hideLoader} allowfullscreen></iframe>
    </div>
    )
}

//@dev Ensures state change does not reload iframe unless src changes.

function arePropsEqual(prevProps, nextProps) {
  return prevProps.URL === nextProps.URL; 
}

export default memo(Results, arePropsEqual);


