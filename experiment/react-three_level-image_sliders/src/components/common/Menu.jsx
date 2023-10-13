import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Slider as Level1 } from '@/components/slider/level1/slider'
import { Slider as Level2 } from '@/components/slider/level2/slider'
import { Slider as Level3 } from '@/components/slider/level3/slider'
import img1 from '@/assets/imgs/img-1.jpg'
import img2 from '@/assets/imgs/img-2.jpg'
import img3 from '@/assets/imgs/img-3.jpg'
import img4 from '@/assets/imgs/img-4.jpg'
import img5 from '@/assets/imgs/img-5.jpg'

const images = [img1, img2, img3, img4, img5]
const imagesWithAlt = [
  { url: img1, alt: 'Image One' },
  { url: img2, alt: 'Image Two' },
  { url: img3, alt: 'Image Three' },
  { url: img4, alt: 'Image Four' },
  { url: img5, alt: 'Image Five' },
]

export function Menu() {
  return (
    <Tabs defaultValue="level-1" className="w-10/12">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="level-1">Level-1</TabsTrigger>
        <TabsTrigger value="level-2">Level-2</TabsTrigger>
        <TabsTrigger value="level-3">Level-3</TabsTrigger>
      </TabsList>
      <TabsContent value="level-1">
        <Level1 imgUrls={images} />
      </TabsContent>
      <TabsContent value="level-2">
        <Level2 imgUrls={images} />
      </TabsContent>
      <TabsContent value="level-3">
        <Level3 imgUrls={imagesWithAlt} />
      </TabsContent>
    </Tabs>
  )
}
