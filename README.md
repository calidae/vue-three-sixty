# Vue Three Sixty
- A Simple 360&deg; Product Viewer built on Vue.js

## Features

- 360&deg; View
- Zoom
- Pan
- Autoplay (Loops)
- Full Screen Mode
- Spin Direction
- Image Caching
- Mobile Responsive
- Touch Events


## Installation
```
npm install vue-three-sixty
```

## Config

```
import VueThreeSixty from 'vue-three-sixty'

Vue.use(VueThreeSixty)
```

## Example
```
<vue-three-sixty 
  :amount=36
  image-path="https://scaleflex.cloudimg.io/width/600/q35/https://scaleflex.ultrafast.io/https://scaleflex.airstore.io/demo/chair-360-36"
  filemame="chair_{index}.jpg?v1"
/>
```
### Adding a Header
```
<template v-slot:header>
  36 Images - Autoplay (1 loop) - Reverse Spin
</template>
```

## Props

| Name | Type | Description | Required | Default Value |
| --- | --- | --- | --- | --- |
| amount | Number | Number of images | Yes |
| imagePath | String | Path to your image | Yes |
| fileName | String | File name format | Yes |
| spinReverse | Boolean | Reverse Spin | Optional | false |
| autoplay | Number | Autoplay your images | Optional | 24 |
| loop | Number | Number of loops you want to autoplay | Optional | 1 |
| Optional | false |
| paddingIndex | Boolean | Apply Leading Zero to Image Index | Optional | false |
| disableZoom | Boolean | Disable Zoom Functionality | Optional | false |
| scrollImage | Boolean | Scroll Images instead of Default Zoom | Optional | false |
| btnBgColor | String | Buttons Background color | Optional | #F1F1F2 |
| btnColor | String | Buttons Background color | Optional | #666666 |
| btnRounded | Number | Buttons rounded borders | Optional | 0 |
| btnSize | Number | Buttons size | Optional | 28 |
## Buttons 

(In order from left to right)

- Play/Pause
- Zoom In
- Zoom Out
- Move Left
- Move Right
- Reset Position
- Fullscreen

## Credits

- Customized by Calidae.com
- Original code in https://github.com/rajeevgade/vue-360
