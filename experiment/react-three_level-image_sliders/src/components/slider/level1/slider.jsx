import { useState } from 'react'
import PropTypes from 'prop-types'
import './style.css'
import { ArrowBigLeft, ArrowBigRight } from 'lucide-react'

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
      <p>An image slider, <br />click prev arrow or next arrow to update index and then replace to correspond image.</p>
      <div className="w-full aspect-[10/6] relative">
        <img src={imgUrls[imgIndex]} className="img-slider-img" />
        <button onClick={showPrevImg} className="img-slider-btn left-0">
          <ArrowBigLeft />
        </button>
        <button onClick={showNextImg} className="img-slider-btn right-0">
          <ArrowBigRight />
        </button>
      </div>
    </div>
  )
}
