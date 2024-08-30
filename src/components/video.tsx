/* eslint-disable react/display-name */
import { forwardRef } from 'react'

interface VideoProps {
  src: string
  id?: string
  controls?: boolean
  style?: any
  className?: string
  poster?: string
  autoPlay?: boolean
  preload?: string
}

const Video = forwardRef(({ src, autoPlay = true, ...rest }: VideoProps, ref: any) => (
  <video playsInline autoPlay={autoPlay} ref={ref} loop muted {...rest}>
    <source src={src} type="video/mp4" />
  </video>
))

export default Video
