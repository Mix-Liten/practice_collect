import { useState, useRef } from 'react'
import useIntersection from '../../hooks/useIntersection'
import classnames from '../../utils/classnames'
import './style.css'

const ImageRenderer = ({ name, url, thumb, width, height }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const imgRef = useRef()
  useIntersection(imgRef, () => {
    setIsInView(true)
  })
  const handleOnLoad = () => {
    setIsLoaded(true)
  }
  return (
    <div
      className="image-container"
      ref={imgRef}
      style={{
        paddingBottom: `${(height / width) * 100}%`,
        width: '100%',
      }}
    >
      {isInView && (
        <>
          <img
            className={classnames('image', 'thumb', {
              isLoaded: !!isLoaded,
            })}
            src={thumb}
            alt={name}
          />
          <img
            className={classnames('image', {
              isLoaded: !!isLoaded,
            })}
            src={url}
            alt={name}
            onLoad={handleOnLoad}
          />
        </>
      )}
    </div>
  )
}

export default ImageRenderer
