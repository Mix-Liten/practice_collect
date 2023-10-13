import { useState } from 'react'
import PropTypes from 'prop-types'
import './style.css'
import { ArrowBigLeft, ArrowBigRight, Circle, CircleDot } from 'lucide-react'

Slider.propTypes = {
  imgUrls: PropTypes.arrayOf(PropTypes.string),
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
    <div className="w-full max-w-2xl h-[80vh] m-auto grid place-items-center grid-columns-2">
      <p>
        An image slider, <br />
        click prev arrow or next arrow to update index and then replace to correspond image through translate x-axis
        effect animation animation.
        <br />
        click dot button to move to the specified image.
      </p>
      <div className="w-full aspect-[10/6] relative">
        <div className="w-full h-full flex overflow-hidden">
          {imgUrls.map(url => (
            <img key={url} src={url} className="img-slider-img" style={{ translate: `${imgIndex * -100}%` }} />
          ))}
        </div>
        <button onClick={showPrevImg} className="img-slider-btn left-0">
          <ArrowBigLeft />
        </button>
        <button onClick={showNextImg} className="img-slider-btn right-0">
          <ArrowBigRight />
        </button>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
          {imgUrls.map((_, index) => (
            <button key={index} onClick={() => setImgIndex(index)} className="img-slider-dot-btn">
              {index === imgIndex ? <CircleDot /> : <Circle />}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
