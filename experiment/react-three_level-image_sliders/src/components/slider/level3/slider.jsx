import { useState } from 'react'
import PropTypes from 'prop-types'
import './style.css'
import { ArrowBigLeft, ArrowBigRight, Circle, CircleDot } from 'lucide-react'

Slider.propTypes = {
  imgUrls: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
    }),
  ).isRequired,
}

export function Slider({ imgUrls }) {
  const [imgIndex, setImgIndex] = useState(0)

  function showPrevImg() {
    setImgIndex(index => {
      if (index === 0) return imgUrls.length - 1
      return index - 1
    })
  }

  function showNextImg() {
    setImgIndex(index => {
      if (index === imgUrls.length - 1) return 0
      return index + 1
    })
  }

  return (
    <>
      <section
        aria-label="Tab Main Content"
        className="w-full max-w-2xl h-[80vh] m-auto grid place-items-center grid-columns-2"
      >
        <p>
          An image slider, <br />
          click prev arrow or next arrow to update index and then replace to correspond image through translate x-axis
          effect animation animation.
          <br />
          click dot button to move to the specified image. <br />
          support accessibility and can use tab key to select skip button and then jump to next section. <br />
          support [prefers-reduced-motion] media mode.
        </p>
        <div aria-label="Image Slider" className="w-full aspect-[10/6] relative">
          <a href="#after-image-slider-controls" className="skip-link">
            Skip Image Slider Controls
          </a>
          <div className="w-full h-full flex overflow-hidden">
            {imgUrls.map(({ url, alt }, index) => (
              <img
                key={url}
                src={url}
                alt={alt}
                aria-hidden={index !== imgIndex}
                className="img-slider-img"
                style={{ translate: `${imgIndex * -100}%` }}
              />
            ))}
          </div>
          <button onClick={showPrevImg} className="img-slider-btn left-0" aria-label="View Previous Image">
            <ArrowBigLeft aria-hidden />
          </button>
          <button onClick={showNextImg} className="img-slider-btn right-0" aria-label="View Next Image">
            <ArrowBigRight aria-hidden />
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {imgUrls.map((_, index) => (
              <button
                key={index}
                onClick={() => setImgIndex(index)}
                className="img-slider-dot-btn"
                aria-label={`View Image ${index + 1}`}
              >
                {index === imgIndex ? <CircleDot aria-hidden /> : <Circle aria-hidden />}
              </button>
            ))}
          </div>
          <div id="after-image-slider-controls" />
        </div>
      </section>
      <section aria-label="Tab Other Content" className="text-center">
        <a href="/" target="_blank" rel="noopener noreferrer" className="text-6xl">
          Link
        </a>
      </section>
    </>
  )
}
