# video_compression

let video smaller by compress video in 30fps

## Requirement

- Docker
- Node.js

## Usage

1. start server

   ```shell
   $ docker-compose up -d
   ```

2. send video by form<br />
   `Post` to `http://localhost:5000/compress-video`<br />
   `Content-Type` is `multipart/form-data` and set input name attribute as 'video'

   ```html
   <form method="POST" action="/compress-video" enctype="multipart/form-data">
     <input name="video" type="file" />
     <button>Submit</button>
   </form>
   ```

   or

   ```js
   const Video = new File(['sample video content'], 'video.mp4', { type: 'video/mp4' })
   const formData = new FormData()
   formData.append('video', Video)
   fetch('/compress-video', {
     method: 'POST',
     body: formData,
   })
   ```

   ps. also can use Postman

3. Finally, The video will save in /temp dir.
