import React from 'react'
import ImageRenderer from './components/ImageRenderer'
import imageData from './context/data.json'

export default function App() {
  return (
    <div>
      <h1>Image Lazy Load With Intersection Observer</h1>
      <section>
        {imageData.map(data => (
          <ImageRenderer
            key={data.id}
            name={data.name}
            url={data.url}
            thumb={data.thumbnail}
            width={data.width}
            height={data.height}
          />
        ))}
      </section>
    </div>
  )
}
