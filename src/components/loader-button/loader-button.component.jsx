import React from 'react'
import { Button, Glyphicon } from 'react-bootstrap';

import './loader-button.styles.scss';

const LoaderButton = ({ isLoading, className = '', disabled = false, ...props }) => {
  return (
    <Button
      className={`loader-button ${ className }`}
      disabled={ disabled || isLoading}
      { ...props }
    >
      { isLoading
      ? <>
          <div className="spinner-overlay">
            <div className="spinner"></div>
          </div>
        </>
      : props.children
      }
      {/* { props.children } */}
    </Button>
  )
}

export default LoaderButton;
